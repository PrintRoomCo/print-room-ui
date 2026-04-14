'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../utils';

export interface PaginationItem {
  page?: number;
  href?: string;
  current?: boolean;
  ellipsis?: boolean;
  label?: string;
}

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  items: PaginationItem[];
  previousHref?: string;
  nextHref?: string;
  previousLabel?: string;
  nextLabel?: string;
}

export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  (
    {
      className,
      items,
      previousHref,
      nextHref,
      previousLabel = 'Previous',
      nextLabel = 'Next',
      ...props
    },
    ref
  ) => (
    <nav
      ref={ref}
      aria-label="Pagination"
      className={cn('w-full text-sm text-foreground', className)}
      {...props}
    >
      <ul className="flex items-center">
        <li className="mr-auto min-w-28 text-left md:min-w-[33%]">
          {previousHref ? (
            <a
              href={previousHref}
              className="inline-flex items-center gap-1 transition-colors hover:text-primary"
            >
              <ChevronLeft className="h-4 w-4" />
              {previousLabel}
            </a>
          ) : null}
        </li>

        {items.map((item, index) => {
          if (item.ellipsis) {
            return (
              <li
                key={`ellipsis-${index}`}
                className="hidden px-2 py-1 text-muted-foreground md:inline-flex"
                aria-hidden="true"
              >
                …
              </li>
            );
          }

          const label = item.label ?? String(item.page);
          const isCurrent = Boolean(item.current);

          return (
            <li key={`${label}-${index}`} className="hidden md:inline-flex">
              {item.href && !isCurrent ? (
                <a
                  href={item.href}
                  className="inline-flex border-b border-transparent px-2 py-1 transition-colors hover:border-foreground"
                >
                  <span className="sr-only">Page</span> {label}
                </a>
              ) : (
                <span
                  aria-current={isCurrent ? 'page' : undefined}
                  className={cn(
                    'inline-flex border-b px-2 py-1',
                    isCurrent
                      ? 'border-foreground font-medium'
                      : 'border-transparent text-muted-foreground'
                  )}
                >
                  <span className="sr-only">Page</span> {label}
                </span>
              )}
            </li>
          );
        })}

        <li className="ml-auto min-w-28 text-right md:min-w-[33%]">
          {nextHref ? (
            <a
              href={nextHref}
              className="inline-flex items-center gap-1 transition-colors hover:text-primary"
            >
              {nextLabel}
              <ChevronRight className="h-4 w-4" />
            </a>
          ) : null}
        </li>
      </ul>
    </nav>
  )
);

Pagination.displayName = 'Pagination';
