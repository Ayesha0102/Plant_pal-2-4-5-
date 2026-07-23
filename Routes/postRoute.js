const express = require("express");
const router = express.Router();
const {
  createPost,
  editPost,
  deletePost,
  getPosts,
} = require("../controllers/postController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", getPosts);
router.post("/", protect, createPost);
router.put("/:id", protect, editPost);
router.delete("/:id", protect, deletePost);

module.exports = router;