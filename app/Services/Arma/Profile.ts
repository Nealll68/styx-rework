import ArmaProfileInterface from 'contracts/arma/profile'
import Config from '@ioc:Adonis/Core/Config'
import Application from '@ioc:Adonis/Core/Application'

import { constants } from 'fs'
import { 
  copyFile, 
  mkdir,
  access,
  readFile,
  writeFile,
  rm
} from 'fs/promises'
import { join } from 'path'

/**
 * ? Paths infos: 
 * ?  Config: <Arma_folder>/styx/<profileName>/server.cfg
 * ?  Performance: <Arma_folder>/styx/<profileName>/basic.cfg
 * ?  Difficulty: <Arma_folder>/styx/<profileName>/Users/<profileName>/<profileName>.Arma3Profile
 */
class ArmaProfile implements ArmaProfileInterface {
  
  private _profileBasePath = process.platform === 'win32'
    ? join(Config.get('arma.basePath'), 'styx')
    : join('~', '.local', 'share', 'Arma 3 - Other Profiles')

  /**
   * Create profile folder with server config, difficulty and perf files
   * 
   * @param name The profile name (correspond to profile folder name)
   */
  public async create (name: string): Promise<void> {
    const templateFolderPath = Application.makePath('app', 'Services', 'Arma', 'serverFilesTemplates')

    // Check if the profile folder is already created otherwise we create the folder
    await access(join(this._profileBasePath, name, 'Users', name), constants.R_OK | constants.W_OK).catch(async error => {
      if (error.code === 'ENOENT') {
        await mkdir(join(this._profileBasePath, name, 'Users', name), { recursive: true })
      }
    })
    
    // Create all config files related to the profile
    await copyFile(join(templateFolderPath, 'serverConfig.template'), join(this._profileBasePath, name, 'server.cfg'))
    await copyFile(join(templateFolderPath, 'serverBasic.template'), join(this._profileBasePath, name, 'basic.cfg'))
    await copyFile(join(templateFolderPath, 'serverDifficulty.template'), join(this._profileBasePath, name, 'Users', name, `${name}.Arma3Profile`))
  }

  /**
   * Read and return desired file content's
   * 
   * @param name Profile name
   * @param file Filename (server, basic or difficulty)
   */
  public async read (name: string, file: string): Promise<String> {
    if (file === 'server' || file === 'basic') {
      return await readFile(join(this._profileBasePath, name, `${file}.cfg`), 'utf-8')
    } else {
      return await readFile(join(this._profileBasePath, name, 'Users', name, `${name}.Arma3Profile`), 'utf-8')
    }
  }

  /**
   * Update content of the desired file 
   * 
   * @param name Profile name
   * @param file Filename (server, basic or difficulty)
   * @param content Data
   */
  public async update (name: string, file: string, content: string): Promise<void> {
    if (file === 'server' || file === 'basic') {
      await writeFile(join(this._profileBasePath, name, `${file}.cfg`), content, 'utf-8')
    } else {
      await writeFile(join(this._profileBasePath, name, 'Users', name, `${name}.Arma3Profile`), content, 'utf-8')
    }
  }

  /**
   * Delete profile folder 
   * 
   * @param name Profile name
   */
  public async delete (name: string): Promise<void> {
    await rm(join(this._profileBasePath, name), { recursive: true })
  }

}

export default new ArmaProfile()