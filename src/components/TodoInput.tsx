import React from 'react';

interface TodoInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ value, onChange, onAdd }) => (
  <div className="input-group">
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="form-control me-2"
    />
    <button onClick={onAdd} className="btn btn-primary">Add Todo</button>
  </div>
);

export default TodoInput;
