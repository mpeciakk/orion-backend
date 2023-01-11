import { body } from "express-validator"
import { Controller, success, fail, ResponseType } from "../base/Controller"
import { Validator } from "../base/Validator"
import { prisma } from "../database/database"
import bcrypt from "bcrypt"
import { AuthMiddleware } from "../middlewares/auth.middleware"
import { Request, Response } from "express"

class LoginValidator extends Validator {
  validate() {
    return [body("username").exists(), body("password").exists()]
  }
}

class RegisterValidator extends Validator {
  validate() {
    return [body("username").exists(), body("password").exists()]
  }
}

export class AuthController extends Controller {
  protected configure(): void {
    this.post("/auth/login", this.login, new LoginValidator())
    this.post("/auth/register", this.register, new RegisterValidator())
    this.get("/auth/test", this.test, new AuthMiddleware())
    this.get("/auth/logout", this.logout)
  }

  async login(payload: any, req: Request, res: Response): Promise<ResponseType> {
    const { username, password } = payload

    const user = await prisma.user.findUnique({ where: { username: username } })

    if (!user) {
      return fail("User with this username doesn't exist", 401)
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password)

    if (!passwordIsValid) {
      return fail("Invalid password", 401)
    }

    req.session.user = {
      id: user.id,
      username: username,
    }

    return success("User logged in successfully", 200, {
      user: {
        id: user.id,
        username: username,
      },
    })
  }

  async register(payload: any, req: Request, res: Response): Promise<ResponseType> {
    const { username, password } = payload

    const user = await prisma.user.findUnique({ where: { username: username } })

    if (user) {
      return fail("User with this username already exists", 406)
    }

    await prisma.user.create({
      data: {
        username: username,
        password: bcrypt.hashSync(password, 8),
      },
    })

    return success("User registered successfully")
  }

  async logout(payload: any, req: Request, res: Response): Promise<ResponseType> {
    req.session.destroy(() => {})

    return success("Log out successfully!")
  }

  async test(payload: any, req: Request, res: Response): Promise<ResponseType> {
    return success("User is logged in!")
  }
}
