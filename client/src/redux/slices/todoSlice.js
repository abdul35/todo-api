import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const todos = [
  {
    id: 1,
    title: "Some text",
    desc: "Lorem5  daw12dawd 13rfawd",
    completed: false,
  },
  {
    id: 2,
    title: "Lorem ipsum dolor sit.",
    desc: "Lorf12em5  daw12321awdawd awd",
    completed: true,
  },
  {
    id: 3,
    title: "Lorem ipsum dolor 1.",
    desc: "Lorem5  dwadwdawd awd",
    completed: false,
  },
  {
    id: 4,
    title: "Lorem ipsum dolor3334",
    completed: true,
    desc: "L12f12forem5  dawddawdawd awd",
  },
];

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:4000/list");
      const data = await res.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createTodo = createAsyncThunk(
  "todos/createTodd",
  async (todo, { rejectWithValue, dispatch }) => {
    try {
      const res = await fetch("http://localhost:4000/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });

      if (!res.ok) {
        throw new Error("Can't add task. Server error.");
      }

      dispatch(addTodo(todo));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleStatus = createAsyncThunk(
  "todos/toggleStatus",
  async (id, { rejectWithValue, dispatch, getState }) => {
    const todo = getState().todos.todos.find((todo) => todo.id === id);

    try {
      const res = await fetch(`http://localhost:4000/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !todo.completed,
        }),
      });

      if (!res.ok) {
        throw new Error("Can't toggle status. Server error.");
      }

      dispatch(completeTodo(id));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await fetch(`http://localhost:4000/delete/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Can't delete task. Server error.");
      }

      dispatch(removeTodo(id));
    } catch (error) {}
  }
);

export const todoUpdate = createAsyncThunk(
  'todos/todoUpdate',
  async (todo, {rejectWithValue, dispatch}) => {
    try {
      const res = await fetch(`http://localhost:4000/update/${todo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo)

      })
      if (!res.ok) {
        throw new Error("Cant update todo. Server error.")
      }
      dispatch(updateTodo(todo))
      
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const todoSilce = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    loading: false,
    errors: null,
  },
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },

    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },

    completeTodo: (state, action) => {
      const foundTodo = state.todos.find((todo) => todo.id === action.payload);
      foundTodo.completed = !foundTodo.completed;
    },

    updateTodo: (state, action) => {
      state.todos = state.todos.map((item) => {
        if (item.id !== action.payload.id) return item;

        return {
          ...item,
          ...action.payload,
        };
      });
    },
  },
  extraReducers: {
    [fetchTodos.panding]: (state) => {
      state.loading = true;
    },
    [fetchTodos.fulfilled]: (state, action) => {
      state.todos = action.payload.todos;
      state.loading = false;
    },
    [fetchTodos.rejected]: (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    },
  },
});

export const { addTodo, removeTodo, completeTodo, updateTodo } =
  todoSilce.actions;

export default todoSilce.reducer;
