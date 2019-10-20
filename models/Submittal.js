const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubmittalSchema = new Schema({
  unit: {
    type: Schema.Types.ObjectId,
    ref: "unit"
  },
  serial: {
    type: Number,
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
    type: Date
  },
  received: {
    type: Date
  },
  revision: {
    type: Number,
    required: true
  }
});

module.exports = Submittal = mongoose.model("submittal", SubmittalSchema);
