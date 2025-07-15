import React from 'react';

// Type definition for a single todo item
type Todo = {
  id: number;
  task: string;
  completed: boolean;
};

// Props for the TodoItem component
interface TodoItemProps {
  todo: Todo;
  onUpdate: (updated: Todo) => void;
  onRemove: (id: number) => void;
  onSelect: (todo: Todo) => void;
}

// Component to render a single todo item
const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdate, onRemove, onSelect }) => {
  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    onUpdate({ ...todo, completed: !todo.completed });
  };
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onRemove(todo.id);
  };
  return (
    <div className='d-flex align-items-center'>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
      />
      <span
        className={`mx-2 todo-item-text${todo.completed ? ' todo-item-completed' : ''}`}
        onClick={() => onSelect(todo)}
      >
        {todo.task}
      </span>
      <button
        className="ms-auto"
        onClick={handleDelete}
      >
        X
      </button>
    </div>
  );
};

export default TodoItem;
