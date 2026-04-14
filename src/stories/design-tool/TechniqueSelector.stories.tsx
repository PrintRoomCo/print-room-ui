import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import {
  TechniqueSelector,
  type TechniqueId,
  type ValidatedTechnique,
} from '@vendored/design-tool/artwork/TechniqueSelector';

const allTechniques: ValidatedTechnique[] = [
  { id: 'screen-print', isLocked: false },
  { id: 'puff-screen-print', isLocked: false },
  { id: 'embroidery', isLocked: false },
  { id: '3d-embroidery', isLocked: false },
  { id: 'dtf-digital-transfer', isLocked: false },
  { id: 'dtg-digital-print', isLocked: false },
  { id: 'hybrid-digital-print', isLocked: false },
  { id: 'reflective-heat-transfer', isLocked: false },
];

const withLockedTechniques: ValidatedTechnique[] = [
  { id: 'screen-print', isLocked: false },
  { id: 'puff-screen-print', isLocked: true, lockReason: 'Requires vector artwork' },
  { id: 'embroidery', isLocked: false },
  { id: '3d-embroidery', isLocked: true, lockReason: 'Minimum 50 units required' },
  { id: 'dtf-digital-transfer', isLocked: false },
  { id: 'dtg-digital-print', isLocked: true, lockReason: 'Not available for this garment type' },
  { id: 'hybrid-digital-print', isLocked: false },
  { id: 'reflective-heat-transfer', isLocked: true, lockReason: 'Artwork exceeds max dimensions (300×300mm)' },
];

const meta = {
  title: 'App/Design Tool/TechniqueSelector',
  component: TechniqueSelector,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Animated dropdown for selecting a decoration technique during the design-tool quote flow. Each option shows a label, description, and optional thumbnail. Locked techniques display the reason they are unavailable.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    onSelect: fn(),
    onOpenGuide: fn(),
  },
} satisfies Meta<typeof TechniqueSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    techniques: allTechniques,
    placement: 'Front',
  },
};

export const WithSelection: Story = {
  args: {
    techniques: allTechniques,
    selectedTechnique: 'screen-print',
    placement: 'Front',
  },
};

export const WithLockedOptions: Story = {
  args: {
    techniques: withLockedTechniques,
    selectedTechnique: 'embroidery',
    placement: 'Back',
  },
};

export const Disabled: Story = {
  args: {
    techniques: allTechniques,
    disabled: true,
    placement: 'Front',
  },
};

export const Interactive: Story = {
  args: {
    techniques: withLockedTechniques,
    placement: 'Front',
  },
  render: function InteractiveDemo() {
    const [selected, setSelected] = useState<TechniqueId | undefined>(undefined);
    return (
      <div style={{ width: 360 }}>
        <TechniqueSelector
          techniques={withLockedTechniques}
          selectedTechnique={selected}
          onSelect={setSelected}
          onOpenGuide={() => alert('Techniques guide would open here')}
          placement="Front"
        />
        {selected && (
          <p className="mt-3 text-xs text-muted-foreground">
            Selected: <strong>{selected}</strong>
          </p>
        )}
      </div>
    );
  },
};
