declare module '@ioc:Styx/Steam/Console' {
  import { SteamAccountInterface } from 'contracts/steam/config'

  export interface SteamConsoleInterface {    
    updateArma(steamAccount?: SteamAccountInterface): Promise<void>
  }

  const SteamConsole: SteamConsoleInterface
  export default SteamConsole
}