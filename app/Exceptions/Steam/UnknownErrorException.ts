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
| new UnknownErrorException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class UnknownErrorException extends Exception {
  constructor () {
    super('An unknown error occurred', 500, 'E_STEAM_UNKNOWN_ERROR')
  }

  public async handle (error: this, { response }: HttpContextContract) {
    response
      .status(error.status)
      .json({
        code: error.code,
        message: error.message
      })
  }
}
