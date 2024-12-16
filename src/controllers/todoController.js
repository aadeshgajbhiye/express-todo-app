// Simulated TODO data
// const todos = [
//   {
//     _id: "1",
//     user: "test@example.com",
//     title: "Sample Todo",
//     completed: false,
//   },
// ];

exports.createTodo = async (req, res) => {
  const { title, description } = req.body;

  try {
    const newTodo = new Todo({
      user: req.user.id, // User from the token
      title,
      description,
    });

    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id }); // Find todos for the logged-in user
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id); // Find the todo by ID
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    if (todo.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to access this todo" });
    }
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateTodo = async (req, res) => {
  const { title, description, completed } = req.body;

  try {
    let todo = await Todo.findById(req.params.id); // Find the todo by ID
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (todo.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this todo" });
    }

    // Update the todo
    todo.title = title || todo.title;
    todo.description = description || todo.description;
    todo.completed = completed !== undefined ? completed : todo.completed;

    await todo.save(); // Save the updated todo
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id); // Find the todo by ID
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (todo.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this todo" });
    }

    await todo.remove(); // Remove the todo from the database
    res.status(204).send(); // No content response
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
