
const router = require("express").Router();

const { validateToken, roleAccess } = require("../middleware/auth");

router.get("/", validateToken, (req, res) => {
  res.status(201).json({ok: true});
});

module.exports = router;
