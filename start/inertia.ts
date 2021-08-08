/*
|--------------------------------------------------------------------------
| Inertia Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import Inertia from '@ioc:EidelLev/Inertia'

Inertia.share({
  auth: (ctx) => {
    return ctx.auth.user
  },

  errors: (ctx) => {
    return ctx.session.flashMessages.get('errors')
  },

  flash: (ctx) => {
    return ctx.session.flashMessages.get('message')
  }
});
