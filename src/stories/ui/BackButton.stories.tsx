import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { BackButton } from '@print-room-studio/ui';
import { storefrontProducts } from '../fixtures/production-data';

const meta: Meta<typeof BackButton> = {
  title: 'App/Design Tool/BackButton',
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
    label: 'Back to design',
  },
};

export const CustomLabel: Story = {
  args: {
    label: 'Back to quote',
  },
};

export const ReturnToProducts: Story = {
  args: {
    label: 'Back to catalogue',
  },
};

export const PreviousStep: Story = {
  args: {
    label: 'Previous step',
  },
};

export const InContext: Story = {
  render: () => (
    <div className="w-[400px] space-y-4">
      <BackButton label="Back to catalogue" />
      <div className="border rounded-lg p-4">
        <h2 className="text-lg font-semibold">{storefrontProducts[0].title}</h2>
        <p className="text-sm text-muted-foreground mt-2">
          Reviewing print placements and garment colour before sending the quote.
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
        <BackButton label="Back to review" />
        <h1 className="text-lg font-semibold">Quote Summary</h1>
        <div className="w-[70px]" /> {/* Spacer for alignment */}
      </div>
      <div className="p-4">
        <p className="text-muted-foreground">Artwork, quantities, and delivery notes for the current quote.</p>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
