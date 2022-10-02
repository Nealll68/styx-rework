import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Configuration extends BaseModel {
  public static table = 'configuration'

  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public a3server_path: string

  @column({
    serialize: (value: number) => Boolean(value),
  })
  public x64: boolean

  @column()
  public steamcmd_path: string

  @column()
  public steam_account: string

  @column({ serializeAs: null })
  public steam_password: string

  @column()
  public steam_guard: boolean
}
