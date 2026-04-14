import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ViewTabs } from '@vendored/design-tool/ViewTabs';

// Mock the ProductImageRow type
interface ProductImageRow {
  view: string;
  [key: string]: unknown;
}

const meta: Meta<typeof ViewTabs> = {
  title: 'App/Design Tool/ViewTabs',
  component: ViewTabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    images: {
      description: 'Array of product images with view information',
    },
    value: {
      control: 'text',
      description: 'Currently selected view',
    },
    onChange: {
      action: 'view changed',
      description: 'Callback when view changes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ViewTabs>;

// Sample image data
const sampleImages: ProductImageRow[] = [
  { view: 'front', id: '1' },
  { view: 'back', id: '2' },
  { view: 'left', id: '3' },
  { view: 'right', id: '4' },
];

// Interactive wrapper
const ViewTabsDemo = ({ images }: { images: ProductImageRow[] }) => {
  const [selectedView, setSelectedView] = useState(images[0]?.view || 'front');

  return (
    <div className="flex flex-col items-center gap-4">
      <ViewTabs images={images} value={selectedView} onChange={setSelectedView} />
      <p className="text-sm text-gray-600">Selected view: {selectedView}</p>
    </div>
  );
};

export const Default: Story = {
  render: () => <ViewTabsDemo images={sampleImages} />,
};

export const TwoViews: Story = {
  render: () => (
    <ViewTabsDemo
      images={[
        { view: 'front', id: '1' },
        { view: 'back', id: '2' },
      ]}
    />
  ),
};

export const SingleView: Story = {
  render: () => <ViewTabsDemo images={[{ view: 'front', id: '1' }]} />,
};

export const ManyViews: Story = {
  render: () => (
    <ViewTabsDemo
      images={[
        { view: 'front', id: '1' },
        { view: 'back', id: '2' },
        { view: 'left_side', id: '3' },
        { view: 'right_side', id: '4' },
        { view: 'collar', id: '5' },
        { view: 'sleeve', id: '6' },
      ]}
    />
  ),
};

export const WithUnderscoreViews: Story = {
  render: () => (
    <ViewTabsDemo
      images={[
        { view: 'front_chest', id: '1' },
        { view: 'back_full', id: '2' },
        { view: 'left_sleeve', id: '3' },
      ]}
    />
  ),
};
