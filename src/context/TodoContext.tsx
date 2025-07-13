import { createContext, useContext, useState, } from 'react';
import type {ReactNode} from 'react';

export type Todo = {
  id: number;
  task: string;
  completed: boolean;
};

interface TodoContextType {
  todos: Todo[];
  addTodo: (task: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (task: string) => {
    if (task.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        task,
        completed: false,
      };
      setTodos((prev) => [...prev, newTodo]);
    }
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};
