const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Article = require("../models/Article");
const authenticate = require("../authenticate");

router.get("/", async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    console.error("Error fetching articles:", err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ msg: "Article not found" });
    }
    res.json(article);
  } catch (err) {
    console.error("Error fetching article:", err.message);
    res.status(500).send("Server Error");
  }
});

router.post(
  "/",
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("content").notEmpty().withMessage("Content is required"),
    body("tags").notEmpty().withMessage("Tags is required"),
  ],
  authenticate,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, tags, img } = req.body;
    try {
      const newArticle = new Article({
        title,
        content,
        tags,
        img,
        likes,
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
