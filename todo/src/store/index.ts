import { configureStore } from "@reduxjs/toolkit";
import { todoReducer, addTodo, todoDelete, todoComplete } from "./todoSlice";

const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

export { store };
