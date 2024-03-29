import User from 'App/Models/User'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateValidator from 'App/Validators/User/CreateValidator'
import EditValidator from 'App/Validators/User/EditValidator'

export default class UsersController {
  public async index({ inertia }: HttpContextContract) {
    return inertia.render('UsersPage', {
      users: await User.all(),
    })
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(CreateValidator)

    await User.create(data)

    response
      .flash({ success: `User ${data.username} has been created` })
      .redirect()
      .back()
  }

  public async update({ params, request, response }: HttpContextContract) {
    const data = await request.validate(EditValidator)
    const user = await User.findOrFail(params.id)

    if (user.admin && !data.admin) {
      const adminAccounts = await User.query().where('admin', true)

      if (adminAccounts.length === 1) {
        return response
          .flash({
            errors: {
              message:
                'This user is the last with administrator permissions. The application needs at least one admin account to properly work. Please create another admin user if you want to remove admin permission from this user',
            },
          })
          .redirect('/users')
      }
    }

    await user
      .merge({
        username: data.username,
        admin: data.admin,
      })
      .save()

    response
      .flash({
        success: `The user ${user.username} has correctly been updated`,
      })
      .redirect('/users')
  }

  public async destroy({ params, response }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    if (user.admin) {
      const adminAccounts = await User.query().where('admin', true)

      if (adminAccounts.length === 1) {
        return response
          .flash({
            errors: {
              message:
                'The application needs at least one admin account to properly work',
            },
          })
          .redirect('/users')
      }
    }

    await user.delete()

    response
      .flash({
        success: `The user ${user.username} has correctly been deleted`,
      })
      .redirect('/users')
  }
}
