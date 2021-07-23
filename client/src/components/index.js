import Canvas from "components/canvas"

export default () => {
  return (
    <div className="index">
      <canvas id="myCanvas" height="750px" width="750px">
        <Canvas />
      </canvas>
    </div>
  )
}
