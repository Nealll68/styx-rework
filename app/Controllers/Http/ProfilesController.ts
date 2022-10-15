import Configuration from 'App/Models/Configuration'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Profile from 'App/Models/Profile'
import Parameter from 'App/Models/Parameter'

import ProfileValidator from 'App/Validators/ProfileValidator'

import ArmaProfile from 'App/Services/Arma/Profile'
import Database from '@ioc:Adonis/Lucid/Database'

export default class ProfilesController {
  /**
   * Return all profiles in database
   */
  public async index({ inertia }: HttpContextContract) {
    return inertia.render('ProfilePage', {
      profiles: await Profile.all(),
      profile: await Profile.query()
        .where('is_default', true)
        .preload('parameter')
        .first(),
    })
  }

  /**
   * Create a new profile and create the associated Arma 3 server startup parameters
   * @param HttpContext
   */
  public async store({ request, response }: HttpContextContract) {
    const configuration = await Configuration.first()

    if (!configuration?.a3server_path) {
      return response
        .flash({
          errors: {
            message:
              'To create a profile, you need to add Arma 3 server path in configuration page',
          },
        })
        .redirect()
        .back()
    }

    const { name, isDefault } = await request.validate(ProfileValidator)

    const profilesCount = (
      await Database.from('profiles').count('* as total')
    )[0].total

    if (profilesCount > 0 && isDefault) {
      const defaultProfile = await Profile.findBy('isDefault', true)
      if (defaultProfile) {
        defaultProfile.isDefault = false
        await defaultProfile.save()
      }
    }

    const profile = await Profile.create({
      name,
      isDefault: profilesCount > 0 ? isDefault : true,
    })

    await profile.related('parameter').create({})

    await ArmaProfile.create(name, configuration.a3server_path)

    response
      .flash({ success: `The profile ${profile.name} has been created` })
      .redirect(`/profiles/${profile.id}`)
  }

  /**
   * Return profile based on ID
   * @param HttpContext
   */
  public async show({ params, inertia }: HttpContextContract) {
    return inertia.render('ProfilePage', {
      profiles: await Profile.all(),
      profile: await Profile.query()
        .where('id', params.id)
        .preload('parameter')
        .first(),
    })
  }

  /**
   * Update default profile
   * @param HttpContext
   */
  public async updateDefault({
    params,
    request,
    response,
  }: HttpContextContract) {
    const { isDefault } = request.all()

    if (isDefault) {
      const defaultProfile = await Profile.findByOrFail('isDefault', true)
      defaultProfile.isDefault = false
      await defaultProfile.save()
    }

    const profile = await Profile.findOrFail(params.id)

    profile.isDefault = isDefault

    await profile.save()

    response
      .flash({ success: `Changed default profile to ${profile.name}` })
      .redirect()
      .back()
  }

  /**
   * Update profile with new data
   * @param HttpContext
   */
  public async update({ params, request, response }: HttpContextContract) {
    const { parameters, server, difficulty, performance } = request.all()

    const configuration = await Configuration.first()
    const profile = await Profile.findOrFail(params.id)
    const parametersDb = await Parameter.findByOrFail('profile_id', profile.id)

    parametersDb.merge(parameters)
    await parametersDb.save()

    if (server) {
      await ArmaProfile.update(
        profile.name,
        'server',
        server,
        configuration?.a3server_path
      )
    }

    if (difficulty) {
      await ArmaProfile.update(
        profile.name,
        'difficulty',
        difficulty,
        configuration?.a3server_path
      )
    }

    if (performance) {
      await ArmaProfile.update(
        profile.name,
        'basic',
        performance,
        configuration?.a3server_path
      )
    }

    response
      .flash({ success: `The profile ${profile.name} has been saved` })
      .redirect()
      .back()
  }

  /**
   * Delete profile and associated Arma 3 server startup parameters
   * @param HttpContext
   */
  public async destroy({ params, response }: HttpContextContract) {
    const configuration = await Configuration.first()
    const profile = await Profile.findOrFail(params.id)
    const parameters = await Parameter.findByOrFail('profile_id', profile.id)

    await ArmaProfile.delete(profile.name, configuration?.a3server_path)

    await parameters.delete()
    await profile.delete()

    response
      .flash({ success: `Successfully deleted profile ${profile.name}` })
      .redirect('/profiles')
  }
}
