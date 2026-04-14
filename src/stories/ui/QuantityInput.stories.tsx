import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { QuantityInput } from '@print-room-studio/ui';

const meta: Meta<typeof QuantityInput> = {
  title: 'Primitives/QuantityInput',
  component: QuantityInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A quantity input component with increment/decrement buttons for selecting numeric values.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the input',
    },
    variant: {
      control: 'select',
      options: ['default', 'rounded', 'inline'],
      description: 'The visual variant of the input',
    },
    min: {
      control: 'number',
      description: 'Minimum allowed value',
    },
    max: {
      control: 'number',
      description: 'Maximum allowed value',
    },
    step: {
      control: 'number',
      description: 'Step increment for buttons',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    showButtons: {
      control: 'boolean',
      description: 'Whether to show increment/decrement buttons',
    },
  },
  args: {
    onValueChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const ControlledQuantityInput = (props: Parameters<typeof QuantityInput>[0]) => {
  const [value, setValue] = useState(props.value || 24);
  return <QuantityInput {...props} value={value} onValueChange={setValue} />;
};

export const Default: Story = {
  render: () => <ControlledQuantityInput value={24} />,
};

export const WithLabel: Story = {
  render: () => <ControlledQuantityInput value={24} label="Quantity" />,
};

export const Small: Story = {
  render: () => <ControlledQuantityInput value={12} size="sm" />,
};

export const Large: Story = {
  render: () => <ControlledQuantityInput value={48} size="lg" />,
};

export const Rounded: Story = {
  render: () => <ControlledQuantityInput value={24} variant="rounded" />,
};

export const Inline: Story = {
  render: () => <ControlledQuantityInput value={24} variant="inline" label="Qty" />,
};

export const WithMinMax: Story = {
  render: () => (
    <div className="space-y-2">
      <ControlledQuantityInput value={24} min={12} max={144} />
      <p className="text-sm text-muted-foreground">Min: 12, Max: 144</p>
    </div>
  ),
};

export const CustomStep: Story = {
  render: () => (
    <div className="space-y-2">
      <ControlledQuantityInput value={24} step={12} />
      <p className="text-sm text-muted-foreground">Step: 12</p>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => <ControlledQuantityInput value={24} disabled />,
};

export const NoButtons: Story = {
  render: () => <ControlledQuantityInput value={24} showButtons={false} />,
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-1">
        <span className="text-sm text-muted-foreground">Default</span>
        <ControlledQuantityInput value={24} variant="default" />
      </div>
      <div className="space-y-1">
        <span className="text-sm text-muted-foreground">Rounded</span>
        <ControlledQuantityInput value={24} variant="rounded" />
      </div>
      <div className="space-y-1">
        <span className="text-sm text-muted-foreground">Inline</span>
        <ControlledQuantityInput value={24} variant="inline" label="Qty" />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const OrderQuantity: Story = {
  render: () => (
    <div className="border rounded-lg p-4 space-y-4 w-[300px]">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">Premium T-Shirt</p>
          <p className="text-sm text-muted-foreground">$12.00 each</p>
        </div>
        <ControlledQuantityInput value={24} min={12} size="sm" />
      </div>
      <p className="text-sm text-muted-foreground">
        Minimum order: 12 pieces
      </p>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
