import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { FreeShippingProgress } from '@print-room-studio/ui';

const meta = {
  title: 'Storefront/FreeShippingProgress',
  component: FreeShippingProgress,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Progress bar toward free shipping threshold, ported from the Shopify `free-shipping-progress.liquid` snippet. Reads cart subtotal and a market-configurable threshold in Shopify — here it accepts `subtotal` and `threshold` props (both in cents).',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FreeShippingProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Cart is about halfway to free shipping */
export const Default: Story = {
  args: {
    subtotal: 18000,
    threshold: 25000,
  },
};

/** Almost there — just a few dollars away */
export const AlmostThere: Story = {
  args: {
    subtotal: 23500,
    threshold: 25000,
  },
};

/** Free shipping threshold has been reached */
export const Achieved: Story = {
  args: {
    subtotal: 32000,
    threshold: 25000,
  },
};

/** Just started — small cart */
export const JustStarted: Story = {
  args: {
    subtotal: 6200,
    threshold: 25000,
  },
};

/** Empty cart (0 subtotal) */
export const EmptyCart: Story = {
  args: {
    subtotal: 0,
    threshold: 25000,
  },
};

/** NZD formatting */
export const NZDollar: Story = {
  args: {
    subtotal: 14200,
    threshold: 25000,
    formatMoney: (cents: number) => `NZ$${(cents / 100).toFixed(2)}`,
    notAchievedMessage: 'Spend {amount} more for free New Zealand shipping.',
    achievedMessage: 'Free New Zealand shipping unlocked.',
  },
};

export const SmallBar: Story = {
  args: {
    subtotal: 10000,
    threshold: 25000,
    size: 'sm',
  },
};

export const LargeBar: Story = {
  args: {
    subtotal: 21000,
    threshold: 25000,
    size: 'lg',
  },
};

export const NoMessage: Story = {
  args: {
    subtotal: 19000,
    threshold: 25000,
    showMessage: false,
  },
};
