import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import AnimatedColorButton from '@vendored/design-tool/controls/AnimatedColorButton';

const meta: Meta<typeof AnimatedColorButton> = {
  title: 'App/Design Tool/AnimatedColorButton',
  component: AnimatedColorButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    colorHex: {
      control: 'color',
      description: 'Hex color value for the button',
    },
    isSelected: {
      control: 'boolean',
      description: 'Whether the button is selected',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler',
    },
  },
};

export default meta;
type Story = StoryObj<typeof AnimatedColorButton>;

export const Default: Story = {
  args: {
    colorHex: '#3b82f6',
    isSelected: false,
  },
};

export const Selected: Story = {
  args: {
    colorHex: '#3b82f6',
    isSelected: true,
  },
};

export const Red: Story = {
  args: {
    colorHex: '#dc2626',
    isSelected: false,
  },
};

export const Green: Story = {
  args: {
    colorHex: '#16a34a',
    isSelected: true,
  },
};

// Interactive demo with multiple buttons
const ColorPaletteDemo = () => {
  const [selected, setSelected] = useState('blue');
  const colors = [
    { id: 'blue', hex: '#3b82f6' },
    { id: 'red', hex: '#dc2626' },
    { id: 'green', hex: '#16a34a' },
    { id: 'purple', hex: '#8b5cf6' },
    { id: 'orange', hex: '#f97316' },
    { id: 'pink', hex: '#ec4899' },
  ];

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        {colors.map((color) => (
          <AnimatedColorButton
            key={color.id}
            colorHex={color.hex}
            isSelected={selected === color.id}
            onClick={() => setSelected(color.id)}
          />
        ))}
      </div>
      <p className="text-sm text-gray-600">
        Selected: {colors.find(c => c.id === selected)?.id}
      </p>
    </div>
  );
};

export const InteractivePalette: Story = {
  render: () => <ColorPaletteDemo />,
};

// Dark colors demo
const DarkColorsDemo = () => {
  const [selected, setSelected] = useState('black');
  const colors = [
    { id: 'black', hex: '#000000' },
    { id: 'charcoal', hex: '#1f2937' },
    { id: 'slate', hex: '#334155' },
    { id: 'navy', hex: '#1e3a5f' },
    { id: 'darkGreen', hex: '#14532d' },
  ];

  return (
    <div className="flex gap-2 p-4 bg-gray-100 rounded-lg">
      {colors.map((color) => (
        <AnimatedColorButton
          key={color.id}
          colorHex={color.hex}
          isSelected={selected === color.id}
          onClick={() => setSelected(color.id)}
        />
      ))}
    </div>
  );
};

export const DarkColors: Story = {
  render: () => <DarkColorsDemo />,
};
