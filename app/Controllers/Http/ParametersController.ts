import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Parameter from 'App/Models/Parameter'
import ParameterValidator from 'App/Validators/ParameterValidator'

export default class ParametersController {
  /**
   * Update parameters 
   * @param HttpContext 
   */
  public async update ({ params, request, response }: HttpContextContract) {
    const payload = await request.validate(ParameterValidator)

    const parameters = await Parameter.findOrFail(params.id)

    parameters.merge(payload)
    await parameters.save()

    response
      .status(201)
      .json(parameters)
  }
}
