import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ColorPicker } from '@print-room-studio/ui';

const meta: Meta<typeof ColorPicker> = {
  title: 'App/Design Tool/ColorPicker',
  component: ColorPicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A color picker component with color swatches for selecting from predefined colors.',
      },
    },
  },
  args: {
    onChange: fn(),
    onEdit: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicColors = ['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00'];
const shirtColors = ['#FFFFFF', '#000000', '#1F2937', '#DC2626', '#2563EB', '#059669', '#D97706'];

const ControlledColorPicker = (props: Parameters<typeof ColorPicker>[0]) => {
  const [selected, setSelected] = useState(props.selectedColor);
  return <ColorPicker {...props} selectedColor={selected} onChange={setSelected} />;
};

export const Default: Story = {
  render: () => (
    <ControlledColorPicker
      colors={basicColors}
      selectedColor="#FF0000"
      onChange={() => {}}
    />
  ),
};

export const ShirtColors: Story = {
  render: () => (
    <ControlledColorPicker
      colors={shirtColors}
      selectedColor="#FFFFFF"
      onChange={() => {}}
    />
  ),
};

export const WithEditButton: Story = {
  render: () => (
    <ControlledColorPicker
      colors={shirtColors}
      selectedColor="#FFFFFF"
      onChange={() => {}}
      onEdit={() => alert('Edit colors clicked!')}
    />
  ),
};

export const ProductSelection: Story = {
  render: () => {
    const [color, setColor] = useState('#FFFFFF');
    return (
      <div className="space-y-4 w-[300px]">
        <div>
          <h3 className="font-medium">Select Color</h3>
          <p className="text-sm text-muted-foreground">
            Choose your t-shirt color
          </p>
        </div>
        <ColorPicker
          colors={shirtColors}
          selectedColor={color}
          onChange={setColor}
          onEdit={() => alert('More colors...')}
        />
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-full border"
            style={{ backgroundColor: color }}
          />
          <span className="text-sm">Selected: {color}</span>
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};

export const Neutrals: Story = {
  render: () => (
    <ControlledColorPicker
      colors={['#FFFFFF', '#F3F4F6', '#D1D5DB', '#9CA3AF', '#6B7280', '#374151', '#111827', '#000000']}
      selectedColor="#D1D5DB"
      onChange={() => {}}
    />
  ),
};

export const BrandColors: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Primary Colors</h3>
        <ControlledColorPicker
          colors={['#2563EB', '#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE']}
          selectedColor="#2563EB"
          onChange={() => {}}
        />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Accent Colors</h3>
        <ControlledColorPicker
          colors={['#DC2626', '#F97316', '#EAB308', '#22C55E', '#06B6D4']}
          selectedColor="#DC2626"
          onChange={() => {}}
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
