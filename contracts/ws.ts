import { Server, Socket } from 'socket.io'
export default interface WsInterface {    
  isReady: boolean
  io: Server

  start(callback: (socket: Socket) => void): void
}