const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const pool = require("../../config/db");

// @route    POST api/submittal
// @desc     Get all units
// @access   Public
router.post(
  "/",
  auth, //project_name id
  [
    check("doc_id", "Submittal requires an ID")
      .not()
      .isEmpty(),
    check("unit_id", "effected unit equired")
      .not()
      .isEmpty(),
    check("rev", "rev number missing")
      .not()
      .isEmpty(),
    check("sender", "Sender needs to be identified")
      .not()
      .isEmpty(),
    check("receiver", "Receiver needs to be identified")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      doc_id,
      unit_id,
      rev,
      submitted,
      received,
      closed,
      superceded,
      sender,
      receiver,
      project_name
    } = req.body;

    const subFields = [];
    //subFields.project_name = req.params.project_name;
    if (doc_id) subFields[0] = doc_id;
    if (unit_id) subFields[1] = unit_id;
    if (rev) subFields[2] = rev;
    if (submitted) subFields[3] = submitted;
    if (received) subFields[4] = received;
    if (closed) subFields[5] = closed;
    if (superceded) subFields[6] = superceded;
    if (sender) subFields[7] = sender;
    if (receiver) subFields[8] = receiver;
    if (project_name) subFields[9] = project_name;

    try {
      let submittal = await pool.query(
        `INSERT INTO submittals(
          doc_id,
          unit_id,
          rev,
          submitted,
          received,
          closed,
          superceded, 
          sender,
          receiver,
          project_name) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        subFields
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
router.get("/", auth, async (req, res) => {
  try {
    const submittals = await pool.query("SELECT * FROM submittals");
    res.json(submittals.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/submittal
// @desc    Get submittal by unit_id
// @access  provate

router.get("/unit/:unit_id", auth, async (req, res) => {
  try {
    const unit_id = req.params.unit_id;
    //res.json(unit_id);
    const unit_submittals = await pool.query(
      `SELECT * FROM submittals WHERE unit_id = $1`,
      [unit_id]
    );
    res.json(unit_submittals.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
