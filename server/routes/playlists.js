import express from "express";
import passport from "passport";

import { Playlists } from "#src/controllers/_index";

const router = express.Router();
const authenticate = passport.authenticate("jwt", { session: false });

router.get("/new", authenticate, Playlists.new);

export const playlists = router;
