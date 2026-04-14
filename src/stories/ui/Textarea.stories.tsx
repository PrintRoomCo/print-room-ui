import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Textarea, Label } from '@print-room-studio/ui';

const meta: Meta<typeof Textarea> = {
  title: 'Primitives/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A textarea component for multi-line text input.',
      },
    },
  },
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the textarea is disabled',
    },
    rows: {
      control: { type: 'number', min: 1, max: 20 },
      description: 'Number of visible text lines',
    },
  },
  args: {
    onChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
  },
  render: (args) => (
    <div className="w-[350px]">
      <Textarea {...args} />
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-[350px] space-y-2">
      <Label htmlFor="message">Message</Label>
      <Textarea id="message" placeholder="Type your message here..." />
    </div>
  ),
};

export const WithRows: Story = {
  args: {
    placeholder: 'Description...',
    rows: 6,
  },
  render: (args) => (
    <div className="w-[350px]">
      <Textarea {...args} />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    placeholder: 'Cannot edit',
    disabled: true,
  },
  render: (args) => (
    <div className="w-[350px]">
      <Textarea {...args} />
    </div>
  ),
};

export const WithDefaultValue: Story = {
  args: {
    defaultValue:
      'This textarea has a default value that spans multiple lines.\n\nYou can edit this text.',
    rows: 4,
  },
  render: (args) => (
    <div className="w-[350px]">
      <Textarea {...args} />
    </div>
  ),
};

export const OrderNotes: Story = {
  render: () => (
    <div className="w-[400px] space-y-2">
      <Label htmlFor="order-notes">Order Notes</Label>
      <Textarea
        id="order-notes"
        placeholder="Add special instructions for your order..."
        rows={4}
      />
      <p className="text-sm text-muted-foreground">
        Include any special handling instructions or delivery notes.
      </p>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const FormExample: Story = {
  render: () => (
    <form className="w-[400px] space-y-4">
      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <input
          id="subject"
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Enter subject"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="body">Message</Label>
        <Textarea
          id="body"
          placeholder="Write your message..."
          rows={6}
        />
      </div>
      <p className="text-sm text-muted-foreground">
        Maximum 1000 characters
      </p>
    </form>
  ),
  parameters: {
    layout: 'padded',
  },
};
