import { NextFunction, Request, Response } from "express"

export abstract class Middleware {
  public abstract apply(req: Request, res: Response, next: NextFunction): void
}
