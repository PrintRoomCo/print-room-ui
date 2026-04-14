import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Label, Input, Checkbox } from '@print-room-studio/ui';

const meta: Meta<typeof Label> = {
  title: 'Primitives/Label',
  component: Label,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A label component for form inputs with proper accessibility attributes.',
      },
    },
  },
  argTypes: {
    htmlFor: {
      control: 'text',
      description: 'The ID of the form element the label is for',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Label text',
  },
};

export const WithInput: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Enter your email" />
    </div>
  ),
};

export const WithCheckbox: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="name">
        Full Name <span className="text-red-500">*</span>
      </Label>
      <Input id="name" placeholder="Enter your full name" required />
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="quantity">Quantity</Label>
      <Input type="number" id="quantity" placeholder="24" />
      <p className="text-sm text-muted-foreground">
        Minimum order quantity is 24 pieces
      </p>
    </div>
  ),
};

export const DisabledState: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="disabled-input" className="peer-disabled:opacity-70">
        Disabled Input
      </Label>
      <Input id="disabled-input" disabled placeholder="Cannot edit" />
    </div>
  ),
};
