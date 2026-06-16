const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const authMiddleware = require("./middleware/authMiddleware");

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "This is protected data 🔐",
    userId: req.user.id
  });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log("MongoDB Error:", err));

const authRoutes = require("./routes/auth");
const doubtRoutes = require("./routes/doubts");
app.use("/api/auth", authRoutes);
app.use("/api/doubts", doubtRoutes);

app.get("/", (req, res) => {
  res.send("QuickLearn Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});