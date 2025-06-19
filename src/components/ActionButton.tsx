import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ActionButtonProps {
  onClick: () => void;
  icon: LucideIcon;
  label: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  disabled?: boolean;
  loading?: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  icon: Icon,
  label,
  variant = 'primary',
  disabled = false,
  loading = false
}) => {
  const getVariantClasses = () => {
    const baseClasses = 'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:transform-none disabled:opacity-50 disabled:cursor-not-allowed';
    
    switch (variant) {
      case 'primary':
        return `${baseClasses} bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl`;
      case 'secondary':
        return `${baseClasses} bg-gray-600 hover:bg-gray-700 text-white shadow-lg hover:shadow-xl`;
      case 'success':
        return `${baseClasses} bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl`;
      case 'danger':
        return `${baseClasses} bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl`;
      default:
        return `${baseClasses} bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl`;
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={getVariantClasses()}
    >
      <Icon size={18} className={loading ? 'animate-spin' : ''} />
      {label}
    </button>
  );
};