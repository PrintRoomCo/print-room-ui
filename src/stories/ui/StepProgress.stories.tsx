import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { StepProgress } from '@print-room-studio/ui';

const meta: Meta<typeof StepProgress> = {
  title: 'App/Layout/StepProgress',
  component: StepProgress,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A step progress indicator showing numbered steps with a progress bar.',
      },
    },
  },
  argTypes: {
    currentStep: {
      control: { type: 'number', min: 0 },
      description: 'The current active step (0-indexed)',
    },
    showLabels: {
      control: 'boolean',
      description: 'Whether to show step labels',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const orderSteps = ['Design', 'Review', 'Details', 'Submit'];

export const Default: Story = {
  args: {
    steps: orderSteps,
    currentStep: 0,
    showLabels: true,
  },
  render: (args) => (
    <div className="w-[500px]">
      <StepProgress {...args} />
    </div>
  ),
};

export const SecondStep: Story = {
  args: {
    steps: orderSteps,
    currentStep: 1,
    showLabels: true,
  },
  render: (args) => (
    <div className="w-[500px]">
      <StepProgress {...args} />
    </div>
  ),
};

export const ThirdStep: Story = {
  args: {
    steps: orderSteps,
    currentStep: 2,
    showLabels: true,
  },
  render: (args) => (
    <div className="w-[500px]">
      <StepProgress {...args} />
    </div>
  ),
};

export const FinalStep: Story = {
  args: {
    steps: orderSteps,
    currentStep: 3,
    showLabels: true,
  },
  render: (args) => (
    <div className="w-[500px]">
      <StepProgress {...args} />
    </div>
  ),
};

export const WithoutLabels: Story = {
  args: {
    steps: orderSteps,
    currentStep: 1,
    showLabels: false,
  },
  render: (args) => (
    <div className="w-[500px]">
      <StepProgress {...args} />
    </div>
  ),
};

export const ThreeSteps: Story = {
  args: {
    steps: ['Select', 'Customize', 'Checkout'],
    currentStep: 1,
    showLabels: true,
  },
  render: (args) => (
    <div className="w-[400px]">
      <StepProgress {...args} />
    </div>
  ),
};

export const FiveSteps: Story = {
  args: {
    steps: ['Browse', 'Select', 'Design', 'Review', 'Order'],
    currentStep: 2,
    showLabels: true,
  },
  render: (args) => (
    <div className="w-[600px]">
      <StepProgress {...args} />
    </div>
  ),
};

export const OrderFlow: Story = {
  render: () => (
    <div className="w-[500px] space-y-8">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">Step 1 of 4</h3>
        <StepProgress steps={orderSteps} currentStep={0} />
      </div>
      <div className="border rounded-lg p-4">
        <h2 className="text-lg font-semibold">Design Your Product</h2>
        <p className="text-sm text-muted-foreground mt-2">
          Upload your artwork and customize colors.
        </p>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
