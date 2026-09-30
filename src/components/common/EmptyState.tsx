import React from 'react';
import { PackageOpen } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  onAction,
  icon
}) => {
  return (
    <div className="card text-center p-4 mt-4" style={{ borderStyle: 'dashed' }}>
      <div className="flex justify-center mb-3 text-muted">
        {icon || <PackageOpen size={48} />}
      </div>
      <h3 className="font-bold text-lg mb-1">{title}</h3>
      <p className="text-muted text-sm mb-4" style={{ maxWidth: '360px', margin: '0 auto 1rem' }}>
        {description}
      </p>
      {actionText && onAction && (
        <button className="btn btn-primary" onClick={onAction}>
          {actionText}
        </button>
      )}
    </div>
  );
};
