import { WsInterface } from '@ioc:Styx/Ws'
import { Server, Socket } from 'socket.io'
import AdonisServer from '@ioc:Adonis/Core/Server'

class Ws implements WsInterface {
  public isReady = false
  public io: Server

  public start (callback: (socket: Socket) => void): void {
    this.io = new Server(AdonisServer.instance!)

    this.io.on('connection', callback)

    this.isReady = true
  }
}

export default new Ws()