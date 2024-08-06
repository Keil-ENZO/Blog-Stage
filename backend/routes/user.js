const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const authenticate = require("../authenticate");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await User.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json({ msg: "User removed" });
  } catch (err) {
    console.error("Error deleting user:", err.message);
    res.status(500).send("Server Error");
  }
});

router.post(
  "/",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  authenticate,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, role } = req.body;

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        username,
        password: hashedPassword,
        role,
      });
      const user = await newUser.save();
      res.json(user);
    } catch (err) {
      console.error("Error saving user:", err.message);
      res.status(500).send("Server Error");
    }
  }
);
module.exports = router;
