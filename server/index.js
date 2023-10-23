const express = require("express");
const app = express();
const cors = require("cors");
const { body } = require("express-validator");
const PORT = 4000;

app.use(cors());
app.use(express.json());

let todos = [];

const createValideFilter = [
  body("title").trim().notEmpty(),
  body("complited").trim().isBoolean(),
  body("desc").optional().trim().notEmpty(),
];
const updValideFilter = [];

app.get("/", (req, res) => {
  res.send("Hello from todo server.");
});

app.get("/list", (req, res) => {
  return res.status(201).json({
    todos
  });
});

app.get("/todo/:id", (req, res) => {
	const id = req.params.id && parseInt(req.params.id)
	const foundTodo = todos.find((todo) => todo.id === id)

	if (foundTodo) {
		return res.status(201).json({
			todo: foundTodo
		})
	}
	return res.json({
		msg: "Todo is not exist!"
	})
})

app.post("/create", createValideFilter, (req, res) => {
  const { title, desc, completed } = req.body;

  const newTodo = {
    id: Date.now(),
    title,
    desc: desc || "",
    completed,
  };

  todos.push(newTodo);

  res.status(201).json({
    msg: "Todo created succesfully!",
    todo: {
      id: newTodo.id,
    },
  });
});

app.put("/update/:id", updValideFilter, (req, res) => {
  const id = req.params.id && parseInt(req.params.id);
  if (id) {
    const todoIndex = todos.findIndex((todo) => todo.id === id);

    if (todoIndex >= 0) {
      todos[todoIndex] = {...todos[todoIndex], ...req.body}

      return res.json({
        messgae: "Todo updated!",
        todo: {
          id: id,
        },
      });
    }
    return res.status(404).json({ msg: "Todo is not exist" });
  }
  return res.status(404).json({ msg: "Id todo don't sent" });
});

app.delete("/delete/:id", (req, res) => {
  const idTodo = req.params.id && parseInt(req.params.id);
  const foundTodo = todos.find((todo) => todo.id === idTodo);

  if (idTodo && foundTodo) {
    todos = todos.filter((todo) => todo.id !== idTodo);
    return res.status(201).json({
      msg: "Todo deleted!"
    });
  }
  return res.status(404).end("The task is not found");
});


app.listen(PORT, () => {
  console.log(`Server started at ${PORT} port`);
});
