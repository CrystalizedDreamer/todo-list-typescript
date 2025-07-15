import type { Todo } from './context/TodoContext';

// Import Bootstrap for styling
import 'bootstrap/dist/css/bootstrap.min.css';
// Import React core
import React from 'react';
// Import custom styles
import './App.css';
// Import Auth0 for authentication
import { useAuth0 } from '@auth0/auth0-react';
// Import modular components
import AuthButtons from './components/AuthButtons';
import TodoList from './components/TodoList';
// import TodoModal from './components/TodoModal';
import ListSelector from './components/ListSelector';
import ListTitle from './components/ListTitle';
import TodoInput from './components/TodoInput';
import TaskCreateModal from './components/TaskCreateModal';



// Main App component
const App: React.FC = () => {
  // State for the create task modal
  const [showCreateModal, setShowCreateModal] = React.useState(false);

  // State for all todo lists
  const [todoLists, setTodoLists] = React.useState<{ name: string; todos: Todo[] }[]>([
    { name: 'Default List', todos: [] }
  ]);

  // State for which list is active
  const [activeListIndex, setActiveListIndex] = React.useState(0);
  // State for new list name input
  const [newListName, setNewListName] = React.useState('');

  // Handler to create a new task in the active list
  const handleCreateTask = (title: string, description: string) => {
    setTodoLists(prevLists => prevLists.map((list, idx) =>
      idx === activeListIndex
        ? {
            ...list,
            todos: [
              ...list.todos,
              {
                id: Date.now(),
                task: title,
                description,
                completed: false
              }
            ]
          }
        : list
    ));
  };

  // Handler to add a new list
  const handleAddList = () => {
    if (newListName.trim() !== '') {
      setTodoLists([...todoLists, { name: newListName, todos: [] }]);
      setNewListName('');
    }
  };
  // Get authentication state from Auth0
  const { isAuthenticated } = useAuth0();
  // Remove global todos, all task management is per-list




  // Handler to switch active list
  const handleSelectList = (index: number) => {
    setActiveListIndex(index);
  };

  // Handler to delete a todo list
  const handleDeleteList = (index: number) => {
    if (todoLists.length <= 1) return;
    let newActiveIndex = activeListIndex;
    if (index === activeListIndex) {
      newActiveIndex = 0;
    } else if (index < activeListIndex) {
      newActiveIndex = activeListIndex - 1;
    }
    setTodoLists(todoLists.filter((_, i) => i !== index));
    setActiveListIndex(newActiveIndex);
  };


  // Render the app UI
  return (
    <div className="app-flex-container">
      {/* Secondary panel for managing todo lists (only show if authenticated) */}
      {isAuthenticated && (
        <ListSelector
          todoLists={todoLists}
          activeListIndex={activeListIndex}
          newListName={newListName}
          onSelectList={handleSelectList}
          onAddList={handleAddList}
          onListNameChange={e => setNewListName(e.target.value)}
          onDeleteList={handleDeleteList}
        />
      )}
      {/* Main todo list area */}
      <div className='todo-list'>
        {/* Authentication buttons and welcome message */}
        <AuthButtons />
        {/* Only show the todo list if the user is authenticated */}
        {isAuthenticated && (
          <>
            {/* Title for the todo list, click to rename (now a component) */}
            <ListTitle
              name={todoLists[activeListIndex]?.name || 'To Do List'}
              onRename={newName => {
                setTodoLists(prevLists => prevLists.map((list, idx) =>
                  idx === activeListIndex ? { ...list, name: newName } : list
                ));
              }}
            />
            {/* Render the list of todos for the active list only */}
            <TodoList
              todos={todoLists[activeListIndex]?.todos || []}
              onUpdate={updatedTodo => {
                setTodoLists(prevLists => prevLists.map((list, idx) =>
                  idx === activeListIndex
                    ? {
                        ...list,
                        todos: list.todos.map(todo =>
                          todo.id === updatedTodo.id ? updatedTodo : todo
                        )
                      }
                    : list
                ));
              }}
              onRemove={id => {
                setTodoLists(prevLists => prevLists.map((list, idx) =>
                  idx === activeListIndex
                    ? {
                        ...list,
                        todos: list.todos.filter(todo => todo.id !== id)
                      }
                    : list
                ));
              }}
            />
            {/* Button to open create task modal */}
            <TodoInput onShowModal={() => setShowCreateModal(true)} />
            {/* Modal for creating a new task */}
            <TaskCreateModal
              show={showCreateModal}
              onClose={() => setShowCreateModal(false)}
              onCreate={(title, description) => {
                handleCreateTask(title, description);
                setShowCreateModal(false);
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default App;