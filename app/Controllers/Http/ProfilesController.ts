import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Profile from 'App/Models/Profile'
import Parameter from 'App/Models/Parameter'

import ProfileValidator from 'App/Validators/ProfileValidator'

import ArmaProfile from 'App/Services/Arma/Profile'

export default class ProfilesController {
  /**
   * Return all profiles in database
   */
  public async index({ inertia }: HttpContextContract) {
    return inertia.render('ProfilePage', {
      profiles: await Profile.all(),
    })
  }

  /**
   * Create a new profile and create the associated Arma 3 server startup parameters
   * @param HttpContext
   */
  public async store({ request, response }: HttpContextContract) {
    const { name, isDefault } = await request.validate(ProfileValidator)

    const profileExists = await Profile.first()

    if (!profileExists) {
      const profile = await Profile.create({
        name,
        isDefault,
      })

      return response
        .flash({ success: `The profile ${profile.name} has been created` })
        .redirect(`/profiles/${profile.id}`)
    }

    if (isDefault) {
      const defaultProfile = await Profile.findBy('isDefault', true)
      if (defaultProfile) {
        defaultProfile.isDefault = false
        await defaultProfile.save()
      }
    }

    const profile = await Profile.create({
      name,
      isDefault,
    })

    // await Parameter.create({
    //   profileId: profile.id,
    // })

    // await ArmaProfile.create(name)

    response
      .flash({ success: `The profile ${profile.name} has been created` })
      .redirect(`/profiles/${profile.id}`)
  }

  /**
   * Return profile based on ID
   * @param HttpContext
   */
  public async show({ params, inertia }: HttpContextContract) {
    const profiles = await Profile.all()

    if (profiles.length === 0) {
      return inertia.render('ProfilePage', {
        profiles: [],
        profile: null,
      })
    }

    if (params.id === 'default') {
      const profile = profiles.find((profile) => profile.isDefault)
      return inertia.render('ProfilePage', {
        profiles: profiles,
        profile: profile,
      })
    }

    const profile = profiles.find((profile) => profile.id === params.id)
    return inertia.render('ProfilePage', {
      profiles: profiles,
      profile: profile,
    })
  }

  /**
   * Update profile with new data
   * @param HttpContext
   */
  public async update({ params, request, response }: HttpContextContract) {
    const { isDefault } = request.all()

    if (isDefault) {
      const defaultProfile = await Profile.findByOrFail('isDefault', true)
      defaultProfile.isDefault = false
      await defaultProfile.save()
    }

    const profile = await Profile.findOrFail(params.id)

    profile.isDefault = isDefault

    await profile.save()

    response.status(201).json(profile)
  }

  /**
   * Delete profile and associated Arma 3 server startup parameters
   * @param HttpContext
   */
  public async destroy({ params, response }: HttpContextContract) {
    const profile = await Profile.findOrFail(params.id)
    const parameters = await Parameter.findByOrFail('profile_id', profile.id)

    await ArmaProfile.delete(profile.name)

    await parameters.delete()
    await profile.delete()

    response.status(204)
  }
}
