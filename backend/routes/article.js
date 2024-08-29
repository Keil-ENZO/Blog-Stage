const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const Article = require("../models/Article");
const authenticate = require("../authenticate");

// Configure multer pour gérer les fichiers en mémoire
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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

// Route pour créer un nouvel article
router.post("/", authenticate, async (req, res) => {
  const { title, content, tags, img, likes } = req.body;

  // Validation des données reçues
  if (!title || !content || !tags) {
    return res
      .status(400)
      .json({ message: "Title, content, and tags are required" });
  }

  try {
    const newArticle = new Article({
      title,
      content,
      tags,
      img, // Assure-toi que l'URL de l'image est bien incluse
      likes,
      created: new Date(),
      updated: new Date(),
    });

    const article = await newArticle.save();
    res.status(201).json(article); // Envoie la réponse avec un code de statut 201 (Créé)
  } catch (err) {
    console.error("Error saving article:", err.message);
    res
      .status(500)
      .json({ message: "Error saving article", error: err.message });
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
