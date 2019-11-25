const express = require("express");
const request = require("request");
const config = require("config");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const pool = require("../../config/db");

// @route   POST api/project
// @desc    Add a project
// @access  Private

router.post(
  "/",
  auth,
  [
    check("name", "Project name is required")
      .not()
      .isEmpty(),
    check("client", "Second party is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      location,
      numberofunits,
      client,
      contractor,
      projectmanager,
      engineer
    } = req.body;

    const projectFields = [];
    //projectFields.user = req.user.rows[0].user_id;

    if (name) projectFields[0] = name;
    if (location) projectFields[1] = location;
    if (numberofunits) projectFields[2] = numberofunits;
    if (client) projectFields[3] = client;
    if (contractor) projectFields[4] = contractor;
    if (projectmanager) projectFields[5] = projectmanager;
    if (engineer) projectFields[6] = engineer;

    try {
      let project = await pool.query(
        `INSERT INTO projects(
                      name, 
                      location, 
                      numberofunits,
                      client,
                      contractor,
                      projectmanager,
                      engineer) VALUES($1, $2, $3, $4, $5, $6, $7)`,
        projectFields
      );
      res.json(project);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   GET api/project
// @desc    Get all projects
// @access  Private

router.get("/", auth, async (req, res) => {
  try {
    const projects = await pool.query("SELECT * FROM projects");
    res.json(projects.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
