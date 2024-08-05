const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Tag = require("../models/Tag");
const authenticate = require("../authenticate");

router.get("/", async (req, res) => {
  try {
    const tags = await Tag.find();
    res.json(tags);
  } catch (err) {
    console.error("Error fetching tags:", err.message);
    res.status(500).send("Server Error");
  }
});

router.post(
  "/",
  [body("name").notEmpty().withMessage("Name is required")],
  authenticate,
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
