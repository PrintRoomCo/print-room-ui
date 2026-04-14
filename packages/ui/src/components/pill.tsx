'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils';

const pillVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full border font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'border-black bg-[var(--pr-pill-bg)] text-foreground hover:bg-secondary',
        filled:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/90',
        outline:
          'border-black bg-transparent text-foreground hover:bg-secondary',
        soft:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
      },
      size: {
        sm: 'h-[23px] px-3 text-[0.66rem]',
        default: 'h-[23px] px-4 text-[0.66rem]',
        lg: 'h-9 px-5 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const ArrowUpRight = () => (
  <svg
    className="h-3 w-3"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M7 17L17 7M17 7H7M17 7V17" />
  </svg>
);

export interface PillProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof pillVariants> {
  /** Show an arrow icon (matches Shopify branding-service-pill behavior) */
  showArrow?: boolean;
  /** Render as a link instead of a button */
  asLink?: boolean;
  /** Link href (when asLink is true) */
  href?: string;
  /** Custom icon to show instead of the arrow */
  icon?: React.ReactNode;
}

const Pill = React.forwardRef<HTMLButtonElement, PillProps>(
  (
    {
      className,
      variant,
      size,
      showArrow = true,
      icon,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(pillVariants({ variant, size, className }))}
        {...props}
      >
        <span>{children}</span>
        {icon ?? (showArrow && <ArrowUpRight />)}
      </button>
    );
  }
);

Pill.displayName = 'Pill';

export { Pill, pillVariants };
