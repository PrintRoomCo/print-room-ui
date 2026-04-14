import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Checkbox, Label } from '@print-room-studio/ui';

const meta: Meta<typeof Checkbox> = {
  title: 'Primitives/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A checkbox component for selecting multiple options.',
      },
    },
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
  },
  args: {
    onCheckedChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms" className="text-lg font-semibold">Accept terms and conditions</Label>
    </div>
  ),
};

export const CheckboxGroup: Story = {
  render: () => (
    <div className="space-y-3">
      <Label className="text-base font-medium">Print Methods</Label>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox id="screenprint" defaultChecked />
          <Label htmlFor="screenprint">Screen Printing</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="heatpress" />
          <Label htmlFor="heatpress">Heat Press</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="embroidery" />
          <Label htmlFor="embroidery">Embroidery</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="dtg" />
          <Label htmlFor="dtg">Direct to Garment</Label>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const FormExample: Story = {
  render: () => (
    <div className="space-y-4 w-[350px] bg-slate-50 p-6 rounded-xl border border-slate-200">
      <div className="space-y-2">
        <Label className="text-base font-medium">Order Preferences</Label>
        <p className="text-sm text-muted-foreground">
          Select your preferences for this order
        </p>
      </div>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox id="rush" />
          <Label htmlFor="rush">Rush order (+20% fee)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="sample" />
          <Label htmlFor="sample">Request sample before production</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="packaging" defaultChecked />
          <Label htmlFor="packaging">Individual packaging</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="updates" defaultChecked />
          <Label htmlFor="updates">Receive order updates via email</Label>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const RequiredField: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="required-example" required />
      <Label htmlFor="required-example">
        I confirm this artwork is print-ready
        <span className="text-red-500 ml-0.5">*</span>
      </Label>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A required checkbox — used in order confirmation and artwork approval flows.',
      },
    },
  },
};
