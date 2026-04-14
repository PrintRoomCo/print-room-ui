import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { BackButton } from '@print-room-studio/ui';

const meta: Meta<typeof BackButton> = {
  title: 'App/Layout/BackButton',
  component: BackButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'An animated back button component with Framer Motion hover and tap effects.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'The text to display on the button',
    },
  },
  args: {
    onClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Back',
  },
};

export const CustomLabel: Story = {
  args: {
    label: 'Go Back',
  },
};

export const ReturnToProducts: Story = {
  args: {
    label: 'Return to Products',
  },
};

export const PreviousStep: Story = {
  args: {
    label: 'Previous Step',
  },
};

export const InContext: Story = {
  render: () => (
    <div className="w-[400px] space-y-4">
      <BackButton label="Back to Catalog" />
      <div className="border rounded-lg p-4">
        <h2 className="text-lg font-semibold">Product Details</h2>
        <p className="text-sm text-muted-foreground mt-2">
          Premium Cotton T-Shirt with custom printing options.
        </p>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const NavigationHeader: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <div className="flex items-center justify-between p-4 border-b">
        <BackButton label="Back" />
        <h1 className="text-lg font-semibold">Order Details</h1>
        <div className="w-[70px]" /> {/* Spacer for alignment */}
      </div>
      <div className="p-4">
        <p className="text-muted-foreground">Order content goes here...</p>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
