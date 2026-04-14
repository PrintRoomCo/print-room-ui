import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Textarea, Label, Input } from '@print-room-studio/ui';

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
    placeholder: 'Tell us what you are printing, which garments you like, and where the artwork needs to go.',
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
      <Label htmlFor="project-brief">Project brief</Label>
      <Textarea
        id="project-brief"
        placeholder="We need 80 AS Colour Staple Tees in black with a 2-colour front print for a Wellington event."
      />
    </div>
  ),
};

export const WithRows: Story = {
  args: {
    placeholder: 'Add placement notes, garment colours, or packaging requirements.',
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
    defaultValue:
      'Artwork approved on 12 April. Dispatch to Auckland on the next standard courier run.',
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
      'Front print: 280mm wide\nBack print: none\nGarment colour: Ecru\nFold and bag each unit for retail dispatch.',
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
        placeholder="Please split the order into 3 cartons and label the boxes for Auckland, Wellington, and Dunedin."
        rows={4}
      />
      <p className="text-sm text-muted-foreground">
        Include packaging, courier, or delivery notes for the production team.
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
        <Label htmlFor="project-name">Project name</Label>
        <Input id="project-name" placeholder="University Club hoodie reorder" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="body">Quote notes</Label>
        <Textarea
          id="body"
          placeholder="Need 120 AS Colour Supply Hoodies with embroidery on the left chest and woven hem labels."
          rows={6}
        />
      </div>
      <p className="text-sm text-muted-foreground">
        Include brand, garment colour, print locations, and required in-hands date.
      </p>
    </form>
  ),
  parameters: {
    layout: 'padded',
  },
};
