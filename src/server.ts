import { ApiServer } from "./base/ApiServer"
import { AuthController } from "./controllers/auth.controller"

export class Server extends ApiServer {
  constructor() {
    super()

    this.registerController(new AuthController())
  }
}
