import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import EditValidator from 'App/Validators/User/EditValidator'

export default class AuthController {
  public async index({ inertia }: HttpContextContract) {
    return inertia.render('LoginPage')
  }

  public async update({ params, request, response }: HttpContextContract) {
    const data = await request.validate(EditValidator)
    const user = await User.findOrFail(params.id)

    if (data.password) {
      user.password = data.password
    }

    user.username = data.username

    await user.save()

    response
      .flash({ success: 'Your account has correctly been updated' })
      .redirect('/user')
  }

  public async login({
    request,
    auth,
    response,
    session,
  }: HttpContextContract) {
    const { username, password, remember } = request.all()

    try {
      await auth.attempt(username, password, remember)
      response.redirect('/')
    } catch {
      session.flash('errors', {
        username:
          'The provided credentials do not match with existings accounts',
      })
      response.redirect().back()
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout()

    response.redirect('/login')
  }
}
