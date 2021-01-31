import { WsInterface } from '@ioc:Styx/Ws'
import { Server, Socket } from 'socket.io'
import AdonisServer from '@ioc:Adonis/Core/Server'
import corsConfig from 'Config/cors'

class Ws implements WsInterface {
  public isReady = false
  public io: Server

  public start (callback: (socket: Socket) => void): void {
    this.io = new Server(AdonisServer.instance!, {
      cors: {
        origin: '*',
        methods: ["GET", "POST"]
      }
    })

    this.io.on('connection', callback)

    this.isReady = true
  }
}

export default new Ws()