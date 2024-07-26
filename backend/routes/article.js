const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Article = require("../models/Article");

// Middleware d'authentification (exemple)
const authenticate = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Unauthorized");
  if (token !== "VALID_TOKEN") return res.status(403).send("Forbidden");
  next();
};

// Route GET pour récupérer tous les articles
router.get("/", async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    console.error("Error fetching articles:", err.message);
    res.status(500).send("Server Error");
  }
});

// Route POST pour créer un nouvel article
router.post(
  "/",
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("content").notEmpty().withMessage("Content is required"),
  ],
  authenticate, // Assure-toi que ce middleware est appliqué
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content } = req.body;
    try {
      const newArticle = new Article({
        title,
        content,
        created: new Date(),
        updated: new Date(),
      });
      const article = await newArticle.save();
      res.json(article);
    } catch (err) {
      console.error("Error saving article:", err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
