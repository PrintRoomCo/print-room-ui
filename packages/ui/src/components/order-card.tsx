'use client';

import * as React from 'react';
import { Download } from 'lucide-react';

import { cn } from '../utils';

export interface OrderCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageSrc?: string;
  imageAlt?: string;
  productName: string;
  description?: string;
  quantity: number;
  collectionLabel?: string;
  onDownload?: () => void;
}

const OrderCard = React.forwardRef<HTMLDivElement, OrderCardProps>(
  (
    {
      className,
      imageSrc,
      imageAlt,
      productName,
      description,
      quantity,
      collectionLabel,
      onDownload,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        'flex rounded-lg overflow-hidden border border-border',
        className
      )}
      {...props}
    >
      {/* Image area */}
      <div className="w-28 h-28 flex-shrink-0 border-r border-border bg-white p-2">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={imageAlt ?? productName}
            className="h-full w-full object-contain"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <svg
              className="h-8 w-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="m21 15-5-5L5 21" />
            </svg>
          </div>
        )}
      </div>

      {/* Content area */}
      <div className="flex-1 bg-gray-100 px-4 py-3 flex flex-col justify-between">
        <div>
          <p className="text-sm font-semibold">{productName}</p>
          {description && (
            <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
          )}
          {collectionLabel && (
            <p className="text-xs text-muted-foreground mt-1">{collectionLabel}</p>
          )}
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm font-medium">Qty: {quantity}</span>
          {onDownload && (
            <button
              type="button"
              onClick={onDownload}
              className="p-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
              aria-label="Download order details"
            >
              <Download className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
);

OrderCard.displayName = 'OrderCard';

export { OrderCard };
