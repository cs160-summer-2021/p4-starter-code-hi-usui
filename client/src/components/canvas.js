// import * as actions from "actions/item"
import * as paper from "paper";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useActions } from "react-redux-actions-hook";
import { useHistory } from "react-router-dom";
import { io } from "socket.io-client";

export default () => {
  // const action = useActions(actions)
  const history = useHistory();
  // const { auth, item } = useSelector((state) => ({
  //   item: state.item,
  // }));

  useEffect(() => {
    const canvas = document.getElementById("myCanvas");
    paper.setup(canvas);
    const tool = new paper.Tool();

    const ws = io(
      new URL("/", window.location.href).href.replace("http", "ws")
    );

    const allClients = {};

    ws.on("connectClient", (data) => {
      console.log(`Client '${data.id}' has connected!}`);
      allClients[data.id] = { path: new paper.Path() };
      for (let key in data.payload.pathProperties) {
        allClients[data.id].path[key] = data.payload.pathProperties[key];
      }
      for (let point of data.payload.points) {
        allClients[data.id].path.add(point);
      }
      console.log(data.payload);
    });

    ws.on("disconnectClient", (id) => {
      console.log(`Client '${id}' has disconnected!`);
      delete allClients[id];
    });

    tool.onMouseMove = (event) => {
      const { x, y } = event.point;
      ws.emit("onMouseMove", { id: ws.id, payload: { x, y } });
    };

    ws.on("addPoint", (data) => {
      if (data.id) {
        const { x, y } = data.payload;
        if (allClients[data.id]) {
          allClients[data.id].path.add({ x, y });
        }
      }
    });
  }, []);

  return <canvas className="canvas"></canvas>;
};
