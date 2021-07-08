import ViteConfigInterface from 'Contracts/vite'

import Env from '@ioc:Adonis/Core/Env'
import Application from '@ioc:Adonis/Core/Application'

const ArmaConfig: ViteConfigInterface = {
  dev: Env.get('NODE_ENV') === 'development',

  manifestPath: Application.publicPath('assets', 'manifest.json'),  

  devUrl: 'http://localhost:3000/assets',

  mainUrl: 'js/app.js'
}

export default ArmaConfig
