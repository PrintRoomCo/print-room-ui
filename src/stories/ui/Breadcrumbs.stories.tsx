import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumbs } from '@print-room-studio/ui';
import { storefrontBreadcrumbs } from '../fixtures/production-data';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Storefront/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'React equivalent of the Shopify `breadcrumbs.liquid` snippet for collection and product trails.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ProductTrail: Story = {
  args: {
    items: storefrontBreadcrumbs,
  },
};

export const CollectionWithTag: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Collections', href: '/collections' },
      { label: 'Hoodies', href: '/collections/hoodies' },
      { label: 'Organic', current: true },
    ],
    separator: 'bullet',
  },
};

export const WrappedMobileTrail: Story = {
  args: {
    items: storefrontBreadcrumbs,
    wrap: true,
    separator: 'emdash',
  },
  decorators: [
    (Story) => (
      <div className="max-w-[320px]">
        <Story />
      </div>
    ),
  ],
};
