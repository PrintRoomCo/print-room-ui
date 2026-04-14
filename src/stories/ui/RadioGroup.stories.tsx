import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
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
    <RadioGroup defaultValue="email-proof">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="email-proof" id="email-proof" />
        <Label htmlFor="email-proof">Email artwork proof</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="studio-review" id="studio-review" />
        <Label htmlFor="studio-review">Review in the design studio</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="sample-print" id="sample-print" />
        <Label htmlFor="sample-print">Request a pre-production sample</Label>
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
      <Label className="text-base font-medium">Delivery Method</Label>
      <RadioGroup defaultValue="wellington-pickup" className="space-y-3">
        <div className="flex items-center justify-between space-x-2 p-3 border rounded-lg">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="wellington-pickup" id="wellington-pickup" />
            <div>
              <Label htmlFor="wellington-pickup" className="font-medium">
                Wellington pickup
              </Label>
              <p className="text-sm text-muted-foreground">Collect from Dixon Street studio</p>
            </div>
          </div>
          <span className="font-medium">Free</span>
        </div>
        <div className="flex items-center justify-between space-x-2 p-3 border rounded-lg">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="north-island-courier" id="north-island-courier" />
            <div>
              <Label htmlFor="north-island-courier" className="font-medium">
                North Island courier
              </Label>
              <p className="text-sm text-muted-foreground">1-2 working days after dispatch</p>
            </div>
          </div>
          <span className="font-medium">$9.50</span>
        </div>
        <div className="flex items-center justify-between space-x-2 p-3 border rounded-lg">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="south-island-rural" id="south-island-rural" />
            <div>
              <Label htmlFor="south-island-rural" className="font-medium">
                South Island rural courier
              </Label>
              <p className="text-sm text-muted-foreground">2-4 working days after dispatch</p>
            </div>
          </div>
          <span className="font-medium">$15.00</span>
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
    <RadioGroup defaultValue="auckland">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="auckland" id="auckland" />
        <Label htmlFor="auckland">Auckland dispatch</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="christchurch" id="christchurch" disabled />
        <Label htmlFor="christchurch" className="opacity-50">
          Christchurch pickup coming soon
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="wellington" id="wellington" />
        <Label htmlFor="wellington">Wellington pickup</Label>
      </div>
    </RadioGroup>
  ),
};
