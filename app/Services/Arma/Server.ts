import { ChildProcess, spawn } from 'child_process'
import { join } from 'path'

import { constants } from 'fs'
import { access } from 'fs/promises'

import Config from '@ioc:Adonis/Core/Config'

import Parameter from 'App/Models/Parameter'

import ServerExecutableMissingException from 'App/Exceptions/ServerExecutableMissingException'

class ArmaServer {
  private _server: ChildProcess
  private _profileBasePath =
    process.platform === 'win32'
      ? join(Config.get('arma.basePath'), 'styx')
      : join('~', '.local', 'share', 'Arma 3 - Other Profiles')

  /**
   * Method to start Arma 3 server with verification and appropriates startup
   * parameters
   *
   * @param name Profile name
   * @param parameters Server startup parameter taken from database
   */
  public async start(
    name: string,
    parameters: Parameter | null
  ): Promise<void> {
    if (!(await this.checkServerExecutable())) {
      throw new ServerExecutableMissingException()
    }

    this._server = spawn(
      join(Config.get('arma.basePath'), this.getExecutableName()),
      this.startupParameters(name, parameters)
    )

    this._server.on('close', (code) => {
      console.log(`arma server stopped with code: ${code}`)
    })
  }

  /**
   * Method to stop Arma 3 server. It will just kill the child process
   */
  public stop(): void {
    this._server.kill()
  }

  /**
   * This method return appropriate Arma 3 server executable depending on the OS
   * and architecture
   */
  private getExecutableName(): string {
    const executables: object = {
      win32: {
        arma3server: 'arma3server.exe',
        arma3server_x64: 'arma3server_x64.exe',
      },
      linux: {
        arma3server: 'arma3server',
        arma3server_x64: 'arma3server',
      },
    }

    return executables[process.platform][
      Config.get('arma.x64') ? 'arma3server_x64' : 'arma3server'
    ]
  }

  /**
   * Return true if Arma 3 server executable is present in the folder given
   * in the config file by the user, otherwise return false
   */
  private async checkServerExecutable(): Promise<boolean> {
    try {
      await access(
        join(Config.get('arma.basePath'), this.getExecutableName()),
        constants.F_OK
      )
      return true
    } catch (e) {
      return false
    }
  }

  /**
   * Return array with all startup parameters configured
   *
   * @param name Profile name
   * @param parameters Server startup parameter
   */
  private startupParameters(name: string, parameters: Parameter): string[] {
    let startupParameters = [
      `-port=${parameters.port}`,
      `-name=${name}`,
      `-config=${join(this._profileBasePath, name, 'server.cfg')}`,
    ]

    if (process.platform === 'win32') {
      startupParameters = [
        ...startupParameters,
        `-profiles="${join(this._profileBasePath, name)}"`,
      ]
    }

    if (parameters.mod) {
      startupParameters = [...startupParameters, `-mod="${parameters.mod}"`]
    } else if (parameters.serverMod) {
      startupParameters = [
        ...startupParameters,
        `-serverMod="${parameters.serverMod}"`,
      ]
    } else if (parameters.customCfg) {
      startupParameters = [
        ...startupParameters,
        `-cfg="${join(this._profileBasePath, name, 'basic.cfg')}`,
      ]
    } else if (parameters.autoInit) {
      startupParameters = [...startupParameters, '-autoInit']
    } else if (parameters.loadMissionToMemory) {
      startupParameters = [...startupParameters, '-loadMissionToMemory']
    } else if (parameters.noLogs) {
      startupParameters = [...startupParameters, '-noLogs']
    } else if (parameters.enableHt) {
      startupParameters = [...startupParameters, '-enableHT']
    } else if (parameters.hugePages) {
      startupParameters = [...startupParameters, '-hugepages']
    } else if (parameters.filePatching) {
      startupParameters = [...startupParameters, '-filePatching']
    }

    return startupParameters
  }
}

export default new ArmaServer()
