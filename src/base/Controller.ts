import { Application } from "express"
import { Middleware } from "./Middleware"

type RequestCallback = (...params: any[]) => Promise<ResponseType>

export interface ResponseType {
  message: string
  status: number
  payload?: Record<string, any>
}

const response = (message: string, status: number, payload?: Record<string, any>): ResponseType => {
  return {
    message,
    status,
    payload,
  }
}

export const success = (message: string, status: number = 200, payload?: Record<string, any>): ResponseType => response(message, status, payload)
export const fail = (message: string, status: number = 500, payload?: Record<string, any>): ResponseType => response(message, status, payload)

export abstract class Controller {
  private app: Application

  protected abstract configure(): void

  public prepare(app: Application): void {
    this.app = app
    this.configure()
  }

  protected get(path: string, callback: RequestCallback, ...middlewares: Middleware[]): void {
    this.app.get(path, ...middlewares.map((middleware) => middleware.apply.bind(middleware)), async (req, res) => {
      res.send(await callback(req.params, req, res))
    })
  }

  protected post(path: string, callback: RequestCallback, ...middlewares: Middleware[]): void {
    this.app.post(path, ...middlewares.map((middleware) => middleware.apply.bind(middleware)), async (req, res) => {
      res.send(await callback(req.body, req, res))
    })
  }
}
