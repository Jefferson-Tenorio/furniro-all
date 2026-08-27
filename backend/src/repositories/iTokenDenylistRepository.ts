export interface ITokenDenylistRepository {
  add(jti: string, userId: string, expiresAt: Date): Promise<void>;
  isDenied(jti: string): Promise<boolean>;
}
