import React from 'react';

interface ListSelectorProps {
  todoLists: { name: string; todos: any[] }[];
  activeListIndex: number;
  newListName: string;
  onSelectList: (index: number) => void;
  onAddList: () => void;
  onListNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteList: (index: number) => void;
}

const ListSelector: React.FC<ListSelectorProps> = ({
  todoLists,
  activeListIndex,
  newListName,
  onSelectList,
  onAddList,
  onListNameChange,
  onDeleteList,
}) => (
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
    <input
      type="text"
      value={newListName}
      onChange={onListNameChange}
      placeholder="New list name"
    />
    <button onClick={onAddList}>Add List</button>
  </div>
);

export default ListSelector;
