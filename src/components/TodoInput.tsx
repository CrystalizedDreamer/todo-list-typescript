import React from 'react';

interface TodoInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ value, onChange, onAdd }) => (
  <div className="fluid-container" id="InputContainer">
  <div className="input-group" id="TodoInput">
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="form-control"
    />
    <button onClick={onAdd} className="btn btn-primary">Add Todo</button>
  </div>
  </div>
);

export default TodoInput;
