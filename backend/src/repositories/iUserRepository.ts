export interface User {
  id: string;
  username: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserRepository {
  create(username: string, hashedPassword: string): Promise<User>;
  findByUsername(username: string): Promise<User | null>;
}
