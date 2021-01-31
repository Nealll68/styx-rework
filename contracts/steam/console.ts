import { SteamAccountInterface } from 'contracts/steam/config'
export default interface SteamConsoleInterface {    
  updateArma(steamAccount?: SteamAccountInterface): Promise<void>
}