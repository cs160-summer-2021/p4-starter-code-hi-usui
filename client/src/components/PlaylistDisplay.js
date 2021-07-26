import Spinner from "components/common/Spinner"
import React, { useEffect } from "react"
import QRCode from "react-qr-code"

export default (props) => {
  const { playlistId } = props.match.params
  return (
    <div className="Playlist">
      <div className="Playlist__top">
        <QRCode value={`${new URL("/", window.location.href)}users/new`} />
      </div>
      <div className="Playlist__middle">Playlist Name</div>
      <div className="Playlist__bottom">Playlist Name</div>
      <div>Playlist Id: {playlistId}</div>
      <div>test</div>
      <div>test</div>
    </div>
  )
}
