import { PLAYLIST_SONG_ADD, PLAYLIST_SONG_REMOVE } from "actions/_index";
import TextField from "components/common/TextField";
import { SocketContext } from "context/sockets";
import React, { useContext, useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useDispatch, useSelector } from "react-redux";
import "sass/PlaylistPhone.scss";

export default (props) => {
  const sPromise = useContext(SocketContext);
  const { playlistId } = props.match.params;
  const playlistSongs = useSelector((state) => state.playlist.songs);
  const [addSong, setAddSong] = useState([]);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    (async () => {
      const socket = await sPromise;
      if (userId) {
        socket.emit("playlist:set", { playlistId, userId });
        socket.emit("user:add", { playlistId, userId });
        socket.on("user:remove", (userId) => {
          console.log(`Client '${userId}' left the playlist!`);
        });
      }
    })();
  }, [userId]);

  const renderSongs = () => {
    return playlistSongs.map((song, index) => (
      <div key={index}>
        <h1>
          {index + 1}. {song.title}{" "}
          <button
            onClick={async () => {
              dispatch({
                type: PLAYLIST_SONG_REMOVE,
                payload: { title: song.title },
              });
              const socket = await sPromise;
              socket.emit("song:remove", {
                playlistId,
                title: song.title,
              });
            }}
          >
            -
          </button>
        </h1>
      </div>
    ));
  };

  const onAddSongChange = (e) => {
    setAddSong(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const socket = await sPromise;
    socket.emit("song:add", {
      playlistId,
      title: addSong,
    });
    dispatch({
      type: PLAYLIST_SONG_ADD,
      payload: { title: addSong },
    });
  };

  return (
    <div className="playlist-phone">
      <div className="roastntoast">
        <div className="app-name">
          <h1>RoastnToast</h1>
        </div>
        <div className="qr">
          <QRCode
            value={`${new URL(
              "/",
              window.location.href
            )}playlists/${playlistId}/phone`}
            size={70}
          />
        </div>
      </div>

      <div className="top">
        <div className="playlist-name">
          <h1>"Playlist Name"</h1>
        </div>
        <div className="user-name">
          <h1>"User" {userId ? userId.substring(0, 5) : null}</h1>
        </div>
      </div>

      <div className="content">
        <p>Song Queue:</p>
        <div className="songs">{renderSongs()}</div>
      </div>

      <div className="footer" align="center">
        <div className="add-song" align="center">
          <form onSubmit={onSubmit}>
            <TextField
              name="Enter Song"
              onChange={onAddSongChange}
              placeholder="Song title"
              type="text"
              value={addSong}
            />
            <input className="submit" type="submit" value="Add Song" />
          </form>
        </div>
      </div>
    </div>
  );
};
