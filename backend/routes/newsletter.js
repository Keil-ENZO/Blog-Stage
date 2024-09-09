const express = require("express");
const router = express.Router();
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const apiKey = process.env.BREVO_API_KEY || "your-api-key-here";
const listId = process.env.BREVO_LIST_ID || 2;

// Route API pour gérer l'abonnement à la newsletter
router.post("/", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    await axios.post(
      "https://api.brevo.com/v3/contacts",
      {
        email: email,
        listIds: [listId],
      },
      {
        headers: {
          "api-key": apiKey,
          "Content-Type": "application/json",
        },
      }
    );

    return res.status(200).json({ message: "Subscription successful" });
  } catch (error) {
    console.error("Subscription error:", error);
    return res
      .status(500)
      .json({ message: "Subscription failed", error: error.message });
  }
});

module.exports = router;
