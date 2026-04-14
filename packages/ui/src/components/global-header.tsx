'use client';

import * as React from 'react';
import { Bell } from 'lucide-react';
import { cn } from '../utils';

export interface GlobalHeaderProps {
  className?: string;
  backButton?: React.ReactNode;
  logoSrc?: string;
  logoAlt?: string;
  title?: string;
  subtitle?: string;
  /** Optional link component — defaults to `<a>`. Pass Next.js `Link` from consuming apps. */
  linkComponent?: React.ElementType;
  /** Notification count. When set, a bell icon is shown. `0` shows bell without count dot. */
  notifications?: number;
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
    linkComponent,
    notifications,
    children,
    ...props
  }, ref) => {
    const LinkComp = linkComponent || 'a';

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
            <LinkComp
              href="/"
              aria-label={title || "Print Room"}
              className="flex items-center space-x-3 hover:opacity-90"
            >
              <img
                src={logoSrc}
                alt={logoAlt}
                className="h-10 w-auto max-w-[160px] rounded-md object-contain"
              />
            </LinkComp>
          </div>
          <div className="flex items-center space-x-4">
            {subtitle && (
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">{subtitle}</h1>
            )}
            {notifications !== undefined && (
              <button
                type="button"
                className="relative p-2 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
                aria-label={`Notifications${notifications > 0 ? ` (${notifications})` : ''}`}
              >
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-medium text-destructive-foreground">
                    {notifications}
                  </span>
                )}
              </button>
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
