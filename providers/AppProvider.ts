import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class AppProvider {
  public static needsApplication = true

  constructor (protected app: ApplicationContract) {
  }

  public register () {
  }

  public async boot () {
    // IoC container is ready
    const Response = this.app.container.use('Adonis/Core/Response')

    Response.macro('flash', function (flashObject) {
      this.ctx!.session.flash(flashObject)
      return this
    })
  }

  public async ready () {
    // App is ready    
    const App = await import('@ioc:Adonis/Core/Application')

    /**
     * Only import socket file, when environment is `web`. In other
     * words do not import during ace commands.
     */
    if (App.default.environment === 'web') {
      await import('../start/socket')
    }
  }

  public async shutdown () {
    // Cleanup, since app is going down
  }
}
