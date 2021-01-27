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
| new SteamGuardRequiredException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class SteamGuardRequiredException extends Exception {
  constructor () {
    super('Steam Guard code is required', 422, 'E_STEAM_GUARD_REQUIRED')
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
