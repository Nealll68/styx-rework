import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Exception } from '@adonisjs/core/build/standalone'

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new SteamExecutableMissingException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class SteamExecutableMissingException extends Exception {
  public async handle(error: this, { response }: HttpContextContract) {
    response
      .flash({
        errors: {
          message: error.message,
        },
      })
      .redirect()
      .back()
  }
}
