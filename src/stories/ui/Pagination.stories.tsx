import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pagination } from '@print-room-studio/ui';
import { storefrontPaginationItems } from '../fixtures/production-data';

const meta: Meta<typeof Pagination> = {
  title: 'Storefront/Pagination',
  component: Pagination,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'React equivalent of the Shopify `pagination.liquid` snippet for collection and search result pages.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: storefrontPaginationItems,
    previousHref: '/collections/t-shirts?page=2',
    nextHref: '/collections/t-shirts?page=4',
  },
};

export const WithEllipsis: Story = {
  args: {
    items: [
      { page: 1, href: '/collections?page=1' },
      { ellipsis: true },
      { page: 8, href: '/collections?page=8' },
      { page: 9, href: '/collections?page=9', current: true },
      { page: 10, href: '/collections?page=10' },
      { ellipsis: true },
      { page: 24, href: '/collections?page=24' },
    ],
    previousHref: '/collections?page=8',
    nextHref: '/collections?page=10',
  },
};

export const FirstPage: Story = {
  args: {
    items: [
      { page: 1, href: '/collections?page=1', current: true },
      { page: 2, href: '/collections?page=2' },
      { page: 3, href: '/collections?page=3' },
    ],
    nextHref: '/collections?page=2',
  },
};
