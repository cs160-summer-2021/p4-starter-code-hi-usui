import { SocketContext } from "context/socket"
import React, { useEffect } from "react"
import QRCode from "react-qr-code"

import "../sass/PlaylistPhone.scss"

export default (props) => {
  // const socket = useContext(SocketContext)
  const { playlistId } = props.match.params

  return (
    <div className="playlist-phone">
      <div className="roastntoast">
        <h1>RoastnToast</h1>
      </div>

      <div className="top">
        <div className="playlist-name">
          <h1>Playlist Name</h1>
        </div>
        <div className="user-name">
          <h1>User</h1>
        </div>
      </div>

      <div className="content" align="center">
        <div className="songs">
          <h1>- 1. Song 1</h1>
          <h1>- 2. Song 2</h1>
          <h1>- 3. Song 3</h1>
          <h1>- 4. Song 4</h1>
          <h1>- 5. Song 5</h1>
          <h1>- 6. Song 6</h1>
          <h1>- 7. Song 7</h1>
        </div>
      </div>

      <div className="footer">
        <div className="add-song">
          <h1>+ Add a song</h1>
        </div>
        <div className="qr">
        <QRCode
            value={`${new URL("/", window.location.href)}users/new`}
            size={70}
          />
        </div>
      </div>

      {/* <div className="Playlist__top">
        <QRCode value={`${new URL("/", window.location.href)}users/new`} />
      </div>
      <div className="Playlist__middle">Playlist Name</div>
      <div className="Playlist__bottom">Playlist Name</div>
      <div>Playlist Id: {playlistId}</div>
      <div>test</div>
      <div>test</div> */}
    </div>
  )
}
