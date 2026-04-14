import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { BrandingServiceCard } from '@print-room-studio/ui';
import { storefrontServices } from '../fixtures/production-data';

const meta = {
  title: 'Storefront/BrandingServiceCard',
  component: BrandingServiceCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Floating service detail card ported from the Shopify `branding-service-cards.liquid` section. In Shopify this appears as a fixed overlay when a branding-service-pill is clicked.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    onClose: fn(),
    onCtaClick: fn(),
  },
} satisfies Meta<typeof BrandingServiceCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...storefrontServices[0],
    open: true,
  },
};

export const Embroidery: Story = {
  args: {
    ...storefrontServices[1],
    open: true,
  },
};

export const NoImage: Story = {
  args: {
    ...storefrontServices[2],
    imageSrc: undefined,
    open: true,
  },
};

export const WithoutOverlay: Story = {
  args: {
    ...storefrontServices[4],
    showOverlay: false,
    open: true,
  },
};

export const Closed: Story = {
  args: {
    title: 'Finishing',
    description: 'This card is closed and should not render.',
    open: false,
  },
};

/** Interactive open/close demo — click the pill, then close the card */
export const Interactive: Story = {
  args: {
    title: 'Screen Printing',
    open: true,
  },
  render: function InteractiveDemo() {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-full border border-gray-300 px-4 py-1.5 text-sm font-medium transition-colors hover:border-gray-500"
        >
          Screen Print
          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </button>

        <BrandingServiceCard
          {...storefrontServices[0]}
          open={open}
          onClose={() => setOpen(false)}
        />
      </div>
    );
  },
};
