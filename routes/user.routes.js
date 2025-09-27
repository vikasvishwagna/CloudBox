const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();

router.get("/register", (req, res) => {
  res.render("register");
});

router.post(
  "/register",
  body("email").trim().isEmail({ min: 5 }),
  body("userName").trim().isLength({ min: 3 }),
  body("password").trim().isLength({ min: 5 }),
  (req, res) => {
    const errors = validationResult(req);
    
    res.send("User data received");
  }
);

module.exports = router;
