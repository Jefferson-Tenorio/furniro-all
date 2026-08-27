import jwt from "jsonwebtoken";
import crypto from "crypto";

export interface TokenPayload {
  userId: string;
  username: string;
}

export interface DecodedToken extends TokenPayload {
  jti: string;
  exp?: number;
  iat?: number;
  iss?: string;
  aud?: string;
}

export class JwtService {
  constructor(
    private readonly secret: string,
    private readonly expiresInMs: number,
    private readonly issuer?: string,
    private readonly audience?: string,
  ) {}

  sign(payload: TokenPayload): string {
    const jti = crypto.randomUUID();
    return jwt.sign(payload, this.secret, {
      expiresIn: Math.floor(this.expiresInMs / 1000),
      jwtid: jti,
      issuer: this.issuer,
      audience: this.audience,
    });
  }

  verify(token: string): DecodedToken {
    return jwt.verify(token, this.secret, {
      issuer: this.issuer,
      audience: this.audience,
    }) as DecodedToken;
  }
}
