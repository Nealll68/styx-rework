import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Configuration from 'App/Models/Configuration'

export default class extends BaseSeeder {
  public async run() {
    await Configuration.create({})
  }
}
