'use client';
import React, { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';


function CreateTodoForm() {
  const supabase = createClientComponentClient();

  const [title, setTitle] = useState('');
  const [rating, setRating] = useState('');
  const [formError, setFormError] = useState(null);
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);

  // Fetch todos on load
  useEffect(() => {
    fetchTodos();
  }, []);

   

  const fetchTodos = async () => {
    const { data, error } = await supabase
      .from('todolist')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.error('Fetch error:', error);
    } else {
      setTodos(data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || rating === '') {
      setFormError('Please fill in all fields');
      return;
    }

    if (editId) {
      // Update existing todo
      const { error } = await supabase
        .from('todolist')
        .update({ title: title.trim(), rating: Number(rating) })
        .eq('id', editId);

      if (error) {
        setFormError(error.message);
      } else {
        setFormError(null);
        setEditId(null);
        setTitle('');
        setRating('');
        fetchTodos();
      }
    } else {
      // Insert new todo
      const { error } = await supabase
        .from('todolist')
        .insert([{ title: title.trim(), rating: Number(rating), completed: false }]);

      if (error) {
        setFormError(error.message);
      } else {
        setFormError(null);
        setTitle('');
        setRating('');
        fetchTodos();
      }
    }
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from('todolist').delete().eq('id', id);

    if (error) {
      console.error('Delete error:', error);
    } else {
      fetchTodos();
    }
  };

  const handleEdit = (todo) => {
    setEditId(todo.id);
    setTitle(todo.title);
    setRating(todo.rating.toString());
  };

  const toggleComplete = async (id, currentStatus) => {
    const { error } = await supabase
      .from('todolist')
      .update({ completed: !currentStatus })
      .eq('id', id);

    if (error) {
      console.error('Toggle complete error:', error);
    } else {
      fetchTodos();
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-center text-2xl mb-4">This is Todo App</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block font-medium">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="rating" className="block font-medium">Rating</label>
          <input
            type="number"
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="py-2 px-4 rounded-2xl border-2 border-[#D6DDEB] bg-[#4A42A3] hover:bg-[#5A53A9] text-white"
        >
          {editId ? 'Update Todo' : 'Save Todo'}
        </button>

        {formError && <p className="text-red-500 mt-2">{formError}</p>}
      </form>

      {/* Display Todos */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">All Todos</h2>
        {todos.length === 0 ? (
          <p>No todos found.</p>
        ) : (
          <ul className="space-y-4">
            {todos.map((todo) => (
              <li key={todo.id} className="border p-4 rounded bg-gray-50">
                <p className="text-black"><strong>Title:</strong> {todo.title}</p>
                <p className="text-black"><strong>Rating:</strong> {todo.rating}</p>
                <p className="text-black">
                  <strong>Status:</strong>{' '}
                  <span className={todo.completed ? 'text-green-600' : 'text-yellow-600'}>
                    {todo.completed ? 'Completed' : 'Not Completed'}
                  </span>
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <button
                    onClick={() => handleEdit(todo)}
                    className="text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => toggleComplete(todo.id, todo.completed)}
                    className={`text-sm px-3 py-1 rounded ${
                      todo.completed
                        ? 'bg-yellow-500 hover:bg-yellow-600'
                        : 'bg-green-500 hover:bg-green-600'
                    } text-white`}
                  >
                    {todo.completed ? 'Mark as Not Completed' : 'Mark as Completed'}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
       
    </div>
  );
}

export default CreateTodoForm;
