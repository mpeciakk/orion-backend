import { NextFunction, Request, Response } from "express"
import { fail } from "../base/Controller"
import { Middleware } from "../base/Middleware"

export class AuthMiddleware extends Middleware {
  public apply(req: Request, res: Response, next: NextFunction): void {
    if (req.session.user) {
      next()
    } else {
      res.send(fail("Unauthorized", 401))
    }
  }
}
