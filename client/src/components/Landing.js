// https://dev.to/bravemaster619/how-to-use-socket-io-client-correctly-in-react-app-o65
//  How to use socket.io-client correctly in React app
import { PLAYLIST_SET, PLAYLIST_USER_CONNECT } from "actions/types"
import axios from "axios"
import Spinner from "components/common/Spinner"
import { SocketContext } from "context/socket"
import { useWindowDimensions } from "helpers/_index"
import React, { useContext, useEffect, useState } from "react"
import QRCode from "react-qr-code"
import { useDispatch, useSelector } from "react-redux"
import { useActions } from "react-redux-actions-hook"
import { useHistory, useLocation } from "react-router-dom"

import "../sass/Landing.scss"

const useQuery = () => new URLSearchParams(useLocation().search)

export default () => {
  const socket = useContext(SocketContext)
  const dispatch = useDispatch()
  const history = useHistory()
  const query = useQuery()
  const size = query.get("size")
  const { height, width } = useWindowDimensions()
  const { playlist } = useSelector((state) => ({
    playlist: state.playlist,
  }))

  useEffect(() => {
    ;(async () => {
      const res = await axios.get("/api/playlists/new")
      const playlistId = res.data._id
      dispatch({ type: PLAYLIST_SET, payload: playlistId })
    })()

    socket.on("clientConnect", (data) => {
      dispatch({
        type: PLAYLIST_USER_CONNECT,
        payload: { id: data.id, device: data.payload.device },
      })
    })
  }, [])

  const users = () => {
    if (
      playlist.playlistId &&
      playlist.users.length &&
      playlist.users.some((u) => u.device == "phone")
    ) {
      setTimeout(() => {
        history.push(`/playlists/${playlist.playlistId}/display`)
      }, 5000)
      return (
        <div style={{ color: "red" }}>
          Users have joined your playlist! Redirecting to playlist in 5
          seconds....
          <Spinner />
        </div>
      )
    }
  }

  const qr = () => {
    if (playlist.playlistId) {
      return (
        <a href={`/playlists/${playlist.playlistId}/phone`}>
          <QRCode
            value={`${new URL("/", window.location.href)}playlists/${
              playlist.playlistId
            }/phone`}
          />
        </a>
      )
    }
  }

  return (
    <div className="container-fluid">
      <div className="row init-landing">
        <div className="col-sm-12">
          <h1>RoastnToast</h1>
        </div>
      </div>
      <div className="row qr">
        <div className="col-sm-12" align="center">
          {qr()}
          <h3>Click on QR code if scanning unavailable.</h3>
        </div>
        {/* <div className="col-sm-6">
          {users()}
        </div> */}
      </div>
      <div className="row height-width">
        <div className="col-sm-12">
          <h1>height: {height}, width: {width}</h1>
        </div>
      </div>
    </div>
  )
}
