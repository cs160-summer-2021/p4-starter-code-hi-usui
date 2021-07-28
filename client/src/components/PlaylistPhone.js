import TextField from "components/common/TextField";
import { SocketContext } from "context/sockets";
import React, { useContext, useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useSelector } from "react-redux";
import "sass/PlaylistPhone.scss";

export default (props) => {
  const sPromise = useContext(SocketContext);
  const { playlistId } = props.match.params;
  const [songs, setSongs] = useState([]);
  const [addSong, setAddSong] = useState([]);
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    (async () => {
      const socket = await sPromise;
      if (currentUser) {
        socket.emit("user:add", { playlistId, userId: currentUser });
        socket.on("disconnect", (socket) => {
          console.log(`Client '${socket.id}' disconnected from server!`);
        });
      }
    })();
  }, [currentUser]);

  const renderSongs = () => {
    return songs.map((song, index) => (
      <div key={index}>
        <h1>
          {index + 1}. {song.title}
        </h1>
      </div>
    ));
  };

  const onAddSongChange = (e) => {
    setAddSong(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSongs([...songs, { title: addSong }]);
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
          <h1>"User" {currentUser ? currentUser.substring(0, 5) : null}</h1>
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
