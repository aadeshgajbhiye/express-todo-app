const express = require("express");
const {
  viewProfile,
  updateProfile,
} = require("../controllers/profileController");
const validateToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", validateToken, viewProfile); // Protect with validateToken middleware
router.put("/", validateToken, updateProfile); // Protect with validateToken middleware

module.exports = router;
