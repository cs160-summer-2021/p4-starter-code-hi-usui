import mongoose from "mongoose";

const PlaylistSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: { createdAt: "_created", updatedAt: "_updated" } }
);

export const Playlist = mongoose.model("playlists", PlaylistSchema);
