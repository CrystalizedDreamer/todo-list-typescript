import React from 'react';

interface TaskCreateModalProps {
  show: boolean;
  onClose: () => void;
  onCreate: (taskName: string, description: string) => void;
}

const TaskCreateModal: React.FC<TaskCreateModalProps> = ({ show, onClose, onCreate }) => {
  const [taskName, setTaskName] = React.useState('');
  const [description, setDescription] = React.useState('');

  if (!show) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(taskName, description);
    setTaskName('');
    setDescription('');
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Create a Task</h2>
        <form className="task-create-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Task Name"
            value={taskName}
            onChange={e => setTaskName(e.target.value)}
            required
            className="task-create-input"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={4}
            className="task-create-textarea"
          />
          <div className="task-create-btn-row">
            <button type="submit" className="btn btn-primary">Create</button>
            <button type="button" className="btn btn-secondary task-create-cancel" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskCreateModal;
