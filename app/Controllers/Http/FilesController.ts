import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ArmaProfile from '@ioc:Styx/Arma/Profile'

export default class FilesController {

  async show ({ params, response }: HttpContextContract) {
    const content = await ArmaProfile.read(params.profile, params.file)

    response  
      .status(200)
      .json({
        'content': content
      })
  }

  async update ({ params, request, response }: HttpContextContract) {
    const { content } = request.all()

    await ArmaProfile.update(params.profile, params.file, content)

    response.status(204)
  }

}
