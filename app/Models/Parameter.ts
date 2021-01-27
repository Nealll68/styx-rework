import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Parameter extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public profileId: number

  @column()
  public port: number

  @column()
  public mod: string

  @column()
  public serverMod: string

  @column()
  public customCfg: boolean

  @column()
  public autoInit: boolean

  @column()
  public loadMissionToMemory: boolean

  @column()
  public noLogs: boolean

  @column()
  public enableHt: boolean

  @column()
  public hugePages: boolean

  @column()
  public filePatching: boolean
}
