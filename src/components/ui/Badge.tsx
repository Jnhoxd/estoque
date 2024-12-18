import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface BadgeProps {
  variant: 'success' | 'warning';
  children: React.ReactNode;
  showIcon?: boolean;
}

export function Badge({ variant, children, showIcon = false }: BadgeProps) {
  const variants = {
    success: 'bg-green-100 text-green-800',
    warning: 'bg-red-100 text-red-800'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
      {showIcon && variant === 'warning' && <AlertTriangle className="h-4 w-4 mr-1" />}
      {children}
    </span>
  );
}