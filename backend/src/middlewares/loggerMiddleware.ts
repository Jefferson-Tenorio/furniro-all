import { Request, Response, NextFunction } from "express";

export const requestLogger = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const { method, url } = req;
  const query = (req.query as Record<string, unknown>) || {};
  const body = (req.body as Record<string, unknown>) || {};
  const timestamp = new Date().toISOString();

  console.log(`[${timestamp}] ${method} ${url}`);

  if (Object.keys(query).length > 0) {
    console.log("  Query Params:", JSON.stringify(query, null, 2));
  }

  if (method !== "GET" && Object.keys(body).length > 0) {
    console.log("  Body:", JSON.stringify(body, null, 2));
  }

  next();
};
