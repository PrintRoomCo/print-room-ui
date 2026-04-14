import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { RadioGroup, RadioGroupItem, Label } from '@print-room-studio/ui';

const meta: Meta<typeof RadioGroup> = {
  title: 'Primitives/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A radio group component for selecting a single option from multiple choices.',
      },
    },
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'The currently selected value',
    },
  },
  args: {
    onValueChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option-1">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-1" id="option-1" />
        <Label htmlFor="option-1">Option 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-2" id="option-2" />
        <Label htmlFor="option-2">Option 2</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-3" id="option-3" />
        <Label htmlFor="option-3">Option 3</Label>
      </div>
    </RadioGroup>
  ),
};

export const PrintMethods: Story = {
  render: () => (
    <div className="space-y-3">
      <Label className="text-base font-medium">Select Print Method</Label>
      <RadioGroup defaultValue="screenprint">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="screenprint" id="screenprint" />
          <Label htmlFor="screenprint">Screen Printing</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="heatpress" id="heatpress" />
          <Label htmlFor="heatpress">Heat Press</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="embroidery" id="embroidery" />
          <Label htmlFor="embroidery">Embroidery</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="dtg" id="dtg" />
          <Label htmlFor="dtg">Direct to Garment</Label>
        </div>
      </RadioGroup>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const ShippingOptions: Story = {
  render: () => (
    <div className="space-y-3 w-[350px]">
      <Label className="text-base font-medium">Shipping Method</Label>
      <RadioGroup defaultValue="standard" className="space-y-3">
        <div className="flex items-center justify-between space-x-2 p-3 border rounded-lg">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="standard" id="standard" />
            <div>
              <Label htmlFor="standard" className="font-medium">
                Standard Shipping
              </Label>
              <p className="text-sm text-muted-foreground">5-7 business days</p>
            </div>
          </div>
          <span className="font-medium">Free</span>
        </div>
        <div className="flex items-center justify-between space-x-2 p-3 border rounded-lg">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="express" id="express" />
            <div>
              <Label htmlFor="express" className="font-medium">
                Express Shipping
              </Label>
              <p className="text-sm text-muted-foreground">2-3 business days</p>
            </div>
          </div>
          <span className="font-medium">$15.00</span>
        </div>
        <div className="flex items-center justify-between space-x-2 p-3 border rounded-lg">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="overnight" id="overnight" />
            <div>
              <Label htmlFor="overnight" className="font-medium">
                Overnight Shipping
              </Label>
              <p className="text-sm text-muted-foreground">Next business day</p>
            </div>
          </div>
          <span className="font-medium">$35.00</span>
        </div>
      </RadioGroup>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="option-1">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-1" id="d-option-1" />
        <Label htmlFor="d-option-1">Available</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-2" id="d-option-2" disabled />
        <Label htmlFor="d-option-2" className="opacity-50">
          Unavailable
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-3" id="d-option-3" />
        <Label htmlFor="d-option-3">Available</Label>
      </div>
    </RadioGroup>
  ),
};
