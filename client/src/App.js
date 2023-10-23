import { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import { styled } from "styled-components";
import TodoAddInput from "./components/TodoAddInput";
import TodoDescInput from "./components/TodoDescInput";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, fetchTodos, createTodo } from "./redux/slices/todoSlice";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;
const Button = styled.button`
  padding: 5px 9px;
  font-size: 1rem;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  background-color: lightgreen;
`;

const SearchInput = styled.input`
  padding: 5px 8px;
  font-size: 1rem;
  margin-top: 2rem;
`;

function App() {
  const { todos } = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoDesc, setNewTodoDesc] = useState("");
  const [searchTodo, setSearchTodo] = useState("");
  const addHandler = () => {
    if (newTodoTitle && newTodoTitle.trim())
      dispatch(
        createTodo({
          id: Date.now(),
          title: newTodoTitle,
          desc: newTodoDesc,
          completed: false,
        })
      );
    setNewTodoTitle("");
    setNewTodoDesc("");
  };

  useEffect(() => {
    dispatch(fetchTodos())
  }, [])
  

  return (
    <div className="App">
      <header className="header">
        <Container>
          <h1>Todo List App</h1>
        </Container>
        <Container>
          <TodoAddInput
            newTodoTitle={newTodoTitle}
            setNewTodoTitle={setNewTodoTitle}
          />
          <TodoDescInput newTodoDesc={newTodoDesc} setNewTodoDesc={setNewTodoDesc} />
          <Button onClick={() => addHandler()}>Add</Button>
        </Container>

        <Container>
          <div>
            <SearchInput
              className="search-input"
              onChange={(e) => setSearchTodo(e.target.value)}
              type="text"
              placeholder="search todo..."
            />
          </div>
        </Container>
      </header>
      <main className="main">
        <Container>
          <div className="todo">
            <TodoList
              todos={Array.isArray(todos) && todos.filter((todo) =>
                todo.title.toLowerCase().includes(searchTodo.toLowerCase()) 
              )}
            />
          </div>
        </Container>
      </main>
    </div>
  );
}

export default App;
