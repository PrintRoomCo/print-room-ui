'use client';

import * as React from 'react';
import { cn } from '../utils';

export interface FreeShippingProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Current cart subtotal in cents (or smallest currency unit) */
  subtotal: number;
  /** Free shipping threshold in cents */
  threshold: number;
  /** Format a monetary value for display. Receives value in cents, should return formatted string. */
  formatMoney?: (amountCents: number) => string;
  /** Message shown when threshold is not yet reached. Use {amount} as placeholder. */
  notAchievedMessage?: string;
  /** Message shown when free shipping is achieved */
  achievedMessage?: string;
  /** Bar height */
  size?: 'sm' | 'md' | 'lg';
  /** Show the text message */
  showMessage?: boolean;
}

function defaultFormatMoney(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

const sizeClasses: Record<string, string> = {
  sm: 'h-0.5',
  md: 'h-1',
  lg: 'h-1.5',
};

const FreeShippingProgress = React.forwardRef<
  HTMLDivElement,
  FreeShippingProgressProps
>(
  (
    {
      className,
      subtotal,
      threshold,
      formatMoney = defaultFormatMoney,
      notAchievedMessage = 'Spend {amount} more for free shipping!',
      achievedMessage = "You've unlocked free shipping!",
      size = 'md',
      showMessage = true,
      ...props
    },
    ref
  ) => {
    if (threshold <= 0) return null;

    const percentage = Math.min((subtotal / threshold) * 100, 100);
    const isAchieved = subtotal >= threshold;
    const remaining = threshold - subtotal;

    const message = isAchieved
      ? achievedMessage
      : notAchievedMessage.replace('{amount}', formatMoney(remaining));

    return (
      <div
        ref={ref}
        className={cn('mx-auto max-w-lg text-center', className)}
        role="progressbar"
        aria-valuenow={Math.round(percentage)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={message}
        {...props}
      >
        {showMessage && (
          <p
            className={cn(
              'mb-2 text-sm',
              isAchieved
                ? 'font-medium text-green-700'
                : 'text-muted-foreground'
            )}
          >
            {message}
          </p>
        )}

        <div
          className={cn(
            'w-full overflow-hidden rounded-full bg-muted',
            sizeClasses[size]
          )}
        >
          <div
            className={cn(
              'h-full rounded-full transition-[width] duration-300 ease-in',
              isAchieved ? 'bg-green-600' : 'bg-foreground'
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);

FreeShippingProgress.displayName = 'FreeShippingProgress';

export { FreeShippingProgress };
