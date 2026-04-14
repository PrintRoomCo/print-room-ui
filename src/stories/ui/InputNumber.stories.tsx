import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { InputNumber } from '@print-room-studio/ui';

const meta: Meta<typeof InputNumber> = {
  title: 'Primitives/InputNumber',
  component: InputNumber,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A number input component with integrated spinner controls for precise numeric entry.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'dark'],
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
      description: 'Step increment',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    width: {
      control: 'text',
      description: 'Custom width for the input',
    },
  },
  args: {
    onValueChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const ControlledInputNumber = (props: Parameters<typeof InputNumber>[0]) => {
  const [value, setValue] = useState(props.value || 24);
  return <InputNumber {...props} value={value} onValueChange={setValue} />;
};

export const Default: Story = {
  render: () => <ControlledInputNumber value={24} />,
};

export const WithLabel: Story = {
  render: () => <ControlledInputNumber value={24} label="Quantity" />,
};

export const Dark: Story = {
  render: () => (
    <div className="bg-gray-900 p-4 rounded-lg">
      <ControlledInputNumber value={24} variant="dark" label="Quantity" />
    </div>
  ),
};

export const CustomWidth: Story = {
  render: () => <ControlledInputNumber value={24} width="80px" />,
};

export const WithMinMax: Story = {
  render: () => (
    <div className="space-y-2">
      <ControlledInputNumber value={24} min={12} max={100} label="Quantity" />
      <p className="text-sm text-muted-foreground">Range: 12-100</p>
    </div>
  ),
};

export const CustomStep: Story = {
  render: () => (
    <div className="space-y-2">
      <ControlledInputNumber value={50} step={10} label="Percentage" />
      <p className="text-sm text-muted-foreground">Step: 10</p>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => <ControlledInputNumber value={24} disabled label="Quantity" />,
};

export const BothVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <span className="text-sm font-medium">Default Variant</span>
        <ControlledInputNumber value={24} label="Quantity" />
      </div>
      <div className="bg-gray-900 p-4 rounded-lg space-y-2">
        <span className="text-sm font-medium text-white">Dark Variant</span>
        <ControlledInputNumber value={24} variant="dark" label="Quantity" />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const SizeBreakdown: Story = {
  render: () => (
    <div className="border rounded-lg p-4 space-y-4 w-[350px]">
      <h3 className="font-medium">Size Breakdown</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm">Small (S)</span>
          <ControlledInputNumber value={6} min={0} width="60px" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Medium (M)</span>
          <ControlledInputNumber value={12} min={0} width="60px" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Large (L)</span>
          <ControlledInputNumber value={6} min={0} width="60px" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">X-Large (XL)</span>
          <ControlledInputNumber value={0} min={0} width="60px" />
        </div>
      </div>
      <div className="border-t pt-3 flex justify-between">
        <span className="font-medium">Total</span>
        <span className="font-medium">24 pieces</span>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
