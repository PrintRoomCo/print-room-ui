import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPagination } from '@print-room-studio/ui';

const meta: Meta<typeof CatalogPagination> = {
  title: 'Storefront/CatalogPagination',
  component: CatalogPagination,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A progress-bar pagination control with "Previous" / "Next" navigation, matching the Figma catalog page pattern.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPage: 2,
    totalPages: 5,
    className: 'w-[500px]',
  },
};

export const FirstPage: Story = {
  args: {
    currentPage: 1,
    totalPages: 5,
    className: 'w-[500px]',
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 5,
    totalPages: 5,
    className: 'w-[500px]',
  },
};

export const Interactive: Story = {
  render: () => {
    const InteractiveDemo = () => {
      const [page, setPage] = useState(1);
      const total = 6;
      return (
        <div className="w-[500px] space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            Page {page} of {total}
          </p>
          <CatalogPagination
            currentPage={page}
            totalPages={total}
            onPrevious={() => setPage((p) => Math.max(1, p - 1))}
            onNext={() => setPage((p) => Math.min(total, p + 1))}
          />
        </div>
      );
    };
    return <InteractiveDemo />;
  },
};
