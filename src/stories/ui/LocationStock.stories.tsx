import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LocationStock } from '@print-room-studio/ui';

const meta = {
  title: 'Storefront/LocationStock',
  component: LocationStock,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Per-store location stock availability list ported from the Shopify `location-inventory.liquid` section. Shows pickup availability across Print Room locations.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LocationStock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    locations: [
      { locationName: 'Auckland CBD', available: true },
      { locationName: 'Wellington', available: true },
      { locationName: 'Christchurch', available: false },
    ],
  },
};

export const AllAvailable: Story = {
  args: {
    locations: [
      { locationName: 'Auckland CBD', available: true },
      { locationName: 'Wellington', available: true },
      { locationName: 'Hamilton', available: true },
    ],
  },
};

export const AllUnavailable: Story = {
  args: {
    locations: [
      { locationName: 'Auckland CBD', available: false },
      { locationName: 'Wellington', available: false },
    ],
  },
};

export const SingleLocation: Story = {
  args: {
    locations: [{ locationName: 'The Print Room HQ', available: true }],
  },
};

export const NoHeading: Story = {
  args: {
    showHeading: false,
    locations: [
      { locationName: 'Auckland CBD', available: true },
      { locationName: 'Wellington', available: false },
    ],
  },
};

export const CustomLabels: Story = {
  args: {
    inStockLabel: 'Available for pickup',
    outOfStockLabel: 'Unavailable',
    heading: 'Pickup locations',
    locations: [
      { locationName: 'Main Warehouse', available: true },
      { locationName: 'Retail Store', available: false },
      { locationName: 'Distribution Centre', available: true },
    ],
  },
};

export const Empty: Story = {
  args: {
    locations: [],
  },
};
