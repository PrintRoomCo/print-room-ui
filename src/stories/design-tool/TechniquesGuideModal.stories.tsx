import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Button } from '@print-room-studio/ui';
import TechniquesGuideModal from '@vendored/design-tool/TechniquesGuideModal';

const meta: Meta<typeof TechniquesGuideModal> = {
  title: 'App/Design Tool/TechniquesGuideModal',
  component: TechniquesGuideModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Tabbed modal from the design tool that explains screen printing, heat transfers, and embroidery before the user chooses a technique.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    onSelect: fn(),
    onOpenChange: fn(),
    open: true,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(true);

    return (
      <div className="min-h-[200px]">
        <Button onClick={() => setOpen(true)}>Open techniques guide</Button>
        <TechniquesGuideModal
          open={open}
          onOpenChange={setOpen}
          onSelect={() => undefined}
        />
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};
