import { ViteAssetLoaderContract } from 'contracts/vite';
import { CacheManagerContract } from '@ioc:Adonis/Addons/Adonis5-Cache'
import { readFile } from 'fs/promises'

import viteConfig from 'Config/vite'
interface ManifestInterface {
  file: string,
  src: string,
  isEntry: boolean,
  css: string[]
}

export default class ViteAssetLoader implements ViteAssetLoaderContract {

  private readonly manifestPath: string = viteConfig.manifestPath

  private readonly devUrl: string = viteConfig.devUrl

  private readonly mainUrl: string = viteConfig.mainUrl

  constructor (private readonly cache: CacheManagerContract) {}

  public assetDev (): string {
    return `
      <script src="${this.devUrl}/@vite/client" type="module" defer></script>
      <script src="${this.devUrl}/${this.mainUrl}" type="module" defer></script>
    `
  }

  public async assetProd (): Promise<string> {
    let manifest = await this.cache.get<ManifestInterface>('vite-manifest')
    if (!manifest) {
      const fileContent = await readFile(this.manifestPath, 'utf-8')
      manifest = JSON.parse(fileContent)['js/app.js']

      await this.cache.put('vite-manifest', manifest)
    }

    if (!manifest?.file) return ''

    let html = `<script src="/assets/${manifest.file}" type="module" defer></script>`

    if (manifest?.css) {
      for (const css of manifest.css) html += `<link rel="stylesheet" href="/assets/${css}">`
    }

    return html
  }

  public async flushCache (): Promise<void> {
    await this.cache.put('vite-manifest', null)
  }

}