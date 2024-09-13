const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Company = require("../models/Company");
const authenticate = require("../authenticate");

router.get("/", async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (err) {
    console.error("Error fetching companies:", err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ msg: "Company not found" });
    }
    res.json(company);
  } catch (err) {
    console.error("Error fetching company:", err.message);
    res.status(500).send("Server Error");
  }
});

router.post(
  "/",
  [body("name").notEmpty().withMessage("Name is required")],
  [body("description").notEmpty().withMessage("Description is required")],
  [body("city").notEmpty().withMessage("City is required")],
  [body("country").notEmpty().withMessage("Country is required")],
  [body("director").notEmpty().withMessage("Director is required")],
  [body("dateDuring").notEmpty().withMessage("DateDuring is required")],
  [body("imgUrl").notEmpty().withMessage("Img is required")],
  authenticate,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, city, country, director, dateDuring, imgUrl } =
      req.body;
    try {
      const newCompany = new Company({
        name,
        description,
        city,
        country,
        director,
        dateDuring,
        imgUrl,
      });
      const company = await newCompany.save();
      res.json(company);
    } catch (err) {
      console.error("Error saving company:", err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
