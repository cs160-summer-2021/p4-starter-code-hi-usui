import { PLAYLIST_SET, PLAYLIST_USER_CONNECT } from "actions/types";
import { SocketContext } from "context/sockets";
import React, { useContext, useEffect } from "react";
import QRCode from "react-qr-code";
import { useDispatch, useSelector } from "react-redux";

import "../sass/Playlist.scss";

export default (props) => {
  const { playlistId } = props.match.params;
  const currentUser = useSelector((state) => state.user.currentUser);
  const playlistUsers = useSelector((state) => state.playlist.users);
  const sPromise = useContext(SocketContext);
  const dispatch = useDispatch();
  dispatch({ type: PLAYLIST_SET, payload: playlistId });
  useEffect(() => {
    if (currentUser) {
      (async () => {
        const socket = await sPromise;
        socket.on("clientConnect", (data) => {
          dispatch({
            type: PLAYLIST_USER_CONNECT,
            payload: { playlistId: data.playlistId, userId: data.userId },
          });
        });
      })();
    }
  }, [currentUser]);

  const users = () => {
    const userList = playlistUsers.map((userId) => (
      <div>
        <h2>{userId}</h2>
      </div>
    ));

    return (
      <div>
        <h1>{playlistUsers.length} current users</h1>
        {userList}
      </div>
    );
  };

  return (
    <div className="container-fluid">
      <div className="row playlist-name">
        <div className="col-sm-12 playlist-name">
          <p>"Untitled Playlist"</p>
        </div>
      </div>

      <div className="row middle-playlist">
        <div className="col-sm-4 middle-playlist-sec" align="center">
          <h1>Current Queue:</h1>
          <h2>1. Song 1</h2>
          <h2>2. Song 2</h2>
          <h2>3. Song 3</h2>
        </div>
        <div className="col-sm-4 middle-playlist-sec" align="center">
          <QRCode
            value={`${new URL(
              "/",
              window.location.href
            )}playlists/${playlistId}/phone`}
            size={200}
          />
        </div>
        <div className="col-sm-4 middle-playlist-sec" align="center">
          {users()}
        </div>
      </div>

      <div className="row curr-song">
        <div className="col-sm-12 curr-song">
          <h1>Current Song: ??</h1>
        </div>
      </div>
    </div>
  );
};
