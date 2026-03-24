const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  github: String,
  tech: [String],
  image: String,
  hidden: { type: Boolean, default: false }
});

module.exports = mongoose.model("Project", projectSchema);