import mongoose from "mongoose"

import { User } from "#src/models/_index"

export const Users = new (class Controller {
  current = async (req, res) => {
    res.json({ user: req.user.toJSON() })
  }

  delete = async (req, res) => {
    await User.deleteOne({ _id: req.user.id })
    res.json({ success: true })
  }

  new = async (req, res) => {
    await mongoose.connection.transaction(async (session) => {
      const user = new User()
      await user.save({ session })
      return res.json({ user: user.id })
    })
  }
})()
