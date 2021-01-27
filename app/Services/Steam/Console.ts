import { SteamConsoleInterface } from '@ioc:Styx/Steam/Console'
import { SteamAccountInterface, SteamConfigInterface } from 'contracts/steam/config'

import Config from '@ioc:Adonis/Core/Config'

import NoSteamAccountException from 'App/Exceptions/NoSteamAccountException'
import SteamGuardRequiredException from 'App/Exceptions/SteamGuardRequiredException'

const { SteamCmd } = require('steamcmd-interface')

export default class SteamConsole implements SteamConsoleInterface {

  /**
   * Update Arma 3 server
   * @param steamAccount Steam account if not registered in config
   */
  public async updateArma (steamAccount?: SteamAccountInterface): Promise<void> {
    const steamCmd = await this.init(steamAccount)

    const commands = [
      `force_install_dir ${Config.get('arma.basePath')}`,
      'app_update "233780 -beta" validate'
    ]

    for await (const output of steamCmd.run(commands)) {
      console.log(output)
    }
  }

  /**
   * This method init the SteamCmd interface and login steam account
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
    
    if (!steamConfig.account.username && !steamAccount?.username) {
      throw new NoSteamAccountException()
    } else if (steamConfig.guard && !steamAccount?.guard) {
      throw new SteamGuardRequiredException()
    }

    const account = {
      username: steamConfig.account.username ? steamConfig.account.username : steamAccount?.username,
      password: steamConfig.account.password ? steamConfig.account.password : steamAccount?.password
    }

    const steamCmd = await SteamCmd.init({
      binDir: Config.get('steam.path'),
      username: account.username
    })
    
    if (!await steamCmd.isLoggedIn()) {
      await steamCmd.login(account.username, account.password, steamAccount?.guard)   
    }

    return steamCmd
  }
}