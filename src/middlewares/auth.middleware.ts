import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { fail } from "../base/Controller"
import { Middleware } from "../base/Middleware"
import { prisma } from "../database/database"

export class AuthMiddleware extends Middleware {
  public apply(req: Request, res: Response, next: NextFunction): void {
    if (req?.headers?.authorization?.split(" ")[0] === "JWT" && req.headers.authorization.split(" ")[1]) {
      jwt.verify(req.headers.authorization.split(" ")[1]!, process.env.JWT_SECRET!, async (err, decode: any) => {
        if (!decode) {
          return res.send(fail("Token is invalid"))
        }

        const user = await prisma.user.findUnique({
          where: {
            id: parseInt(decode.sub),
          },
        })

        if (!user) {
          return res.send(fail("User not found"))
        }

        req.user = user

        next()
      })
    } else {
      res.send(fail("Unauthorized", 401))
    }
  }
}
