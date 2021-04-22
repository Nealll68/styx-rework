import Env from '@ioc:Adonis/Core/Env'
import { readFileSync } from 'fs'

interface ManifestInterface {
  file: string,
  src: string,
  isEntry: boolean,
  css: string[]
}

export default class ViteAssetLoader {

  readonly dev: boolean

  readonly manifestPath: string

  readonly devViteUrl: string = 'http://localhost:3000/assets'

  readonly mainUrl: string = 'js/main.ts'

  private manifest: ManifestInterface

  constructor (manifestPath: string) {
    this.dev = Env.get('NODE_ENV') === 'development'
    this.manifestPath = manifestPath
  }

  public asset () {
    if (this.dev) {
      return this.assetDev()
    }

    return this.assetProd()
  }

  private assetDev () {
    return `
      <script src="${this.devViteUrl}/@vite/client" type="module" defer></script>
      <script src="${this.devViteUrl}/${this.mainUrl}" type="module" defer></script>
    `
  }

  private assetProd () {
    if (!this.manifest) {
      const fileContent = readFileSync(this.manifestPath, 'utf-8')
      this.manifest = JSON.parse(fileContent)['js/main.ts']
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