import Ws from 'App/Services/Ws'

Ws.start((socket) => {
  socket.emit('news', { hello: 'world' })

  socket.on('otherevent', (data) => {
    console.log(data)
  })
})