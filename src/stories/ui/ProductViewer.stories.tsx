import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ProductViewer, ProductViewerSkeleton } from '@print-room-studio/ui';

const PLACEHOLDER_TSHIRT = '/placeholder-product-front.png';
const PLACEHOLDER_TSHIRT_BACK = '/placeholder-product-back.png';

const meta: Meta<typeof ProductViewer> = {
  title: 'App/Design Tool/ProductViewer',
  component: ProductViewer,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A product image viewer with multi-view support (front, back, side, etc.), optional canvas-based color recoloring, SVG filtering, and logo overlay indicators. Core component for the design tool and product pages.',
      },
    },
  },
  argTypes: {
    currentView: {
      control: 'select',
      options: ['front', 'back', 'left', 'right', 'side', 'neck', 'label'],
      description: 'The currently active product view',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'front' },
      },
    },
    frontSrc: {
      control: 'text',
      description: 'Image URL for the front view',
    },
    backSrc: {
      control: 'text',
      description: 'Image URL for the back view',
    },
    colorOverlay: {
      control: 'color',
      description: 'Color overlay applied to the product image',
    },
    enableCanvasRecoloring: {
      control: 'boolean',
      description: 'Enable canvas-based recoloring (requires colorOverlay)',
    },
    enableSvgFiltering: {
      control: 'boolean',
      description: 'Enable SVG filter-based color application',
    },
    bustCache: {
      control: 'boolean',
      description: 'Bust image cache with timestamp query param',
    },
    colorOpacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.05 },
      description: 'Opacity for canvas recoloring (0-1)',
    },
    tolerance: {
      control: { type: 'range', min: 12, max: 28, step: 1 },
      description: 'Background similarity threshold for canvas recoloring',
    },
  },
  args: {
    onViewChange: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ width: 500, height: 500 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default: single front image
export const Default: Story = {
  args: {
    currentView: 'front',
    frontSrc: PLACEHOLDER_TSHIRT,
    className: 'h-full',
  },
};

// Multiple views with navigation
const MultiViewExample = () => {
  const [view, setView] = useState('front');
  return (
    <div style={{ width: 500, height: 500 }}>
      <ProductViewer
        currentView={view}
        onViewChange={setView}
        frontSrc={PLACEHOLDER_TSHIRT}
        backSrc={PLACEHOLDER_TSHIRT_BACK}
        availableViews={['front', 'back']}
        className="h-full"
      />
    </div>
  );
};

export const MultipleViews: Story = {
  render: () => <MultiViewExample />,
  parameters: {
    docs: {
      description: {
        story: 'Product viewer with front and back views. Click the view buttons at the bottom to switch.',
      },
    },
  },
};

// With color overlay
export const WithColorOverlay: Story = {
  args: {
    currentView: 'front',
    frontSrc: PLACEHOLDER_TSHIRT,
    colorOverlay: '#3B82F6',
    className: 'h-full',
  },
  parameters: {
    docs: {
      description: {
        story: 'A product with a blue color overlay applied via SVG multiply blend mode.',
      },
    },
  },
};

// Canvas recoloring mode
export const CanvasRecoloring: Story = {
  args: {
    currentView: 'front',
    frontSrc: PLACEHOLDER_TSHIRT,
    colorOverlay: '#EF4444',
    enableCanvasRecoloring: true,
    colorOpacity: 0.4,
    tolerance: 18,
    featherPx: 0.75,
    className: 'h-full',
  },
  parameters: {
    docs: {
      description: {
        story: 'Canvas-based recoloring mode with adjustable opacity and tolerance. Used in the design tool for real-time color preview.',
      },
    },
  },
};

// With logo customizations badge
export const WithLogoBadge: Story = {
  args: {
    currentView: 'front',
    frontSrc: PLACEHOLDER_TSHIRT,
    customizations: {
      logos: [
        { id: '1', placement: 'chest', name: 'Company Logo' },
        { id: '2', placement: 'back', name: 'Event Graphic' },
      ],
    },
    className: 'h-full',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows a badge indicating how many logos are applied to the product.',
      },
    },
  },
};

// No image (placeholder state)
export const NoImage: Story = {
  args: {
    currentView: 'front',
    className: 'h-full',
  },
  parameters: {
    docs: {
      description: {
        story: 'State when no product image is available — shows a "PRODUCT IMAGE ASSET" placeholder.',
      },
    },
  },
};

// Dynamic views via imagesByView
export const DynamicViews: Story = {
  args: {
    currentView: 'front',
    imagesByView: {
      front: PLACEHOLDER_TSHIRT,
      back: PLACEHOLDER_TSHIRT_BACK,
    },
    className: 'h-full',
  },
  parameters: {
    docs: {
      description: {
        story: 'Using the `imagesByView` prop for dynamic view mapping instead of individual `frontSrc`/`backSrc` props.',
      },
    },
  },
};

// Skeleton loading state
export const Skeleton: Story = {
  render: () => (
    <div style={{ width: 500, height: 500 }}>
      <ProductViewerSkeleton className="h-full" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton loading state shown while product images are being fetched.',
      },
    },
  },
};
