// Modal component for displaying details of a selected todo
import React from 'react';
import type { Todo } from '../context/TodoContext';

// Props for the TodoModal component
interface TodoModalProps {
  todo: Todo | null; // The selected todo to display
  show: boolean;     // Whether the modal should be visible
  onClose: () => void; // Handler to close the modal
  onSave?: (updated: Todo) => void; // Handler to save changes
}

// Component to render the modal
const TodoModal: React.FC<TodoModalProps> = ({ todo, show, onClose, onSave }) => {
  const [editTask, setEditTask] = React.useState(todo?.task || '');
  const [editDescription, setEditDescription] = React.useState(todo?.description || '');
  const [editCompleted, setEditCompleted] = React.useState(todo?.completed || false);

  React.useEffect(() => {
    setEditTask(todo?.task || '');
    setEditDescription(todo?.description || '');
    setEditCompleted(todo?.completed || false);
  }, [todo]);

  if (!show || !todo) return null;

  const handleSave = () => {
    if (onSave) {
      onSave({ ...todo, task: editTask, description: editDescription, completed: editCompleted });
    }
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Task</h2>
        <div className="modal-edit-fields">
          <input
            className="task-create-input"
            type="text"
            value={editTask}
            onChange={e => setEditTask(e.target.value)}
            placeholder="Task Name"
          />
          <textarea
            className="task-create-textarea"
            value={editDescription}
            onChange={e => setEditDescription(e.target.value)}
            placeholder="Description"
            rows={3}
          />
          <label className="modal-edit-label">
            <input
              type="checkbox"
              checked={editCompleted}
              onChange={e => setEditCompleted(e.target.checked)}
            />
            Completed
          </label>
        </div>
        <div className="task-create-btn-row">
          <button className="btn btn-primary" onClick={handleSave}>Save</button>
          <button className="btn btn-secondary task-create-cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default TodoModal;
