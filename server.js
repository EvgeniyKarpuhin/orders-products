import { Server } from 'socket.io'
import http from 'http'

const server = http.createServer()
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
})

let activeSessions = 0

io.on('connection', socket => {
  activeSessions++
  io.emit('activeSessions', activeSessions)

  socket.on('disconnect', () => {
    activeSessions--
    io.emit('activeSessions', activeSessions)
  })
})

server.listen(3000, () => console.log('✅ Socket.IO server running on port 3000'))