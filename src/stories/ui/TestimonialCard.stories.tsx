import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TestimonialCard } from '@print-room-studio/ui';

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
    quote:
      'The print quality is outstanding and the turnaround time was incredibly fast. Highly recommend for anyone needing custom branded apparel.',
    source: 'Sarah M., Auckland',
  },
};

export const Centered: Story = {
  args: {
    quote:
      'Best screen printing service in New Zealand. Our team uniforms look amazing!',
    source: 'James T., Wellington',
    align: 'center',
  },
};

export const BodyFont: Story = {
  args: {
    quote:
      'Professional service from start to finish. The embroidery on our corporate polo shirts exceeded expectations.',
    source: 'Print Room Customer',
    fontStyle: 'body',
  },
};

export const LargeText: Story = {
  args: {
    quote: 'Absolutely brilliant quality every single time.',
    source: 'Mike R.',
    textSize: '2xl',
    align: 'center',
  },
};

export const NoSource: Story = {
  args: {
    quote:
      'We ordered 500 custom t-shirts and every single one was perfect. Will definitely be ordering again.',
  },
};

export const RichText: Story = {
  args: {
    quote: (
      <>
        <p>
          We&apos;ve been using The Print Room for over 3 years now. Their{' '}
          <a href="#">screen printing</a> and{' '}
          <a href="#">embroidery services</a> are second to none.
        </p>
        <p className="mt-2">Couldn&apos;t recommend them more highly.</p>
      </>
    ),
    source: 'Corporate Client',
  },
};

/** Grid of testimonials matching the Shopify section layout */
export const TestimonialGrid: Story = {
  args: { quote: 'Outstanding quality and service.' },
  decorators: [
    () => (
      <div className="grid gap-10 md:grid-cols-3" style={{ maxWidth: 960 }}>
        <TestimonialCard
          quote="The print quality is outstanding and the turnaround time was incredibly fast."
          source="Sarah M., Auckland"
        />
        <TestimonialCard
          quote="Best screen printing service in New Zealand. Our team uniforms look amazing!"
          source="James T., Wellington"
        />
        <TestimonialCard
          quote="Professional service from start to finish. The embroidery exceeded expectations."
          source="Lisa K., Christchurch"
        />
      </div>
    ),
  ],
};
