import React from 'react';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'busy' | 'away' | null;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  status = null,
  className = '',
}) => {
  const sizeStyles = {
    xs: 'h-6 w-6',
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  const statusColors = {
    online: 'bg-success',
    offline: 'bg-gray-400',
    busy: 'bg-error',
    away: 'bg-warning',
  };

  const statusSizes = {
    xs: 'h-1.5 w-1.5',
    sm: 'h-2 w-2',
    md: 'h-2.5 w-2.5',
    lg: 'h-3 w-3',
    xl: 'h-3.5 w-3.5',
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <img
        src={src}
        alt={alt}
        className={`${sizeStyles[size]} rounded-full object-cover ring-2 ring-white`}
      />
      {status && (
        <span
          className={`absolute bottom-0 right-0 block ${statusSizes[size]} ${statusColors[status]} rounded-full ring-2 ring-white`}
        ></span>
      )}
    </div>
  );
};

export default Avatar;