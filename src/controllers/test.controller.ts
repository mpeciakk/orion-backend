import { Controller, success, ResponseType } from "../base/Controller";

export class TestController extends Controller {
  protected configure(): void {
    this.get('/', this.testGet)
  }

  private async testGet(): Promise<ResponseType> {
    return success('Hello, world!')
  }
}