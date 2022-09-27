import { Exception } from '@poppinss/utils'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new FailedToInstallException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class FailedToInstallException extends Exception {
  constructor () {
    super(
      'The application failed to install for some reason. Reasons include: you do not own the application, you do not have enough hard drive space, a network error occurred, or the application is not available for your selected platform.',
      500,
      'E_STEAM_FAILED_TO_INSTALL'
    )
  }

  public async handle (error: this, { response }: HttpContextContract) {
    response
      .status(error.status)
      .json({
        code: error.code,
        message: error.message,
      })
  }
}
