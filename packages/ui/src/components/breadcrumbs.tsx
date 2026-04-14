'use client';

import * as React from 'react';
import { cn } from '../utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: 'slash' | 'hyphen' | 'emdash' | 'dot' | 'bullet' | React.ReactNode;
  align?: 'start' | 'center' | 'end';
  wrap?: boolean;
}

const separatorMap = {
  slash: '/',
  hyphen: '-',
  emdash: '—',
  dot: '·',
  bullet: '•',
} as const;

export const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  (
    {
      className,
      items,
      separator = 'slash',
      align = 'start',
      wrap = false,
      ...props
    },
    ref
  ) => {
    const resolvedSeparator =
      typeof separator === 'string' ? separatorMap[separator] : separator;

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumbs"
        className={cn('w-full overflow-x-auto', className)}
        {...props}
      >
        <ol
          className={cn(
            'flex items-center gap-2 whitespace-nowrap text-sm text-muted-foreground',
            align === 'center' && 'justify-center',
            align === 'end' && 'justify-end',
            wrap && 'flex-wrap whitespace-normal'
          )}
        >
          {items.map((item, index) => {
            const isCurrent = item.current || index === items.length - 1;

            return (
              <React.Fragment key={`${item.label}-${index}`}>
                {index > 0 && (
                  <li aria-hidden="true" className="text-foreground/50">
                    {resolvedSeparator}
                  </li>
                )}
                <li>
                  {item.href && !isCurrent ? (
                    <a
                      href={item.href}
                      className="transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span
                      aria-current={isCurrent ? 'page' : undefined}
                      className={cn(isCurrent && 'font-medium text-foreground')}
                    >
                      {item.label}
                    </span>
                  )}
                </li>
              </React.Fragment>
            );
          })}
        </ol>
      </nav>
    );
  }
);

Breadcrumbs.displayName = 'Breadcrumbs';
