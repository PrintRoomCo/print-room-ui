import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import MethodCard, { type MethodValidationResult } from '@vendored/design-tool/MethodCard';

const methods: MethodValidationResult[] = [
  {
    id: 'screen',
    label: 'Screen Printing',
    description: 'Best value for bulk orders with clean spot-colour artwork.',
    moq: 25,
    isLocked: false,
    isRecommended: true,
    lockReasons: [],
  },
  {
    id: 'heat',
    label: 'Heat Transfers',
    description: 'Ideal for gradients, names and numbers, and short runs.',
    moq: 10,
    isLocked: false,
    lockReasons: [],
  },
  {
    id: 'embroidery',
    label: 'Embroidery',
    description: 'Premium stitched finish for caps, polos, and outerwear.',
    moq: 50,
    isLocked: true,
    lockReason: 'Artwork is too detailed for embroidery at the selected size.',
    lockAction: 'Increase the logo size or switch to a flatter technique.',
    lockReasons: [
      { type: 'detail', badge: 'Fine detail' },
      { type: 'size', badge: 'Too small' },
    ],
  },
];

const meta: Meta<typeof MethodCard> = {
  title: 'App/Design Tool/MethodCard',
  component: MethodCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Decoration method card from the design tool with recommended, selected, and locked states.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState('screen');

    return (
      <div className="grid max-w-3xl gap-4 md:grid-cols-3">
        {methods.map((method) => (
          <MethodCard
            key={method.id}
            method={method}
            selected={selected === method.id}
            onSelect={() => setSelected(method.id)}
          />
        ))}
      </div>
    );
  },
};
