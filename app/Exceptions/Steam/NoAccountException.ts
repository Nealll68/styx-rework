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
| new NoSteamAccountException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class NoAccountException extends Exception {
  constructor () {
    super('No steam account registered', 422, 'E_NO_STEAM_ACCOUNT')
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
