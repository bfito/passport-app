const express    = require("express");
const authRoutes = express.Router();

// User model
const User       = require("../models/user-model");

// Bcrypt to encrypt passwords
const bcrypt     = require("bcrypt");
const bcryptSalt = 10;

authRoutes.get("/signup", (req, res, next) => {
  res.render("auth/signup-views");
});

authRoutes.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === "" || password === "") {
    res.render("auth/signup-views", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup-views", { message: "The username already exists" });
      return;
    }

    const salt     = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = User({
      firstName:req.body.firstName,
      lastName: req.body.lastName,
      username: username,
      encryptedpassword: hashPass
    });

    newUser.save((err) => {
      if (err) {
        res.render("auth/signup-views", { message: "Something went wrong" });
      } else {
        res.redirect("/");
      }
    });
  });
});

module.exports = authRoutes;
