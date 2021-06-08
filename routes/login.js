
const User = require("../models/User");

const router = require("express").Router();

const jwt = require("jsonwebtoken");

const { secret } = require("../config/jwt");

router.post("/", async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({name});
    if (user) {
      const match = password === user.password;
      if (match) {
        const payload = {
          id: user._id, 
          roles: user.roles
        };
        const accessToken = jwt.sign(payload, secret, {expiresIn: "15s"});
        return res.status(202).json({
          ok: true, 
          message: "logged in!", 
          accessToken
        });
      }
      else {
        return res.status(400).json({
          ok: false, 
          message: "wrong password"
        });
      }
    }
    else {
      return res.status(400).json({
        ok: false, 
        message: "user doesn't found"
      });
    }
  }
  catch(error) {
    const { name, message } = error;
    return res.status(500).json({
      ok: false, 
      message: "login error",
      error: { name, message }
    });
  }
});

module.exports = router;
