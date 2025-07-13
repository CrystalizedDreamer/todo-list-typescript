import React from 'react';

type Todo = {
  id: number;
  task: string;
  completed: boolean;
};

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => (
  <div className='d-flex align-items-center'>
    <input
      type="checkbox"
      checked={todo.completed}
      onChange={() => onToggle(todo.id)}
    />
    <span
      style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
      className='mx-2'
    >
      {todo.task}
    </span>
    <button onClick={() => onDelete(todo.id)}>🗑️</button>
  </div>
);

export default TodoItem;
