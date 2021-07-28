import { Playlist } from "#src/models/_index";

export const socketsPlaylist = (io, socket) => {
  const createOrder = (payload) => {
    // ...
  };

  const readOrder = (orderId, callback) => {
    // ...
  };

  socket.on("order:create", createOrder);
  socket.on("order:read", readOrder);
};

export const Playlists = new (class Controller {
  new = async (req, res) => {
    const newPlaylist = new Playlist({ owner: req.user.id });
    const savedPlaylist = await newPlaylist.save();
    res.json(savedPlaylist);
  };
})();
