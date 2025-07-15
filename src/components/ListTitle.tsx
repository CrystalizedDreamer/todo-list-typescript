import React from 'react';

interface ListTitleProps {
  name: string;
  onRename: (newName: string) => void;
}

const ListTitle: React.FC<ListTitleProps> = ({ name, onRename }) => {
  const [isRenaming, setIsRenaming] = React.useState(false);
  const [renameValue, setRenameValue] = React.useState(name);

  React.useEffect(() => {
    setRenameValue(name);
  }, [name]);

  const handleStartRename = () => {
    setRenameValue(name);
    setIsRenaming(true);
  };

  const handleRename = () => {
    onRename(renameValue);
    setIsRenaming(false);
  };

  const handleRenameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleRename();
    }
  };

  return isRenaming ? (
    <div className="list-title-rename-box">
      <input
        type="text"
        className="list-title-rename-input"
        value={renameValue}
        onChange={e => setRenameValue(e.target.value)}
        onBlur={handleRename}
        onKeyDown={handleRenameKeyDown}
        autoFocus
      />
      <button className="list-title-rename-save" onClick={handleRename}>Save</button>
    </div>
  ) : (
    <h2 className="title list-title-clickable" onClick={handleStartRename} title="Click to rename list">
      {name}
    </h2>
  );
};

export default ListTitle;
