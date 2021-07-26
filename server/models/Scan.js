import mongoose from "mongoose"

const ScanSchema = new mongoose.Schema({
  scan_in: {
    type: Date,
    default: Date.now,
  },
  scan_out: {
    type: Date,
    default: null,
  },
})

export const Scan = mongoose.model("scans", ScanSchema)
