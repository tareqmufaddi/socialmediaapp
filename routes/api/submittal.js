const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Submittal = require("../../models/Submittal");

// @route    POST api/submittal
// @desc     Get all units
// @access   Public
router.post(
  "/:id", //project id
  [
    check("docID", "Submittal requires an ID")
      .not()
      .isEmpty(),
    check("from", "Sender needs to be identified")
      .not()
      .isEmpty(),
    check("to", "Receiver needs to be identified")
      .not()
      .isEmpty(),
    check("revision", "Revision number missing")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { docID, from, to, revision, submitted, received } = req.body;

    const subFields = {};
    subFields.project = req.params.id;
    subFields.docID = docID;
    subFields.from = from;
    subFields.to = to;
    subFields.revision = revision;
    if (submitted) subFields.submitted = submitted;
    if (received) subFields.received = received;

    try {
      const submittal = await Submittal.findOneAndUpdate(
        { docID: req.body.docID },
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
