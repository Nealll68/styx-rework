
import Parameter from 'App/Models/Parameter'

export default interface ArmaServerInterface {
  start(name: string, parameters: Parameter): Promise<void>
  stop(): void
}