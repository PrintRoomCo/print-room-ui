import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  Toaster,
  toast,
  useToast,
} from '@print-room-studio/ui';
import { Button } from '@print-room-studio/ui';

/* -------------------------------------------------------------------------- */
/*  Meta                                                                       */
/* -------------------------------------------------------------------------- */

const meta = {
  title: 'Feedback/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `A toast notification system built on Radix UI Toast. Includes an imperative \`toast()\` function that can be called from anywhere — including tRPC error handlers and server actions.

Drop \`<Toaster />\` once in your root layout, then call \`toast({ title: "Saved" })\` from any component or utility.`,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Stories                                                                     */
/* -------------------------------------------------------------------------- */

export const Default: Story = {
  render: () => {
    return (
      <Button
        onClick={() => {
          toast({
            title: 'Quote saved',
            description: 'Your quote has been saved as a draft.',
          });
        }}
      >
        Show Toast
      </Button>
    );
  },
};

export const Destructive: Story = {
  render: () => (
    <Button
      variant="destructive"
      onClick={() => {
        toast({
          variant: 'destructive',
          title: 'Something went wrong',
          description: 'There was an error saving your quote. Please try again.',
        });
      }}
    >
      Show Destructive Toast
    </Button>
  ),
};

export const Success: Story = {
  render: () => (
    <Button
      onClick={() => {
        toast({
          variant: 'success',
          title: 'Order confirmed',
          description: 'Order #PR-2847 has been sent to production.',
        });
      }}
    >
      Show Success Toast
    </Button>
  ),
};

export const Warning: Story = {
  render: () => (
    <Button
      onClick={() => {
        toast({
          variant: 'warning',
          title: 'Low stock',
          description: 'AS Colour 5001 — Black S has only 12 units remaining.',
        });
      }}
    >
      Show Warning Toast
    </Button>
  ),
};

export const WithAction: Story = {
  name: 'With Action',
  render: () => (
    <Button
      onClick={() => {
        toast({
          title: 'Design submitted',
          description: 'Your design has been submitted for review.',
          action: <ToastAction altText="View design">View</ToastAction>,
        });
      }}
    >
      Show Toast with Action
    </Button>
  ),
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="flex flex-col gap-3">
      <Button
        variant="default"
        onClick={() =>
          toast({ title: 'Default', description: 'This is a default toast.' })
        }
      >
        Default
      </Button>
      <Button
        variant="destructive"
        onClick={() =>
          toast({
            variant: 'destructive',
            title: 'Destructive',
            description: 'This is a destructive toast.',
          })
        }
      >
        Destructive
      </Button>
      <Button
        onClick={() =>
          toast({
            variant: 'success',
            title: 'Success',
            description: 'This is a success toast.',
          })
        }
      >
        Success
      </Button>
      <Button
        onClick={() =>
          toast({
            variant: 'warning',
            title: 'Warning',
            description: 'This is a warning toast.',
          })
        }
      >
        Warning
      </Button>
    </div>
  ),
};

/* ---------- Static preview (for Chromatic / visual regression) ---------- */

export const StaticPreview: Story = {
  name: 'Static Preview (Chromatic)',
  render: () => (
    <ToastProvider>
      <div className="flex flex-col gap-3 w-[380px]">
        <div className="pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg bg-background text-foreground">
          <div className="grid gap-1">
            <p className="text-sm font-semibold">Quote saved</p>
            <p className="text-sm opacity-90">Your quote has been saved as a draft.</p>
          </div>
        </div>

        <div className="pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg border-emerald-200 bg-emerald-50 text-emerald-900">
          <div className="grid gap-1">
            <p className="text-sm font-semibold">Order confirmed</p>
            <p className="text-sm opacity-90">Order #PR-2847 has been sent to production.</p>
          </div>
        </div>

        <div className="pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg border-amber-200 bg-amber-50 text-amber-900">
          <div className="grid gap-1">
            <p className="text-sm font-semibold">Low stock</p>
            <p className="text-sm opacity-90">AS Colour 5001 — Black S has only 12 units remaining.</p>
          </div>
        </div>

        <div className="pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border-destructive bg-destructive text-destructive-foreground p-6 pr-8 shadow-lg">
          <div className="grid gap-1">
            <p className="text-sm font-semibold">Something went wrong</p>
            <p className="text-sm opacity-90">There was an error saving your quote.</p>
          </div>
        </div>
      </div>
      <ToastViewport />
    </ToastProvider>
  ),
};
