import spinner from "components/common/spinner.gif";
import React from "react";

export default () => {
  return (
    <div>
      <img
        src={spinner}
        style={{ width: "100px", margin: "auto", display: "block" }}
        alt="Loading..."
      />
    </div>
  );
};
