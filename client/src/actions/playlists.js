import { PLAYLIST_NEW } from "actions/types"
import axios from "axios"
import { dispatch } from "store"

export const playlistNew = (history) => async (dispatch) => {
  const res = await axios.get("/api/playlists/new")
  const playlistId = res.data._id
  dispatch({ type: PLAYLIST_NEW, payload: playlistId })
  history.push(`/playlists/${playlistId}`)
}
