const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const Article = require("../models/Article");
const authenticate = require("../authenticate");
const axios = require("axios");

// Configure multer pour gérer les fichiers en mémoire
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const apiKey = process.env.BREVO_API_KEY || "your-api-key-here";
const listId = process.env.BREVO_LIST_ID || 2;
const templateId = process.env.BREVO_TEMPLATE_ID || 1;

// Route pour uploader une image avec redimensionnement
router.post("/upload-image", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    // Taille souhaitée pour l'image
    const width = 345;
    const height = 190;

    // Upload sur Cloudinary avec redimensionnement
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
            width: width, // Largeur de l'image
            height: height, // Hauteur de l'image
            crop: "limit", // Technique de recadrage
          },
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
              return reject(error);
            }
            resolve(result);
          }
        )
        .end(req.file.buffer);
    });

    // Réponse avec l'URL de l'image redimensionnée
    res.json({ imageUrl: result.secure_url });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ message: "Image upload failed", error });
  }
});

// Fonction pour envoyer des emails
const sendEmailToSubscribers = async (title, link) => {
  try {
    // Récupérer tous les abonnés de la liste
    const { data: subscribers } = await axios.get(
      `https://api.brevo.com/v3/contacts/lists/${listId}/contacts`,
      {
        headers: {
          "api-key": apiKey,
        },
      }
    );

    // Récupérer les emails des abonnés
    const emails = subscribers.contacts.map((contact) => contact.email);

    // Envoyer l'email à tous les abonnés
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { name: "Enzo", email: "enzo.keil06@icloud.com" },
        to: emails.map((email) => ({ email })),
        templateId: templateId,
        params: {
          titleArticle: title,
          linkArticle: link,
          linkBlog: `https://keilenzoblog.fr/`,
        },
      },
      {
        headers: {
          "api-key": apiKey,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Email envoyé avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'envoi des emails:", error);
  }
};

// Route pour créer un nouvel article
router.post("/", authenticate, async (req, res) => {
  const { title, content, tags, img, likes, tips } = req.body;

  if (!title || !content || !tags || !tips) {
    return res
      .status(400)
      .json({ message: "Title, content, and tags are required" });
  }

  try {
    const newArticle = new Article({
      title,
      content,
      tags,
      img,
      likes,
      tips,
      created: new Date(),
      updated: new Date(),
    });

    const article = await newArticle.save();

    await sendEmailToSubscribers(
      article.title,
      `https://keilenzoblog.fr/article?id=${article._id}`
    );

    res.status(201).json(article);
  } catch (err) {
    console.error("Error saving article:", err.message);
    res
      .status(500)
      .json({ message: "Error saving article", error: err.message });
  }
});

// Route pour obtenir tous les articles
router.get("/", async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    console.error("Error fetching articles:", err.message);
    res.status(500).send("Server Error");
  }
});

// Route pour obtenir un article par ID
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

router.delete("/:id", async (req, res) => {
  try {
    const result = await Article.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json({ msg: "User removed" });
  } catch (err) {
    console.error("Error deleting user:", err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
