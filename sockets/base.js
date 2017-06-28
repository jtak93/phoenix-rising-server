module.exports = function (io) {
  io.on('connection', function(socket) {
    console.log('connection to socket id:', socket.conn.id)
    socket.on('test', function(data) {
      console.log('data:', data)
    })
  })
}
