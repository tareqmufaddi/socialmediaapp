const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubmittalSchema = new Schema({
  project: {
    type: Schema.Types.ObjectId,
    ref: "project"
  },
  docID: {
    type: String,
    unique: true,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  submitted: {
    type: Date,
    default: Date.now
    // required: true
  },
  received: {
    type: Date,
    default: Date.now
    // required: true
  },
  revision: {
    type: Number,
    required: true
  }
});

module.exports = Submittal = mongoose.model("submittal", SubmittalSchema);
