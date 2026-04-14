'use client';

import * as React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

import { cn } from '../utils';

export interface CatalogPaginationProps {
  currentPage: number;
  totalPages: number;
  onNext?: () => void;
  onPrevious?: () => void;
  className?: string;
}

const CatalogPagination = React.forwardRef<HTMLDivElement, CatalogPaginationProps>(
  ({ currentPage, totalPages, onNext, onPrevious, className }, ref) => {
    const progress = totalPages > 0 ? (currentPage / totalPages) * 100 : 0;

    return (
      <div ref={ref} className={cn('flex items-center gap-4', className)}>
        {/* Previous */}
        {onPrevious && currentPage > 1 && (
          <button
            type="button"
            onClick={onPrevious}
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>
        )}

        {/* Progress bar */}
        <div className="flex-1 rounded-full bg-gray-200 h-1.5">
          <div
            className="rounded-full bg-[var(--pr-dusky-purple)] h-1.5 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Next */}
        {onNext && currentPage < totalPages && (
          <button
            type="button"
            onClick={onNext}
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <span>Next</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);

CatalogPagination.displayName = 'CatalogPagination';

export { CatalogPagination };
