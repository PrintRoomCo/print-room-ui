import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { LoadingSpinner, LoadingCard } from '@vendored/design-tool/common/LoadingSpinner';

const meta: Meta<typeof LoadingSpinner> = {
  title: 'App/Design Tool/LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    message: {
      control: 'text',
      description: 'Loading message to display',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the spinner',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof LoadingSpinner>;

export const Default: Story = {
  args: {
    message: 'Loading...',
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    message: 'Loading...',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    message: 'Loading...',
    size: 'lg',
  },
};

export const CustomMessage: Story = {
  args: {
    message: 'Fetching your products...',
    size: 'md',
  },
};

// LoadingCard Stories
const cardMeta: Meta<typeof LoadingCard> = {
  title: 'App/Design Tool/LoadingCard',
  component: LoadingCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Card: StoryObj<typeof LoadingCard> = {
  render: (args) => <LoadingCard {...args} />,
  args: {
    message: 'Loading...',
    size: 'md',
  },
};

export const CardSmall: StoryObj<typeof LoadingCard> = {
  render: (args) => <LoadingCard {...args} />,
  args: {
    message: 'Loading...',
    size: 'sm',
  },
};

export const CardLarge: StoryObj<typeof LoadingCard> = {
  render: (args) => <LoadingCard {...args} />,
  args: {
    message: 'Processing...',
    size: 'lg',
  },
};
