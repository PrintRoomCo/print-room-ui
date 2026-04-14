import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { StockIndicator } from '@print-room-studio/ui';

const meta = {
  title: 'Storefront/StockIndicator',
  component: StockIndicator,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Real-time stock status badge ported from the Shopify `product-block-live-stock.liquid` snippet. Shows "In stock", "Only X left", or "Out of stock" with color-coded dot.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StockIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InStock: Story = {
  args: {
    quantity: 42,
  },
};

export const LowStock: Story = {
  args: {
    quantity: 3,
  },
};

export const OutOfStock: Story = {
  args: {
    quantity: 0,
  },
};

export const CustomThreshold: Story = {
  args: {
    quantity: 20,
    lowStockThreshold: 25,
  },
};

export const NoDot: Story = {
  args: {
    quantity: 15,
    showDot: false,
  },
};

export const HideQuantity: Story = {
  args: {
    quantity: 50,
    showQuantity: false,
  },
};

export const Small: Story = {
  args: {
    quantity: 8,
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    quantity: 2,
    size: 'lg',
  },
};
