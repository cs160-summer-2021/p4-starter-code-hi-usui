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
    const payload = jwt_decode(jwt);
    const userId = payload.id;
    const socketId = socket.id;
    console.log(
      `Client {userId '${userId}', socketId '${socketId}', device: '${device}'} connected!`
    );

    connections[socketId] = {
      socketId,
      socket,
      payload: {
        color: randomColorHex(),
        device,
      },
    };

    socketsPlaylist(socket);
  });
};
