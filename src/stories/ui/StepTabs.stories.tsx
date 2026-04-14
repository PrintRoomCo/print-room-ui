import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  StepTabs,
  StepTabsList,
  StepTabsTrigger,
  StepTabsContent,
} from '@print-room-studio/ui';

const meta: Meta<typeof StepTabs> = {
  title: 'Primitives/StepTabs',
  component: StepTabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Bottom-aligned step tabs with a purple underline indicator, matching the Figma Studio design tool workflow.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <StepTabs defaultValue="design" className="w-[500px]">
      <div className="p-8 text-sm text-muted-foreground text-center">
        Step content area
      </div>
      <StepTabsList>
        <StepTabsTrigger value="design">Design</StepTabsTrigger>
        <StepTabsTrigger value="review">Review</StepTabsTrigger>
        <StepTabsTrigger value="details">Details</StepTabsTrigger>
        <StepTabsTrigger value="submit">Submit Quote</StepTabsTrigger>
      </StepTabsList>
    </StepTabs>
  ),
};

export const WithContent: Story = {
  render: () => (
    <StepTabs defaultValue="design" className="w-[500px] border rounded-lg overflow-hidden">
      <StepTabsContent value="design" className="p-6">
        <p className="text-sm">Choose your garment, colours, and decoration placement.</p>
      </StepTabsContent>
      <StepTabsContent value="review" className="p-6">
        <p className="text-sm">Review your artwork proof and confirm sizing.</p>
      </StepTabsContent>
      <StepTabsContent value="details" className="p-6">
        <p className="text-sm">Enter delivery details and special instructions.</p>
      </StepTabsContent>
      <StepTabsContent value="submit" className="p-6">
        <p className="text-sm">Submit your quote for review by the Print Room team.</p>
      </StepTabsContent>
      <StepTabsList>
        <StepTabsTrigger value="design">Design</StepTabsTrigger>
        <StepTabsTrigger value="review">Review</StepTabsTrigger>
        <StepTabsTrigger value="details">Details</StepTabsTrigger>
        <StepTabsTrigger value="submit">Submit Quote</StepTabsTrigger>
      </StepTabsList>
    </StepTabs>
  ),
};

export const ThreeSteps: Story = {
  render: () => (
    <StepTabs defaultValue="select" className="w-[400px]">
      <div className="p-8 text-sm text-muted-foreground text-center">
        Step content
      </div>
      <StepTabsList>
        <StepTabsTrigger value="select">Select</StepTabsTrigger>
        <StepTabsTrigger value="customise">Customise</StepTabsTrigger>
        <StepTabsTrigger value="confirm">Confirm</StepTabsTrigger>
      </StepTabsList>
    </StepTabs>
  ),
};
