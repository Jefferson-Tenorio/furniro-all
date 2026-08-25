import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import authFactory from "../factories/authFactory";

const authRouter = Router();
const authController = authFactory.createController();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many login attempts, please try again later",
});

const writeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

authRouter.post("/register", writeLimiter, (req, res, next) =>
  authController.register(req, res, next)
);
authRouter.post("/login", loginLimiter, (req, res, next) =>
  authController.login(req, res, next)
);
authRouter.post("/logout", (req, res, next) =>
  authController.logout(req, res, next)
);

export default authRouter;
