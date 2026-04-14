import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarItem,
  OrderCard,
} from '@print-room-studio/ui';
import {
  ShoppingCart,
  Package,
  Palette,
  FileText,
  BarChart3,
  ClipboardList,
  LogOut,
} from 'lucide-react';

const meta: Meta = {
  title: 'Pages/PastOrdersPage',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Full page composition: Past orders page matching Figma node 3:2. Studio sidebar with navy active state + OrderCard list.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const orders = [
  {
    productName: 'AS Colour Staple Tee — Black',
    description: 'Screen print, front centre',
    quantity: 48,
    collectionLabel: 'Summer 2025 Staff Uniforms',
  },
  {
    productName: 'Continental Hoodie — Navy',
    description: 'Embroidery, left chest',
    quantity: 24,
    collectionLabel: 'Winter Collection',
  },
  {
    productName: 'Earth Positive Classic — Bone',
    description: '2-colour screen print, front + back',
    quantity: 96,
    collectionLabel: 'Retail Launch',
  },
  {
    productName: 'Stanley/Stella Creator 2.0 — White',
    description: 'DTG, full front',
    quantity: 120,
    collectionLabel: 'Event Merch',
  },
];

export const Default: Story = {
  render: () => (
    <div className="flex h-screen bg-background">
      <Sidebar>
        <SidebarHeader>
          <span className="text-sm font-bold tracking-tight">Studio</span>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarItem icon={<ShoppingCart />} variant="studio" active>
              Past Orders
            </SidebarItem>
            <SidebarItem icon={<Package />} variant="studio">
              Stores
            </SidebarItem>
            <SidebarItem icon={<Palette />} variant="studio">
              Design
            </SidebarItem>
            <SidebarItem icon={<FileText />} variant="studio">
              Catalog
            </SidebarItem>
            <SidebarItem icon={<BarChart3 />} variant="studio">
              Reports
            </SidebarItem>
            <SidebarItem icon={<ClipboardList />} variant="studio">
              Inventory
            </SidebarItem>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarItem icon={<LogOut />} variant="studio">
            Sign Out
          </SidebarItem>
        </SidebarFooter>
      </Sidebar>

      <main className="flex-1 overflow-y-auto p-6">
        <h2 className="text-xl font-bold mb-4">Past Orders</h2>
        <div className="space-y-3 max-w-xl">
          {orders.map((order) => (
            <OrderCard
              key={order.productName}
              {...order}
              onDownload={() => {}}
            />
          ))}
        </div>
      </main>
    </div>
  ),
};
