import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
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
    itemName: 'AS Colour Staple Tee',
  },
};

export const Favorited: Story = {
  args: {
    isFavorite: true,
    itemName: 'Stanley/Stella Creator 2.0',
  },
};

export const IconOnly: Story = {
  args: {
    isFavorite: false,
    showLabel: false,
    size: 'icon',
    itemName: 'AS Colour Class Cap',
  },
};

export const SmallOutline: Story = {
  args: {
    isFavorite: false,
    variant: 'outline',
    size: 'sm',
    itemName: 'Continental Hoodie',
  },
};

export const LargeGhost: Story = {
  args: {
    isFavorite: true,
    variant: 'ghost',
    size: 'lg',
    itemName: 'Earth Positive Tote',
  },
};

/** Interactive toggle demo — click to add/remove from favorites */
export const Interactive: Story = {
  args: {
    itemName: 'AS Colour Supply Hoodie',
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
    itemName: 'AS Colour Cuff Beanie',
  },
};
