import { Request, Response, NextFunction } from "express";
import { AuthService, AuthError } from "../services/authService";

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "strict" as const,
  secure: process.env.NODE_ENV === "production",
};

export class AuthController {
  constructor(private readonly service: AuthService) {}

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        res.status(400).json({ message: "Username and password are required" });
        return;
      }
      
      const token = await this.service.login(username, password);

      res.cookie("token", token, {
        ...COOKIE_OPTIONS,
        maxAge: parseInt(process.env.JWT_EXPIRES_IN_MS || "3600000", 10),
      });

      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      if (error instanceof AuthError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        next(error);
      }
    }
  }

  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = typeof req.cookies?.token === "string" ? req.cookies.token : undefined;
      await this.service.logout(token);
      res.clearCookie("token", COOKIE_OPTIONS);
      res.status(200).json({ message: "Logged out" });
    } catch (error) {
      next(error);
    }
  }

  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        res.status(400).json({ message: "Username and password are required" });
        return;
      }

      await this.service.register(username, password);
      res.status(201).json({ message: "User created" });
    } catch (error) {
      if (error instanceof AuthError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        next(error);
      }
    }
  }
}