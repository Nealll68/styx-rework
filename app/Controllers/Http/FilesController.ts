import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Configuration from 'App/Models/Configuration'
import ArmaProfile from 'App/Services/Arma/Profile'

export default class FilesController {
  public async show({ params, response }: HttpContextContract) {
    const configuration = await Configuration.first()
    const content = await ArmaProfile.read(
      params.profile,
      params.file,
      configuration?.a3server_path
    )

    response.status(200).json({
      content: content,
    })
  }

  public async update({ params, request, response }: HttpContextContract) {
    const { content } = request.all()

    await ArmaProfile.update(params.profile, params.file, content)

    response.status(204)
  }
}
