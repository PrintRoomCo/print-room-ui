import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { FilterButtons } from '@print-room-studio/ui';

const GridIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const ListIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <rect x="3" y="4" width="18" height="3" rx="1" />
    <rect x="3" y="10.5" width="18" height="3" rx="1" />
    <rect x="3" y="17" width="18" height="3" rx="1" />
  </svg>
);

const meta: Meta<typeof FilterButtons> = {
  title: 'App/Design Tool/FilterButtons',
  component: FilterButtons,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A filter button group component for toggling between different view or filter options.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['icon', 'text', 'both'],
      description: 'The display variant of the buttons',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the buttons',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The layout orientation',
    },
  },
  args: {
    onValueChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const viewOptions = [
  { key: 'grid', label: 'Grid View', icon: <GridIcon /> },
  { key: 'list', label: 'List View', icon: <ListIcon /> },
];

const ControlledFilterButtons = (props: Parameters<typeof FilterButtons>[0]) => {
  const [value, setValue] = useState(props.value || props.options[0]?.key);
  return <FilterButtons {...props} value={value} onValueChange={setValue} />;
};

export const Default: Story = {
  render: () => (
    <ControlledFilterButtons
      options={viewOptions}
      value="grid"
      variant="both"
    />
  ),
};

export const IconOnly: Story = {
  render: () => (
    <ControlledFilterButtons
      options={viewOptions}
      value="grid"
      variant="icon"
    />
  ),
};

export const TextOnly: Story = {
  render: () => (
    <ControlledFilterButtons
      options={[
        { key: 'all', label: 'All' },
        { key: 'shirts', label: 'Shirts' },
        { key: 'hoodies', label: 'Hoodies' },
        { key: 'hats', label: 'Hats' },
      ]}
      value="all"
      variant="text"
    />
  ),
};

export const Small: Story = {
  render: () => (
    <ControlledFilterButtons
      options={viewOptions}
      value="grid"
      variant="icon"
      size="sm"
    />
  ),
};

export const Large: Story = {
  render: () => (
    <ControlledFilterButtons
      options={viewOptions}
      value="grid"
      variant="icon"
      size="lg"
    />
  ),
};

export const Vertical: Story = {
  render: () => (
    <ControlledFilterButtons
      options={viewOptions}
      value="grid"
      variant="both"
      orientation="vertical"
    />
  ),
};

export const WithDisabled: Story = {
  render: () => (
    <ControlledFilterButtons
      options={[
        { key: 'available', label: 'Available' },
        { key: 'coming-soon', label: 'Coming Soon', disabled: true },
        { key: 'sale', label: 'On Sale' },
      ]}
      value="available"
      variant="text"
    />
  ),
};

export const CategoryFilter: Story = {
  render: () => (
    <div className="space-y-4 w-[400px]">
      <h3 className="font-medium">Filter by Category</h3>
      <ControlledFilterButtons
        options={[
          { key: 'all', label: 'All Products' },
          { key: 'apparel', label: 'Apparel' },
          { key: 'accessories', label: 'Accessories' },
          { key: 'promotional', label: 'Promotional' },
        ]}
        value="all"
        variant="text"
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const ViewToggle: Story = {
  render: () => (
    <div className="flex items-center justify-between w-[400px] border-b pb-4">
      <h3 className="font-medium">Products (24)</h3>
      <ControlledFilterButtons
        options={viewOptions}
        value="grid"
        variant="icon"
        size="sm"
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
