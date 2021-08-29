import User from 'App/Models/User';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserValidator from 'App/Validators/UserValidator';

export default class UsersController {
  public async index ({ inertia }: HttpContextContract) {
    return inertia.render('Users', {
      users: await User.all()
    })
  }

  public async create ({ request }: HttpContextContract) {
   console.log(request.all()) 
  }

  public async store ({ request, response }: HttpContextContract) {
    const data = await request.validate(UserValidator)

    await User.create(data)

    response
      .flash({ success: `User ${data.username} has been created` })
      .redirect()
      .back()
  }

  public async show ({}: HttpContextContract) {
  }

  public async edit ({}: HttpContextContract) {
  }

  public async update ({}: HttpContextContract) {
  }

  public async destroy ({ params, response }: HttpContextContract) {
    console.log(params)
    // const user = await User.findOrFail(params.id)
    // await user.delete()
    console.log('user deleted')

    try {
      console.log('res')
      response
        .flash({ success: 'The user has correctly been deleted' })
        .redirect('/users')
    } catch (e) {
      console.log(e)
    }
  }
}
