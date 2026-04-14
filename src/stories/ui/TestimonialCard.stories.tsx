import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TestimonialCard } from '@print-room-studio/ui';
import { storefrontTestimonials } from '../fixtures/production-data';

const meta = {
  title: 'Storefront/TestimonialCard',
  component: TestimonialCard,
  parameters: {
    docs: {
      description: {
        component:
          'Blockquote testimonial card ported from the Shopify `testimonials.liquid` section. Renders a quote with optional source attribution, configurable alignment and text size.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 480 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TestimonialCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    quote: storefrontTestimonials[0].quote,
    source: storefrontTestimonials[0].role,
  },
};

export const Centered: Story = {
  args: {
    quote: storefrontTestimonials[1].quote,
    source: storefrontTestimonials[1].role,
    align: 'center',
  },
};

export const BodyFont: Story = {
  args: {
    quote: storefrontTestimonials[2].quote,
    source: storefrontTestimonials[2].role,
    fontStyle: 'body',
  },
};

export const LargeText: Story = {
  args: {
    quote: 'The sample pack, quote flow, and final delivery all felt joined up.',
    source: 'Operations Team, Festival Client',
    textSize: '2xl',
    align: 'center',
  },
};

export const NoSource: Story = {
  args: {
    quote: 'We ordered tees, caps, and woven patches for a product launch and the finish across every item was consistent.',
  },
};

export const RichText: Story = {
  args: {
    quote: (
      <>
        <p>
          We&apos;ve used Print Room for merch drops across New Zealand and Australia. Their{' '}
          <a href="/pages/screen-printing">screen printing</a> and{' '}
          <a href="/pages/embroidery">embroidery</a> work has stayed sharp at every scale.
        </p>
        <p className="mt-2">The quote and approval process is also much clearer than our previous supplier.</p>
      </>
    ),
    source: 'Marketing Team, Coffee Supreme',
  },
};

/** Grid of testimonials matching the Shopify section layout */
export const TestimonialGrid: Story = {
  args: { quote: 'Outstanding quality and service.' },
  decorators: [
    () => (
      <div className="grid gap-10 md:grid-cols-3" style={{ maxWidth: 960 }}>
        <TestimonialCard
          quote={storefrontTestimonials[0].quote}
          source={storefrontTestimonials[0].role}
        />
        <TestimonialCard
          quote={storefrontTestimonials[1].quote}
          source={storefrontTestimonials[1].role}
        />
        <TestimonialCard
          quote={storefrontTestimonials[2].quote}
          source={storefrontTestimonials[2].role}
        />
      </div>
    ),
  ],
};
