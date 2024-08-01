const express = require("express");
const connectDB = require("./config/database");
const csrf = require("csrf");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

connectDB(); // Connexion à MongoDB

const app = express();
const PORT = process.env.PORT || 3001;

const tokens = new csrf();
const csrfSecret = tokens.secretSync(); // Génération du secret CSRF

app.use(helmet()); // Sécurité des en-têtes HTTP
app.use(morgan("combined")); // Journalisation des requêtes HTTP
app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 })); // Configuration CORS

app.use(express.json()); // Parse JSON payloads
app.use(cookieParser()); // Parse cookies

// Middleware pour protéger les routes avec CSRF
app.use((req, res, next) => {
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

// Route pour obtenir le token CSRF
app.get("/csrf-token", (req, res) => {
  const token = tokens.create(csrfSecret);
  res.cookie("_csrf", token); // Définit le cookie avec le token CSRF
  res.json({ csrfToken: token }); // Retourne le token CSRF
});

// Routes API
app.use("/api/article", require("./routes/article"));
app.use("/api/tag", require("./routes/tag"));

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
