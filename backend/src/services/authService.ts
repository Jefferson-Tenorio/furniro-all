import bcrypt from "bcrypt";
import { IUserRepository } from "../repositories/iUserRepository";
import { ITokenDenylistRepository } from "../repositories/iTokenDenylistRepository";
import { JwtService } from "./jwtService";

export class AuthError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = "AuthError";
  }
}

export class AuthService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly tokenService: JwtService,
    private readonly denylist: ITokenDenylistRepository,
  ) {}

  async login(username: string, password: string) {
    const user = await this.userRepository.findByUsername(username);
    if (!user || !user.password) {
      throw new AuthError(401, "Invalid credentials");
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new AuthError(401, "Invalid credentials");
    }

    return this.tokenService.sign({
      userId: user.id,
      username: user.username,
    });
  }

  async logout(token: string | undefined): Promise<void> {
    if (!token) return;
    try {
      const payload = this.tokenService.verify(token);
      const expiresAt = payload.exp
        ? new Date(payload.exp * 1000)
        : new Date(Date.now() + 3600 * 1000); // fallback 1h
      await this.denylist.add(payload.jti, payload.userId, expiresAt);
    } catch {
      // token já inválido/expirado: nada a negar
    }
  }

  async register(username: string, password: string) {
    const exists = await this.userRepository.findByUsername(username);
    if (exists) {
      throw new AuthError(409, "Username already exists");
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await this.userRepository.create(username, hashed);

    return { id: user.id, username: user.username };
  }
}
