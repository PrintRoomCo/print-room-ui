import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ViewOptions } from '@print-room-studio/ui';

const meta: Meta<typeof ViewOptions> = {
  title: 'App/Design Tool/ViewOptions',
  component: ViewOptions,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A view selector component for switching between different product views (front, back, side, etc.).',
      },
    },
  },
  args: {
    onViewChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const ControlledViewOptions = (props: Parameters<typeof ViewOptions>[0]) => {
  const [view, setView] = useState(props.selectedView || 'front');
  return <ViewOptions {...props} selectedView={view} onViewChange={setView} />;
};

export const Default: Story = {
  render: () => <ControlledViewOptions />,
};

export const BackSelected: Story = {
  render: () => <ControlledViewOptions selectedView="back" />,
};

export const TwoOptions: Story = {
  render: () => (
    <ControlledViewOptions
      options={[
        { id: 'front', label: 'Front' },
        { id: 'back', label: 'Back' },
      ]}
      selectedView="front"
    />
  ),
};

export const CustomOptions: Story = {
  render: () => (
    <ControlledViewOptions
      options={[
        { id: 'front', label: 'Front' },
        { id: 'back', label: 'Back' },
        { id: 'left-sleeve', label: 'Left Sleeve' },
        { id: 'right-sleeve', label: 'Right Sleeve' },
      ]}
      selectedView="front"
    />
  ),
};

export const HatViews: Story = {
  render: () => (
    <ControlledViewOptions
      options={[
        { id: 'front', label: 'Front' },
        { id: 'back', label: 'Back' },
        { id: 'side', label: 'Side' },
      ]}
      selectedView="front"
    />
  ),
};

export const ProductDesigner: Story = {
  render: () => {
    const [view, setView] = useState('front');
    return (
      <div className="space-y-4 w-[500px]">
        <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
          <span className="text-muted-foreground">
            Product Image - {view.charAt(0).toUpperCase() + view.slice(1)} View
          </span>
        </div>
        <ViewOptions
          selectedView={view}
          onViewChange={setView}
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};

export const InHeader: Story = {
  render: () => (
    <div className="w-[600px] border rounded-lg">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="font-semibold">Premium Cotton T-Shirt</h2>
        <span className="text-sm text-muted-foreground">$24.99</span>
      </div>
      <div className="p-4 flex justify-center">
        <ControlledViewOptions selectedView="front" />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
