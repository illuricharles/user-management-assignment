import { useState, useRef, useEffect } from 'react';
import { MoreVertical, Eye, Pencil, Trash2 } from 'lucide-react';

interface ActionMenuProps {
  onView: () => void;
  onEdit: () => void;
  userId: string
  onDelete: (userId: string) => void;
}

const ActionMenu = ({ onView, onEdit, onDelete , userId}: ActionMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 hover:bg-gray-100 rounded transition-colors"
        aria-label="Actions"
      >
        <MoreVertical className="w-5 h-5 text-gray-600" />
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <button
            className="dropdown-item flex items-center gap-2 text-green-600"
            onClick={() => {
              onView();
              setIsOpen(false);
            }}
          >
            <Eye className="w-4 h-4" />
            View
          </button>
          <button
            className="dropdown-item flex items-center gap-2 text-blue-600"
            onClick={() => {
              onEdit();
              setIsOpen(false);
            }}
          >
            <Pencil className="w-4 h-4" />
            Edit
          </button>
          <button
            className="dropdown-item flex items-center gap-2 text-red-600"
            onClick={() => {
              onDelete(userId);
              setIsOpen(false);
            }}
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ActionMenu;