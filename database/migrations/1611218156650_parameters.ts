import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Parameters extends BaseSchema {
  protected tableName = 'parameters'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamps(true)

      table.integer('profile_id').unique().references('id').inTable('profiles')

      table.integer('port').defaultTo(2302)
      table.string('mod')
      table.string('server_mod')
      table.boolean('custom_cfg')
      table.boolean('auto_init')
      table.boolean('load_mission_to_memory')
      table.boolean('no_logs')
      table.boolean('enable_ht')
      table.boolean('huge_pages')
      table.boolean('file_patching')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
