import * as actions from "actions/playlists";
import Spinner from "components/common/Spinner";
import React, { useEffect } from "react";
import { useActions } from "react-redux-actions-hook";
import { useHistory } from "react-router-dom";

export default () => {
  const action = useActions(actions);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      action.playlistNew(history);
    })();
  }, []);

  return (
    <div style={{ backgroundColor: "red" }}>
      <Spinner />
    </div>
  );
};
