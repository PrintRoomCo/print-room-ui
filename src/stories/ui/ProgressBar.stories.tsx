import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from '@print-room-studio/ui';

const meta: Meta<typeof ProgressBar> = {
  title: 'Primitives/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A flexible progress bar component supporting both percentage and stepped modes.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['percentage', 'steps'],
      description: 'The display mode of the progress bar',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The height of the progress bar',
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progress value (0-100) for percentage mode',
    },
    showLabels: {
      control: 'boolean',
      description: 'Whether to show labels',
    },
    color: {
      control: 'color',
      description: 'Custom color for the progress indicator',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Percentage: Story = {
  args: {
    variant: 'percentage',
    value: 60,
    size: 'md',
    showLabels: true,
  },
  render: (args) => (
    <div className="w-[400px]">
      <ProgressBar {...args} />
    </div>
  ),
};

export const Steps: Story = {
  args: {
    variant: 'steps',
    steps: ['Design', 'Review', 'Submit'],
    currentStep: 1,
    size: 'md',
    showLabels: true,
  },
  render: (args) => (
    <div className="w-[400px]">
      <ProgressBar {...args} />
    </div>
  ),
};

export const Small: Story = {
  args: {
    variant: 'percentage',
    value: 40,
    size: 'sm',
    showLabels: true,
  },
  render: (args) => (
    <div className="w-[400px]">
      <ProgressBar {...args} />
    </div>
  ),
};

export const Large: Story = {
  args: {
    variant: 'percentage',
    value: 75,
    size: 'lg',
    showLabels: true,
  },
  render: (args) => (
    <div className="w-[400px]">
      <ProgressBar {...args} />
    </div>
  ),
};

export const CustomColor: Story = {
  args: {
    variant: 'percentage',
    value: 50,
    size: 'md',
    color: '#10b981',
    showLabels: true,
  },
  render: (args) => (
    <div className="w-[400px]">
      <ProgressBar {...args} />
    </div>
  ),
};

export const NoLabel: Story = {
  args: {
    variant: 'percentage',
    value: 65,
    size: 'md',
    showLabels: false,
  },
  render: (args) => (
    <div className="w-[400px]">
      <ProgressBar {...args} />
    </div>
  ),
};

const AnimatedProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 5));
    }, 300);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-[400px]">
      <ProgressBar variant="percentage" value={progress} size="md" showLabels />
    </div>
  );
};

export const Animated: Story = {
  render: () => <AnimatedProgressBar />,
};

export const AllSizes: Story = {
  render: () => (
    <div className="w-[400px] space-y-6">
      <div className="space-y-1">
        <span className="text-sm text-muted-foreground">Small</span>
        <ProgressBar variant="percentage" value={60} size="sm" showLabels={false} />
      </div>
      <div className="space-y-1">
        <span className="text-sm text-muted-foreground">Medium</span>
        <ProgressBar variant="percentage" value={60} size="md" showLabels={false} />
      </div>
      <div className="space-y-1">
        <span className="text-sm text-muted-foreground">Large</span>
        <ProgressBar variant="percentage" value={60} size="lg" showLabels={false} />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const OrderProgress: Story = {
  render: () => (
    <div className="w-[500px] space-y-4">
      <h3 className="font-medium">Order Progress</h3>
      <ProgressBar
        variant="steps"
        steps={['Received', 'Processing', 'Printing', 'Shipped']}
        currentStep={2}
        size="md"
        showLabels
        color="#2563eb"
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
