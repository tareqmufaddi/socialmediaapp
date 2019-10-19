const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UnitSchema = new Schema({
  project: {
    type: Schema.Types.ObjectId,
    ref: "project"
  },
  name: {
    type: String,
    unique: true,
    required: true
  },
  numberOfStops: {
    type: Number
  },
  capacity: {
    type: Number
  },
  speed: {
    type: Number
  }
});

module.exports = Unit = mongoose.model("unit", UnitSchema);
