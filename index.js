const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/growth", require("./routes/growthRoutes"));
app.use("/api/collection", require("./routes/collectionRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));
app.use("/api/reactions", require("./routes/reactionRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));

app.get("/", (req, res) => {
  res.json({ message: "Plant Pal API is running" });
});

const PORT = process.env.PORT || 5000;
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1);
  });
