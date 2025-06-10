"use client";
import { useState } from "react";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

  const handleAddTodo = () => {
    // Checks if the newTodo if not empty add on the list using spred operator
    if (newTodo.trim() === "") return;
    setTodos([...todos, newTodo.trim()]);
    setNewTodo("");
  };

  // Function to delete a todo item by filtering out the item at the specified index
  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  // Function to set the editing index and text when the edit button is clicked
  // It updates the editingIndex state to the index of the todo being edited
  const handleEditTodo = (index) => {
    setEditingIndex(index);
    setEditingText(todos[index]);
  };

  // Function to update the todo item at the editing index with the new text
  // It checks if the editingText is not empty, then maps through the todos to update the specific item
  const handleUpdateTodo = () => {
    if (editingText.trim() === "") return;
    const updatedTodos = todos.map((todo, i) =>
      i === editingIndex ? editingText.trim() : todo
    );
    setTodos(updatedTodos);
    setEditingIndex(null);
    setEditingText("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl text-black font-bold mb-4 text-center">Todo App</h1>
        <div className="flex mb-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="flex-grow border text-black rounded-l-lg p-2 focus:outline-none"
            placeholder="Enter a new task"
          />
          <button
            onClick={handleAddTodo}
            className="bg-blue-500 text-black px-4 rounded-r-lg hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {todos.map((todo, index) => (
            <li
              key={index}
              className="flex items-center text-black justify-between border rounded-lg p-2 bg-gray-50"
            >
              {editingIndex === index ? (
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="flex-grow mr-2 text-black border p-1 rounded"
                />
              ) : (
                <span className="flex-grow text-black mr-2 hyphens-auto">{todo}</span>
              )}
              {editingIndex === index ? (
                <button
                  onClick={handleUpdateTodo}
                  className="bg-green-500 text-black px-2 py-1 rounded hover:bg-green-600"
                >
                  Save
                </button>
              ) : (
                <>
                  <button
                    onClick={() => handleEditTodo(index)}
                    className="bg-yellow-500 text-black px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTodo(index)}
                    className="bg-red-500 text-black px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}