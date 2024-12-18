import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'success' | 'danger';
  icon?: LucideIcon;
}

export function Button({ 
  variant = 'primary', 
  icon: Icon,
  children,
  className = '',
  ...props 
}: ButtonProps) {
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    success: 'text-green-600 hover:text-green-900',
    danger: 'text-red-600 hover:text-red-900'
  };

  if (!children && Icon) {
    return (
      <button
        className={`${variants[variant]} ${className}`}
        {...props}
      >
        <Icon className="h-5 w-5" />
      </button>
    );
  }

  return (
    <button
      className={`${variants[variant]} inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${className}`}
      {...props}
    >
      {Icon && <Icon className="h-5 w-5 mr-2" />}
      {children}
    </button>
  );
}