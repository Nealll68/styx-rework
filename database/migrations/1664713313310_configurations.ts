import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'configuration'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamps(true)
      table.string('steamcmd_path')
      table.string('a3server_path')
      table.boolean('x64').defaultTo(true)
      table.string('steam_account')
      table.string('steam_password')
      table.boolean('steam_guard').defaultTo(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
