import Landing from "components/Landing";
import Canvas from "components/canvas";

export default () => {
  return (
    <div className="index">
      <Landing />
      <canvas id="myCanvas" height="750px" width="750px">
        <Canvas />
      </canvas>
    </div>
  );
};
