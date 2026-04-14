import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { ArtworkSizeSlider } from '@vendored/design-tool/controls/ArtworkSizeSlider';

const meta = {
  title: 'App/Design Tool/ArtworkSizeSlider',
  component: ArtworkSizeSlider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'MM-calibrated artwork size slider from the design tool. Computes a bounding box in millimetres based on the print area dimensions, aspect-fits the artwork, and displays real-world dimensions (mm, cm²) plus percentage of print area used.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    value: {
      control: { type: 'range', min: 10, max: 100 },
      description: 'Slider position as percentage of print area',
    },
    min: {
      control: { type: 'number', min: 0, max: 50 },
      description: 'Minimum slider value (percentage)',
    },
    max: {
      control: { type: 'number', min: 50, max: 100 },
      description: 'Maximum slider value (percentage)',
    },
    printAreaMmW: {
      control: { type: 'number', min: 50, max: 400 },
      description: 'Print area width in mm',
    },
    printAreaMmH: {
      control: { type: 'number', min: 50, max: 400 },
      description: 'Print area height in mm',
    },
    artworkAspect: {
      control: { type: 'number', min: 0.2, max: 5, step: 0.1 },
      description: 'Artwork width÷height ratio (1 = square)',
    },
    locked: {
      control: 'boolean',
      description: 'Disable slider (reused artwork with locked size)',
    },
  },
  args: {
    onSizeChange: fn(),
  },
} satisfies Meta<typeof ArtworkSizeSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 50,
    printAreaMmW: 200,
    printAreaMmH: 250,
  },
};

export const SmallArtwork: Story = {
  args: {
    value: 20,
    printAreaMmW: 200,
    printAreaMmH: 250,
  },
};

export const LargeArtwork: Story = {
  args: {
    value: 90,
    printAreaMmW: 200,
    printAreaMmH: 250,
  },
};

export const WideAspect: Story = {
  name: 'Wide Artwork (2:1)',
  args: {
    value: 60,
    artworkAspect: 2,
    printAreaMmW: 200,
    printAreaMmH: 250,
  },
};

export const TallAspect: Story = {
  name: 'Tall Artwork (1:2)',
  args: {
    value: 60,
    artworkAspect: 0.5,
    printAreaMmW: 200,
    printAreaMmH: 250,
  },
};

export const Locked: Story = {
  args: {
    value: 45,
    locked: true,
    printAreaMmW: 200,
    printAreaMmH: 250,
  },
};

export const Interactive: Story = {
  render: function InteractiveDemo() {
    const [size, setSize] = useState(50);
    return (
      <div style={{ width: 320 }}>
        <ArtworkSizeSlider
          value={size}
          onSizeChange={setSize}
          printAreaMmW={200}
          printAreaMmH={250}
          artworkAspect={1.5}
        />
      </div>
    );
  },
};
