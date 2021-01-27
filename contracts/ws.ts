declare module '@ioc:Styx/Ws' {
  import { Server, Socket } from 'socket.io'

  export interface WsInterface {    
    isReady: boolean
    io: Server

    start(callback: (socket: Socket) => void): void
  }

  const Ws: WsInterface
  export default Ws
}