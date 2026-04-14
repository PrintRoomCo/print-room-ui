import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { OrderCard } from '@print-room-studio/ui';

const meta: Meta<typeof OrderCard> = {
  title: 'Storefront/OrderCard',
  component: OrderCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Horizontal order card showing product image, details, quantity, and optional download action. Matches the Figma past-orders layout.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    productName: 'AS Colour Staple Tee — Black',
    description: 'Screen print, front centre',
    quantity: 48,
    collectionLabel: 'Summer 2025 Staff Uniforms',
    className: 'w-[400px]',
  },
};

export const WithImage: Story = {
  args: {
    productName: 'Continental Hoodie — Navy',
    description: 'Embroidery, left chest',
    quantity: 24,
    imageSrc: 'https://placehold.co/200x200/e2e8f0/475569?text=Hoodie',
    collectionLabel: 'Winter Collection',
    className: 'w-[400px]',
  },
};

export const WithDownload: Story = {
  args: {
    productName: 'Stanley/Stella Creator 2.0 — White',
    description: 'DTG, full front',
    quantity: 120,
    collectionLabel: 'Event Merch',
    onDownload: fn(),
    className: 'w-[400px]',
  },
};

export const OrderList: Story = {
  render: () => (
    <div className="w-[450px] space-y-3">
      <OrderCard
        productName="AS Colour Staple Tee — Black"
        description="Screen print, front centre"
        quantity={48}
        collectionLabel="Summer 2025 Staff Uniforms"
        onDownload={() => {}}
      />
      <OrderCard
        productName="Continental Hoodie — Navy"
        description="Embroidery, left chest"
        quantity={24}
        collectionLabel="Winter Collection"
        onDownload={() => {}}
      />
      <OrderCard
        productName="Earth Positive Classic — Bone"
        description="2-colour screen print"
        quantity={96}
        collectionLabel="Retail Launch"
        onDownload={() => {}}
      />
    </div>
  ),
};
