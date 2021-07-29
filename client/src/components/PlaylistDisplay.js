import {
  PLAYLIST_SET,
  PLAYLIST_SONG_ADD,
  PLAYLIST_USER_CONNECT,
} from "actions/types";
import { SocketContext } from "context/sockets";
import { data } from "jquery";
import React, { useContext, useEffect } from "react";
import QRCode from "react-qr-code";
import { useDispatch, useSelector } from "react-redux";
import "sass/Playlist.scss";

export default (props) => {
  const { playlistId } = props.match.params;
  const currentUser = useSelector((state) => state.user.currentUser);
  const playlistUsers = useSelector((state) => state.playlist.users);
  const playlistSongs = useSelector((state) => state.playlist.songs);
  const sPromise = useContext(SocketContext);
  const dispatch = useDispatch();
  dispatch({ type: PLAYLIST_SET, payload: playlistId });
  useEffect(() => {
    if (currentUser) {
      (async () => {
        const socket = await sPromise;
        // socket.emit("playlist:set", { playlistId, userId });
        socket.on("client:add", (data) => {
          dispatch({
            type: PLAYLIST_USER_CONNECT,
            payload: { playlistId: data.playlistId, userId: data.userId },
          });
        });
        socket.on("song:add", (data) => {
          dispatch({
            type: PLAYLIST_SONG_ADD,
            payload: { playlistId: data.playlistId, title: data.title },
          });
        });
        socket.on("song:remove", (data) => {
          dispatch({
            type: PLAYLIST_SONG_REMOVE,
            payload: { playlistId: data.playlistId, title: data.title },
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

  const songs = () => {
    const songList = playlistSongs.map((song, index) => (
      <div>
        <h2>
          {index + 1}. {song.title}
        </h2>
      </div>
    ));

    return (
      <div>
        <h1>Current Queue: {playlistSongs.length}</h1>
        {songList}
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
          {songs()}
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
