import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Pill } from '@print-room-studio/ui';
import { storefrontServices } from '../fixtures/production-data';

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
    children: storefrontServices[0].title,
  },
};

export const Embroidery: Story = {
  args: {
    children: storefrontServices[1].title,
  },
};

export const NoArrow: Story = {
  args: {
    children: storefrontServices[2].title,
    showArrow: false,
  },
};

export const Filled: Story = {
  args: {
    children: storefrontServices[4].title,
    variant: 'filled',
  },
};

export const Outline: Story = {
  args: {
    children: storefrontServices[3].title,
    variant: 'outline',
  },
};

export const Soft: Story = {
  args: {
    children: 'Get a Quote',
    variant: 'soft',
    showArrow: false,
  },
};

export const Small: Story = {
  args: {
    children: 'MOQ 25',
    size: 'sm',
    showArrow: false,
  },
};

export const Large: Story = {
  args: {
    children: 'Start a Quote',
    size: 'lg',
  },
};

/** Row of branding service pills like on the Shopify PDP */
export const ServiceRow: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {storefrontServices.map((service) => (
        <Pill key={service.key}>{service.title}</Pill>
      ))}
    </div>
  ),
};

export const QuotePill: Story = {
  args: {
    children: 'Get a Quote',
    showArrow: false,
  },
};
