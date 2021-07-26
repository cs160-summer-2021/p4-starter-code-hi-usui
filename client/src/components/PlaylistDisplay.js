import Spinner from "components/common/Spinner";
import React, { useEffect } from "react";
import QRCode from "react-qr-code";

import "../sass/Playlist.scss";

export default (props) => {
  const { playlistId } = props.match.params;
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
            value={`${new URL("/", window.location.href)}users/new`}
            size={200}
          />
        </div>
        <div className="col-sm-4 middle-playlist-sec" align="center">
          <h1>?? current users</h1>
          <h2>1. Hiroshi</h2>
          <h2>2. Sam</h2>
        </div>
      </div>

      <div className="row curr-song">
        <div className="col-sm-12 curr-song">
          <h1>Current Song: ??</h1>
        </div>
      </div>

      {/* <div className="song-queue">
        <p>Current Queue</p>
        <p>1. Song 1</p>
        <p>2. Song 2</p>
        <p>3. Song 3</p>
      </div>
      <div className="qr-code">
        <QRCode value={`${new URL("/", window.location.href)}users/new`} />
      </div>
      <div className="users-info">
        <p>There are ?? number of users in RoastnToast</p>
        <p>1. Hiroshi</p>
        <p>2. Sam</p>
      </div>
      <div className="curr-song">
        <p>Current Song Playing: ??</p>
      </div> */}
    </div>
  );
};
