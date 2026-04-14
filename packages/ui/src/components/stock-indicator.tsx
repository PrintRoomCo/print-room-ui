'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils';

const stockIndicatorVariants = cva('inline-flex items-center gap-1.5 text-sm', {
  variants: {
    status: {
      'in-stock': 'text-green-700',
      'low-stock': 'text-amber-600',
      'out-of-stock': 'text-red-600',
    },
    size: {
      sm: 'text-xs',
      default: 'text-sm',
      lg: 'text-base',
    },
  },
  defaultVariants: {
    status: 'in-stock',
    size: 'default',
  },
});

export type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock';

export interface StockIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof stockIndicatorVariants>, 'status'> {
  /** Current stock quantity */
  quantity: number;
  /** Low-stock threshold (shows "Only X left" at or below this) */
  lowStockThreshold?: number;
  /** Show the quantity number in the label */
  showQuantity?: boolean;
  /** Show a colored dot indicator */
  showDot?: boolean;
  /** Custom label override */
  label?: string;
}

function getStockStatus(
  quantity: number,
  lowStockThreshold: number
): StockStatus {
  if (quantity <= 0) return 'out-of-stock';
  if (quantity <= lowStockThreshold) return 'low-stock';
  return 'in-stock';
}

function getStockLabel(
  quantity: number,
  lowStockThreshold: number,
  showQuantity: boolean
): string {
  if (quantity <= 0) return 'Out of stock';
  if (quantity <= lowStockThreshold) {
    return `Only ${quantity} left – order soon!`;
  }
  return showQuantity ? `${quantity} in stock` : 'In stock';
}

const dotClasses: Record<StockStatus, string> = {
  'in-stock': 'bg-green-500',
  'low-stock': 'bg-amber-500',
  'out-of-stock': 'bg-red-500',
};

const StockIndicator = React.forwardRef<HTMLDivElement, StockIndicatorProps>(
  (
    {
      className,
      quantity,
      lowStockThreshold = 10,
      showQuantity = true,
      showDot = true,
      label,
      size,
      ...props
    },
    ref
  ) => {
    const status = getStockStatus(quantity, lowStockThreshold);
    const displayLabel =
      label ?? getStockLabel(quantity, lowStockThreshold, showQuantity);

    return (
      <div
        ref={ref}
        className={cn(stockIndicatorVariants({ status, size, className }))}
        role="status"
        aria-label={displayLabel}
        {...props}
      >
        {showDot && (
          <span
            className={cn('inline-block h-2 w-2 rounded-full', dotClasses[status])}
            aria-hidden="true"
          />
        )}
        <span>{displayLabel}</span>
      </div>
    );
  }
);

StockIndicator.displayName = 'StockIndicator';

export { StockIndicator, stockIndicatorVariants, getStockStatus, getStockLabel };
