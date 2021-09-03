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
    const user = await User.findOrFail(params.id)

    if (user.admin) {
      const adminAccounts = await User
        .query()
        .where('admin', true)

      if (adminAccounts.length === 1) {
        return response
          .flash({ error: 'The application needs at least one admin account to properly work' })
          .redirect('/users')    
      }
    }
    
    await user.delete()

    response
      .flash({ success: 'The user has correctly been deleted' })
      .redirect('/users')
  }
}
