import React, { useState } from "react";
import { UseSelector, useDispatch } from "react-redux";
import { addTodo, todoDelete, todoComplete } from "./store/todoSlice";

function Todo() {
  const [todoText, setTodoText] = useState("");

  return (
    <div>
      <input
        type="text"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
      />
    </div>
  );
}

export default Todo;
