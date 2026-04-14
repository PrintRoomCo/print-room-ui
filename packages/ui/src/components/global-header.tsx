'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '../utils';

export interface GlobalHeaderProps {
  className?: string;
  backButton?: React.ReactNode;
  logoSrc?: string;
  logoAlt?: string;
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const GlobalHeader = React.forwardRef<HTMLElement, GlobalHeaderProps>(
  ({ 
    className, 
    backButton,
    logoSrc = "/print-room-logo.png",
    logoAlt = "Print Room Logo",
    title = "Print Room",
    subtitle = "Studio",
    children,
    ...props 
  }, ref) => {
    return (
      <header 
        ref={ref}
        className={cn(
          "bg-[var(--pr-off-white)] px-6 py-4",
          className
        )} 
        {...props}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {backButton}
            <Link
              href="/"
              aria-label={title || "Print Room"}
              className="flex items-center space-x-3 hover:opacity-90"
            >
              <img
                src={logoSrc}
                alt={logoAlt}
                className="h-10 w-auto max-w-[160px] rounded-md object-contain"
              />
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {subtitle && (
              <h1 className="text-2xl font-semibold text-gray-900">{subtitle}</h1>
            )}
            {children}
          </div>
        </div>
      </header>
    );
  }
);

GlobalHeader.displayName = "GlobalHeader";

export { GlobalHeader }; 
