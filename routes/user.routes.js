const express = require("express");
const router = express.Router(); 
const { body, validationResult } = require("express-validator");
const userModel = require('../models/user.models');
const bcrypt = require('bcrypt');




router.get("/register", (req, res) => {
  res.render("register");
});

router.post(
  "/register",
  body("email").trim().isEmail({ min: 5 }),
  body("userName").trim().isLength({ min: 3 }),
  body("password").trim().isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array(), message: "invalid input" });
    }

    const{userName, email, password} = req.body;

    const hashPassword =  await bcrypt.hash(password, 10);

   const newUser = await userModel.create({
      userName : userName,
      email : email,
      password: hashPassword
    })

    res.json(newUser); 
  }
);

module.exports = router;
