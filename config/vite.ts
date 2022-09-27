import ViteConfigInterface from 'Contracts/vite'

import Env from '@ioc:Adonis/Core/Env'
import Application from '@ioc:Adonis/Core/Application'

const ArmaConfig: ViteConfigInterface = {
  /*
  |--------------------------------------------------------------------------
  | Dev environnment
  |--------------------------------------------------------------------------
  | 
  | Says to vite if we are in dev environnement or not
  |
  */
  dev: Env.get('NODE_ENV') === 'development',

  /*
  |--------------------------------------------------------------------------
  | manifest path
  |--------------------------------------------------------------------------
  | 
  | Default location of the manifest path
  |
  */
  manifestPath: Application.publicPath('assets', 'manifest.json'),

  /*
  |--------------------------------------------------------------------------
  | Dev URL
  |--------------------------------------------------------------------------
  | 
  | URL to use for vite when developping
  |
  */
  devUrl: 'http://localhost:5173/assets',

  /*
  |--------------------------------------------------------------------------
  | Main URL
  |--------------------------------------------------------------------------
  | 
  | URL to the main js file
  |
  */
  mainUrl: 'js/app.ts',
}

export default ArmaConfig
