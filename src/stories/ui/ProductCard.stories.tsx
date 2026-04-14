import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { ProductCard, FavoriteButton, Pill } from '@print-room-studio/ui';
import { storefrontProducts } from '../fixtures/production-data';

const meta = {
  title: 'Storefront/ProductCard',
  component: ProductCard,
  parameters: {
    docs: {
      description: {
        component:
          'Product tile card ported from the Shopify `product-tile-standard.liquid` snippet (700 lines of Liquid). Supports image hover swap, sale/sold-out badges, price layouts, and overlay slots for favorites/quick-buy.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 300 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...storefrontProducts[0],
  },
};

export const OnSale: Story = {
  args: {
    ...storefrontProducts[0],
    onSale: true,
  },
};

export const SoldOut: Story = {
  args: {
    ...storefrontProducts[1],
    soldOut: true,
  },
};

export const HoverImage: Story = {
  args: {
    ...storefrontProducts[2],
  },
};

export const NoImage: Story = {
  args: {
    title: 'Custom Tote Programme',
    price: 'Quote on request',
    href: '/products/custom-totes',
  },
};

export const CustomBadge: Story = {
  args: {
    ...storefrontProducts[3],
    badge: 'New season',
    badgeVariant: 'custom',
  },
};

export const PriceRight: Story = {
  args: {
    ...storefrontProducts[2],
    layout: 'title-left-price-right',
  },
};

export const CenterLayout: Story = {
  args: {
    ...storefrontProducts[1],
    layout: 'title-center-price-under',
  },
};

/** With favorite button overlay — matches Shopify tile behavior */
export const WithFavoriteOverlay: Story = {
  args: { title: storefrontProducts[0].title, price: storefrontProducts[0].price },
  render: function WithFavorite() {
    const [isFav, setIsFav] = useState(false);
    return (
      <div style={{ maxWidth: 300 }}>
        <ProductCard
          {...storefrontProducts[0]}
          overlay={
            <FavoriteButton
              isFavorite={isFav}
              onToggle={setIsFav}
              itemName={storefrontProducts[0].title}
              size="sm"
              variant="ghost"
              className="bg-white/80 backdrop-blur-sm"
            />
          }
        />
      </div>
    );
  },
};

/** With branding pills in footer slot */
export const WithBrandingPills: Story = {
  args: { title: storefrontProducts[0].title, price: storefrontProducts[0].price },
  render: () => (
    <div style={{ maxWidth: 300 }}>
      <ProductCard
        {...storefrontProducts[0]}
        footer={
          <div className="flex flex-wrap gap-1">
            <Pill size="sm">Screen Printing</Pill>
            <Pill size="sm">Embroidery</Pill>
            <Pill size="sm">Finishing</Pill>
          </div>
        }
      />
    </div>
  ),
};

/** Catalog layout — simple image + uppercase name, no price or badges */
export const CatalogGrid: Story = {
  args: { title: 'placeholder', price: 'placeholder' },
  decorators: [
    () => (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4" style={{ maxWidth: 900 }}>
        <ProductCard
          title="AS Colour Staple Tee"
          imageSrc={storefrontProducts[0].imageSrc}
          layout="catalog"
        />
        <ProductCard
          title="Continental Hoodie"
          imageSrc={storefrontProducts[1]?.imageSrc}
          layout="catalog"
        />
        <ProductCard
          title="Stanley/Stella Creator 2.0"
          imageSrc={storefrontProducts[2]?.imageSrc}
          layout="catalog"
        />
        <ProductCard
          title="Earth Positive Classic"
          imageSrc={storefrontProducts[3]?.imageSrc}
          layout="catalog"
        />
      </div>
    ),
  ],
};

/** Product grid like the Shopify collection page */
export const ProductGrid: Story = {
  args: { title: storefrontProducts[0].title, price: storefrontProducts[0].price },
  decorators: [
    () => (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3" style={{ maxWidth: 900 }}>
        <ProductCard {...storefrontProducts[0]} />
        <ProductCard {...storefrontProducts[0]} onSale />
        <ProductCard {...storefrontProducts[1]} />
        <ProductCard {...storefrontProducts[2]} soldOut />
        <ProductCard {...storefrontProducts[3]} badge="New season" />
        <ProductCard {...storefrontProducts[1]} layout="title-left-price-right" />
      </div>
    ),
  ],
};
