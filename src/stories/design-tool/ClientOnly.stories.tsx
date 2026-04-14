import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ClientOnly } from '@vendored/design-tool/common/ClientOnly';

const meta: Meta<typeof ClientOnly> = {
  title: 'App/Design Tool/ClientOnly',
  component: ClientOnly,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'Content to render only on the client',
    },
    fallback: {
      description: 'Content to show during server render / before hydration',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ClientOnly>;

export const Default: Story = {
  render: () => (
    <ClientOnly>
      <div className="p-4 bg-green-100 rounded-lg">
        <p className="text-green-800">This content only renders on the client!</p>
      </div>
    </ClientOnly>
  ),
};

export const WithFallback: Story = {
  render: () => (
    <ClientOnly
      fallback={
        <div className="p-4 bg-gray-100 rounded-lg animate-pulse">
          <p className="text-gray-500">Loading...</p>
        </div>
      }
    >
      <div className="p-4 bg-green-100 rounded-lg">
        <p className="text-green-800">Client-rendered content</p>
      </div>
    </ClientOnly>
  ),
};

export const WithComplexContent: Story = {
  render: () => (
    <ClientOnly
      fallback={
        <div className="p-6 bg-gray-50 border rounded-lg">
          <div className="h-6 w-32 bg-gray-200 rounded mb-2 animate-pulse" />
          <div className="h-4 w-full bg-gray-200 rounded mb-4 animate-pulse" />
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
        </div>
      }
    >
      <div className="p-6 bg-white border rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Client-Side Widget</h3>
        <p className="text-gray-600 mb-4">
          This widget requires browser APIs and only renders on the client.
        </p>
        <p className="text-sm text-gray-500">
          Window width: {typeof window !== 'undefined' ? window.innerWidth : 'N/A'}px
        </p>
      </div>
    </ClientOnly>
  ),
};
