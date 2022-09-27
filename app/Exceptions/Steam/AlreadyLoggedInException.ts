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
| new AlreadyLoggedInException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class AlreadyLoggedInException extends Exception {
  constructor () {
    super('A user was already logged into SteamCMD', 500, 'E_STEAM_ALREADY_LOGGED_IN')
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
