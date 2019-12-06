const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

var pool = require("../../config/db");

// @route   GET api/users
// @desc    get all users
//access    public

router.get("/", auth, async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM users");
    res.json(users.rows);
  } catch (q_err) {
    console.log(q_err.message);
    res.status(500).send("Server Error");
  }
});

// @rout    POST api/users
// @desc    Register user
//access    Public
router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please eneter a password with 6 or more charachters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    const values = [name, email, password];

    try {
      // See if user exists
      let user = await pool.query(`SELECT * FROM users WHERE name=$1`, [name]);
      // let user = await User.findOne({ email });
      if (user.rows[0]) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      //await user.save();
      // Encrypt password
      const salt = await bcrypt.genSalt(10);

      values[2] = await bcrypt.hash(password, salt);

      let new_user = await pool.query(
        `INSERT INTO users(name, email, password) VALUES ($1, $2, $3)`,
        values
      );

      // Return jsonwebtoken

      const payload = {
        user: {
          id: new_user.user_id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
