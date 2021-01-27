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
| new ServerExecutableMissingException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class ServerExecutableMissingException extends Exception {
  constructor () {
    super('Arma 3 server executable is not present in the folder path', 500, 'E_NO_ARMA_SERVER_EXECUTABLE')
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
