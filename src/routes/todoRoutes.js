const express = require("express");
const {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");
const validateToken = require("../middlewares/authMiddleware");

const router = express.Router();

// Protect these routes by requiring a valid token
router.use(validateToken);

// Define routes
router.post("/", createTodo); // Create a new todo
router.get("/", getTodos); // Get all todos for the authenticated user
router.get("/:id", getTodoById); // Get a single todo by ID
router.put("/:id", updateTodo); // Update a todo by ID
router.delete("/:id", deleteTodo); // Delete a todo by ID

module.exports = router;
