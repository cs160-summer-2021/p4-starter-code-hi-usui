import mongoose from "mongoose"

const ScanSchema = new mongoose.Schema({
  scan_end: {
    type: Date,
    default: Date.now,
  },
  scan_start: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
})

export const Scan = mongoose.model("scans", ScanSchema)
