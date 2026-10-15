import {
  combineReducers,
  configureStore,
  createListenerMiddleware,
  isAnyOf,
} from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import { addTodo, removeTodo, updateTodo } from "../features/todos/todosSlice";
import todosReducer from "../features/todos/todosSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  todos: todosReducer,
});

const persistenceMiddleware =
  createListenerMiddleware<ReturnType<typeof rootReducer>>();

persistenceMiddleware.startListening({
  matcher: isAnyOf(addTodo, updateTodo, removeTodo),
  effect: (_action, listenerApi) => {
    localStorage.setItem("todos", JSON.stringify(listenerApi.getState().todos));
  },
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(persistenceMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
