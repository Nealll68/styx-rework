import { access } from 'node:fs/promises'
import Configuration from 'App/Models/Configuration'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { join } from 'node:path'
import SteamExecutableMissingException from 'App/Exceptions/SteamExecutableMissingException'

export default class ConfigurationsController {
  public async index({ inertia }: HttpContextContract) {
    return inertia.render('ConfigPage', {
      configuration: await Configuration.first(),
    })
  }

  public async update({ request, response }: HttpContextContract) {
    const data = request.all()

    if (data.steamcmd_path) {
      try {
        await access(
          join(
            data.steamcmd_path,
            process.platform === 'win32' ? 'steamcmd.exe' : 'steamcmd.sh'
          )
        )
      } catch (ex) {
        console.log(ex)

        throw new SteamExecutableMissingException(
          'The given path do not contain any steamCMD executable',
          400
        )
      }
    }

    const currentConfig = await Configuration.first()
    currentConfig?.merge(data)
    await currentConfig?.save()

    response
      .flash({
        success: 'The configuration has correctly been updated',
      })
      .redirect()
      .back()
  }
}
