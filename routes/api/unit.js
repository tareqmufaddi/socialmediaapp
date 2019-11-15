const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();

// @route    POST api/unit
// @desc     Post a unit
// @access   Public
router.post(
  "/:id",
  [
    check("name", "Unit identifier is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { numberOfStops, capacity, speed } = req.body;

    const unitFields = {};
    unitFields.project = req.params.id;
    if (numberOfStops) unitFields.numberOfStops = numberOfStops;
    if (capacity) unitFields.capacity = capacity;
    if (speed) unitFields.speed = speed;

    try {
      const unit = await Unit.findOneAndUpdate(
        { name: req.body.name },
        { $set: unitFields },
        { new: true, upsert: true }
      );
      res.json(unit);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/unit
// @desc     Get all units
// @access   Public
router.get("/", async (req, res) => {
  try {
    const units = await Unit.find().populate("project", ["name"]);
    res.json(units);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
