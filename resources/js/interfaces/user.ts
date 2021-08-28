export interface UserInterface {
  id: number,
  username: string,
  adminm: boolean,
  created_at: string,
  updated_at: string,
  remember_me_token?: string
}