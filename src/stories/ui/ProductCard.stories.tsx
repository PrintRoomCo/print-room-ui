import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ProductCard, FavoriteButton, Pill } from '@print-room-studio/ui';

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
    title: 'Premium Cotton T-Shirt',
    imageSrc: 'https://placehold.co/600x600/e2e8f0/64748b?text=T-Shirt',
    price: '$29.99',
    vendor: 'AS Colour',
    href: '#',
  },
};

export const OnSale: Story = {
  args: {
    title: 'Classic Hoodie',
    imageSrc: 'https://placehold.co/600x600/fef2f2/dc2626?text=Hoodie',
    price: '$39.99',
    compareAtPrice: '$59.99',
    onSale: true,
    vendor: 'AS Colour',
    href: '#',
  },
};

export const SoldOut: Story = {
  args: {
    title: 'Limited Edition Cap',
    imageSrc: 'https://placehold.co/600x600/f1f5f9/94a3b8?text=Cap',
    price: '$24.99',
    soldOut: true,
    vendor: 'The Print Room',
    href: '#',
  },
};

export const HoverImage: Story = {
  args: {
    title: 'Workwear Polo',
    imageSrc: 'https://placehold.co/600x600/e2e8f0/64748b?text=Front',
    hoverImageSrc: 'https://placehold.co/600x600/dbeafe/3b82f6?text=Back',
    price: '$44.99',
    vendor: 'Biz Collection',
    href: '#',
  },
};

export const NoImage: Story = {
  args: {
    title: 'Custom Product',
    price: '$19.99',
    href: '#',
  },
};

export const CustomBadge: Story = {
  args: {
    title: 'New Arrival Tee',
    imageSrc: 'https://placehold.co/600x600/ecfdf5/059669?text=New',
    price: '$34.99',
    badge: 'New',
    badgeVariant: 'custom',
    href: '#',
  },
};

export const PriceRight: Story = {
  args: {
    title: 'Budget Crew Neck',
    imageSrc: 'https://placehold.co/600x600/e2e8f0/64748b?text=Crew',
    price: '$14.99',
    layout: 'title-left-price-right',
    href: '#',
  },
};

export const CenterLayout: Story = {
  args: {
    title: 'Embroidered Cap',
    imageSrc: 'https://placehold.co/600x600/e2e8f0/64748b?text=Cap',
    price: '$27.99',
    layout: 'title-center-price-under',
    vendor: 'Headwear Professionals',
    href: '#',
  },
};

/** With favorite button overlay — matches Shopify tile behavior */
export const WithFavoriteOverlay: Story = {
  args: { title: 'Screen Print Tee', price: '$32.00' },
  render: function WithFavorite() {
    const [isFav, setIsFav] = useState(false);
    return (
      <div style={{ maxWidth: 300 }}>
        <ProductCard
          title="Screen Print Tee"
          imageSrc="https://placehold.co/600x600/e2e8f0/64748b?text=Tee"
          price="$32.00"
          vendor="AS Colour"
          href="#"
          overlay={
            <FavoriteButton
              isFavorite={isFav}
              onToggle={setIsFav}
              itemName="Screen Print Tee"
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
  args: { title: 'Blank T-Shirt', price: 'From $8.99' },
  render: () => (
    <div style={{ maxWidth: 300 }}>
      <ProductCard
        title="Blank T-Shirt"
        imageSrc="https://placehold.co/600x600/e2e8f0/64748b?text=Blank+Tee"
        price="From $8.99"
        vendor="AS Colour"
        href="#"
        footer={
          <div className="flex flex-wrap gap-1">
            <Pill size="sm">Screen Print</Pill>
            <Pill size="sm">Embroidery</Pill>
            <Pill size="sm">DTG</Pill>
          </div>
        }
      />
    </div>
  ),
};

/** Product grid like the Shopify collection page */
export const ProductGrid: Story = {
  args: { title: 'Premium Tee', price: '$29.99' },
  decorators: [
    () => (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3" style={{ maxWidth: 900 }}>
        <ProductCard
          title="Premium Tee"
          imageSrc="https://placehold.co/600x600/e2e8f0/64748b?text=1"
          price="$29.99"
          vendor="AS Colour"
          href="#"
        />
        <ProductCard
          title="Classic Hoodie"
          imageSrc="https://placehold.co/600x600/fef2f2/dc2626?text=2"
          price="$39.99"
          compareAtPrice="$59.99"
          onSale
          vendor="AS Colour"
          href="#"
        />
        <ProductCard
          title="Workwear Polo"
          imageSrc="https://placehold.co/600x600/dbeafe/3b82f6?text=3"
          price="$44.99"
          vendor="Biz Collection"
          href="#"
        />
        <ProductCard
          title="Limited Cap"
          imageSrc="https://placehold.co/600x600/f1f5f9/94a3b8?text=4"
          price="$24.99"
          soldOut
          href="#"
        />
        <ProductCard
          title="Zip Hoodie"
          imageSrc="https://placehold.co/600x600/ecfdf5/059669?text=5"
          price="$52.00"
          badge="New"
          vendor="AS Colour"
          href="#"
        />
        <ProductCard
          title="Crew Neck"
          imageSrc="https://placehold.co/600x600/fef3c7/d97706?text=6"
          price="$14.99"
          vendor="Gildan"
          href="#"
        />
      </div>
    ),
  ],
};
