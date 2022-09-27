import ArmaConfigInterface from 'Contracts/arma'

const ArmaConfig: ArmaConfigInterface = {
  /**
   * Arma 3 Server base path
   * ? Path to the folder where the arma3server executable reside
   * ! On Windows environment, please use double backslash ('\') 
   */
  basePath: 'C:\\Users\\Bindw\\Desktop\\test_steamcmd\\Arma 3',

  /**
   * Use x64 executable
   * ? x64 executable is actually not supported by Arma 3 on Linux system
   */
  x64: true,
}

export default ArmaConfig
