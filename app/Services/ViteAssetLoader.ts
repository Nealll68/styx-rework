import viteConfig from 'Config/vite'
import { readFileSync } from 'fs'

interface ManifestInterface {
  file: string,
  src: string,
  isEntry: boolean,
  css: string[]
}

/**
 * TODO: Use caching system
 */

export default class ViteAssetLoader {

  readonly dev: boolean = viteConfig.dev

  readonly manifestPath: string = viteConfig.manifestPath

  readonly devUrl: string = viteConfig.devUrl

  readonly mainUrl: string = viteConfig.mainUrl

  private manifest: ManifestInterface

  public asset () {
    if (this.dev) {
      return this.assetDev()
    }

    return this.assetProd()
  }

  private assetDev () {
    return `
      <script src="${this.devUrl}/@vite/client" type="module" defer></script>
      <script src="${this.devUrl}/${this.mainUrl}" type="module" defer></script>
    `
  }

  private assetProd () {
    if (!this.manifest) {
      const fileContent = readFileSync(this.manifestPath, 'utf-8')
      this.manifest = JSON.parse(fileContent)['js/app.js']
    }

    const js = this.manifest.file
    const cssFiles = this.manifest.css

    if (!js) {
      return ''
    }

    let html = `<script src="/assets/${js}" type="module" defer></script>`

    for (const css of cssFiles) html += `<link rel="stylesheet" href="/assets/${css}">`

    return html
  }

}