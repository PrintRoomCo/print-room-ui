import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from '@print-room-studio/ui';

const meta: Meta<typeof Progress> = {
  title: 'Primitives/Progress',
  component: Progress,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A progress indicator component with animated gradient styling, built with Radix UI.',
      },
    },
  },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'The progress value (0-100)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 50,
  },
  render: (args) => (
    <div className="w-[400px]">
      <Progress {...args} />
    </div>
  ),
};

export const Empty: Story = {
  args: {
    value: 0,
  },
  render: (args) => (
    <div className="w-[400px]">
      <Progress {...args} />
    </div>
  ),
};

export const Quarter: Story = {
  args: {
    value: 25,
  },
  render: (args) => (
    <div className="w-[400px]">
      <Progress {...args} />
    </div>
  ),
};

export const Half: Story = {
  args: {
    value: 50,
  },
  render: (args) => (
    <div className="w-[400px]">
      <Progress {...args} />
    </div>
  ),
};

export const ThreeQuarters: Story = {
  args: {
    value: 75,
  },
  render: (args) => (
    <div className="w-[400px]">
      <Progress {...args} />
    </div>
  ),
};

export const Complete: Story = {
  args: {
    value: 100,
  },
  render: (args) => (
    <div className="w-[400px]">
      <Progress {...args} />
    </div>
  ),
};

const AnimatedProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-[400px] space-y-2">
      <Progress value={progress} />
      <p className="text-sm text-muted-foreground text-center">{progress}%</p>
    </div>
  );
};

export const Animated: Story = {
  render: () => <AnimatedProgress />,
};

export const MultipleSteps: Story = {
  render: () => (
    <div className="w-[400px] space-y-4">
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span>Step 1: Design</span>
          <span className="text-muted-foreground">Complete</span>
        </div>
        <Progress value={100} />
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span>Step 2: Review</span>
          <span className="text-muted-foreground">In Progress</span>
        </div>
        <Progress value={60} />
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span>Step 3: Production</span>
          <span className="text-muted-foreground">Pending</span>
        </div>
        <Progress value={0} />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
