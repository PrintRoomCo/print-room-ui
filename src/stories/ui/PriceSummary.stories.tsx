import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PriceSummary, type PriceSummaryData } from '@print-room-studio/ui';

const defaultData: PriceSummaryData = {
  totalAmount: 6825.0,
  shippingCost: 450.0,
  carbonEstimateKg: 12.34,
};

const meta: Meta<typeof PriceSummary> = {
  title: 'Storefront/PriceSummary',
  component: PriceSummary,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A compact price summary card displaying the total quote amount, shipping cost, and carbon emission estimate. Used at the bottom of the quote calculator flow. Animates in with Framer Motion.',
      },
    },
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Custom className for the summary container',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: defaultData,
  },
};

export const SmallOrder: Story = {
  args: {
    data: {
      totalAmount: 240.00,
      shippingCost: 25.0,
      carbonEstimateKg: 1.52,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'A small order — single design with low quantities.',
      },
    },
  },
};

export const LargeOrder: Story = {
  args: {
    data: {
      totalAmount: 45250.0,
      shippingCost: 2800.0,
      carbonEstimateKg: 156.78,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'A large bulk order with significant shipping and carbon costs.',
      },
    },
  },
};

export const FreeShipping: Story = {
  args: {
    data: {
      totalAmount: 12500.0,
      shippingCost: 0,
      carbonEstimateKg: 45.0,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Order that qualifies for free shipping.',
      },
    },
  },
};

export const ZeroCarbon: Story = {
  args: {
    data: {
      totalAmount: 500.0,
      shippingCost: 50.0,
      carbonEstimateKg: 0,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Local pickup order with zero carbon emissions.',
      },
    },
  },
};

export const CustomStyling: Story = {
  args: {
    data: defaultData,
    className: 'rounded-[27px] border border-black/10 bg-[var(--pr-off-white)] p-6',
  },
  parameters: {
    docs: {
      description: {
        story: 'Price summary with custom container styling.',
      },
    },
  },
};
