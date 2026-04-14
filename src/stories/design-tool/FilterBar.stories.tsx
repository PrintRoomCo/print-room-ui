import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { ItemFilters, SupplierFilter } from '@vendored/design-tool/catalog/FilterBar';
import { brandOptions } from '../fixtures/production-data';

const meta = {
  title: 'App/Design Tool/FilterBar',
  component: ItemFilters,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Product catalog filter dropdowns from the design tool. `ItemFilters` allows multi-select product type filtering (T-Shirt, Hood, Cap, etc.) while `SupplierFilter` is a single-select brand picker.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    onFiltersChange: fn(),
  },
} satisfies Meta<typeof ItemFilters>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selectedFilters: [],
  },
};

export const WithSelections: Story = {
  args: {
    selectedFilters: ['t_shirt', 'hood'],
  },
};

export const ManySelections: Story = {
  args: {
    selectedFilters: ['t_shirt', 'hood', 'hat', 'tote_bag'],
  },
};

export const CustomFilters: Story = {
  args: {
    selectedFilters: [],
    filters: [
      { id: 'organic', label: 'Organic Cotton' },
      { id: 'recycled', label: 'Recycled Poly' },
      { id: 'bamboo', label: 'Bamboo Blend' },
    ],
  },
};

export const SupplierFilterStory: Story = {
  name: 'Supplier Filter',
  render: function SupplierFilterDemo() {
    const [selected, setSelected] = useState('all');
    return (
      <SupplierFilter
        selectedOption={selected}
        onOptionChange={setSelected}
        options={brandOptions.map((b) => ({ value: b.value, label: b.label }))}
      />
    );
  },
};

export const CombinedFilters: Story = {
  name: 'Combined Filter Bar',
  render: function CombinedDemo() {
    const [types, setTypes] = useState<string[]>([]);
    const [supplier, setSupplier] = useState('all');
    return (
      <div className="flex items-center gap-3">
        <ItemFilters selectedFilters={types} onFiltersChange={setTypes} />
        <SupplierFilter
          selectedOption={supplier}
          onOptionChange={setSupplier}
          options={brandOptions.map((b) => ({ value: b.value, label: b.label }))}
        />
        {(types.length > 0 || supplier !== 'all') && (
          <button
            onClick={() => {
              setTypes([]);
              setSupplier('all');
            }}
            className="text-xs text-muted-foreground underline"
          >
            Clear all
          </button>
        )}
      </div>
    );
  },
};
