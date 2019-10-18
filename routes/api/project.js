const express = require("express");
const request = require("request");
const config = require("config");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Project = require("../../models/Project");

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
      numberOfUnits,
      client,
      contractor,
      projectManager,
      engineer
    } = req.body;

    const projectFields = {};
    projectFields.user = req.user.id;

    if (name) projectFields.name = name;
    if (location) projectFields.location = location;
    if (numberOfUnits) projectFields.numberOfUnits = numberOfUnits;
    if (client) projectFields.client = client;
    if (contractor) projectFields.contractor = contractor;
    if (projectManager) projectFields.projectManager = projectManager;
    if (engineer) projectFields.engineer = engineer;

    try {
      let project = await Project.findOneAndUpdate(
        { user: req.user.id },
        { $set: projectFields },
        { new: true, upsert: true }
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
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
