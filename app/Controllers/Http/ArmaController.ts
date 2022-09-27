import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ArmaServer from 'App/Services/Arma/Server'
import SteamConsole from 'App/Services/Steam/Console'

import Profile from 'App/Models/Profile'

import { promisify } from 'util'

export default class ArmaController {
  private _delay = promisify(setTimeout)

  /**
   * Start Arma 3 server
   *
   * @param HttpContext
   */
  public async start({ response }: HttpContextContract) {
    const profile = await Profile.findByOrFail('isDefault', true)
    await profile.preload('parameter')

    await ArmaServer.start(profile.name, profile.parameter)

    response.status(204)
  }

  /**
   * Stop Arma 3 server
   *
   * @param HttpContext
   */
  public async stop({ response }: HttpContextContract) {
    ArmaServer.stop()

    response.status(204)
  }

  /**
   * Restart Arma 3 server
   *
   * @param HttpContext
   */
  public async restart({ response }: HttpContextContract) {
    ArmaServer.stop()

    const profile = await Profile.findByOrFail('isDefault', true)
    await profile.preload('parameter')

    await this._delay(2000)

    await ArmaServer.start(profile.name, profile.parameter)

    response.status(204)
  }

  /**
   * Update Arma 3 server
   * @param HttpContext
   */
  public async update({ request, response }: HttpContextContract) {
    const payload = request.all()

    await SteamConsole.updateArma(payload)

    response.status(204)
  }
}
