import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchTodos as fetchTodosApi,
  createTodo as createTodoApi,
  updateTodo as updateTodoApi,
  deleteTodo as deleteTodoApi,
} from "../../api/todoApi";
import { TodoState, Todo } from "../../types";

// Определение состояния

const initialState: TodoState = {
  todos: [],
  loading: { add: 0, delete: 0, update: 0, todosAll: 0 },
  error: null,
};

// Создание асинхронных действий
export const fetchTodosAsync = createAsyncThunk<Todo[], void>(
  "todos/fetchTodos",
  async () => {
    return await fetchTodosApi();
  }
);

export const createTodoAsync = createAsyncThunk(
  "todos/createTodo",
  async (newTodo: { completed: boolean; text: string }) => {
    const todoWithId = { id: Date.now().toString(), ...newTodo };
    return await createTodoApi(todoWithId);
  }
);

export const updateTodoAsync = createAsyncThunk(
  "todos/updateTodo",
  async (id: string) => {
    return await updateTodoApi(id);
  }
);

export const deleteTodoAsync = createAsyncThunk(
  "todos/deleteTodo",
  async (id: string) => {
    return await deleteTodoApi(id);
  }
);

// Создание среза
const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodosAsync.pending, (state) => {
        state.loading.todosAll = 1;
      })
      .addCase(
        fetchTodosAsync.fulfilled,
        (state, action: PayloadAction<Todo[]>) => {
          state.loading.todosAll = 0;
          state.todos = action.payload;
        }
      )
      .addCase(fetchTodosAsync.rejected, (state, action) => {
        state.loading.todosAll = 0;
        state.error = action.error?.message || null;
      })
      .addCase(createTodoAsync.pending, (state) => {
        state.loading.add = 1;
      })
      .addCase(
        createTodoAsync.fulfilled,
        (state, action: PayloadAction<Todo>) => {
          state.loading.add = 0;
          state.todos.push(action.payload);
        }
      )
      .addCase(createTodoAsync.rejected, (state, action) => {
        state.loading.add = 0;
        state.error = action.error?.message || null;
      })
      .addCase(updateTodoAsync.pending, (state) => {
        state.loading.update = 1;
      })
      .addCase(
        updateTodoAsync.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading.update = 0;
          state.todos = state.todos.map((todo) =>
            todo.id === action.payload
              ? { ...todo, completed: !todo.completed }
              : todo
          );
        }
      )
      .addCase(updateTodoAsync.rejected, (state, action) => {
        state.loading.update = 0;
        state.error = action.error?.message || null;
      })

      .addCase(deleteTodoAsync.pending, (state) => {
        state.loading.delete = 1;
      })
      .addCase(
        deleteTodoAsync.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading.delete = 0;
          state.todos = state.todos.filter(
            (todo) => todo.id !== action.payload
          );
        }
      )
      .addCase(deleteTodoAsync.rejected, (state, action) => {
        state.loading.delete = 0;
        state.error = action.error?.message || null;
      });
  },
});

export default todoSlice.reducer;
