import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from '@print-room-studio/ui';

const meta: Meta<typeof Separator> = {
  title: 'Primitives/Separator',
  component: Separator,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A separator component for visually dividing content, supporting horizontal and vertical orientations.',
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the separator',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
  render: (args) => (
    <div className="w-[400px]">
      <div className="space-y-1">
        <h4 className="text-sm font-medium">Print Room Studio</h4>
        <p className="text-sm text-muted-foreground">
          Custom apparel printing solutions.
        </p>
      </div>
      <Separator {...args} className="my-4" />
      <div className="space-y-1">
        <h4 className="text-sm font-medium">Contact Us</h4>
        <p className="text-sm text-muted-foreground">
          Get in touch for custom orders.
        </p>
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  render: (args) => (
    <div className="flex h-5 items-center space-x-4 text-sm">
      <span>Home</span>
      <Separator {...args} />
      <span>Products</span>
      <Separator {...args} />
      <span>About</span>
      <Separator {...args} />
      <span>Contact</span>
    </div>
  ),
};

export const InCard: Story = {
  render: () => (
    <div className="w-[350px] rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <span className="font-medium">Order Summary</span>
        <span className="text-sm text-muted-foreground">#12345</span>
      </div>
      <Separator className="my-4" />
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>T-Shirts (24 pcs)</span>
          <span>$288.00</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Screen Printing</span>
          <span>$120.00</span>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="flex justify-between font-medium">
        <span>Total</span>
        <span>$408.00</span>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const NavigationBreadcrumb: Story = {
  render: () => (
    <div className="flex items-center space-x-2 text-sm">
      <a href="#" className="text-muted-foreground hover:text-foreground">
        Home
      </a>
      <Separator orientation="vertical" className="h-4" />
      <a href="#" className="text-muted-foreground hover:text-foreground">
        Products
      </a>
      <Separator orientation="vertical" className="h-4" />
      <a href="#" className="text-muted-foreground hover:text-foreground">
        T-Shirts
      </a>
      <Separator orientation="vertical" className="h-4" />
      <span className="font-medium">Premium Cotton Tee</span>
    </div>
  ),
};

export const SectionDivider: Story = {
  render: () => (
    <div className="w-[500px] space-y-6">
      <section>
        <h2 className="text-lg font-semibold mb-2">Product Details</h2>
        <p className="text-sm text-muted-foreground">
          High-quality cotton t-shirt with custom screen printing.
        </p>
      </section>
      <Separator />
      <section>
        <h2 className="text-lg font-semibold mb-2">Pricing</h2>
        <p className="text-sm text-muted-foreground">
          Starting at $12.00 per unit for orders of 24+.
        </p>
      </section>
      <Separator />
      <section>
        <h2 className="text-lg font-semibold mb-2">Delivery</h2>
        <p className="text-sm text-muted-foreground">
          Standard production time is 7-10 business days.
        </p>
      </section>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
