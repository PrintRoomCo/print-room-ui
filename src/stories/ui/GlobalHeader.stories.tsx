import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { GlobalHeader, Button } from '@print-room-studio/ui';

const meta: Meta<typeof GlobalHeader> = {
  title: 'App/Design Tool/GlobalHeader',
  component: GlobalHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The global header component used across all Print Room apps. Contains the logo, optional back button, title/subtitle, and a slot for action items (buttons, menus, etc.).',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Main title text (used for accessibility and fallback)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Print Room' },
      },
    },
    subtitle: {
      control: 'text',
      description: 'Subtitle displayed to the right of the logo',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Studio' },
      },
    },
    logoSrc: {
      control: 'text',
      description: 'URL for the logo image',
    },
    logoAlt: {
      control: 'text',
      description: 'Alt text for the logo image',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the header',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Print Room',
    subtitle: 'Studio',
  },
};

export const WithSubtitle: Story = {
  args: {
    title: 'Print Room',
    subtitle: 'Design Tool',
  },
  parameters: {
    docs: {
      description: {
        story: 'Header showing "Design Tool" as the subtitle — used in the design tool app.',
      },
    },
  },
};

export const QuoteCalculator: Story = {
  args: {
    title: 'Print Room',
    subtitle: 'Quote Builder',
  },
  parameters: {
    docs: {
      description: {
        story: 'Header variant for the quote calculator app.',
      },
    },
  },
};

export const WithBackButton: Story = {
  args: {
    title: 'Print Room',
    subtitle: 'Review Quote',
    backButton: (
      <Button variant="ghost" size="sm">
        ← Back
      </Button>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Header with a back button rendered via the `backButton` slot.',
      },
    },
  },
};

export const WithActions: Story = {
  args: {
    title: 'Print Room',
    subtitle: 'Quote Builder',
    children: (
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">Export PDF</Button>
        <Button variant="default" size="sm">Save Quote</Button>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Header with action buttons passed via `children`. These appear on the right side of the header.',
      },
    },
  },
};

export const WithBackAndActions: Story = {
  args: {
    title: 'Print Room',
    subtitle: 'Design Tool',
    backButton: (
      <Button variant="ghost" size="sm">
        ← Back
      </Button>
    ),
    children: (
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">Share Proof</Button>
        <Button variant="default" size="sm">Approve Artwork</Button>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Full header with back button, subtitle, and action buttons.',
      },
    },
  },
};

export const WithNotifications: Story = {
  args: {
    title: 'Print Room',
    subtitle: 'Studio',
    notifications: 3,
  },
  parameters: {
    docs: {
      description: {
        story: 'Header with notification bell icon showing a count badge.',
      },
    },
  },
};

export const WithBellNoCount: Story = {
  args: {
    title: 'Print Room',
    subtitle: 'Studio',
    notifications: 0,
  },
  parameters: {
    docs: {
      description: {
        story: 'Header with notification bell but no unread notifications.',
      },
    },
  },
};

export const NoSubtitle: Story = {
  args: {
    title: 'Print Room',
    subtitle: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: 'Header without a subtitle — just the logo and optional content.',
      },
    },
  },
};

export const CustomClassName: Story = {
  args: {
    title: 'Print Room',
    subtitle: 'Studio',
    className: 'bg-gray-900 text-white',
  },
  parameters: {
    docs: {
      description: {
        story: 'Header with dark background via custom className.',
      },
    },
  },
};
