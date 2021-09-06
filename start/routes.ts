/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
// import SteamConsole from 'App/Services/Steam/Console'

Route.get('login', 'AuthController.index')
Route.post('login', 'AuthController.login')

Route.group(() => {
  Route.get('logout', 'AuthController.logout')

  Route.inertia('/', 'Dashboard', {})
  
  Route.resource('users', 'UsersController').only([
    'index',
    'store',
    'update',
    'destroy'
  ])
}).middleware('auth')

// Route.group(() => {

//   Route.post('register', 'AuthController.register')
//   Route.post('login', 'AuthController.login')
  
//   Route.get('/steam/cancel', async () => {
//     SteamConsole.cancel()
//   })
  
//   Route
//     .resource('/profile', 'ProfilesController')
//     .apiOnly()
  
//   Route.patch('/parameter/:id', 'ParametersController.update')
  
//   Route.group(() => {
//     Route.get('/start', 'ArmaController.start')
//     Route.get('/stop', 'ArmaController.stop')
//     Route.get('/restart', 'ArmaController.restart')
//     Route.patch('/update', 'ArmaController.update')
//   }).prefix('/server')
  
//   Route.group(() => {
//     Route.get('/:profile/:file', 'FilesController.show')
//     Route.put('/:profile/:file', 'FilesController.update')
//   }).prefix('/file')
  
// }).prefix('/api')