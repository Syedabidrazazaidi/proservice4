import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'danger';
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge(
          'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
          clsx({
            'border-transparent bg-primary-500 text-white': variant === 'default',
            'border-transparent bg-gray-100 text-gray-900': variant === 'secondary',
            'border-current': variant === 'outline',
            'border-transparent bg-green-50 text-green-700': variant === 'success',
            'border-transparent bg-yellow-50 text-yellow-700': variant === 'warning',
            'border-transparent bg-red-50 text-red-700': variant === 'danger',
          }),
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };