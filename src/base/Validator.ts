import { ValidationChain, validationResult } from "express-validator"
import { NextFunction, Request, Response } from "express"
import { fail } from "./Controller"
import { Middleware } from "./Middleware"

export abstract class Validator extends Middleware {
  abstract validate(): ValidationChain[]

  public override async apply(req: Request, res: Response, next: NextFunction) {
    for (let validation of this.validate()) {
      const result = await validation.run(req)
      // @ts-ignore
      if (result.errors.length) break
    }

    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }

    res.send(fail("Validation failed", 400, errors.array()))
  }
}
