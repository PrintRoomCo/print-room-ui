import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { OrderSummary } from '@print-room-studio/ui';

const sampleDesigns = [
  {
    id: '1',
    name: 'Staff Polo — Navy',
    totalUnits: 50,
    pricePerUnit: 24.50,
    subtotal: 1225.00,
    leadTime: '10-12 days',
    image: '/placeholder-product.png',
  },
  {
    id: '2',
    name: 'Event T-Shirt — Black',
    totalUnits: 200,
    pricePerUnit: 12.00,
    subtotal: 2400.00,
    leadTime: '14-16 days',
    image: '/placeholder-product.png',
  },
  {
    id: '3',
    name: 'Hi-Vis Vest — Orange',
    totalUnits: 100,
    pricePerUnit: 32.00,
    subtotal: 3200.00,
    leadTime: '18-20 days',
    image: '/placeholder-product.png',
  },
];

const meta: Meta<typeof OrderSummary> = {
  title: 'App/Orders/OrderSummary',
  component: OrderSummary,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A table-based order summary showing design names, quantities, pricing, and lead times. Used in the quote calculator and order review flows. Animates in with Framer Motion.',
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
    designs: sampleDesigns,
  },
};

export const SingleDesign: Story = {
  args: {
    designs: [sampleDesigns[0]],
  },
  parameters: {
    docs: {
      description: {
        story: 'Order summary with a single design item.',
      },
    },
  },
};

export const ManyDesigns: Story = {
  args: {
    designs: [
      ...sampleDesigns,
      {
        id: '4',
        name: 'Hoodie — Grey Marle',
        totalUnits: 30,
        pricePerUnit: 45.00,
        subtotal: 1350.00,
        leadTime: '14-16 days',
      },
      {
        id: '5',
        name: 'Cap — White',
        totalUnits: 150,
        pricePerUnit: 8.50,
        subtotal: 1275.00,
        leadTime: '7-10 days',
      },
      {
        id: '6',
        name: 'Tote Bag — Natural',
        totalUnits: 500,
        pricePerUnit: 5.00,
        subtotal: 2500.00,
        leadTime: '10-12 days',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Large order with 6 design items demonstrating table scroll behavior.',
      },
    },
  },
};

export const WithoutImages: Story = {
  args: {
    designs: sampleDesigns.map(({ image, ...rest }) => rest),
  },
  parameters: {
    docs: {
      description: {
        story: 'Order summary where design images are not provided. The image column gracefully omits thumbnails.',
      },
    },
  },
};

export const EmptyOrder: Story = {
  args: {
    designs: [],
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state with no designs — renders the table header only.',
      },
    },
  },
};

export const CustomStyling: Story = {
  args: {
    designs: sampleDesigns,
    className: 'bg-gray-50 border border-gray-200 rounded-2xl p-6',
  },
  parameters: {
    docs: {
      description: {
        story: 'Order summary with custom container styling.',
      },
    },
  },
};
