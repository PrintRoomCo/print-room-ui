import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { BrandingServiceCard } from '@print-room-studio/ui';

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
    title: 'Screen Printing',
    description:
      'Our screen printing service uses premium water-based inks that are soft to the touch and built to last. Ideal for bulk orders of 25+ units with vibrant, durable results.',
    imageSrc: 'https://placehold.co/400x280/e2e8f0/64748b?text=Screen+Print',
    ctaLabel: 'Get a quote',
    ctaHref: '#',
    open: true,
  },
};

export const Embroidery: Story = {
  args: {
    title: 'Embroidery',
    description:
      'Professional embroidery for a premium, textured finish. Perfect for polos, caps, and workwear. We digitise your logo in-house for precise stitch quality.',
    imageSrc: 'https://placehold.co/400x280/e2e8f0/64748b?text=Embroidery',
    ctaLabel: 'Learn more',
    ctaHref: '#',
    open: true,
  },
};

export const NoImage: Story = {
  args: {
    title: 'Heat Transfers',
    description:
      'Full-colour heat transfers are perfect for complex designs, gradients, and photo-quality prints. Available for small and large runs.',
    ctaLabel: 'Request a quote',
    open: true,
  },
};

export const WithoutOverlay: Story = {
  args: {
    title: 'Patches',
    description: 'Custom woven and embroidered patches for jackets, bags, and hats.',
    imageSrc: 'https://placehold.co/400x280/e2e8f0/64748b?text=Patches',
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
          title="Screen Printing"
          description="Our screen printing service uses premium water-based inks that are soft to the touch and built to last."
          imageSrc="https://placehold.co/400x280/e2e8f0/64748b?text=Screen+Print"
          ctaLabel="Get a quote"
          ctaHref="#"
          open={open}
          onClose={() => setOpen(false)}
        />
      </div>
    );
  },
};
