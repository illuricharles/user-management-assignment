import type { ReactNode } from 'react';

interface InfoFieldProps {
  label: string;
  value: string | ReactNode;
  icon?: ReactNode;
}

const InfoField = ({ label, value, icon }: InfoFieldProps) => {
  return (
    <div className="group relative p-4 rounded-lg bg-gray-100/50 hover:bg-gray-100 transition-colors duration-200">
      <div className="flex items-start gap-3">
        {icon && (
          <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="info-label">{label}</p>
          <p className="info-value truncate font-semibold capitalize">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoField;
