import bcrypt from "bcryptjs"
import mongoose from "mongoose"

import { KEY_ROASTNTOAST } from "#src/config"
import jwt from "#src/helpers/jwt"
import { User } from "#src/models/_index"

// import sendActivationEmail from "#src/services/sendgrid"

export const Users = new (class Controller {
  current = async (req, res) => {
    res.json({ user: req.user.toJSON() })
  }

  delete = async (req, res) => {
    // const { google_id } = req.user
    // await User.deleteOne({ google_id })
    // res.json({ success: true })

    await User.deleteOne({ _id: req.user.id })
    res.json({ success: true })
  }

  new = async (req, res) => {
    await mongoose.connection.transaction(async (session) => {
      const user = new User()
      const token = await jwt.sign(user.toJSON(), KEY_ROASTNTOAST)
      const savedUser = await user.save({ session })
      return res.json({ user: savedUser, jwt: token })
    })
  }
})()
