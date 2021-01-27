import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ArmaServer from '@ioc:Styx/Arma/Server'
import SteamConsole from '@ioc:Styx/Steam/Console'

import Profile from 'App/Models/Profile'

import { promisify } from 'util'

export default class ArmaController {

  private _delay = promisify(setTimeout)

  /**
   * Start Arma 3 server
   * 
   * @param HttpContext
   */
  async start ({ response }: HttpContextContract) {
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
  async stop ({ response }: HttpContextContract) {
    await ArmaServer.stop()

    response.status(204)
  }

  /**
   * Restart Arma 3 server
   * 
   * @param HttpContext
   */
  async restart ({ response }: HttpContextContract) {
    await ArmaServer.stop()

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
  async update ({ request, response }: HttpContextContract) {
    const { username, password, guard } = request.all()

    await SteamConsole.updateArma({ username, password, guard })

    response.status(204)
  }

}
