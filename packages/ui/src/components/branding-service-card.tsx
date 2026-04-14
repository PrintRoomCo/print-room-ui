'use client';

import * as React from 'react';
import { cn } from '../utils';

export interface BrandingServiceCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Service title */
  title: string;
  /** Service description (supports HTML/JSX) */
  description?: React.ReactNode;
  /** Service image URL */
  imageSrc?: string;
  /** Image alt text */
  imageAlt?: string;
  /** CTA button label */
  ctaLabel?: string;
  /** CTA button href */
  ctaHref?: string;
  /** Callback when CTA is clicked */
  onCtaClick?: () => void;
  /** Callback when close is clicked */
  onClose?: () => void;
  /** Whether to show the overlay backdrop */
  showOverlay?: boolean;
  /** Whether the card is open/visible */
  open?: boolean;
}

const CloseIcon = () => (
  <svg
    className="h-4 w-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const BrandingServiceCard = React.forwardRef<
  HTMLDivElement,
  BrandingServiceCardProps
>(
  (
    {
      className,
      title,
      description,
      imageSrc,
      imageAlt,
      ctaLabel = 'Learn more',
      ctaHref,
      onCtaClick,
      onClose,
      showOverlay = true,
      open = true,
      ...props
    },
    ref
  ) => {
    if (!open) return null;

    return (
      <>
        {/* Overlay backdrop */}
        {showOverlay && (
          <div
            className="fixed inset-0 z-[9999] bg-black/50 transition-opacity"
            onClick={onClose}
            aria-hidden="true"
          />
        )}

        {/* Floating card */}
        <div
          ref={ref}
          className={cn(
            'fixed z-[10000] flex max-h-[85vh] w-[calc(100vw-48px)] max-w-sm flex-col overflow-hidden rounded-2xl bg-background shadow-2xl sm:w-96',
            'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
            className
          )}
          role="dialog"
          aria-labelledby="branding-card-title"
          {...props}
        >
          {/* Close button */}
          <button
            type="button"
            className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-md transition-colors hover:bg-white"
            onClick={onClose}
          >
            <span className="sr-only">Close</span>
            <CloseIcon />
          </button>

          {/* Image */}
          {imageSrc && (
            <div className="flex-shrink-0 bg-muted">
              {ctaHref ? (
                <a href={ctaHref} className="block">
                  <img
                    src={imageSrc}
                    alt={imageAlt ?? title}
                    className="h-auto max-h-72 w-full rounded-t-2xl object-cover"
                    loading="lazy"
                  />
                </a>
              ) : (
                <img
                  src={imageSrc}
                  alt={imageAlt ?? title}
                  className="h-auto max-h-72 w-full rounded-t-2xl object-cover"
                  loading="lazy"
                />
              )}
            </div>
          )}

          {/* Content */}
          <div className="flex-shrink-0 p-5">
            <h3
              id="branding-card-title"
              className="mb-3 text-xl font-semibold text-foreground"
            >
              {title}
            </h3>

            {description && (
              <div className="mb-4 leading-relaxed text-muted-foreground">
                {typeof description === 'string' ? (
                  <p>{description}</p>
                ) : (
                  description
                )}
              </div>
            )}

            {(ctaHref || onCtaClick) && (
              ctaHref ? (
                <a
                  href={ctaHref}
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  {ctaLabel}
                </a>
              ) : (
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  onClick={onCtaClick}
                >
                  {ctaLabel}
                </button>
              )
            )}
          </div>
        </div>
      </>
    );
  }
);

BrandingServiceCard.displayName = 'BrandingServiceCard';

export { BrandingServiceCard };
