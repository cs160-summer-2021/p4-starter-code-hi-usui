import _ from "lodash";

import { socketsPlaylist } from "#src/controllers/_index";

const connections = {};

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
};

const randomColorHex = () => {
  const validCharacters = "ABCDEF0123456789";
  let hexColor = "#";
  for (let i = 0; i < 6; i++) {
    hexColor += validCharacters[getRandomInt(0, 16)];
  }
  return hexColor;
};

const activeConnections = (connections) => {
  return _.pickBy(connections, (v, k) => v.payload.active);
};

export const initSocketServer = (io) => {
  io.on("connection", (socket) => {
    const { device } = socket.handshake.query;
    const id = socket.id;
    console.log(`Client {id '${id}', device: '${device}'} connected!`);

    connections[id] = {
      id,
      socket,
      payload: {
        active: true,
        color: randomColorHex(),
        device,
      },
    };

    for (let anyId in activeConnections(connections)) {
      if (anyId != id) {
        connections[anyId].socket.emit("clientConnect", {
          id,
          payload: connections[id].payload,
        });
      }
    }

    socketsPlaylist(io, socket);

    socket.on("disconnect", () => {
      console.log(`Client '${id}' disconnected!`);
      connections[id].active = false;
      for (let anyId in activeConnections(connections)) {
        connections[anyId].socket.emit("clientDisconnect", id);
      }
    });
  });

  // io.on("connection", async (socket) => {
  // for (let anyId in connections) {
  //   for (let point of connections[anyId].payload.points) {
  //     connections[id].socket.emit("addPoint", { id: anyId, payload: point })
  //   }
  // }
  // socket.on("onMouseMove", async (data) => {
  //   if (connections[data.id]) {
  //     connections[data.id].payload.points.push(data.payload)
  //     for (let anyId in activeConnections(connections)) {
  //       connections[anyId].socket.emit("addPoint", {
  //         id,
  //         payload: data.payload,
  //       })
  //     }
  //   }
  // })
  // socket.on("disconnect", () => {
  //   console.log(`Client '${id}' disconnected!`)
  //   connections[id].active = false
  //   for (let anyId in activeConnections(connections)) {
  //     connections[anyId].socket.emit("clientDisconnect", id)
  //   }
  // })
  // });
};
