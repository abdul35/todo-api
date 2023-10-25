const TodoService = require("../services/todo.service");

const list = async (req, res) => {
  try {
    const todos = await TodoService.getListTodo();

    return res.status(201).json({ todos });
  } catch (error) {
    res.status(501).send("Server error...");
    throw Error(error.message);
  }
};

const getTodo = async (req, res) => {
  try {
    const id = req.params.id && parseInt(req.params.id);
    const foundTodo = await TodoService.getTodoById(id);

    if (foundTodo) {
      return res.status(201).json({
        todo: foundTodo,
      });
    }
    return res.json({
      msg: "Todo is not exist!",
    });
  } catch (error) {
    res.status(501).send("Server error...");
    throw Error(error.message);
  }
};

const createTodo = async (req, res) => {
  try {
    const { title, desc, completed } = req.body;

    const newTodo = {
      title,
      desc,
      completed,
    };

    const result = await TodoService.createTodo(newTodo);

    res.status(201).json({
      msg: "Todo created succesfully!",
      todo: {
        ...result.dataValues,
      },
    });
  } catch (error) {
    res.status(501).send("Server error...");
    throw Error(error.message);
  }
};

const updateTodo = async (req, res) => {
  try {
    const id = req.params.id && parseInt(req.params.id);
    if (id) {
      const todo = await TodoService.getTodoById(id);

      if (todo) {
        await TodoService.updateTodoById({ ...req.body, id });

        return res.json({
          messgae: "Todo updated!",
        });
      }
      return res.status(404).json({ msg: "Todo is not exist" });
    }
    return res.status(404).json({ msg: "Id todo don't sent" });
  } catch (error) {
    res.status(501).send("Server error...");
    throw Error(error);
  }
};

const deleteTodo = async (req, res) => {
  try {
    const idTodo = req.params.id && parseInt(req.params.id);
    const foundTodo = await TodoService.getTodoById(idTodo);

    if (idTodo && foundTodo) {
        await TodoService.deleteTodoById(foundTodo.id)
      return res.status(201).json({
        msg: "Todo deleted!",
      });
    }
    return res.status(404).end("The task is not found");
  } catch (error) {
    res.status(501).send("Server error...");
    throw error;
  }
};

module.exports = { list, getTodo, createTodo, updateTodo, deleteTodo };
