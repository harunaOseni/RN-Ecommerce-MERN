const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

router.get("/", async (req, res) => {
  const userList = await User.find();

  if (!userList) {
    res.status(500).json({
      success: false,
    });
  }

  res.send(userList);
});

router.get("/:id", (req, res) => {
  // get user data excluding password
  User.findById(req.params.id, "-passwordHash")
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    });
});

router.post("/", (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    street: req.body.street,
    apartment: req.body.apartment,
    zip: req.body.zip,
    city: req.body.city,
    country: req.body.country,
  });

  newUser
    .save()
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        error: err,
        message: "Error while saving user",
      });
    });
});

module.exports = router;
