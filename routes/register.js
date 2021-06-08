
const User = require("../models/User");

const { check, validationResult } = require("express-validator");

const router = require("express").Router();

const validators = [
  check("name", "name is empty").notEmpty(),
  check("password", "password length is less than 4").isLength({min: 4})
];

router.post("/", validators, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        ok: false, 
        message: "request error",
        errors
      });
    }

    const { name, password } = req.body;
    const candidate = await User.findOne({name});
    if (candidate) {
      return res.status(400).json({
        ok: false, 
        message: "user already exists"
      });
    }
    else {
      // todo: hash password
      const user = new User({name, password, roles: ["User"]});
      await user.save();
      return res.status(202).json({ok: true});
    }
  }
  catch(error) {
    const { name, message } = error;
    return res.status(500).json({
      ok: false, 
      message: "register error",
      error: { name, message }
    });
  }
});

module.exports = router;
