export default interface ViteConfigInterface {
  dev: boolean,
  manifestPath: string,
  devUrl: string,
  mainUrl: string
}

export interface ViteAssetLoaderContract {
  assetDev(): string
  assetProd(): Promise<string>
  flushCache(): Promise<void>
}
