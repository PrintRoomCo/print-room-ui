import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
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
    subtotal: 5000,
    threshold: 10000,
  },
};

/** Almost there — just a few dollars away */
export const AlmostThere: Story = {
  args: {
    subtotal: 9200,
    threshold: 10000,
  },
};

/** Free shipping threshold has been reached */
export const Achieved: Story = {
  args: {
    subtotal: 15000,
    threshold: 10000,
  },
};

/** Just started — small cart */
export const JustStarted: Story = {
  args: {
    subtotal: 1500,
    threshold: 10000,
  },
};

/** Empty cart (0 subtotal) */
export const EmptyCart: Story = {
  args: {
    subtotal: 0,
    threshold: 10000,
  },
};

/** NZD formatting */
export const NZDollar: Story = {
  args: {
    subtotal: 4500,
    threshold: 15000,
    formatMoney: (cents: number) => `NZ$${(cents / 100).toFixed(2)}`,
    notAchievedMessage: 'Add {amount} more to your cart for free NZ shipping!',
    achievedMessage: 'Free NZ shipping unlocked!',
  },
};

export const SmallBar: Story = {
  args: {
    subtotal: 3000,
    threshold: 10000,
    size: 'sm',
  },
};

export const LargeBar: Story = {
  args: {
    subtotal: 7500,
    threshold: 10000,
    size: 'lg',
  },
};

export const NoMessage: Story = {
  args: {
    subtotal: 6000,
    threshold: 10000,
    showMessage: false,
  },
};
