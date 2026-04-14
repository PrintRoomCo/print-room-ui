import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Button } from '@print-room-studio/ui';

const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A versatile button component with multiple variants and sizes, built with Radix UI Slot for composition.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link', 'cta'],
      description: 'The visual style variant of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon', 'cta', 'submit'],
      description: 'The size of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    asChild: {
      control: 'boolean',
      description: 'Render as child element using Radix Slot',
    },
  },
  args: {
    onClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Start Quote',
    variant: 'default',
  },
};

export const Secondary: Story = {
  args: {
    children: 'View Services',
    variant: 'secondary',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Remove Design',
    variant: 'destructive',
  },
};

export const Outline: Story = {
  args: {
    children: 'Request Samples',
    variant: 'outline',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Back to Catalogue',
    variant: 'ghost',
  },
};

export const Link: Story = {
  args: {
    children: 'Download Price List',
    variant: 'link',
  },
};

export const Small: Story = {
  args: {
    children: 'Save',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    children: 'Submit Quote',
    size: 'lg',
  },
};

export const Icon: Story = {
  args: {
    children: '?',
    size: 'icon',
    'aria-label': 'Icon button',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Submitting...',
    disabled: true,
  },
};

export const CTA: Story = {
  args: {
    children: 'Start Quote',
    variant: 'cta',
    size: 'cta',
  },
};

export const SubmitButton: Story = {
  args: {
    children: 'Submit Quote',
    variant: 'cta',
    size: 'submit',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="secondary">View Services</Button>
      <Button variant="destructive">Remove Design</Button>
      <Button variant="outline">Request Samples</Button>
      <Button variant="ghost">Back to Catalogue</Button>
      <Button variant="link">Shipping Policy</Button>
      <Button variant="cta" size="cta">Start Quote</Button>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Start Quote</Button>
      <Button size="lg">Submit Quote</Button>
      <Button size="icon">?</Button>
      <Button variant="cta" size="cta">CTA</Button>
      <Button variant="cta" size="submit">Submit</Button>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const WithInteraction: Story = {
  args: {
    children: 'Save Quote',
  },
  play: async ({ canvasElement, args }) => {
    const { within, userEvent, expect } = await import('storybook/test');
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalled();
  },
};
