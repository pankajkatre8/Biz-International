// src/components/ui/button.tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-wood text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-wood-500/50 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-b from-wood-500 to-wood-600 text-cream-50 hover:from-wood-400 hover:to-wood-500 hover:shadow-glow',
        secondary: 'bg-surface-elevated text-cream-200 hover:bg-surface-hover border border-wood-900/50',
        outline: 'border-2 border-wood-500 text-wood-400 bg-transparent hover:bg-wood-500/10',
        ghost: 'text-cream-300 hover:bg-surface-elevated hover:text-cream-100',
        destructive: 'bg-rosewood text-cream-50 hover:bg-rosewood-light',
        success: 'bg-forest text-cream-50 hover:bg-forest-light',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
