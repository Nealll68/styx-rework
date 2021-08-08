export interface AuthInterface {
  id: number,
  username: string,
  created_at: string,
  updated_at: string,
  remember_me_token?: string
}