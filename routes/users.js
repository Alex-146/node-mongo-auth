
const User = require("../models/User");

const router = require("express").Router();

const { validateToken, roleAccess } = require("../middleware/auth");

router.get("/", roleAccess(["Admin"]), async (req, res) => {
  
  try {
    const users = await User.find();
    return res.status(201).json({
      ok: true, 
      data: {
        total: users.length,
        users
      }
    });
  }
  catch(error) {
    const { name, message } = error;
    return res.status(500).json({
      ok: false, 
      message: "error via fetching data",
      error: { name, message }
    });
  }
  
});

module.exports = router;
