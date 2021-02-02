import Ws from 'App/Services/Ws'
import SteamConsole from 'App/Services/Steam/Console'

Ws.start((socket) => {
  socket.on('updateArma', async (steamAccount: object) => {
    SteamConsole.updateArma(steamAccount)
      .then(() => {
        socket.emit('updateArmaFinished')
      })
      .catch(({ status, code , message }) => {
        socket.emit('updateArmaError', {
          status,
          code,
          message
        })  
      })
  })

  socket.on('cancel', () => {
    SteamConsole.cancel()
  })
})