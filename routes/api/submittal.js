const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

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

    const {
      docID,
      from,
      to,
      revision,
      unitLink,
      submitted,
      received
    } = req.body;

    const subFields = {};
    subFields.project = req.params.id;
    subFields.docID = docID;
    subFields.from = from;
    subFields.to = to;
    subFields.unitLink = unitLink;
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

// @route    GET api/submittal
// @desc     Get all submittals
// @access   Public
router.get("/", async (req, res) => {
  try {
    const submittals = await Submittal.find().populate("unitLink", ["name"]);
    res.json(submittals);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/submittal/:id
// @desc     Get submittal by unit ID
// @access   Public
// router.get("/:id", async (req, res) => {
//   try {
//     const submittals = Submittal.findOne({ "submittal.unitLink._id": req.params.id });
//     res.json(submittals);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

module.exports = router;
