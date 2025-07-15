import React from 'react';
import TodoItem from './TodoItem';

// Type definition for a single todo item
type Todo = {
  id: number;
  task: string;
  completed: boolean;
};

// Props for the TodoList component
interface TodoListProps {
  todos: Todo[];
  onUpdate: (updated: Todo) => void;
  onRemove: (id: number) => void;
}

// Component to render the list of todos
import TodoModal from './TodoModal';

const TodoList: React.FC<TodoListProps> = ({ todos, onUpdate, onRemove }) => {
  const [selectedTodo, setSelectedTodo] = React.useState<Todo | null>(null);
  const [showModal, setShowModal] = React.useState(false);

  const handleSelect = (todo: Todo) => {
    setSelectedTodo(todo);
    setShowModal(true);
  };

  return (
    <>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdate={onUpdate}
          onRemove={onRemove}
          onSelect={handleSelect}
        />
      ))}
      {showModal && selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          show={showModal}
          onClose={() => setShowModal(false)}
          onSave={updatedTodo => {
            onUpdate(updatedTodo);
            setSelectedTodo(updatedTodo);
          }}
        />
      )}
    </>
  );
};

export default TodoList;
