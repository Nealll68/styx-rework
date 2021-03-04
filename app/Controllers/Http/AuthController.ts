import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserValidator from 'App/Validators/UserValidator'

export default class AuthController {

  public async register ({ request, response }: HttpContextContract) {
    const { username, password } = await request.validate(UserValidator)

    await User.create({
      username,
      password
    })

    response.status(204)
  }


  public async login ({ request, auth, response }: HttpContextContract) {
    const { username, password, rememberMe } = request.all()

    await auth.attempt(username, password, rememberMe)

    response.status(204)
  }

  public async logout ({ auth, response }: HttpContextContract) {
    await auth.logout()

    response.status(204)
  }

}
