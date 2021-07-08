/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import ViteAssetLoader from 'App/Services/ViteAssetLoader'
import View from '@ioc:Adonis/Core/View'

View.global('assets', (): string => {
  const assetLoader = new ViteAssetLoader()
  return assetLoader.asset()
})