import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Dropdown, Label } from '@print-room-studio/ui';
import { brandOptions, storefrontLocations } from '../fixtures/production-data';

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

const sampleOptions = brandOptions;

export const Default: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Select a brand',
  },
};

const ControlledDropdown = () => {
  const [value, setValue] = useState('');
  return (
    <Dropdown
      options={sampleOptions}
      value={value}
      onValueChange={setValue}
      placeholder="Select a brand"
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
    placeholder: 'Brand',
  },
};

export const Large: Story = {
  args: {
    options: sampleOptions,
    size: 'lg',
    placeholder: 'Select a brand',
  },
};

export const Disabled: Story = {
  args: {
    options: sampleOptions,
    disabled: true,
    placeholder: 'Select a brand',
  },
};

export const WithDisabledOption: Story = {
  args: {
    options: [
      { value: 'screen', label: 'Screen Printing' },
      { value: 'supacolour', label: 'Supacolour', disabled: true },
      { value: 'embroidery', label: 'Embroidery' },
    ],
    placeholder: 'Select a decoration method',
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
          { value: 'heatpress', label: 'Heat Transfers' },
          { value: 'embroidery', label: 'Embroidery' },
          { value: 'finishing', label: 'Finishing' },
        ]}
        value={method}
        onValueChange={setMethod}
        placeholder="Select decoration method"
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
          { value: '25', label: '25 units' },
          { value: '50', label: '50 units' },
          { value: '100', label: '100 units' },
          { value: '250', label: '250 units' },
          { value: '500', label: '500 units' },
        ]}
        value={quantity}
        onValueChange={setQuantity}
        placeholder="Select quantity break"
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
          placeholder="Brand"
        />
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Medium (default)</Label>
        <Dropdown
          options={sampleOptions}
          size="md"
          placeholder="Select a brand"
        />
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Large</Label>
        <Dropdown
          options={storefrontLocations.map((location) => ({ value: location, label: location }))}
          size="lg"
          placeholder="Select your delivery region"
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
