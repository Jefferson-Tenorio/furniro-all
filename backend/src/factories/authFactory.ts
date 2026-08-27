import { AuthController } from "../controllers/authController";
import { AuthService } from "../services/authService";
import { PrismaUserRepository } from "../repositories/prismaUserRepository";
import { PrismaTokenDenylistRepository } from "../repositories/prismaTokenDenylistRepository";
import { JwtService } from "../services/jwtService";
import { prisma } from "../lib/prisma";

export default class AuthFactory {
  static createController(): AuthController {
    const userRepository = new PrismaUserRepository(prisma);
    const tokenDenylistRepository = new PrismaTokenDenylistRepository(prisma);

    const secret =
      process.env.JWT_SECRET || "default_super_secret_key_change_me_in_prod";
    const expiresInMs = parseInt(
      process.env.JWT_EXPIRES_IN_MS || "3600000",
      10,
    );
    const issuer = process.env.JWT_ISSUER || "furniro-api";
    const audience = process.env.JWT_AUDIENCE || "furniro-client";

    const jwtService = new JwtService(secret, expiresInMs, issuer, audience);
    const authService = new AuthService(
      userRepository,
      jwtService,
      tokenDenylistRepository,
    );
    const authController = new AuthController(authService);

    return authController;
  }

  static createJwtService(): JwtService {
    const secret =
      process.env.JWT_SECRET || "default_super_secret_key_change_me_in_prod";
    const expiresInMs = parseInt(
      process.env.JWT_EXPIRES_IN_MS || "3600000",
      10,
    );
    const issuer = process.env.JWT_ISSUER || "furniro-api";
    const audience = process.env.JWT_AUDIENCE || "furniro-client";
    return new JwtService(secret, expiresInMs, issuer, audience);
  }

  static createTokenDenylistRepository(): PrismaTokenDenylistRepository {
    return new PrismaTokenDenylistRepository(prisma);
  }
}
