import { spawn, IPty } from 'node-pty'
import { file } from 'tmp-promise'
import { appendFile } from 'fs/promises'

import Config from '@ioc:Adonis/Core/Config'

class SteamInterface {
  private _username: string
  private _steamcmd: IPty

  public async run (commands: string[]) {
    const allCommands = [
      '@ShutdownOnFailedCommand 1',
      '@NoPromptForPassword 1',
      `login "${this._username}"`,
      ...commands,
      'quit'
    ]

    const tmpFile = await file()

    try {
      await appendFile(tmpFile.path, allCommands.join('\n') + '\n')

      this._steamcmd = spawn(Config.get('steam.path'), [`+runscript ${tmpFile.path}`], {})

      this._steamcmd.onData(data => {

      })

      this._steamcmd.onExit(async ({ exitCode }) => {
        await tmpFile.cleanup()
      })
    } finally {
      await tmpFile.cleanup()
    }
  }

  public kill () {
    if (this._steamcmd)
      this._steamcmd.kill()
  }

}

export default new SteamInterface()