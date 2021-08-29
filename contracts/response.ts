declare module '@ioc:Adonis/Core/Response' {
  interface ResponseContract {
    flash(flashObject: any): this
  }
}