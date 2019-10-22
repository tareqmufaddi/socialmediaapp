const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubmittalSchema = new Schema({
  linkUnits: {
    type: Schema.Types.ObjectId,
    ref: "unit"
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
  // submitted: {
  //   type: Date,
  //   required: true
  // },
  // received: {
  //   type: Date,
  //   required: true
  // },
  revision: {
    type: Number,
    required: true
  }
});

module.exports = Submittal = mongoose.model("submittal", SubmittalSchema);
