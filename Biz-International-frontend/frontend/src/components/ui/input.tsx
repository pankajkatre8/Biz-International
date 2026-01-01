// src/components/ui/input.tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-cream-600">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            'w-full px-4 py-2.5 bg-surface-secondary border border-wood-900/50 rounded-wood',
            'text-cream-100 placeholder-cream-600',
            'focus:outline-none focus:border-wood-500 focus:ring-1 focus:ring-wood-500/50',
            'transition-all duration-200',
            icon && 'pl-10',
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
