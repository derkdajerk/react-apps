"use client";

const FolderTab = ({ title, isActive, onSelect }) => {
  return (
    <button
      className={`tab font-folder focus:outline-none text-left ${
        isActive ? "active" : ""
      }`}
      onClick={onSelect}
    >
      {title}
    </button>
  );
};

export default FolderTab;
