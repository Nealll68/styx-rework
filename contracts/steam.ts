export interface SteamAccountInterface {
  username?: string,
  password?: string,
  guard?: string
}

export interface SteamConfigInterface {
 path: string,
 account: SteamAccountInterface,
 guard: boolean
}