import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, todoDelete, todoComplete } from "./store/todoSlice";

function App() {
  const [todoText, setTodoText] = useState("");
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (todoText) {
      dispatch(addTodo(todoText));
      setTodoText("");
    }
  };

  const handelComplete = (id) => {
    dispatch(todoComplete(id));
    console.log(id);
  };

  const handleDelete = (id) => {
    dispatch(todoDelete(id));
  };
  //
  const renderedTodo = todos.map((todo) => {
    return (
      <li key={todo.id} className="flex justify-between items-center py-2">
        {todo.todoText}{" "}
        <button
          onClick={() => handleDelete(todo.id)}
          className="bg-red-500 hover:bg-red-600 text-white font-blod py-2 px-4 rounded"
        >
          Delete
        </button>
        <button
          onClick={() => handelComplete(todo.id)}
          className={`${
            todo.completed ? "bg-green-500" : "bg-blue-500"
          } hover:bg-opacity-70 text-white font-bold py-2 px-4 rounded`}
        >
          {todo.completed ? "finshid" : "completed?"}
        </button>
      </li>
    );
  });

  return (
    <div className="container mx-auto my-10">
      <h1 className="text-center text-3xl font-semibold mb-4">To Do List</h1>
      <div className="flex items-center">
        <input
          type="text"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          className="flex-grow rounded-md border border-gray-300 py-1.5 px-4 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 focus:border-transparent sm:text-sm sm:leading-6"
          placeholder="Add a new todo..."
        />
        <button
          onClick={handleAddTodo}
          className="ml-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md"
        >
          Add Todo
        </button>
      </div>

      <div className="mt-4">
        <ul>{renderedTodo}</ul>
      </div>
    </div>
  );
}

export default App;
