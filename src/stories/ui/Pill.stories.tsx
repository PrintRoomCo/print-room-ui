import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Pill } from '@print-room-studio/ui';

const meta = {
  title: 'Storefront/Pill',
  component: Pill,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Clickable pill / chip button ported from the Shopify `branding-service-pill.liquid` snippet. Used as triggers for branding service popups in the Shopify theme.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Pill>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Screen Print',
  },
};

export const Embroidery: Story = {
  args: {
    children: 'Embroidery',
  },
};

export const NoArrow: Story = {
  args: {
    children: 'Heat Transfer',
    showArrow: false,
  },
};

export const Filled: Story = {
  args: {
    children: 'Patches',
    variant: 'filled',
  },
};

export const Outline: Story = {
  args: {
    children: 'Finishing',
    variant: 'outline',
  },
};

export const Soft: Story = {
  args: {
    children: 'Digital Print',
    variant: 'soft',
  },
};

export const Small: Story = {
  args: {
    children: 'DTG',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    children: 'Sublimation',
    size: 'lg',
  },
};

/** Row of branding service pills like on the Shopify PDP */
export const ServiceRow: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Pill>Screen Print</Pill>
      <Pill>Embroidery</Pill>
      <Pill>Heat Transfer</Pill>
      <Pill>Patches</Pill>
      <Pill>Finishing</Pill>
    </div>
  ),
};
