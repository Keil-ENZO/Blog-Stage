const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // Assurez-vous de définir cette variable dans .env

router.post(
  "/",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      const user = await User.findOne({ username });

      // Vérifiez si l'utilisateur existe et a le rôle d'admin
      if (!user || user.role !== "admin") {
        return res
          .status(400)
          .send("Invalid credentials or unauthorized access");
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).send("Invalid credentials");
      }

      const token = jwt.sign(
        { userId: user._id, role: user.role },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      res.status(200).json({ token }); // Envoyer le token dans la réponse JSON
    } catch (err) {
      console.error("Error during login:", err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
