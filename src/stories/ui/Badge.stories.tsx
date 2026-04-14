import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '@print-room-studio/ui';

const meta = {
  title: 'Primitives/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A small status descriptor for UI elements. Use to surface job statuses, order states, quote progress, and other categorical labels across the Print Room ecosystem.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline', 'success', 'warning', 'info'],
      description: 'The visual style of the badge',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    children: {
      control: 'text',
      description: 'Badge content',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ---------- Individual Variants ---------- */

export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'default',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Destructive',
    variant: 'destructive',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
};

export const Success: Story = {
  args: {
    children: 'Complete',
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    children: 'Pending',
    variant: 'warning',
  },
};

export const Info: Story = {
  args: {
    children: 'In Review',
    variant: 'info',
  },
};

/* ---------- Print Room Domain Examples ---------- */

export const JobStatuses: Story = {
  name: 'Job Statuses',
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="info">Queued</Badge>
      <Badge variant="warning">In Progress</Badge>
      <Badge variant="default">Printing</Badge>
      <Badge variant="secondary">Quality Check</Badge>
      <Badge variant="success">Complete</Badge>
    </div>
  ),
};

export const OrderStatuses: Story = {
  name: 'Order Statuses',
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="warning">Pending</Badge>
      <Badge variant="info">In Production</Badge>
      <Badge variant="default">Shipped</Badge>
      <Badge variant="success">Delivered</Badge>
      <Badge variant="destructive">Cancelled</Badge>
    </div>
  ),
};

export const QuoteStatuses: Story = {
  name: 'Quote Statuses',
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="secondary">Draft</Badge>
      <Badge variant="info">Submitted</Badge>
      <Badge variant="success">Approved</Badge>
      <Badge variant="destructive">Rejected</Badge>
      <Badge variant="warning">Invoiced</Badge>
      <Badge variant="default">Converted</Badge>
    </div>
  ),
};
