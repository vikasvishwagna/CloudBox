const express = require("express");
const router = express.Router();

router.get("/router", (req, res) => {
  res.send('this is router folder');
});


module.exports = router