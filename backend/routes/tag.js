const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Tag = require("../models/Tag");

// Middleware d'authentification (exemple)
const authenticate = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Unauthorized");
  if (token !== "VALID_TOKEN") return res.status(403).send("Forbidden");
  next();
};

// Route GET pour récupérer tous les tags
router.get("/", async (req, res) => {
  try {
    const tags = await Tag.find();
    res.json(tags);
  } catch (err) {
    console.error("Error fetching tags:", err.message);
    res.status(500).send("Server Error");
  }
});

// Route POST pour créer un nouveau tag
router.post(
  "/",
  [body("name").notEmpty().withMessage("Name is required")],
  authenticate, // Assure-toi que ce middleware est appliqué
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;
    try {
      const newTag = new Tag({
        name,
      });
      const tag = await newTag.save();
      res.json(tag);
    } catch (err) {
      console.error("Error saving tag:", err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
