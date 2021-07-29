import jwt_decode from "jwt-decode";
import _ from "lodash";

import { socketsPlaylist } from "#src/controllers/_index";
import { Playlist, User } from "#src/models/_index";

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

// const activeConnections = (connections) => {
//   return _.pickBy(connections, (v, k) => v.payload.active);
// };

export const initSocketServer = (io) => {
  io.on("connection", (socket) => {
    const { device, jwt } = socket.handshake.query;
    console.log(jwt);
    // const payload = jwt_decode(jwt);
    // const userId = payload.id;
    const socketId = socket.id;
    console.log(
      `Client {socketId '${socketId}', device: '${device}'} connected!`
    );
    User.findById(socketId);

    connections[socketId] = {
      socketId,
      socket,
      payload: {
        color: randomColorHex(),
        device,
      },
    };

    // for (let anyId in connections) {
    //   if (anyId != socketId) {
    //     connections[anyId].socket.emit("client:add", {
    //       socketId,
    //       payload: connections[socketId].payload,
    //     });
    //   }
    // }

    socketsPlaylist(socket);

    socket.on("disconnect", () => {
      console.log(`Client '${socketId}' disconnected!`);
      delete connections[socketId];
      Playlist.find({});
      Playlist.update(
        {},
        {
          $pull: {
            users: { _id: socketId }, // ! FIXME: USE userId instead of socketId
          },
        },
        function removeConnectionsCB(err, obj) {
          console.log(`Removed connection '${socket.id}' from all playlists!`);
        }
      );

      for (let anyId in connections) {
        connections[anyId].socket.emit("clientDisconnect", socketId);
      }
    });
  });

  // io.on("connection", async (socket) => {
  // for (let anyId in connections) {
  //   for (let point of connections[anyId].payload.points) {
  //     connections[socketId].socket.emit("addPoint", { socketId: anyId, payload: point })
  //   }
  // }
  // socket.on("onMouseMove", async (data) => {
  //   if (connections[data.socketId]) {
  //     connections[data.socketId].payload.points.push(data.payload)
  //     for (let anyId in activeConnections(connections)) {
  //       connections[anyId].socket.emit("addPoint", {
  //         socketId,
  //         payload: data.payload,
  //       })
  //     }
  //   }
  // })
  // socket.on("disconnect", () => {
  //   console.log(`Client '${socketId}' disconnected!`)
  //   connections[socketId].active = false
  //   for (let anyId in activeConnections(connections)) {
  //     connections[anyId].socket.emit("clientDisconnect", socketId)
  //   }
  // })
  // });
};
