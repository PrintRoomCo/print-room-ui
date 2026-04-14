'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils';

const announcementBarVariants = cva(
  'w-full overflow-hidden text-center font-medium',
  {
    variants: {
      size: {
        sm: 'py-1.5 text-xs',
        default: 'py-2 text-sm',
        lg: 'py-3 text-base',
      },
      colorScheme: {
        primary:
          'bg-[var(--pr-blue)] text-white',
        secondary:
          'bg-[var(--pr-dusky-purple)] text-white',
        accent:
          'bg-[var(--pr-off-white)] text-foreground border-b border-black/10',
        dark:
          'bg-foreground text-background',
      },
    },
    defaultVariants: {
      size: 'default',
      colorScheme: 'primary',
    },
  }
);

export interface AnnouncementBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof announcementBarVariants> {
  /** The announcement text */
  text: string;
  /** Optional link URL — wraps the text in an anchor */
  href?: string;
  /** Display mode */
  variant?: 'static' | 'marquee';
  /** Marquee scroll speed in pixels per second (default 50) */
  speed?: number;
  /** Marquee scroll direction */
  direction?: 'left' | 'right';
  /** Separator character between repeated text in marquee mode */
  separator?: string;
}

const AnnouncementBar = React.forwardRef<HTMLDivElement, AnnouncementBarProps>(
  (
    {
      className,
      text,
      href,
      variant = 'static',
      speed = 50,
      direction = 'left',
      separator = ' · ',
      size,
      colorScheme,
      ...props
    },
    ref
  ) => {
    const content = href ? (
      <a href={href} className="hover:underline underline-offset-2">
        {text}
      </a>
    ) : (
      text
    );

    if (variant === 'marquee') {
      const repeatedText = Array(4)
        .fill(null)
        .map((_, i) => (
          <span key={i} className="inline-block whitespace-nowrap px-4">
            {content}
            <span className="mx-3 opacity-50">{separator}</span>
          </span>
        ));

      const animationDuration = `${(text.length * 10) / speed}s`;
      const animationDirection = direction === 'right' ? 'reverse' : 'normal';

      return (
        <div
          ref={ref}
          className={cn(announcementBarVariants({ size, colorScheme, className }))}
          {...props}
        >
          <div
            className="flex animate-marquee"
            style={{
              animationDuration,
              animationDirection,
            }}
          >
            {repeatedText}
            {repeatedText}
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(announcementBarVariants({ size, colorScheme, className }))}
        {...props}
      >
        {content}
      </div>
    );
  }
);

AnnouncementBar.displayName = 'AnnouncementBar';

export { AnnouncementBar, announcementBarVariants };
