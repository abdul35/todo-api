const Todo = require('../models/todo.model')

const getListTodo = async () => {
    try {
        return await Todo.findAll({raw: true});
    } catch (error) {
        throw Error(error.message)
    }
}

const getTodoById = async (id) => {
    try {
        return await Todo.findOne({ where: {id}, raw: true })
    } catch (error) {
        throw Error(error)
    }
}

const createTodo = async (todo) => {
    try {
        return await Todo.create(todo, { raw: true })
    } catch (error) {
        throw Error(error.message)
    }
}

const updateTodoById = async (todo) => {
    try {
        console.log('todo-----', todo);
        return await Todo.update(
            todo,
            {where: { id : todo.id }}
            )
    } catch (error) {
        throw Error(error.message)
    }
}

const deleteTodoById = async (id) => {
    try {
        return await Todo.destroy({where: {id}})
    } catch (error) {
        throw Error(error)
    }
}

module.exports = {
    getListTodo,
    getTodoById,
    deleteTodoById,
    updateTodoById,
    createTodo
}