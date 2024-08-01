// Middleware d'authentification (exemple)
function Authenticate(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Unauthorized");
  if (token !== "VALID_TOKEN") return res.status(403).send("Forbidden");
  next();
}

module.exports = Authenticate;
