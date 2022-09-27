import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Profile from 'App/Models/Profile'
import Parameter from 'App/Models/Parameter'

import ProfileValidator from 'App/Validators/ProfileValidator'

import ArmaProfile from 'App/Services/Arma/Profile'

export default class ProfilesController {
  /**
   * Return all profiles in database
   */
  public async index () {
    return await Profile.all()
  }

  /**
   * Create a new profile and create the associated Arma 3 server startup parameters
   * @param HttpContext 
   */
  public async store ({ request, response }: HttpContextContract) {
    const { name, isDefault } = await request.validate(ProfileValidator)

    const profile = await Profile.create({
      name,
      isDefault,
    })

    await Parameter.create({
      profileId: profile.id,
    })

    await ArmaProfile.create(name)

    response
      .status(201)
      .json(profile)
  }

  /**
   * Return profile based on ID
   * @param HttpContext 
   */
  public async show ({ params }: HttpContextContract) {
    const profile = await Profile.findOrFail(params.id)
    await profile.preload('parameter')

    return profile
  }

  /**
   * Update profile with new data
   * @param HttpContext 
   */
  public async update ({ params, request, response }: HttpContextContract) {
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
      .status(201)
      .json(profile)
  }

  /**
   * Delete profile and associated Arma 3 server startup parameters
   * @param HttpContext 
   */
  public async destroy ({ params, response }: HttpContextContract) {
    const profile = await Profile.findOrFail(params.id)
    const parameters = await Parameter.findByOrFail('profile_id', profile.id)

    await ArmaProfile.delete(profile.name)

    await parameters.delete()
    await profile.delete()

    response.status(204)
  }
}
