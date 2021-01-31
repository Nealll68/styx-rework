import { Server, Socket } from 'socket.io'
import AdonisServer from '@ioc:Adonis/Core/Server'
import corsConfig from 'Config/cors'

class Ws {
  public isReady = false
  public io: Server

  public start (callback: (socket: Socket) => void): void {
    this.io = new Server(AdonisServer.instance!, {
      cors: corsConfig
    })

    this.io.on('connection', callback)

    this.isReady = true
  }
}

export default new Ws()