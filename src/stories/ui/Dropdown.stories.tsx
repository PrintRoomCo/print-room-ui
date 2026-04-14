import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Dropdown, Label } from '@print-room-studio/ui';

const meta: Meta<typeof Dropdown> = {
  title: 'Primitives/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A dropdown select component for choosing from a list of options.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the dropdown',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the dropdown is disabled',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no option is selected',
    },
  },
  args: {
    onValueChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

export const Default: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Select an option',
  },
};

const ControlledDropdown = () => {
  const [value, setValue] = useState('');
  return (
    <Dropdown
      options={sampleOptions}
      value={value}
      onValueChange={setValue}
      placeholder="Select an option"
    />
  );
};

export const Controlled: Story = {
  render: () => <ControlledDropdown />,
};

export const Small: Story = {
  args: {
    options: sampleOptions,
    size: 'sm',
    placeholder: 'Select',
  },
};

export const Large: Story = {
  args: {
    options: sampleOptions,
    size: 'lg',
    placeholder: 'Select an option',
  },
};

export const Disabled: Story = {
  args: {
    options: sampleOptions,
    disabled: true,
    placeholder: 'Select an option',
  },
};

export const WithDisabledOption: Story = {
  args: {
    options: [
      { value: 'available1', label: 'Available Option 1' },
      { value: 'disabled', label: 'Disabled Option', disabled: true },
      { value: 'available2', label: 'Available Option 2' },
    ],
    placeholder: 'Select an option',
  },
};

const PrintMethodDropdown = () => {
  const [method, setMethod] = useState('');
  return (
    <div className="space-y-2">
      <Label>Print Method</Label>
      <Dropdown
        options={[
          { value: 'screenprint', label: 'Screen Printing' },
          { value: 'heatpress', label: 'Heat Press' },
          { value: 'embroidery', label: 'Embroidery' },
          { value: 'dtg', label: 'Direct to Garment' },
        ]}
        value={method}
        onValueChange={setMethod}
        placeholder="Select print method"
      />
      {method && (
        <p className="text-sm text-muted-foreground">
          Selected: {method}
        </p>
      )}
    </div>
  );
};

export const PrintMethods: Story = {
  render: () => <PrintMethodDropdown />,
  parameters: {
    layout: 'padded',
  },
};

const QuantityDropdown = () => {
  const [quantity, setQuantity] = useState('24');
  return (
    <div className="space-y-2">
      <Label>Quantity</Label>
      <Dropdown
        options={[
          { value: '12', label: '12 pieces' },
          { value: '24', label: '24 pieces' },
          { value: '48', label: '48 pieces' },
          { value: '72', label: '72 pieces' },
          { value: '144', label: '144 pieces' },
        ]}
        value={quantity}
        onValueChange={setQuantity}
        placeholder="Select quantity"
      />
    </div>
  );
};

export const QuantitySelection: Story = {
  render: () => <QuantityDropdown />,
  parameters: {
    layout: 'padded',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="space-y-1">
        <Label className="text-xs">Small</Label>
        <Dropdown
          options={sampleOptions}
          size="sm"
          placeholder="Select"
        />
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Medium (default)</Label>
        <Dropdown
          options={sampleOptions}
          size="md"
          placeholder="Select an option"
        />
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Large</Label>
        <Dropdown
          options={sampleOptions}
          size="lg"
          placeholder="Select an option"
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
