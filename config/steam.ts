import { SteamConfigInterface } from 'contracts/steam/config'

const steamConfig: SteamConfigInterface = {

  /**
   * Steam CMD base path
   * ? Path to the folder where reside steamcmd executable
   * ! On Windows environment, please use double backslash ('\') 
   */
  path: 'C:\\Users\\Bindw\\Desktop\\test_steamcmd\\SteamCMD',

  /**
   * Steam account
   * ? A steam account is necessary if you want to update your game and use workshop functionalities
   * ! If the Steam account use Steam Guard please update variable "guard" to true 
   */
  account: {
    username: '',
    password: ''
  },

  /**
   * Steam guard
   * ? Set this variable to true if the registered account use Steam Guard
   */
  guard: false

}

export default steamConfig