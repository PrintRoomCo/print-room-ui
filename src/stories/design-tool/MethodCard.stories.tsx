import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import MethodCard, {
  MethodCardGroup,
  type MethodValidationResult,
  type PrintMethod,
} from '@vendored/design-tool/MethodCard';

/* ── Fixture data ── */

const screenPrint: MethodValidationResult = {
  id: 'screen',
  label: 'Screen Printing',
  description: 'Best value for bulk orders with clean spot-colour artwork.',
  moq: 25,
  isLocked: false,
  isRecommended: true,
  lockReasons: [],
  warnings: [],
  badges: [],
  maxColors: 8,
  maxSize: '400×400mm',
  helpLink: 'https://help.theprintroom.nz/decoration-methods',
};

const heatTransfer: MethodValidationResult = {
  id: 'heat',
  label: 'Heat Transfers',
  description: 'Ideal for gradients, names and numbers, and short runs.',
  moq: 10,
  isLocked: false,
  lockReasons: [],
  warnings: [],
  badges: [
    { id: 'eco-ink', label: 'Eco Ink', icon: '🌿' },
    { id: 'nz-made', label: 'NZ Made', icon: '🇳🇿' },
  ],
  maxColors: 'Unlimited',
  maxSize: '300×420mm',
};

const embroideryLocked: MethodValidationResult = {
  id: 'embroidery',
  label: 'Embroidery',
  description: 'Premium stitched finish for caps, polos, and outerwear.',
  moq: 50,
  isLocked: true,
  lockReason: 'Minimum order quantity not met — 50 units required.',
  lockAction: 'Increase your quantity to unlock embroidery.',
  lockReasons: [
    { type: 'moq', badge: 'MOQ 50' },
    { type: 'detail', badge: 'Fine detail' },
  ],
  warnings: [],
  badges: [],
};

const methods: MethodValidationResult[] = [screenPrint, heatTransfer, embroideryLocked];

/* ── Meta ── */

const meta = {
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
  args: {
    onSelect: fn(),
  },
} satisfies Meta<typeof MethodCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Stories ── */

export const Default: Story = {
  args: {
    method: screenPrint,
    selected: true,
  },
  render: function DefaultDemo() {
    const [selected, setSelected] = useState<PrintMethod>('screen');

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

export const WithWarnings: Story = {
  args: {
    method: {
      ...screenPrint,
      isRecommended: false,
      warnings: [
        'High colour count may increase cost',
        'Consider vector artwork for best results',
      ],
    },
    selected: false,
  },
};

export const WithBadges: Story = {
  args: {
    method: heatTransfer,
    selected: true,
  },
};

export const WithSpecs: Story = {
  args: {
    method: {
      ...screenPrint,
      isRecommended: false,
    },
    selected: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows maxColors, maxSize, and helpLink in the specs row.',
      },
    },
  },
};

export const RecommendedCard: Story = {
  args: {
    method: screenPrint,
    selected: true,
  },
};

export const MethodCardGroupStory: Story = {
  args: {
    method: screenPrint,
    selected: true,
  },
  render: function GroupDemo() {
    const [selected, setSelected] = useState<PrintMethod>('screen');

    return (
      <div className="max-w-3xl">
        <MethodCardGroup
          methods={methods}
          value={selected}
          onChange={setSelected}
        />
        <p className="mt-4 text-sm text-gray-500">
          Selected: <strong>{selected}</strong>
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'MethodCardGroup manages single-selection across multiple cards. Screen is selected, embroidery is locked (MOQ), heat has sustainability badges.',
      },
    },
  },
};
