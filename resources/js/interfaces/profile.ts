export interface ParameterInterface {
  id: number
  created_at: string
  updated_at: string
  profile_id: number
  mod: string
  server_mod: string
  custom_cfg: boolean
  startup_parameters: string
}

export interface ProfileInterface {
  id: number
  created_at: string
  updated_at: string
  name: string
  is_default: boolean
  parameter: ParameterInterface
}
