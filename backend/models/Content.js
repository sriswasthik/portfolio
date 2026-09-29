const mongoose = require("mongoose");

// One document per editable section ("skills", "projects", "gallery",
// "activity"). `items` holds the whole ordered list, validated in content.js.
const contentSchema = new mongoose.Schema(
  {
    section: { type: String, required: true, unique: true },
    items: { type: mongoose.Schema.Types.Mixed, default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Content", contentSchema);
