import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Parameter from 'App/Models/Parameter'

export default class Profile extends BaseModel {
  @hasOne(() => Parameter)
  public parameter: HasOne<typeof Parameter>

  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public name: string

  @column()
  public isDefault: boolean
}
