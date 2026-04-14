'use client';

import * as React from 'react';
import { cn } from '../utils';

export interface TestimonialCardProps
  extends React.HTMLAttributes<HTMLQuoteElement> {
  /** The quote text (supports JSX for rich text) */
  quote: React.ReactNode;
  /** Attribution source (e.g. person name, company) */
  source?: string;
  /** Text alignment */
  align?: 'left' | 'center';
  /** Font style for the quote */
  fontStyle?: 'heading' | 'body';
  /** Text size for the quote */
  textSize?: 'base' | 'lg' | 'xl' | '2xl';
}

const textSizeMap: Record<string, string> = {
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
};

const TestimonialCard = React.forwardRef<
  HTMLQuoteElement,
  TestimonialCardProps
>(
  (
    {
      className,
      quote,
      source,
      align = 'left',
      fontStyle = 'heading',
      textSize = 'lg',
      ...props
    },
    ref
  ) => {
    return (
      <blockquote
        ref={ref}
        className={cn(
          'flex-1',
          align === 'center' ? 'text-center' : 'text-left',
          className
        )}
        {...props}
      >
        <div
          className={cn(
            'leading-relaxed text-foreground',
            fontStyle === 'heading' ? 'font-semibold' : 'font-normal',
            textSizeMap[textSize],
            '[&_a]:underline [&_a]:hover:text-primary'
          )}
        >
          {typeof quote === 'string' ? <p>{quote}</p> : quote}
        </div>
        {source && (
          <footer className="mt-3 text-base text-muted-foreground">
            — {source}
          </footer>
        )}
      </blockquote>
    );
  }
);

TestimonialCard.displayName = 'TestimonialCard';

export { TestimonialCard };
