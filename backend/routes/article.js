const express = require("express");
const router = express.Router();
const Article = require("../models/Article");

router.get("/", async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/", async (req, res) => {
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
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
