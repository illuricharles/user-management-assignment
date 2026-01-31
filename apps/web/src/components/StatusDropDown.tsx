import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import {type Status } from '@repo/shared';

interface StatusDropdownProps {
  status: "active" | "inactive";
  userId: string,
  onChange: (status: Status, _id: string) => void;
}

const StatusDropdown = ({ userId, status, onChange }: StatusDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`status-badge bg-primary text-white px-2.5`}
      >
        {status}
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <button
            className="dropdown-item font-semibold hover:bg-green-50"
            onClick={() => {
              onChange('active', userId);
              setIsOpen(false);
            }}
          >
            Active
          </button>
          <button
            className="dropdown-item font-semibold  hover:bg-red-50"
            onClick={() => {
              onChange('inactive', userId);
              setIsOpen(false);
            }}
          >
            InActive
          </button>
        </div>
      )}
    </div>
  );
};

export default StatusDropdown;