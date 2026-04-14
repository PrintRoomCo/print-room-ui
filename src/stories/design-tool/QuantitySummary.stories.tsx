import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import QuantitySummary from '@vendored/design-tool/QuantitySummary';

const meta: Meta<typeof QuantitySummary> = {
  title: 'App/Design Tool/QuantitySummary',
  component: QuantitySummary,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Compact quantity summary from the design-tool quote flow for products that do not require a size grid.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    onEdit: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    quantity: 250,
  },
};

export const ReadOnly: Story = {
  args: {
    quantity: 48,
    readOnly: true,
  },
};
