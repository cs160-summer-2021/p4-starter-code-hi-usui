import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toObject: { virtuals: true },
    timestamps: { createdAt: "_created", updatedAt: "_updated" },
  }
)

UserSchema.virtual("name_given").get(function () {
  return this.name.split(" ")[0]
})

UserSchema.options.toJSON = {
  getters: true,
  virtuals: true,
  transform: (doc, ret, options) => {
    return ret
  },
}

export const User = mongoose.model("users", UserSchema)
