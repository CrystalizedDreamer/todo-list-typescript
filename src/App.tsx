import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import AuthButtons from './components/AuthButtons';
import TodoList from './components/TodoList';
import TodoInput from './components/TodoInput';
import { useTodoContext } from './context/TodoContext';

const App: React.FC = () => {
  const { isAuthenticated } = useAuth0();
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodoContext();
  const [newTask, setNewTask] = React.useState('');

  const handleAddTodo = () => {
    addTodo(newTask);
    setNewTask('');
  };

  return (
    <div className='todo-list'>
      <AuthButtons />
      {isAuthenticated && (
        <>
          <h2 className='title'>Your Todo List</h2>
          <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
          <TodoInput value={newTask} onChange={(e) => setNewTask(e.target.value)} onAdd={handleAddTodo} />
        </>
      )}
    </div>
  );
};

export default App;