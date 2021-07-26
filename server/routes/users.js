import express from "express"
import passport from "passport"

import { Users } from "#src/controllers/users"

const router = express.Router()
const authenticate = passport.authenticate("jwt", { session: false })

router.post("/new", Users.new)
router.get("/current", authenticate, Users.current)
router.delete("/current", authenticate, Users.delete)

export const users = router
