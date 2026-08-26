import { Request, Response, Router } from "express";
import { prisma } from "../lib/prisma";

const healthRouter = Router();

healthRouter.get("/", async (req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ status: "ok", database: "ok" });
  } catch {
    res.status(503).json({ status: "error", database: "error" });
  }
});

export default healthRouter;
