const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");
const createValideFilter = require('../common/validators/createTodoValidator')


router.get("/", (req, res) => res.send("Hello from todo server."));

router.get("/list", todoController.list);

router.get("/todo/:id", todoController.getTodo);

router.post("/create", createValideFilter, todoController.createTodo);

router.put("/update/:id", todoController.updateTodo);

router.delete("/delete/:id", todoController.deleteTodo);

module.exports = router;
