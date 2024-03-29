import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ParamaterValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  /*
	 * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
	 *
	 * For example:
	 * 1. The username must be of data type string. But then also, it should
	 *    not contain special characters or numbers.
	 *    ```
	 *     schema.string({}, [ rules.alpha() ])
	 *    ```
	 *
	 * 2. The email must be of data type string, formatted as a valid
	 *    email. But also, not used by any other user.
	 *    ```
	 *     schema.string({}, [
	 *       rules.email(),
	 *       rules.unique({ table: 'users', column: 'email' }),
	 *     ])
	 *    ```
	 */
  public schema = schema.create({
    profileId: schema.number.optional([
      rules.unique({
        table: 'parameters',
        column: 'profile_id',
      }),
    ]),

    port: schema.number.optional(),

    mod: schema.string.optional(),
    serverMod: schema.string.optional(),

    customCfg: schema.boolean.optional(),
    autoInit: schema.boolean.optional(),
    loadMissionToMemory: schema.boolean.optional(),
    noLogs: schema.boolean.optional(),
    enableHt: schema.boolean.optional(),
    hugePages: schema.boolean.optional(),
    filePatching: schema.boolean.optional(),
  })

  /**
	 * Custom messages for validation failures. You can make use of dot notation `(.)`
	 * for targeting nested fields and array expressions `(*)` for targeting all
	 * children of an array. For example:
	 *
	 * {
	 *   'profile.username.required': 'Username is required',
	 *   'scores.*.number': 'Define scores as valid numbers'
	 * }
	 *
	 */
  public messages = {}
}
