import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@print-room-studio/ui';

const meta = {
  title: 'Primitives/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `Accessible tabs built on Radix UI Tabs. Replaces the hand-rolled \`ViewTabs\` from the design tool and the BEM \`.mypr-tabs__*\` CSS system with a composable, keyboard-navigable component.

Compose with \`<TabsList>\`, \`<TabsTrigger>\`, and \`<TabsContent>\` — all accept \`className\` for customisation.`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      control: 'text',
      description: 'The value of the tab that should be active by default',
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ---------- Basic ---------- */

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <p className="text-sm text-muted-foreground p-4">
          General overview of the item.
        </p>
      </TabsContent>
      <TabsContent value="details">
        <p className="text-sm text-muted-foreground p-4">
          Detailed specifications.
        </p>
      </TabsContent>
      <TabsContent value="settings">
        <p className="text-sm text-muted-foreground p-4">
          Configuration options.
        </p>
      </TabsContent>
    </Tabs>
  ),
};

/* ---------- Product Views (replaces ViewTabs) ---------- */

export const ProductViews: Story = {
  name: 'Product Views (Design Tool)',
  render: () => (
    <Tabs defaultValue="front" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="front">Front</TabsTrigger>
        <TabsTrigger value="back">Back</TabsTrigger>
        <TabsTrigger value="left_side">Left Side</TabsTrigger>
        <TabsTrigger value="right_side">Right Side</TabsTrigger>
      </TabsList>
      <TabsContent value="front">
        <div className="flex items-center justify-center h-48 bg-muted rounded-md mt-2">
          <span className="text-muted-foreground text-sm">Front view canvas</span>
        </div>
      </TabsContent>
      <TabsContent value="back">
        <div className="flex items-center justify-center h-48 bg-muted rounded-md mt-2">
          <span className="text-muted-foreground text-sm">Back view canvas</span>
        </div>
      </TabsContent>
      <TabsContent value="left_side">
        <div className="flex items-center justify-center h-48 bg-muted rounded-md mt-2">
          <span className="text-muted-foreground text-sm">Left side view canvas</span>
        </div>
      </TabsContent>
      <TabsContent value="right_side">
        <div className="flex items-center justify-center h-48 bg-muted rounded-md mt-2">
          <span className="text-muted-foreground text-sm">Right side view canvas</span>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

/* ---------- Admin Panel (Tech Pack style) ---------- */

export const AdminPanel: Story = {
  name: 'Admin Panel',
  render: () => (
    <Tabs defaultValue="measurements" className="w-[500px]">
      <TabsList className="w-full">
        <TabsTrigger value="measurements" className="flex-1">
          Measurements
        </TabsTrigger>
        <TabsTrigger value="production" className="flex-1">
          Production
        </TabsTrigger>
        <TabsTrigger value="bom" className="flex-1">
          Bill of Materials
        </TabsTrigger>
      </TabsList>
      <TabsContent value="measurements">
        <div className="border rounded-md p-4 mt-2">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-muted-foreground">
                <th className="pb-2">Size</th>
                <th className="pb-2">Chest</th>
                <th className="pb-2">Length</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b"><td className="py-2">S</td><td>96cm</td><td>70cm</td></tr>
              <tr className="border-b"><td className="py-2">M</td><td>101cm</td><td>72cm</td></tr>
              <tr><td className="py-2">L</td><td>106cm</td><td>74cm</td></tr>
            </tbody>
          </table>
        </div>
      </TabsContent>
      <TabsContent value="production">
        <div className="border rounded-md p-4 mt-2 text-sm text-muted-foreground">
          Production steps and notes appear here.
        </div>
      </TabsContent>
      <TabsContent value="bom">
        <div className="border rounded-md p-4 mt-2 text-sm text-muted-foreground">
          Bill of materials table appears here.
        </div>
      </TabsContent>
    </Tabs>
  ),
};

/* ---------- Quote Workflow ---------- */

export const QuoteWorkflow: Story = {
  name: 'Quote Workflow',
  render: () => (
    <Tabs defaultValue="products" className="w-[480px]">
      <TabsList>
        <TabsTrigger value="products">Products</TabsTrigger>
        <TabsTrigger value="services">Services</TabsTrigger>
        <TabsTrigger value="summary">Summary</TabsTrigger>
        <TabsTrigger value="submit">Submit</TabsTrigger>
      </TabsList>
      <TabsContent value="products">
        <p className="text-sm text-muted-foreground p-4">Select garments, brands, and quantity breaks.</p>
      </TabsContent>
      <TabsContent value="services">
        <p className="text-sm text-muted-foreground p-4">Choose screen printing, embroidery, heat transfers, or finishing.</p>
      </TabsContent>
      <TabsContent value="summary">
        <p className="text-sm text-muted-foreground p-4">Review freight, setup costs, and delivery estimates.</p>
      </TabsContent>
      <TabsContent value="submit">
        <p className="text-sm text-muted-foreground p-4">Confirm and submit your quote.</p>
      </TabsContent>
    </Tabs>
  ),
};

/* ---------- Disabled Tab ---------- */

export const WithDisabledTab: Story = {
  name: 'Disabled Tab',
  render: () => (
    <Tabs defaultValue="active" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="disabled" disabled>
          Coming Soon
        </TabsTrigger>
        <TabsTrigger value="other">Other</TabsTrigger>
      </TabsList>
      <TabsContent value="active">
        <p className="text-sm text-muted-foreground p-4">This tab is active.</p>
      </TabsContent>
      <TabsContent value="other">
        <p className="text-sm text-muted-foreground p-4">Another available tab.</p>
      </TabsContent>
    </Tabs>
  ),
};
