import { ViteAssetLoaderContract } from 'contracts/vite';
import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import ViteAssetLoader from 'App/Services/ViteAssetLoader'

export default class ViteProvider {
  private assetLoader: ViteAssetLoaderContract

  constructor (protected app: ApplicationContract) {
  }

  public register () {
  }

  public async boot () {
    const Env = this.app.container.resolveBinding('Adonis/Core/Env')
    const View = this.app.container.resolveBinding('Adonis/Core/View')
    const Cache = this.app.container.resolveBinding('Adonis/Addons/Adonis5-Cache')

    this.assetLoader = new ViteAssetLoader(Cache)

    let assets = this.assetLoader.assetDev()
    if (Env.get('NODE_ENV') === 'production') {
      assets = await this.assetLoader.assetProd()
    }
    
    View.global('assets', (): string => assets)
  }

  public async ready () {
  }

  public async shutdown () {
    await this.assetLoader.flushCache()
  }
}
