import React, { useState } from 'react';

interface ListSelectorProps {
  todoLists: { name: string; todos: any[] }[];
  newListName: string;
  onSelectList: (index: number) => void;
  onAddList: () => void;
  onListNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteList: (index: number) => void;
}


const ListSelector: React.FC<ListSelectorProps> = ({
  todoLists,
  newListName,
  onSelectList,
  onAddList,
  onListNameChange,
  onDeleteList,
}) => {
  const [showInput, setShowInput] = useState(false);

  const handleAddListClick = () => {
    setShowInput(true);
  };

  const handleAddList = () => {
    onAddList();
    setShowInput(false);
  };

  const handleInputBlur = () => {
    // Hide input if it loses focus and is empty
    if (!newListName) setShowInput(false);
  };

  return (
    <div className="list-selector-panel">
      <h3>Your Lists</h3>
      <ul>
        {todoLists.map((list, idx) => (
          <li key={idx} id="list-selector-item">
            <button id="list-selector-item-button" onClick={() => onSelectList(idx)}>
              {list.name}
            </button>
            {/* Only show delete if more than one list exists */}
            {todoLists.length > 1 && (
              <button onClick={() => onDeleteList(idx)} className="list-selector-delete-btn" title="Delete list">✕</button>
            )}
          </li>
        ))}
      </ul>
      {showInput ? (
        <>
          <input
            type="text"
            value={newListName}
            onChange={onListNameChange}
            onBlur={handleInputBlur}
            placeholder="New list name"
            autoFocus
          />
          <button id="list-selector-add-button" onClick={handleAddList}>Add List</button>
        </>
      ) : (
        <button id="list-selector-add-button" onClick={handleAddListClick}>Add List</button>
      )}
    </div>
  );
};

export default ListSelector;
