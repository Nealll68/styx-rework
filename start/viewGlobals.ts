/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import Application from '@ioc:Adonis/Core/Application'
import View from '@ioc:Adonis/Core/View'
import Env from '@ioc:Adonis/Core/Env'
import { readFileSync } from 'fs'


View.global('assets', (): string => {  
  const url = 'js/main.ts'

  if (Env.get('NODE_ENV') === 'development') {
    const baseViteUrl: string = 'http://localhost:3000/assets'
  
    return `
      <script src="${baseViteUrl}/@vite/client" type="module" defer></script>
      <script src="${baseViteUrl}/${url}" type="module" defer></script>
    `
  } else { // PRODUCTION
    const fileContent = readFileSync(Application.publicPath('assets', 'manifest.json'), 'utf-8')
    const manifest = JSON.parse(fileContent)

    const js = manifest[url]['file']
    const cssFiles = manifest[url]['css']

    if (!js) {
      return ''
    }

    let html = `<script src="/assets/${js}" type="module" defer></script>`

    for (const css of cssFiles) {
      html += `<link rel="stylesheet" href="/assets/${css}">`
    }

    return html
  }
})