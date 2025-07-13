/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
interface FolderTabProps {
  title: string;
  details: React.ReactNode;
  isActive: boolean;
  onSelect: () => void;
}

export const FolderTab: React.FC<FolderTabProps> = ({
  title,
  details,
  isActive,
  onSelect,
}) => {
  return (
    <button
      className={`tab font-folder text-left ${isActive ? "active" : ""}`}
      onClick={onSelect}
    >
      {title}
    </button>
  );
};

export default FolderTab;
