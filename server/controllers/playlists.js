import { Playlist, User } from "#src/models/_index";

export const socketsPlaylist = (socket) => {
  const userAdd = async (payload) => {
    const { playlistId, userId } = payload;
    const playlist = await Playlist.findById(playlistId);
    playlist.users.push(userId);
    await playlist.save();
    socket.broadcast.emit("clientConnect", {
      userId,
      playlistId,
    });
  };

  const userRemove = async (payload) => {
    const { playlistId, userId } = payload;
    const playlist = await Playlist.findById(playlistId);
    playlist.users = playlist.users.filter((u) => u != userId);
    await playlist.save();
    console.log(`Removed user '${userId}' from playlist '${playlistId}'`);
  };

  socket.on("user:add", userAdd);
  socket.on("user:remove", userRemove);
};

export const Playlists = new (class Controller {
  new = async (req, res) => {
    const newPlaylist = new Playlist({ owner: req.user.id });
    const savedPlaylist = await newPlaylist.save();
    res.json(savedPlaylist);
  };
})();
