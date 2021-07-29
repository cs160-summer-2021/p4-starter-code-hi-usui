import {
  PLAYLIST_SET,
  PLAYLIST_SONG_ADD,
  PLAYLIST_SONG_REMOVE,
  PLAYLIST_USER_ADD,
  PLAYLIST_USER_REMOVE,
} from "actions/types";
import axios from "axios";
import Spinner from "components/common/Spinner";
import { SocketContext } from "context/sockets";
import React, { useContext, useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useDispatch, useSelector } from "react-redux";
import "sass/Playlist.scss";

export default (props) => {
  const { playlistId } = props.match.params;
  const userId = useSelector((state) => state.user.currentUser);
  const playlistUsers = useSelector((state) => state.playlist.users);
  const playlistSongs = useSelector((state) => state.playlist.songs);
  const sPromise = useContext(SocketContext);
  const dispatch = useDispatch();
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    if (userId) {
      dispatch({ type: PLAYLIST_SET, payload: playlistId });
      (async () => {
        const socket = await sPromise;
        setPlaylist((await axios.get(`/api/playlists/${playlistId}/get`)).data);

        socket.emit("playlist:set", { playlistId, userId });
        socket.on("user:add", (data) => {
          dispatch({
            type: PLAYLIST_USER_ADD,
            payload: { userId: data.userId },
          });
        });
        socket.on("user:remove", (data) => {
          console.log(`Client '${data.userId}' left the playlist!`);
          dispatch({
            type: PLAYLIST_USER_REMOVE,
            payload: { userId: data.userId },
          });
        });
        socket.on("song:add", (data) => {
          dispatch({
            type: PLAYLIST_SONG_ADD,
            payload: { title: data.title },
          });
        });
        socket.on("song:remove", (data) => {
          console.log("a");
          dispatch({
            type: PLAYLIST_SONG_REMOVE,
            payload: { title: data.title },
          });
        });
      })();
    }
  }, [userId]);

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
    if (!playlist) {
      return <Spinner />;
    }
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
          <h1>
            Current Song: {playlistSongs.length ? playlistSongs[0].title : null}
          </h1>
        </div>
      </div>
    </div>
  );
};
