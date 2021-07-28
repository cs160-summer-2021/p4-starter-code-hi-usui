import express from "express";
import { createServer } from "http";
import _ from "lodash";
import { Server } from "socket.io";

import { playlists, users } from "#src/routes/_index";
import "#src/services/mongodb";
import "#src/services/passport";
import "#src/services/redis";
import { initSocketServer } from "#src/sockets";

import { PORT_EXPRESS } from "./config.js";

const app = express();
const server = createServer(app);
const io = new Server(server);
initSocketServer(io);

app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use(express.urlencoded({ extended: true }));
const apiRouter = express.Router();
app.use("/api", apiRouter);
apiRouter.use("/users", users);
apiRouter.use("/playlists", playlists);
server.listen(PORT_EXPRESS);
console.log(`Server now listening on port ${PORT_EXPRESS}`);

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));
