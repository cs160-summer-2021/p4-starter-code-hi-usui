import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"

import { PORT_EXPRESS } from "./config.js"

const app = express()
const server = createServer(app)
const io = new Server(server)

const connections = {}

io.on("connection", async (socket) => {
  const id = socket.id
  console.log(`Client id '${id}' connected!`)
  if (!connections[id]) {
    connections[id] = id
  }
  socket.on("mouseMove", async (data) => {
    console.log(data)
  })

  socket.on("disconnect", (reason) => {
    delete connections[id]
  })
})
app.use((req, res, next) => {
  req.io = io
  next()
})
app.use(express.urlencoded({ extended: true }))

server.listen(PORT_EXPRESS)
console.log(`Server now listening on port ${PORT_EXPRESS}`)
