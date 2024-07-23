const express = require("express");
const connectDB = require("./config/database");
const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.use("/api/article", require("./routes/article"));

app.get("/", (req, res) => {
  res.send("API Running for Blog-Stage");
});

app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}`);
});
