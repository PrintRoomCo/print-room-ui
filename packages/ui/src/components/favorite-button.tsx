'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils';

const favoriteButtonVariants = cva(
  'relative z-10 inline-flex items-center gap-1.5 rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'border-foreground/30 hover:border-foreground text-foreground',
        outline:
          'border-input bg-background hover:bg-accent hover:text-accent-foreground',
        ghost: 'border-transparent hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'px-4 py-2 text-sm',
        sm: 'px-3 py-1.5 text-xs',
        lg: 'px-5 py-2.5 text-base',
        icon: 'p-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface FavoriteButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'onToggle'>,
    VariantProps<typeof favoriteButtonVariants> {
  /** Whether the item is currently favorited */
  isFavorite?: boolean;
  /** Callback when favorite state is toggled */
  onToggle?: (isFavorite: boolean) => void;
  /** Label text shown when not favorited */
  addLabel?: string;
  /** Label text shown when favorited */
  removeLabel?: string;
  /** Whether to show the text label (icon-only when false) */
  showLabel?: boolean;
  /** Product or item name for accessibility */
  itemName?: string;
}

const HeartOutline = () => (
  <svg
    className="h-4 w-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const HeartFilled = () => (
  <svg
    className="h-4 w-4"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const FavoriteButton = React.forwardRef<HTMLButtonElement, FavoriteButtonProps>(
  (
    {
      className,
      variant,
      size,
      isFavorite = false,
      onToggle,
      addLabel = 'Add to favorites',
      removeLabel = 'In favorites',
      showLabel = true,
      itemName,
      ...props
    },
    ref
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      onToggle?.(!isFavorite);
      props.onClick?.(e);
    };

    const ariaLabel = isFavorite
      ? `Remove ${itemName ?? 'item'} from favorites`
      : `Add ${itemName ?? 'item'} to favorites`;

    return (
      <button
        ref={ref}
        type="button"
        className={cn(favoriteButtonVariants({ variant, size, className }))}
        aria-label={ariaLabel}
        aria-pressed={isFavorite}
        onClick={handleClick}
        {...props}
      >
        {isFavorite ? <HeartFilled /> : <HeartOutline />}
        {showLabel && (
          <span>{isFavorite ? removeLabel : addLabel}</span>
        )}
      </button>
    );
  }
);

FavoriteButton.displayName = 'FavoriteButton';

export { FavoriteButton, favoriteButtonVariants };
