import { SteamAccountInterface, SteamConfigInterface } from 'Contracts/steam'

import Config from '@ioc:Adonis/Core/Config'
import Ws from 'App/Services/Ws'

import NoSteamAccountException from 'App/Exceptions/NoSteamAccountException'
import SteamGuardRequiredException from 'App/Exceptions/SteamGuardRequiredException'

const { SteamCmd } = require('steamcmd-interface')

class SteamConsole {
  private steamCmd: typeof SteamCmd

  constructor (steamCmd: typeof SteamCmd) {    
    this.steamCmd = steamCmd
  }

  /**
   * Init SteamCMD interface and create instance of the SteamConsole class 
   */
  public static async init () {
    const steamCmd = await SteamCmd.init({
      binDir: Config.get('steam.path'),
      username: Config.get('steam.account.username')
    })

    const steamConsole = new SteamConsole(steamCmd)
    return steamConsole
  }

  /**
   * Update Arma 3 server
   * 
   * @param steamAccount Steam account if not registered in config
   */
  public async updateArma (steamAccount?: SteamAccountInterface): Promise<void> {
    if (!await this.steamCmd.isLoggedIn()) {
      await this.login(steamAccount)
    }

    const commands = [
      `force_install_dir ${Config.get('arma.basePath')}`,
      'app_update "233780 -beta" validate'
    ]

    const progressRegex =
      /Update state \((0x\d+)\) (\w+), progress: (\d+.\d+) \((\d+) \/ (\d+)\)$/

    for await (const output of this.steamCmd.run(commands)) {
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
    this.steamCmd.cleanup()
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
  private async login (steamAccount?: SteamAccountInterface) {
    const steamConfig: SteamConfigInterface = Config.get('steam')
    
    if (!steamConfig.account.username && !steamAccount?.username) {
      throw new NoSteamAccountException()
    } else if (steamConfig.guard && !steamAccount?.guard) {
      throw new SteamGuardRequiredException()
    }

    const account = {
      username: steamConfig.account.username ? steamConfig.account.username : steamAccount?.username,
      password: steamConfig.account.password ? steamConfig.account.password : steamAccount?.password
    }
    
    await this.steamCmd.login(account.username, account.password, steamAccount?.guard)    
  }

}

export default SteamConsole.init()