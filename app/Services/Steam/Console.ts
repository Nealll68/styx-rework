import { SteamAccountInterface, SteamConfigInterface } from 'Contracts/steam'

import Config from '@ioc:Adonis/Core/Config'
import Ws from 'App/Services/Ws'

import NoSteamAccountException from 'App/Exceptions/NoSteamAccountException'
import SteamGuardRequiredException from 'App/Exceptions/SteamGuardRequiredException'

const { SteamCmd } = require('steamcmd-interface')

class SteamConsole {
  private _steamCmd: typeof SteamCmd
  private _steamCachedUsername: string | undefined

  /**
   * Update Arma 3 server
   * 
   * @param steamAccount Steam account if not registered in config
   */
  public async updateArma (steamAccount?: SteamAccountInterface): Promise<void> {
    await this.init(steamAccount)

    const commands = [
      `force_install_dir ${Config.get('arma.basePath')}`,
      'app_update "233780 -beta" validate'
    ]

    const progressRegex = /Update state \((0x\d+)\) (\w+), progress: (\d+.\d+) \((\d+) \/ (\d+)\)$/

    for await (const output of this._steamCmd.run(commands)) {
      console.log(output)
      const result = progressRegex.exec(output)

      if (result !== null) {
        const [
          stateCode,
          state,
          progressPercent,
          progressAmount,
          progressTotalAmount
        ] = result.slice(1)
        
        Ws.io.emit('updateArmaProgress', {
          stateCode,
          state,
          progressPercent: parseFloat(progressPercent),
          progressAmount: parseInt(progressAmount),
          progressTotalAmount: parseInt(progressTotalAmount)
        })
      }
    }
  }

  /**
   * Cancel current SteamCMD process
   */
  public cancel (): void {
    this._steamCmd.cleanup()
  }

  /**
   * Login steam account
   * 
   * ? It will check if an account is registered in config and if not, it will throw
   * ? exception to ask for an account if not present in method parameter
   * 
   * ? If the account need steam guard it will ask for steam guard code too
   * 
   * @param steamAccount Steam account if not registered in config
   */
  private async init (steamAccount?: SteamAccountInterface) {
    const steamConfig: SteamConfigInterface = Config.get('steam')

    const account = {
      username: steamConfig.account.username 
                  ? steamConfig.account.username 
                  : steamAccount?.username,
      password: steamConfig.account.password 
                  ? steamConfig.account.password 
                  : steamAccount?.password
    }
        
    if (!this._steamCmd) {
      console.log('init')
      this._steamCmd = await SteamCmd.init({
        binDir: Config.get('steam.path'),
        username: account.username
      })

      for await (const output of this._steamCmd.run(['logout'], { noAutoLogin: true })) {
        console.log(output)
      }
    }

    console.log('test account')
    if (!account.username) {
      console.log('set to anonymous')
      this._steamCachedUsername = 'anonymous'
    }

    console.log('test login or anonymous')
    if (!await this._steamCmd.isLoggedIn() || this._steamCachedUsername === 'anonymous') {
      console.log('need to connect')
      if (!steamConfig.account.username && !steamAccount?.username) {
        throw new NoSteamAccountException()
      } else if (steamConfig.guard && !steamAccount?.guard) {
        throw new SteamGuardRequiredException()
      }
        
      console.log('login')
      await this._steamCmd.login(account.username, account.password, steamAccount?.guard)
      this._steamCachedUsername = account.username
      console.log('set cached username to', this._steamCachedUsername)
    }

    console.log('finish')

    /*if (this._init && !await this._steamCmd.isLoggedIn()) {
      if (!steamConfig.account.username && !steamAccount?.username) {
        throw new NoSteamAccountException()
      } else if (steamConfig.guard && !steamAccount?.guard) {
        throw new SteamGuardRequiredException()
      }

      await this._steamCmd.login(account.username, account.password, steamAccount?.guard)
    } else {
      if (!steamConfig.account.username && !steamAccount?.username) {
        throw new NoSteamAccountException()
      } else if (steamConfig.guard && !steamAccount?.guard) {
        throw new SteamGuardRequiredException()
      }

      this._steamCmd = await SteamCmd.init({
        binDir: Config.get('steam.path'),
        username: account.username
      })      

      await this._steamCmd.login(account.username, account.password, steamAccount?.guard)
      this._init = true
    }*/
  }

}

export default new SteamConsole()