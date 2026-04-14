import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Input, Label } from '@print-room-studio/ui';

const meta: Meta<typeof Input> = {
  title: 'Primitives/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A text input component for collecting user data.',
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'The type of input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
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
    placeholder: 'Your business name',
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="orders@theprintroom.nz" />
    </div>
  ),
};

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'hello@theprintroom.nz',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter portal password',
  },
};

export const Number: Story = {
  args: {
    type: 'number',
    placeholder: '250',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Artwork upload disabled',
    disabled: true,
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: 'The Print Room',
  },
};

export const Search: Story = {
  args: {
    type: 'search',
    placeholder: 'Search AS Colour, Continental, Stanley/Stella...',
  },
};

export const FormExample: Story = {
  render: () => (
    <form className="space-y-4 w-[350px]">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" placeholder="Jamie Murray" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email-form">Email</Label>
        <Input id="email-form" type="email" placeholder="orders@theprintroom.nz" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" type="tel" placeholder="+64 21 555 1234" />
      </div>
    </form>
  ),
  parameters: {
    layout: 'padded',
  },
};
