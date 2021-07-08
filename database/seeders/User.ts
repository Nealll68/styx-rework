import User from 'App/Models/User';
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class UserSeeder extends BaseSeeder {
  public async run () {
    await User.create({
      username: 'admin',
      password: 'admin'
    })
  }
}
