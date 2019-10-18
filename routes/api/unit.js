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
router.post({});

module.exports = router;
