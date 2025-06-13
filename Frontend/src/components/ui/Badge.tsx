import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'gray';
  size?: 'sm' | 'md';
  className?: string;
  onClick?: () => void;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
}) => {
  const variantStyles = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    accent: 'bg-accent/10 text-accent',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    error: 'bg-error/10 text-error',
    gray: 'bg-gray-100 text-gray-800',
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
  };

  const baseClasses = `
    inline-flex items-center rounded-full font-medium
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${onClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}
    ${className}
  `;

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={baseClasses}
        type="button"
      >
        {children}
      </button>
    );
  }

  return (
    <span className={baseClasses}>
      {children}
    </span>
  );
};

export default Badge;