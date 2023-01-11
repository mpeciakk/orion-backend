import express from "express"
import { Controller } from "./Controller"
import session from "express-session"
import cookieParser from "cookie-parser"
import cors from "cors-ts"

export class ApiServer {
  private app = express()
  private controllers = [] as Controller[]

  constructor() {
    this.app.use(express.json())
    this.app.use(
      session({
        secret: process.env.SESSION_SECRET!,
        saveUninitialized: true,
        cookie: { maxAge: /* one day */ 1000 * 60 * 60 * 24 },
        resave: false,
      }),
    )
    this.app.use(cookieParser())
    this.app.use(cors())
  }

  protected registerController(controller: Controller) {
    this.controllers.push(controller)
    controller.prepare(this.app)
  }

  public listen(port: number | string, callback: () => void) {
    return this.app.listen(port, callback)
  }
}
