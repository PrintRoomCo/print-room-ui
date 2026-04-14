import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarItem,
  SidebarTrigger,
  Badge,
} from '@print-room-studio/ui';
import {
  LayoutDashboard,
  ShoppingCart,
  FileText,
  Palette,
  Users,
  Package,
  Settings,
  BarChart3,
  ClipboardList,
  Printer,
  LogOut,
} from 'lucide-react';

const meta = {
  title: 'Storefront/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Application sidebar shell for both the admin and customer dashboard layouts. Supports a collapsed icon-only state, group labelling, active indicators, and trailing badges.

Compose with \`<SidebarHeader>\`, \`<SidebarContent>\`, \`<SidebarFooter>\`, \`<SidebarGroup>\`, and \`<SidebarItem>\`.`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    side: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Which side of the viewport the sidebar sits on',
      table: { defaultValue: { summary: 'left' } },
    },
    width: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl'],
      description: 'Fixed-width preset',
      table: { defaultValue: { summary: 'default' } },
    },
    collapsed: {
      control: 'boolean',
      description: 'Collapse to icon-only mode',
    },
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ---------- Helper wrapper to give the sidebar a visible container ---------- */

function SidebarShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[600px] border rounded-lg overflow-hidden bg-background">
      {children}
      <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground">
        Page content area
      </div>
    </div>
  );
}

/* ---------- Admin Layout ---------- */

export const AdminLayout: Story = {
  name: 'Admin Layout',
  render: () => (
    <SidebarShell>
      <Sidebar>
        <SidebarHeader>
          <span className="text-sm font-bold tracking-tight">Print Room</span>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup label="Production">
            <SidebarItem icon={<ClipboardList />} active>
              Jobs
            </SidebarItem>
            <SidebarItem icon={<ShoppingCart />} badge={<Badge variant="info">3</Badge>}>
              Orders
            </SidebarItem>
            <SidebarItem icon={<FileText />}>Quotes</SidebarItem>
            <SidebarItem icon={<Printer />}>Tech Packs</SidebarItem>
          </SidebarGroup>
          <SidebarGroup label="Catalogue">
            <SidebarItem icon={<Package />}>Products</SidebarItem>
            <SidebarItem icon={<Palette />}>Designs</SidebarItem>
          </SidebarGroup>
          <SidebarGroup label="Management">
            <SidebarItem icon={<Users />}>Customers</SidebarItem>
            <SidebarItem icon={<BarChart3 />}>Reports</SidebarItem>
            <SidebarItem icon={<Settings />}>Settings</SidebarItem>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <p className="text-xs text-muted-foreground">v2.0.0 — Print Room Studio</p>
        </SidebarFooter>
      </Sidebar>
    </SidebarShell>
  ),
};

/* ---------- Customer Dashboard ---------- */

export const CustomerDashboard: Story = {
  name: 'Customer Dashboard',
  render: () => (
    <SidebarShell>
      <Sidebar width="sm">
        <SidebarHeader>
          <span className="text-sm font-bold tracking-tight">MyPR</span>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarItem icon={<LayoutDashboard />} active>
              Dashboard
            </SidebarItem>
            <SidebarItem icon={<ShoppingCart />}>Orders</SidebarItem>
            <SidebarItem icon={<FileText />}>Quotes</SidebarItem>
            <SidebarItem icon={<Palette />}>Designs</SidebarItem>
            <SidebarItem icon={<Package />}>Catalogue</SidebarItem>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarItem icon={<LogOut />}>Sign Out</SidebarItem>
        </SidebarFooter>
      </Sidebar>
    </SidebarShell>
  ),
};

/* ---------- Collapsible ---------- */

export const Collapsible: Story = {
  render: () => {
    const CollapsibleDemo = () => {
      const [collapsed, setCollapsed] = useState(false);
      return (
        <SidebarShell>
          <Sidebar collapsed={collapsed}>
            <SidebarHeader className="justify-between">
              {!collapsed && (
                <span className="text-sm font-bold tracking-tight">Print Room</span>
              )}
              <SidebarTrigger onClick={() => setCollapsed((c) => !c)} />
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarItem icon={<LayoutDashboard />} active>
                  {!collapsed && 'Dashboard'}
                </SidebarItem>
                <SidebarItem icon={<ShoppingCart />}>
                  {!collapsed && 'Orders'}
                </SidebarItem>
                <SidebarItem icon={<FileText />}>
                  {!collapsed && 'Quotes'}
                </SidebarItem>
                <SidebarItem icon={<Palette />}>
                  {!collapsed && 'Designs'}
                </SidebarItem>
                <SidebarItem icon={<Settings />}>
                  {!collapsed && 'Settings'}
                </SidebarItem>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
              {!collapsed && (
                <p className="text-xs text-muted-foreground">v2.0.0</p>
              )}
            </SidebarFooter>
          </Sidebar>
        </SidebarShell>
      );
    };
    return <CollapsibleDemo />;
  },
};

/* ---------- Width Variants ---------- */

export const WidthVariants: Story = {
  name: 'Width Variants',
  render: () => (
    <div className="space-y-6">
      {(['sm', 'default', 'lg', 'xl'] as const).map((w) => (
        <div key={w} className="flex h-[200px] border rounded-lg overflow-hidden bg-background">
          <Sidebar width={w}>
            <SidebarHeader>
              <span className="text-xs font-bold">width=&quot;{w}&quot;</span>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarItem icon={<LayoutDashboard />}>Dashboard</SidebarItem>
                <SidebarItem icon={<ShoppingCart />}>Orders</SidebarItem>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <div className="flex-1 flex items-center justify-center text-xs text-muted-foreground">
            Content
          </div>
        </div>
      ))}
    </div>
  ),
};

/* ---------- Right Side ---------- */

export const RightSide: Story = {
  name: 'Right Side',
  render: () => (
    <SidebarShell>
      <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground order-first">
        Main content
      </div>
      <Sidebar side="right" width="lg">
        <SidebarHeader>
          <span className="text-sm font-bold tracking-tight">Details Panel</span>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup label="Job Info">
            <p className="px-2 text-sm text-muted-foreground">
              Right-side panel for contextual details — job metadata, order notes, etc.
            </p>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarShell>
  ),
};

export const FavoritesDrawer: Story = {
  name: 'Favorites Drawer',
  render: () => (
    <div className="flex h-[520px] rounded-lg border overflow-hidden bg-background">
      <div className="flex-1 bg-[var(--pr-off-white)] p-8 text-sm text-muted-foreground">
        Storefront content area
      </div>
      <Sidebar side="right" width="lg">
        <SidebarHeader>
          <span className="text-sm font-bold tracking-tight">Saved for Later</span>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup label="Favourites">
            <SidebarItem icon={<Package />} active>
              AS Colour Staple Tee
            </SidebarItem>
            <SidebarItem icon={<Package />}>Stanley/Stella Creator 2.0</SidebarItem>
            <SidebarItem icon={<Package />}>Continental Hoodie</SidebarItem>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarItem icon={<ShoppingCart />}>Start Quote from Saved Items</SidebarItem>
        </SidebarFooter>
      </Sidebar>
    </div>
  ),
};
