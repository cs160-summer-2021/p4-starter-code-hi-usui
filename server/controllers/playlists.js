import { Playlist } from "#src/models/_index"

export const Playlists = new (class Controller {
  new = async (req, res) => {
    const newPlaylist = new Playlist()
    const savedPlaylist = await newPlaylist.save()
    res.json(savedPlaylist)
  }
})()
