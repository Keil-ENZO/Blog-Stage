const express = require("express");
const connectDB = require("./config/database");
const connectCloudinary = require("./config/cloudinary");
const csrf = require("csrf");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

connectDB(); // Connecter à MongoDB
connectCloudinary(); // Connecter à Cloudinary

const app = express();
const PORT = process.env.PORT || 3001;

const tokens = new csrf();
const csrfSecret = tokens.secretSync(); // Générer un secret pour la protection CSRF

app.use(helmet()); // Sécuriser les en-têtes HTTP
app.use(morgan("combined")); // Journaliser les requêtes HTTP
app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 })); // Autoriser CORS

app.use(express.json()); // Analyser les payloads JSON
app.use(cookieParser()); // Analyser les cookies

// Middleware pour la protection CSRF
app.use((req, res, next) => {
  // Exclure certaines routes de la vérification CSRF
  if (req.path.startsWith("/api/article/upload-image")) {
    return next();
  }

  if (req.path === "/api/auth") {
    return next();
  }

  if (req.path === "/api/newsletter") {
    return next();
  }

  if (
    req.method === "GET" ||
    req.method === "HEAD" ||
    req.method === "OPTIONS"
  ) {
    return next();
  }

  const token = req.headers["x-csrf-token"] || req.cookies._csrf;
  if (!token || !tokens.verify(csrfSecret, token)) {
    return res.status(403).send("Invalid CSRF token");
  }
  next();
});

// Route pour obtenir le jeton CSRF
app.get("/api/csrf-token", (req, res) => {
  const token = tokens.create(csrfSecret);
  res.cookie("_csrf", token); // Définir le jeton CSRF dans le cookie
  res.json({ csrfToken: token }); // Envoyer le jeton CSRF dans la réponse
});

// Routes API
app.use("/api/article", require("./routes/article"));
app.use("/api/tag", require("./routes/tag"));
app.use("/api/company", require("./routes/company"));
app.use("/api/admin", require("./routes/user"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/newsletter", require("./routes/newsletter"));

// Middleware pour la gestion des erreurs
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
