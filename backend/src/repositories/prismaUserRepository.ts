import { PrismaClient } from "@prisma/client";
import { IUserRepository, User } from "./iUserRepository";

export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(username: string, hashedPassword: string): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    return user;
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });
    return user;
  }
}