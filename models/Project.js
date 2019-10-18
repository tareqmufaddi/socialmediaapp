const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  location: {
    type: String
  },
  numberOfUnits: {
    type: Number
  },
  client: {
    type: String,
    required: true
  },
  contractor: {
    type: String
  },
  projectManager: {
    type: String
  },
  engineer: {
    type: String
  },
  projectStart: {
    type: Date
  },
  projectExpectedFinish: {
    type: Date
  }
});

module.exports = Project = mongoose.model("project", ProjectSchema);
