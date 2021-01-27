
declare module '@ioc:Styx/Arma/Server' {
  import Parameter from 'App/Models/Parameter'

  export interface ArmaServerInterface {
    start(name: string, parameters: Parameter): Promise<void>
    stop(): void
  }

  const ArmaServer: ArmaServerInterface
  export default ArmaServer
}