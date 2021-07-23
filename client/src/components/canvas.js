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
    const path = new paper.Path();
    const uid = Date.now() % 10000;
    path.strokeColor = "red";

    const ws = io(
      new URL("/", window.location.href).href.replace("http", "ws")
    );

    tool.onMouseMove = function (event) {
      //http://paperjs.org/reference/tool/ path examples
      path.add(event.point);
      ws.emit(
        "mouseMove",
        JSON.stringify({ x: event.point.x, y: event.point.y, uid })
      );
    };
    ws.on("mouseMove", (data) => {});

    ws.on("disconnect", () => {
      console.error("Chat socket closed unexpectedly");
    });
  }, []);

  return <canvas className="canvas"></canvas>;
};
