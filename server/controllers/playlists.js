import { Playlist, User } from "#src/models/_index";

export const socketsPlaylist = (socket) => {
  const playlistSet = async (payload) => {
    const { playlistId, userId } = payload;
    const playlist = await Playlist.findById(playlistId);
    const set = new Set(playlist.users.map((s) => s.toString()));
    playlist.users = Array.from(set);
    await playlist.save();
    socket.join(playlistId);
    console.log("AKSHDKJASHD");
    socket.to(playlistId).emit("user:add", {
      userId,
    });
    socket.on("disconnect", () => {
      socket.to(playlistId).emit("user:remove", { userId });
    });
  };

  const songAdd = async (payload) => {
    const { playlistId, title } = payload;
    const playlist = await Playlist.findById(playlistId);
    playlist.songs.push(title);
    await playlist.save();
    socket.to(playlistId).emit("song:add", {
      playlistId,
      title,
    });
  };

  const songRemove = async (payload) => {
    const { playlistId, title } = payload;
    const playlist = await Playlist.findById(playlistId);
    playlist.songs = playlist.songs.filter((song) => song != title);
    await playlist.save();
    socket.to(playlistId).emit("song:remove", {
      title,
    });
  };

  const userRemove = async (payload) => {
    const { playlistId, userId } = payload;
    const playlist = await Playlist.findById(playlistId);
    playlist.users = playlist.users.filter((u) => u != userId);
    await playlist.save();
    console.log(`Removed user '${userId}' from playlist '${playlistId}'`);
  };

  socket.on("playlist:set", playlistSet);
  socket.on("song:add", songAdd);
  socket.on("song:remove", songRemove);
  socket.on("user:remove", userRemove);
};

export const Playlists = new (class Controller {
  new = async (req, res) => {
    const newPlaylist = new Playlist({ owner: req.user.id });
    const savedPlaylist = await newPlaylist.save();
    res.json(savedPlaylist);
  };

  get = async (req, res) => {
    const { playlistId } = req.params;
    const playlist = await Playlist.findById(playlistId);
    res.json(playlist);
  };
})();
