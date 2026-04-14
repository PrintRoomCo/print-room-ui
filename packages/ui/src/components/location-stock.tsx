'use client';

import * as React from 'react';
import { cn } from '../utils';

export interface LocationAvailability {
  /** Store location name */
  locationName: string;
  /** Whether stock is available at this location */
  available: boolean;
}

export interface LocationStockProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Array of store location availabilities */
  locations: LocationAvailability[];
  /** Label for available stock (default: "In stock") */
  inStockLabel?: string;
  /** Label for unavailable stock (default: "Out of stock") */
  outOfStockLabel?: string;
  /** Whether to show the heading */
  showHeading?: boolean;
  /** Custom heading text */
  heading?: string;
}

const LocationStock = React.forwardRef<HTMLDivElement, LocationStockProps>(
  (
    {
      className,
      locations,
      inStockLabel = 'In stock',
      outOfStockLabel = 'Out of stock',
      showHeading = true,
      heading = 'Store availability',
      ...props
    },
    ref
  ) => {
    if (locations.length === 0) return null;

    return (
      <div ref={ref} className={cn('space-y-2', className)} {...props}>
        {showHeading && (
          <h4 className="text-sm font-medium text-foreground">{heading}</h4>
        )}
        <ul className="space-y-1.5" role="list">
          {locations.map((loc) => (
            <li
              key={loc.locationName}
              className={cn(
                'flex items-center justify-between text-sm',
                !loc.available && 'text-muted-foreground'
              )}
            >
              <span>{loc.locationName}</span>
              <span
                className={cn(
                  'inline-flex items-center gap-1.5',
                  loc.available ? 'text-green-700' : 'text-red-600'
                )}
              >
                <span
                  className={cn(
                    'inline-block h-1.5 w-1.5 rounded-full',
                    loc.available ? 'bg-green-500' : 'bg-red-500'
                  )}
                  aria-hidden="true"
                />
                {loc.available ? inStockLabel : outOfStockLabel}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

LocationStock.displayName = 'LocationStock';

export { LocationStock };
