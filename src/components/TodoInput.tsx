import React from 'react';

// Props for the TodoInput component
interface TodoInputProps {
  onShowModal: () => void;
}

// Component to render the input for adding a new todo
const TodoInput: React.FC<TodoInputProps> = ({ onShowModal }) => (
  <div className="fluid-container" id="InputContainer">
    <button className="btn btn-primary" onClick={onShowModal}>Create a Task</button>
  </div>
);

export default TodoInput;
