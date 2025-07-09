
import React, { useState } from 'react';

type Todo = {
  id: number;
  task: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState<string>('');

  const addTodo = (): void => {
    if (newTask.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        task: newTask,
        completed: false,
      };

      setTodos([...todos, newTodo]);
      setNewTask('');
    }
  };

  const toggleTodo = (id: number): void => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number): void => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div className='todo-list'>
      <h2 className='title'>Your Todo List</h2>      
        {todos.map((todo) => (
          <div key={todo.id} className='d-flex align-items-center'>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
            >
              {todo.task}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>🗑️</button>
          </div>
        ))}
      
      <div className="input-group">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="form-control me-2"
        />
        <button onClick={addTodo} className="btn btn-primary">Add Todo</button>
      </div>
    </div>
  );
};

export default App;