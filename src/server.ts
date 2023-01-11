import { ApiServer } from "./base/ApiServer"
import { AuthController } from "./controllers/auth.controller"
import { User } from "./model/user.model"

declare module "express-session" {
  interface SessionData {
    user?: User
  }
}

export class Server extends ApiServer {
  constructor() {
    super()

    this.registerController(new AuthController())
  }
}
