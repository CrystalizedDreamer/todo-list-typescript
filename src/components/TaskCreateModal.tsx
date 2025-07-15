import React from 'react';

interface TaskCreateModalProps {
  show: boolean;
  onClose: () => void;
  onCreate: (taskName: string, description: string) => void;
}


const TaskCreateModal: React.FC<TaskCreateModalProps> = ({ show, onClose, onCreate }) => {
  const [taskName, setTaskName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const modalRef = React.useRef<HTMLDivElement>(null);
  const firstInputRef = React.useRef<HTMLInputElement>(null);
  const lastButtonRef = React.useRef<HTMLButtonElement>(null);
  const previouslyFocused = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (show) {
      previouslyFocused.current = document.activeElement as HTMLElement;
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 0);
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
            'input, textarea, button, [tabindex]:not([tabindex="-1"])'
          );
          if (!focusable || focusable.length === 0) return;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey) {
            if (document.activeElement === first) {
              e.preventDefault();
              last.focus();
            }
          } else {
            if (document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
        } else if (e.key === 'Escape') {
          onClose();
        }
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      previouslyFocused.current?.focus();
    }
  }, [show, onClose]);

  if (!show) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(taskName, description);
    setTaskName('');
    setDescription('');
    onClose();
  };

  return (
    <div className="modal" ref={modalRef} aria-modal="true" role="dialog">
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
            ref={firstInputRef}
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
            <button
              type="button"
              className="btn btn-secondary task-create-cancel"
              onClick={onClose}
              ref={lastButtonRef}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskCreateModal;
