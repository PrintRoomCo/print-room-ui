'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils';

const productCardVariants = cva(
  'relative flex h-full flex-col overflow-hidden rounded-lg border transition-colors',
  {
    variants: {
      variant: {
        default: 'border-border bg-card text-card-foreground',
        outline: 'border-input bg-background',
        ghost: 'border-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface ProductCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof productCardVariants> {
  /** Product title */
  title: string;
  /** Product URL */
  href?: string;
  /** Primary image URL */
  imageSrc?: string;
  /** Hover/secondary image URL (shown on hover) */
  hoverImageSrc?: string;
  /** Image alt text */
  imageAlt?: string;
  /** Formatted price string (e.g. "$29.99") */
  price?: string;
  /** Formatted compare-at price string for sale items */
  compareAtPrice?: string;
  /** Whether the product is on sale */
  onSale?: boolean;
  /** Whether the product is sold out */
  soldOut?: boolean;
  /** Badge text (e.g. "Sale", "Sold out", "New") */
  badge?: string;
  /** Badge variant */
  badgeVariant?: 'sale' | 'sold-out' | 'custom';
  /** Vendor / brand name */
  vendor?: string;
  /** Slot for additional content below title (e.g. color swatches) */
  footer?: React.ReactNode;
  /** Slot for overlay content (e.g. favorite button, quick-buy) */
  overlay?: React.ReactNode;
  /** Click handler for the card */
  onCardClick?: () => void;
  /** Price layout */
  layout?: 'title-left-price-right' | 'title-left-price-under' | 'title-center-price-under' | 'catalog';
}

const badgeColors: Record<string, string> = {
  sale: 'bg-red-600 text-white',
  'sold-out': 'bg-gray-800 text-white',
  custom: 'bg-primary text-primary-foreground',
};

const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  (
    {
      className,
      variant,
      title,
      href,
      imageSrc,
      hoverImageSrc,
      imageAlt,
      price,
      compareAtPrice,
      onSale = false,
      soldOut = false,
      badge,
      badgeVariant = 'custom',
      vendor,
      footer,
      overlay,
      onCardClick,
      layout = 'title-left-price-under',
      ...props
    },
    ref
  ) => {
    const resolvedBadge =
      badge ?? (soldOut ? 'Sold out' : onSale ? 'Sale' : undefined);
    const resolvedBadgeVariant =
      badge != null
        ? badgeVariant
        : soldOut
          ? 'sold-out'
          : onSale
            ? 'sale'
            : 'custom';

    const Wrapper = href ? 'a' : 'div';
    const wrapperProps = href
      ? { href, onClick: onCardClick }
      : { onClick: onCardClick, role: onCardClick ? 'button' as const : undefined, tabIndex: onCardClick ? 0 : undefined };

    const isCatalog = layout === 'catalog';
    const isHorizontal = layout === 'title-left-price-right';
    const isCentered = layout === 'title-center-price-under';

    return (
      <div
        ref={ref}
        className={cn(productCardVariants({ variant }), isCatalog && 'rounded-xl', className)}
        {...props}
      >
        {/* Image section */}
        <div className="group relative aspect-square overflow-hidden bg-muted">
          <Wrapper {...wrapperProps} className="block h-full w-full">
            {imageSrc ? (
              <>
                <img
                  src={imageSrc}
                  alt={imageAlt ?? title}
                  className={cn(
                    'h-full w-full object-cover transition-opacity duration-300',
                    hoverImageSrc && 'group-hover:opacity-0'
                  )}
                  loading="lazy"
                />
                {hoverImageSrc && (
                  <img
                    src={hoverImageSrc}
                    alt={`${imageAlt ?? title} - alternate view`}
                    className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    loading="lazy"
                  />
                )}
              </>
            ) : (
              <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                <svg
                  className="h-12 w-12"
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
          </Wrapper>

          {/* Badge */}
          {resolvedBadge && !isCatalog && (
            <div
              className={cn(
                'pointer-events-none absolute right-2 top-2 z-10 rounded px-2 py-1 text-xs font-medium',
                badgeColors[resolvedBadgeVariant]
              )}
            >
              {resolvedBadge}
            </div>
          )}

          {/* Overlay (favorite button, quick-buy, etc.) */}
          {overlay && (
            <div className="absolute bottom-2 left-2 right-2 z-10">
              {overlay}
            </div>
          )}
        </div>

        {/* Content section */}
        <div className={cn('flex flex-1 flex-col p-3', isCentered && 'text-center')}>
          {vendor && !isCatalog && (
            <span className="mb-0.5 text-xs text-muted-foreground">
              {vendor}
            </span>
          )}

          <div
            className={cn(
              isHorizontal && 'flex items-start justify-between gap-2'
            )}
          >
            <Wrapper
              {...wrapperProps}
              className={cn(
                'text-sm font-medium leading-snug text-foreground hover:text-primary transition-colors',
                isHorizontal && 'flex-1',
                isCatalog && 'uppercase tracking-wider text-xs'
              )}
            >
              {title}
            </Wrapper>

            {price && !isCatalog && (
              <div
                className={cn(
                  'flex items-center gap-1.5',
                  !isHorizontal && 'mt-1',
                  isCentered && 'justify-center'
                )}
              >
                <span
                  className={cn(
                    'text-sm font-medium',
                    onSale && 'text-red-600'
                  )}
                >
                  {price}
                </span>
                {compareAtPrice && onSale && (
                  <span className="text-xs text-muted-foreground line-through">
                    {compareAtPrice}
                  </span>
                )}
              </div>
            )}
          </div>

          {footer && <div className="mt-2">{footer}</div>}
        </div>
      </div>
    );
  }
);

ProductCard.displayName = 'ProductCard';

export { ProductCard, productCardVariants };
