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
| new InvalidPasswordException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class InvalidPasswordException extends Exception {
  constructor () {
    super('Invalid Steam password', 422, 'E_STEAM_INVALID_PASSWORD')
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
