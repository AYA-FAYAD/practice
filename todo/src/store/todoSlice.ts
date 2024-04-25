import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface NewTodo {
  id: number;
  text: string;
  completed: boolean;
}

const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state: any, action: any) => {
      const newTodo = {
        id: Math.floor(Math.random() * 100),
        todoText: action.payload,
        completed: false,
      };

      state.push(newTodo);
    },

    todoComplete: (state: any, action: any) => {
      return state.map((todo) => {
        if (todo.id === action.payload)
          return { ...todo, completed: !todo.completed };
        return todo;
      });
    },

    todoDelete: (state: any, action: any) => {
      const todo = state.filter((todo) => todo.id !== action.payload);
      return todo;
    },
  },
});

export const { addTodo, todoComplete, todoDelete } = todoSlice.actions;
export const todoReducer = todoSlice.reducer;
