const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const userModel = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


router.get("/register", (req, res) => {
  res.render("register");
});

router.post(
  "/register",
  body("email").trim().isEmail().isLength({ min: 12 }),
  body("userName").trim().isLength({ min: 3 }),
  body("password").trim().isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array(), message: "invalid input" });
    }

    const { userName, email, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);    

    const newUser = await userModel.create({
      userName: userName,
      email: email,
      password: hashPassword,
    });

    res.json(newUser);
  }
);

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  body("userName").trim().isLength({ min: 3 }),
  body("password").trim().isLength({ min: 5 }),

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(404).json({
        error: errors.array(),
        message: "invalid userName or password ",
      });
    }

    const { userName, password } = req.body;

    const user = await userModel.findOne({ userName: userName });

    if (!user) {
      return res.status(404).json({
        message: "invalid userName or password u1",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(404)
        .json({ message: "invalid userName or password p1" });
    }

    const safeUser = { userName: user.userName, email: user.email };

    const token = jwt.sign(
      {
        userId: user._id,
        userName: user.userName,
        email: user.email,
      },
      process.env.JWT_SCRETE
    );

    res.cookie('token', token);

    res.send('logged in')
  }
);

module.exports = router;
