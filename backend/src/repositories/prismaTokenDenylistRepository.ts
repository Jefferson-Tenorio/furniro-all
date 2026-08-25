import { PrismaClient } from "@prisma/client";
import { ITokenDenylistRepository } from "./iTokenDenylistRepository";

export class PrismaTokenDenylistRepository implements ITokenDenylistRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async add(jti: string, userId: string, expiresAt: Date): Promise<void> {
    await this.prisma.tokenDenylist.create({
      data: {
        jti,
        userId,
        expiresAt,
      },
    });
  }

  async isDenied(jti: string): Promise<boolean> {
    const token = await this.prisma.tokenDenylist.findUnique({
      where: { jti },
    });
    return token !== null;
  }
}