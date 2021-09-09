import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EditValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  public refs = schema.refs({
    id: this.ctx.params.id
  })
	
  public schema = schema.create({
    username: schema.string({}, [
      rules.unique({
        table: 'users',
        column: 'username',
        whereNot: {
          id: this.refs.id
        }
      })
    ]),

    password: schema.string.optional(),

    admin: schema.boolean.optional()
  })
	
  public messages = {
    'username.unique': 'This username is already in use'
  }
}
