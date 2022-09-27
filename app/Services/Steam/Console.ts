import { SteamAccountInterface, SteamConfigInterface } from 'Contracts/steam'

import Config from '@ioc:Adonis/Core/Config'
import Ws from 'App/Services/Ws'

const { SteamCmd } = require('steamcmd-interface')

import NoSteamAccountException from 'App/Exceptions/Steam/NoAccountException'
import SteamUnknownErrorException from 'App/Exceptions/Steam/UnknownErrorException'
import SteamAlreadyLoggedInException from 'App/Exceptions/Steam/AlreadyLoggedInException'
import SteamInvalidPasswordException from 'App/Exceptions/Steam/InvalidPasswordException'
import SteamFailedToInstallException from 'App/Exceptions/Steam/FailedToInstallException'
import SteamGuardRequiredException from 'App/Exceptions/Steam/GuardRequiredException'

class SteamConsole {
  private readonly outputRegex =
    /Update state \((0x\d+)\) (\w+), progress: (\d+.\d+) \((\d+) \/ (\d+)\)$/
  private _steamCmd: typeof SteamCmd

  /**
   * Init Steamcmd-interface instance
   */
  private async init() {
    this._steamCmd = await SteamCmd.init({
      binDir: Config.get('steam.path'),
    })
  }

  /**
   * Update Arma 3 server
   *
   * @param steamAccount Steam account if not registered in config
   */
  public async updateArma(steamAccount?: SteamAccountInterface): Promise<void> {
    if (!this._steamCmd) {
      await this.init()
    }

    const steamConfig: SteamConfigInterface = Config.get('steam')

    const account = {
      username: steamConfig.account.username
        ? steamConfig.account.username
        : steamAccount?.username,
      password: steamConfig.account.password
        ? steamConfig.account.password
        : steamAccount?.password,
      guard: steamAccount?.guard,
    }

    if (!account.username || !account.password) {
      throw new NoSteamAccountException()
    }
    if (!account.guard && steamConfig.guard) {
      throw new SteamGuardRequiredException()
    }

    const commands = [
      account.guard
        ? `login ${account.username} ${account.password} ${account.guard}`
        : `login ${account.username} ${account.password}`,
      `force_install_dir ${Config.get('arma.basePath')}`,
      'app_update "233780 -beta" validate',
    ]

    try {
      for await (const line of this._steamCmd.run(commands, {
        noAutoLogin: true,
      })) {
        const output = this.outputRegex.exec(line)

        if (output === null) {
          continue
        }

        Ws.io.emit('updateArmaProgress', {
          stateCode: output[1],
          state: output[2],
          progressPercent: parseFloat(output[3]),
          progressAmount: parseInt(output[4]),
          progressTotalAmount: parseInt(output[5]),
        })
      }
    } catch (ex) {
      if ((ex.exitCode >= 1 && ex.exitCode <= 8) || ex.exitCode === 63) {
        this.handleError(ex.exitCode)
      } else {
        throw ex
      }
    }
  }

  /**
   * Cancel current SteamCMD process
   */
  public cancel(): void {
    if (this._steamCmd) {
      this._steamCmd.cleanup()
    }
  }

  private handleError(exitCode: number): void {
    switch (exitCode) {
      case 1:
        throw new SteamUnknownErrorException()
      case 2:
        throw new SteamAlreadyLoggedInException()
      case 5:
        throw new SteamInvalidPasswordException()
      case 8:
        throw new SteamFailedToInstallException()
      case 63:
        throw new SteamGuardRequiredException()
    }
  }
}

export default new SteamConsole()
