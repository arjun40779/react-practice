import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const STORAGE_KEY = "todos";

function isTodo(value: unknown): value is Todo {
  if (typeof value !== "object" || value === null) return false;

  const todo = value as Record<string, unknown>;
  return (
    typeof todo.id === "number" &&
    typeof todo.text === "string" &&
    typeof todo.completed === "boolean"
  );
}

function loadTodos(): Todo[] {
  const storedTodos = localStorage.getItem(STORAGE_KEY);
  if (storedTodos === null) return [];

  const parsed: unknown = JSON.parse(storedTodos);
  if (!Array.isArray(parsed) || !parsed.every(isTodo)) {
    throw new Error("Saved todos have an invalid format.");
  }

  return parsed;
}

const todosSlice = createSlice({
  name: "todos",
  initialState: loadTodos(),
  reducers: {
    addTodo(state, action: PayloadAction<Todo>) {
      state.push(action.payload);
    },
    updateTodo(state, action: PayloadAction<Todo>) {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) state[index] = action.payload;
    },
    removeTodo(state, action: PayloadAction<number>) {
      return state.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { addTodo, removeTodo, updateTodo } = todosSlice.actions;
export default todosSlice.reducer;
