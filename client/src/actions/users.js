import { PLAYLIST_NEW } from "actions/types"
import axios from "axios"
import { dispatch } from "store"

export const userNew = async (history) => {
  const res = await axios.get("/api/users/new")
  const playlistId = res.data._id
  dispatch({ type: PLAYLIST_NEW, payload: playlistId })
  history.push(`/playlists/${playlistId}/display`)
}
