import express from "express"
import { Controller } from "./Controller"

export class ApiServer {
  private app = express()
  private controllers = [] as Controller[]

  constructor() {
    this.app.use(express.json())
  }

  protected registerController(controller: Controller) {
    this.controllers.push(controller)
    controller.prepare(this.app)
  }

  public listen(port: number | string, callback: () => void) {
    return this.app.listen(port, callback)
  }
}