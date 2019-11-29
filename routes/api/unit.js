const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const auth = require("../../middleware/auth");

const pool = require("../../config/db");

// @route    POST api/unit
// @desc     Post a unit
// @access   Public
router.post(
  "/:project",
  auth,
  [
    check("unit_id", "Unit identifier is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { unit_id, landings, speed, capacity } = req.body;

    const unitFields = [];
    unitFields[0] = req.params.project;
    unitFields[1] = unit_id;
    unitFields[2] = landings;
    unitFields[3] = speed;
    unitFields[4] = capacity;
    //res.json(unitFields);
    try {
      const unit = await pool.query(
        `INSERT INTO units(
        project,
        unit_id,
        landings,
        speed,
        capacity) VALUES($1, $2, $3, $4, $5)`,
        unitFields
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
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const units = await pool.query("SELECT * FROM units");
    res.json(units.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/unit/
// @desc    Get unit by unit_id
// @access  Private

router.get("/unit", auth, async (req, res) => {
  try {
    const unit_id = req.query.unit_id;
    const unit_byid = await pool.query(
      `SELECT * FROM units WHERE unit_id = $1`,
      [unit_id]
    );
    res.json(unit_byid.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
