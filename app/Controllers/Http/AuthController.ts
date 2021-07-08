import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {

  public async index ({ inertia }: HttpContextContract) {
    return inertia.render('Login')
  }

  public async login ({ request, auth, response, session }: HttpContextContract) {
    const { username, password, remember } = request.all()

    try {
      await auth.attempt(username, password, remember)
      response.redirect('/')
    } catch {
      session.flash('errors', {
        credentials: 'The provided credentials do not match with existings accounts'
      })
      response.redirect().back()
    }
  }

  public async logout ({ auth, response }: HttpContextContract) {
    await auth.logout()

    response.redirect('/login')
  }

}
