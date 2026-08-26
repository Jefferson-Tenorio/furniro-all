import { Request, Response } from "express";

export default interface Controller {
  getAll(req: Request, res: Response): Promise<void>;
  findById(req: Request, res: Response): Promise<void>;
  findBySlug(req: Request, res: Response): Promise<void>;
  create(req: Request, res: Response): Promise<void>;
  update(req: Request, res: Response): Promise<void>;
  delete(req: Request, res: Response): Promise<void>;
}
