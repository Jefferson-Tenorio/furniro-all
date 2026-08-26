import { Request, Response, NextFunction } from "express";
import authFactory from "../factories/authFactory";

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.cookies?.token;
  if (!token) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }

  const jwtService = authFactory.createJwtService();
  const denylist = authFactory.createTokenDenylistRepository();

  try {
    const user = jwtService.verify(token);
    
    if (await denylist.isDenied(user.jti)) {
      res.status(401).json({ message: "Invalid or expired token" });
      return;
    }
    
    (req as Request & { user?: typeof user }).user = user;

    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};