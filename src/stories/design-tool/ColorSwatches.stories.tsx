import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ColorSwatches } from '@vendored/design-tool/color/ColorSwatches';

// Define the ProductSwatch type locally for stories
interface ProductSwatch {
  id: string;
  label: string;
  hex: string;
}

const sampleSwatches: ProductSwatch[] = [
  { id: '1', label: 'Black', hex: '#000000' },
  { id: '2', label: 'White', hex: '#FFFFFF' },
  { id: '3', label: 'Navy', hex: '#1e3a5f' },
  { id: '4', label: 'Red', hex: '#dc2626' },
  { id: '5', label: 'Forest Green', hex: '#166534' },
  { id: '6', label: 'Royal Blue', hex: '#1d4ed8' },
  { id: '7', label: 'Gray', hex: '#6b7280' },
  { id: '8', label: 'Yellow', hex: '#eab308' },
];

const meta: Meta<typeof ColorSwatches> = {
  title: 'App/Design Tool/ColorSwatches',
  component: ColorSwatches,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    swatches: {
      description: 'Array of color swatches to display',
    },
    value: {
      control: 'text',
      description: 'Currently selected swatch ID',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable all swatches',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ColorSwatches>;

// Interactive wrapper component
const ColorSwatchesDemo = ({ swatches, disabled }: { swatches: ProductSwatch[]; disabled?: boolean }) => {
  const [selected, setSelected] = useState<string>('1');

  return (
    <div className="p-4">
      <ColorSwatches
        swatches={swatches}
        value={selected}
        onChange={setSelected}
        disabled={disabled}
      />
      <p className="mt-4 text-sm text-gray-600">
        Selected: {swatches.find(s => s.id === selected)?.label || 'None'}
      </p>
    </div>
  );
};

export const Default: Story = {
  render: () => <ColorSwatchesDemo swatches={sampleSwatches} />,
};

export const FewColors: Story = {
  render: () => <ColorSwatchesDemo swatches={sampleSwatches.slice(0, 3)} />,
};

export const ManyColors: Story = {
  render: () => (
    <ColorSwatchesDemo
      swatches={[
        ...sampleSwatches,
        { id: '9', label: 'Pink', hex: '#ec4899' },
        { id: '10', label: 'Purple', hex: '#8b5cf6' },
        { id: '11', label: 'Orange', hex: '#f97316' },
        { id: '12', label: 'Teal', hex: '#14b8a6' },
      ]}
    />
  ),
};

export const Disabled: Story = {
  render: () => <ColorSwatchesDemo swatches={sampleSwatches} disabled />,
};

export const NoColors: Story = {
  render: () => (
    <div className="p-4">
      <ColorSwatches
        swatches={[]}
        value={null}
        onChange={() => {}}
      />
    </div>
  ),
};

export const PastelColors: Story = {
  render: () => (
    <ColorSwatchesDemo
      swatches={[
        { id: '1', label: 'Blush', hex: '#fce4ec' },
        { id: '2', label: 'Mint', hex: '#e8f5e9' },
        { id: '3', label: 'Lavender', hex: '#ede7f6' },
        { id: '4', label: 'Sky', hex: '#e3f2fd' },
        { id: '5', label: 'Peach', hex: '#fff3e0' },
        { id: '6', label: 'Cream', hex: '#fffde7' },
      ]}
    />
  ),
};
