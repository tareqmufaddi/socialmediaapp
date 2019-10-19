const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const Post = require("../../models/Unit");
const Profile = require("../../models/Project");
const User = require("../../models/User");

// @route    POST api/unit
// @desc     Post a unit
// @access   Private
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

    const { name, numberOfStops, capacity, speed } = req.body;

    const unitFields = {};
    unitFields.project = req.params.id;
    if (numberOfStops) unitFields.numberOfStops = numberOfStops;
    if (capacity) unitFields.capacity = capacity;
    if (speed) unitFields.speed = speed;

    try {
      const project = await Project.findById(req.params.id);
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

module.exports = router;
