// import * as actions from "actions/item"
import React, { useEffect } from "react"
import QRCode from "react-qr-code"
import { useHistory, useLocation } from "react-router-dom"

const useQuery = () => new URLSearchParams(useLocation().search)

export default () => {
  // const action = useActions(actions)
  const history = useHistory()
  const query = useQuery()
  const size = query.get("size")
  // const { auth, item } = useSelector((state) => ({
  //   item: state.item,
  // }));

  useEffect(() => {}, [])
  return (
    <div className="Landing" style={{ backgroundColor: "red" }}>
      <div>Click QR Code if you are having trouble scanning on your phone</div>

      <div>
        <a href={`/api/playlists/new`}>
          <QRCode
            value={`${new URL("/", window.location.href)}api/playlists/new`}
          />
        </a>
      </div>
    </div>
  )
}
