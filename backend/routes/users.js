const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv/config");

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

// total count of users in db
router.get("/get/count", (req, res) => {
  User.find()
    .countDocuments()
    .then((count) => {
      res.status(200).json({
        count: count,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    });
});

// router.get("/get/count", async (req, res) => {
//   const productCount = await Product.find().countDocuments();
//   res.status(200).json({
//     count: productCount,
//   });
// });

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

router.post("/login", (req, res) => {
  //login user
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.passwordHash)) {
        // json web tokens are used to authenticate users
        // they are used to verify that the user is who they say they are and to prevent users from accessing the system without being authenticated
        const token = jwt.sign(
          { userId: user.id, isAdmin: user.isAdmin },
          process.env.JWT_SECRET
        );
        res.status(200).send({
          user: user.email,
          success: true,
          token: token,
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Wrong password",
        });
      }
    } else {
      res.status(401).json({
        success: false,
        message: "User not found",
      });
    }
  });
});

module.exports = router;
