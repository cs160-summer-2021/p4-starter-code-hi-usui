import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    connections: {
      type: [String],
      default: [],
    },
  },
  {
    toObject: { virtuals: true },
    timestamps: { createdAt: "_created", updatedAt: "_updated" },
  }
);

UserSchema.options.toJSON = {
  getters: true,
  virtuals: true,
  transform: (doc, ret, options) => {
    return ret;
  },
};

export const User = mongoose.model("users", UserSchema);
