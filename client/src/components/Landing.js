// https://dev.to/bravemaster619/how-to-use-socket-io-client-correctly-in-react-app-o65
//  How to use socket.io-client correctly in React app
import { PLAYLIST_SET, PLAYLIST_USER_ADD } from "actions/types";
import axios from "axios";
import Spinner from "components/common/Spinner";
import { SocketContext } from "context/sockets";
import { useWindowDimensions } from "helpers/_index";
import React, { useContext, useEffect } from "react";
import QRCode from "react-qr-code";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import "sass/Landing.scss";

const useQuery = () => new URLSearchParams(useLocation().search);

export default () => {
  const sPromise = useContext(SocketContext);

  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();
  const currentUser = useSelector((state) => state.user.currentUser);

  const { height, width } = useWindowDimensions();

  const { playlist } = useSelector((state) => ({
    playlist: state.playlist,
  }));
  useEffect(() => {
    (async () => {
      if (currentUser) {
        const providedPlaylistId = query.get("playlist");
        let playlistId;
        if (!providedPlaylistId) {
          playlistId = (await axios.get("/api/playlists/new")).data._id;
        } else {
          playlistId = providedPlaylistId;
        }
        const socket = await sPromise;
        // socket.emit("playlist:set", { playlistId, userId });
        dispatch({ type: PLAYLIST_SET, payload: playlistId });
        socket.on("user:add", (data) => {
          dispatch({
            type: PLAYLIST_USER_ADD,
            payload: { playlistId: data.playlistId, userId: data.userId },
          });
        });
      }
    })();
  }, [currentUser]);

  const qr = () => {
    const size = query.get("size");
    if (playlist.playlistId) {
      if (playlist.users.length) {
        setTimeout(() => {
          history.push(`/playlists/${playlist.playlistId}/display`);
        }, 5000);
        return (
          <div style={{ color: "red" }}>
            Users have joined your playlist! Redirecting to playlist in 5
            seconds....
            <Spinner />
          </div>
        );
      } else {
        return (
          <div>
            <h3>Click on QR code if scanning unavailable.</h3>
            <a href={`/playlists/${playlist.playlistId}/phone`}>
              <QRCode
                value={`${new URL("/", window.location.href)}playlists/${
                  playlist.playlistId
                }/phone`}
                size={size ? size : 256}
              />
            </a>
          </div>
        );
      }
    }
  };

  const phone = () => {
    return (
      <div>
        Please visit the website on your main display or use your phone to scan
        a QR code
      </div>
    );
  };

  const displayContent = () => {
    let content;
    if (height > 900 || width > 900) {
      content = qr();
    } else {
      content = phone();
    }

    return (
      <div className="row qr">
        <div className="col-sm-12" align="center">
          {content}
        </div>
      </div>
    );
  };

  return (
    <div className="container-fluid">
      <div className="row init-landing">
        <div className="col-sm-12">
          <h1>RoastnToast</h1>
        </div>
      </div>
      {displayContent()}
      <div className="row height-width">
        <div className="col-sm-12">
          <h1>
            height: {height}, width: {width}
          </h1>
        </div>
      </div>
    </div>
  );
};
