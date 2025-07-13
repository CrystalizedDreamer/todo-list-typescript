import React from 'react';
import TodoItem from './TodoItem';

type Todo = {
  id: number;
  task: string;
  completed: boolean;
};

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete }) => (
  <>
    {todos.map((todo) => (
      <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
    ))}
  </>
);

export default TodoList;
