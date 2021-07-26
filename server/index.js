import express from "express"
import { createServer } from "http"
import _ from "lodash"
import { Server } from "socket.io"

import { playlists, users } from "#src/routes/_index"
import "#src/services/mongodb"
import "#src/services/passport"
import "#src/services/redis"

import { PORT_EXPRESS } from "./config.js"

const app = express()
const server = createServer(app)
const io = new Server(server)

const connections = {}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) // The maximum is exclusive and the minimum is inclusive
}

const randomColorHex = () => {
  const validCharacters = "ABCDEF0123456789"
  let hexColor = "#"
  for (let i = 0; i < 6; i++) {
    hexColor += validCharacters[getRandomInt(0, 16)]
  }
  return hexColor
}

const activeConnections = (connections) => {
  return _.pickBy(connections, (v, k) => v.payload.active)
}

io.on("connection", async (socket) => {
  const id = socket.id
  console.log(`Client id '${id}' connected!`)

  connections[id] = {
    id,
    socket,
    payload: {
      active: true,
      pathProperties: { strokeColor: randomColorHex() },
      points: [],
    },
  }
  for (let anyId in activeConnections(connections)) {
    connections[anyId].socket.emit("connectClient", {
      id,
      payload: connections[id].payload,
    })
    connections[id].socket.emit("connectClient", {
      id: anyId,
      payload: connections[anyId].payload,
    })
  }
  for (let anyId in connections) {
    for (let point of connections[anyId].payload.points) {
      connections[id].socket.emit("addPoint", { id: anyId, payload: point })
    }
  }

  socket.on("onMouseMove", async (data) => {
    if (connections[data.id]) {
      connections[data.id].payload.points.push(data.payload)
      for (let anyId in activeConnections(connections)) {
        connections[anyId].socket.emit("addPoint", {
          id,
          payload: data.payload,
        })
      }
    }
  })

  socket.on("disconnect", () => {
    console.log(`Client '${id}' disconnected!`)
    connections[id].active = false
    for (let anyId in activeConnections(connections)) {
      connections[anyId].socket.emit("disconnectClient", id)
    }
  })
})
app.use((req, res, next) => {
  req.io = io
  next()
})
app.use(express.urlencoded({ extended: true }))
const apiRouter = express.Router()
app.use("/api", apiRouter)
apiRouter.use("/users", users)
apiRouter.use("/playlists", playlists)
server.listen(PORT_EXPRESS)
console.log(`Server now listening on port ${PORT_EXPRESS}`)

process.on("SIGINT", () => process.exit(0))
process.on("SIGTERM", () => process.exit(0))
