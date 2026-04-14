import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { AnnouncementBar } from '@print-room-studio/ui';
import { treePlanting } from '../fixtures/production-data';

const meta = {
  title: 'Storefront/AnnouncementBar',
  component: AnnouncementBar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Top-of-page announcement strip ported from the Shopify `announcement-bar.liquid` section. Supports static text or a scrolling marquee mode with configurable speed, direction, and separator.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['static', 'marquee'],
      description: 'Display mode — static centered text or scrolling marquee',
    },
    colorScheme: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'dark'],
      description: 'Color scheme preset',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
    speed: {
      control: { type: 'range', min: 10, max: 200, step: 10 },
      description: 'Marquee scroll speed in px/sec',
    },
    direction: {
      control: 'select',
      options: ['left', 'right'],
    },
    separator: {
      control: 'text',
      description: 'Separator character between repeated text (marquee mode)',
    },
  },
} satisfies Meta<typeof AnnouncementBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: treePlanting.announcementText,
    href: treePlanting.landingPage,
  },
};

export const Marquee: Story = {
  args: {
    text: treePlanting.announcementText,
    href: treePlanting.landingPage,
    variant: 'marquee',
    speed: 50,
  },
};

export const SecondaryColor: Story = {
  args: {
    text: 'Free shipping on orders over $250 NZD — Auckland & Wellington',
    colorScheme: 'secondary',
  },
};

export const AccentColor: Story = {
  args: {
    text: 'New season AS Colour and Stanley/Stella now in stock',
    colorScheme: 'accent',
  },
};

export const DarkColor: Story = {
  args: {
    text: 'Holiday hours: Closed 24 Dec – 3 Jan. Orders placed after 20 Dec ship in January.',
    colorScheme: 'dark',
  },
};

export const Small: Story = {
  args: {
    text: treePlanting.announcementText,
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    text: treePlanting.announcementText,
    size: 'lg',
    colorScheme: 'secondary',
  },
};

export const MarqueeReverse: Story = {
  name: 'Marquee (Right to Left, Fast)',
  args: {
    text: 'Screen Printing · Embroidery · Heat Transfers · Custom Patches · Finishing',
    variant: 'marquee',
    direction: 'right',
    speed: 80,
    separator: '★',
    colorScheme: 'dark',
  },
};
