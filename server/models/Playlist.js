import mongoose from "mongoose"

const PlaylistSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  name: {
    type: String,
    default: "Untitled Playlist",
  },
  users: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  scans: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  songs: {
    type: [String],
    default: [],
  },
})

export const Playlist = mongoose.model("playlists", PlaylistSchema)
