import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ColorSwatches } from '@vendored/design-tool/color/ColorSwatches';

// Define the ProductSwatch type locally for stories
interface ProductSwatch {
  id: string;
  label: string;
  hex: string;
}

const sampleSwatches: ProductSwatch[] = [
  { id: '1', label: 'Black', hex: '#000000' },
  { id: '2', label: 'Bone', hex: '#EEE8DD' },
  { id: '3', label: 'Navy', hex: '#2B3990' },
  { id: '4', label: 'Brick', hex: '#A83A4B' },
  { id: '5', label: 'Forest', hex: '#658A6A' },
  { id: '6', label: 'Charcoal', hex: '#2C2C2C' },
  { id: '7', label: 'Walnut', hex: '#6B4E3D' },
  { id: '8', label: 'Off White', hex: '#FBFBF6' },
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
        { id: '9', label: 'Slate', hex: '#64748B' },
        { id: '10', label: 'Mocha', hex: '#8B6B52' },
        { id: '11', label: 'Rose', hex: '#C77D8B' },
        { id: '12', label: 'Dusty Blue', hex: '#6E88A8' },
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
        { id: '1', label: 'Bone', hex: '#F8F3EA' },
        { id: '2', label: 'Sage', hex: '#D6E1D2' },
        { id: '3', label: 'Dusty Mauve', hex: '#D9C8D8' },
        { id: '4', label: 'Cloud', hex: '#D8E4ED' },
        { id: '5', label: 'Clay', hex: '#E6D1C3' },
        { id: '6', label: 'Oat', hex: '#F5F0E4' },
      ]}
    />
  ),
};
