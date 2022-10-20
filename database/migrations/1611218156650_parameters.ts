import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Parameters extends BaseSchema {
  protected tableName = 'parameters'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamps(true)

      table.integer('profile_id').unique().references('id').inTable('profiles')

      table.string('mod')
      table.string('server_mod')
      table.boolean('custom_cfg')
      table.string('startup_parameters').defaultTo('-port=2302')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
