import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { FavoriteButton } from '@print-room-studio/ui';

const meta = {
  title: 'Storefront/FavoriteButton',
  component: FavoriteButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Heart toggle button ported from the Shopify `favorites-button.liquid` snippet. Uses Alpine.js `$store.favorites` in Shopify — here it\'s a controlled React component with `isFavorite` / `onToggle` props.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    onToggle: fn(),
  },
} satisfies Meta<typeof FavoriteButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isFavorite: false,
    itemName: 'Premium T-Shirt',
  },
};

export const Favorited: Story = {
  args: {
    isFavorite: true,
    itemName: 'Premium T-Shirt',
  },
};

export const IconOnly: Story = {
  args: {
    isFavorite: false,
    showLabel: false,
    size: 'icon',
    itemName: 'Hat',
  },
};

export const SmallOutline: Story = {
  args: {
    isFavorite: false,
    variant: 'outline',
    size: 'sm',
    itemName: 'Hoodie',
  },
};

export const LargeGhost: Story = {
  args: {
    isFavorite: true,
    variant: 'ghost',
    size: 'lg',
    itemName: 'Cap',
  },
};

/** Interactive toggle demo — click to add/remove from favorites */
export const Interactive: Story = {
  args: {
    itemName: 'Custom Polo',
  },
  render: function InteractiveDemo(args) {
    const [isFav, setIsFav] = useState(false);
    return (
      <FavoriteButton
        {...args}
        isFavorite={isFav}
        onToggle={setIsFav}
      />
    );
  },
};

export const CustomLabels: Story = {
  args: {
    isFavorite: false,
    addLabel: 'Save',
    removeLabel: 'Saved',
    itemName: 'Beanie',
  },
};
