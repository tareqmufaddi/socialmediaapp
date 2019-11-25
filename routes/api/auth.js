const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

var pool = require("../../config/db");

// @rout    GET api/auth
// @desc    Test route
//access    Private
router.get("/", auth, async (req, res) => {
  try {
    //const user = await User.findById(req.user.id).select("-password");
    const user = await pool.query("SELECT * FROM users WHERE user_id=$1", [
      req.user.id
    ]);
    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @rout    POST api/auth
// @desc    Authenticate user & get token
//access    Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // See if user exists
      //let user = await User.findOne({ email });
      let user = await pool.query(`SELECT * FROM users WHERE email=$1`, [
        email
      ]);

      //res.json(user.rows[0].name);

      if (!user.rows[0]) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.rows[0].password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const payload = {
        user: {
          id: user.rows[0].user_id
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
      res.status(500).send("El Server 6abbal m3allem!");
    }
  }
);

module.exports = router;
