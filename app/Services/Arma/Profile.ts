import Application from '@ioc:Adonis/Core/Application'

import { constants } from 'node:fs'
import {
  copyFile,
  mkdir,
  access,
  readFile,
  writeFile,
  rm,
} from 'node:fs/promises'
import { join } from 'path'

/**
 * ? Paths infos:
 * ?  Config: <Arma_folder>/styx/<profileName>/server.cfg
 * ?  Performance: <Arma_folder>/styx/<profileName>/basic.cfg
 * ?  Difficulty: <Arma_folder>/styx/<profileName>/Users/<profileName>/<profileName>.Arma3Profile
 */
class ArmaProfile {
  /**
   * Create profile folder with server config, difficulty and perf files
   *
   * @param name The profile name (correspond to profile folder name)
   */
  public async create(name: string, armaBasePath: string): Promise<void> {
    const templateFolderPath = Application.makePath(
      'app',
      'Services',
      'Arma',
      'serverFilesTemplates'
    )

    // Check if the profile folder is already created otherwise we create the folder
    await access(
      join(this.profileBasePath(armaBasePath), name, 'Users', name),
      constants.R_OK | constants.W_OK
    ).catch(async (error) => {
      if (error.code === 'ENOENT') {
        await mkdir(
          join(this.profileBasePath(armaBasePath), name, 'Users', name),
          {
            recursive: true,
          }
        )
      }
    })

    // Create all config files related to the profile
    await copyFile(
      join(templateFolderPath, 'serverConfig.template'),
      join(this.profileBasePath(armaBasePath), name, 'server.cfg')
    )
    await copyFile(
      join(templateFolderPath, 'serverBasic.template'),
      join(this.profileBasePath(armaBasePath), name, 'basic.cfg')
    )
    await copyFile(
      join(templateFolderPath, 'serverDifficulty.template'),
      join(
        this.profileBasePath(armaBasePath),
        name,
        'Users',
        name,
        `${name}.Arma3Profile`
      )
    )
  }

  /**
   * Read and return desired file content's
   *
   * @param name Profile name
   * @param file Filename (server, basic or difficulty)
   * @param armaBasePath Base path of arma 3 folder
   */
  public async read(
    name: string | undefined,
    file: string,
    armaBasePath: string | undefined
  ): Promise<String> {
    if (!name || !armaBasePath) {
      return ''
    }

    if (file === 'server' || file === 'basic') {
      return await readFile(
        join(this.profileBasePath(armaBasePath), name, `${file}.cfg`),
        'utf-8'
      )
    } else {
      return await readFile(
        join(
          this.profileBasePath(armaBasePath),
          name,
          'Users',
          name,
          `${name}.Arma3Profile`
        ),
        'utf-8'
      )
    }
  }

  /**
   * Update content of the desired file
   *
   * @param name Profile name
   * @param file Filename (server, basic or difficulty)
   * @param content Data
   */
  public async update(
    name: string,
    file: string,
    content: string,
    armaBasePath: string | undefined
  ): Promise<void> {
    if (!name || !armaBasePath) {
      return
    }

    if (file === 'server' || file === 'basic') {
      await writeFile(
        join(this.profileBasePath(armaBasePath), name, `${file}.cfg`),
        content,
        'utf-8'
      )
    } else {
      await writeFile(
        join(
          this.profileBasePath(armaBasePath),
          name,
          'Users',
          name,
          `${name}.Arma3Profile`
        ),
        content,
        'utf-8'
      )
    }
  }

  /**
   * Delete profile folder
   *
   * @param name Profile name
   */
  public async delete(
    name: string,
    armaBasePath: string | undefined
  ): Promise<void> {
    if (!armaBasePath) {
      return
    }

    await rm(join(this.profileBasePath(armaBasePath), name), {
      recursive: true,
    })
  }

  private profileBasePath(armaBasePath: string): string {
    return process.platform === 'win32'
      ? join(armaBasePath, 'styx')
      : join('~', '.local', 'share', 'Arma 3 - Other Profiles')
  }
}

export default new ArmaProfile()
