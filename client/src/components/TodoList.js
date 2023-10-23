import { TodoItem } from "./TodoItem";
import { styled } from "styled-components";

const UL = styled.ul`
  list-style: none;
  margin-left: 0;
  padding-left: 0;
`;

const TodoList = ({ todos, setTodo }) => {
  return (
    <UL className="todo-list">
      {Array.isArray(todos) && todos.map((todo) => (
        <TodoItem setTodo={setTodo} todos={todos} todo={todo} key={todo.id} />
      ))}
    </UL>
  );
};

export default TodoList;
