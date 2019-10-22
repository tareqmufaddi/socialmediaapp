const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Submittal = require("../../models/Submittal");
const Unit = require("../../models/Unit");

// @route    POST api/submittal
// @desc     Get all units
// @access   Public
router.post(
  "/",
  [
    check("from", "Sender of document needs to be identified")
      .not()
      .isEmpty(),
    check("to", "Receiver needs to be identified")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { linkUnits, docID, to, revision, submitted, received } = req.body;

    try {
      const unit = await Unit.findOne({ id: { $in: ids } });
      const submittal = await Submittal.findOneAndUpdate(
        { serial: req.body.serial },
        { $set: subFields },
        { new: true, upsert: true }
      );
      res.json(submittal);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
