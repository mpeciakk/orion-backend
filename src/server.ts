import { ApiServer } from "./base/ApiServer"
import { TestController } from "./controllers/test.controller"

export class Server extends ApiServer {
  constructor() {
    super()

    this.registerController(new TestController())
  }
}