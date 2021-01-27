import { SteamConsoleInterface } from '@ioc:Styx/Steam/Console'
import { SteamAccountInterface, SteamConfigInterface } from 'contracts/steam/config'

import Config from '@ioc:Adonis/Core/Config'

import NoSteamAccountException from 'App/Exceptions/NoSteamAccountException'
import SteamGuardRequiredException from 'App/Exceptions/SteamGuardRequiredException'

const { SteamCmd } = require('steamcmd-interface')

export default class SteamConsole implements SteamConsoleInterface {

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