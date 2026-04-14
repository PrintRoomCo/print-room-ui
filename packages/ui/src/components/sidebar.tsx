'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { PanelLeft } from 'lucide-react';

import { cn } from '../utils';

/* -------------------------------------------------------------------------- */
/*  Sidebar root                                                               */
/* -------------------------------------------------------------------------- */

const sidebarVariants = cva(
  'flex flex-col border-r bg-background transition-[width] duration-200 ease-in-out',
  {
    variants: {
      /** Which side of the viewport the sidebar sits on. */
      side: {
        left: 'border-r',
        right: 'border-l border-r-0',
      },
      /** Fixed width presets matching the Print Room admin & customer layouts. */
      width: {
        sm: 'w-[220px]',
        default: 'w-[260px]',
        lg: 'w-[300px]',
        xl: 'w-[360px]',
      },
    },
    defaultVariants: {
      side: 'left',
      width: 'default',
    },
  }
);

export interface SidebarProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sidebarVariants> {
  /** Whether the sidebar is collapsed to icon-only mode. */
  collapsed?: boolean;
  /** Width when collapsed (defaults to 56px / 3.5rem). */
  collapsedWidth?: string;
}

/**
 * Application sidebar shell — used for both the admin and customer dashboard
 * layouts in the Print Room unified app.
 *
 * Supports a `collapsed` state that shrinks to icon-only width while keeping
 * children rendered so tooltips / screen-readers still work.
 *
 * ```tsx
 * <Sidebar collapsed={isCollapsed}>
 *   <SidebarHeader>Logo</SidebarHeader>
 *   <SidebarContent>
 *     <SidebarGroup label="Main">
 *       <SidebarItem icon={<LayoutDashboard />} active>Dashboard</SidebarItem>
 *     </SidebarGroup>
 *   </SidebarContent>
 *   <SidebarFooter>v1.0</SidebarFooter>
 * </Sidebar>
 * ```
 */
const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  (
    {
      className,
      side,
      width,
      collapsed = false,
      collapsedWidth = '3.5rem',
      style,
      ...props
    },
    ref
  ) => {
    return (
      <aside
        ref={ref}
        data-collapsed={collapsed || undefined}
        className={cn(
          sidebarVariants({ side, width }),
          collapsed && 'overflow-hidden',
          className
        )}
        style={{
          ...(collapsed ? { width: collapsedWidth, minWidth: collapsedWidth } : {}),
          ...style,
        }}
        {...props}
      />
    );
  }
);
Sidebar.displayName = 'Sidebar';

/* -------------------------------------------------------------------------- */
/*  SidebarHeader                                                              */
/* -------------------------------------------------------------------------- */

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex h-14 items-center border-b px-4', className)}
    {...props}
  />
));
SidebarHeader.displayName = 'SidebarHeader';

/* -------------------------------------------------------------------------- */
/*  SidebarContent — scrollable middle area                                    */
/* -------------------------------------------------------------------------- */

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex-1 overflow-y-auto py-2', className)}
    {...props}
  />
));
SidebarContent.displayName = 'SidebarContent';

/* -------------------------------------------------------------------------- */
/*  SidebarFooter                                                              */
/* -------------------------------------------------------------------------- */

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('border-t px-4 py-3', className)}
    {...props}
  />
));
SidebarFooter.displayName = 'SidebarFooter';

/* -------------------------------------------------------------------------- */
/*  SidebarGroup — labelled section within the sidebar content                 */
/* -------------------------------------------------------------------------- */

export interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional heading label for the group. */
  label?: string;
}

const SidebarGroup = React.forwardRef<HTMLDivElement, SidebarGroupProps>(
  ({ className, label, children, ...props }, ref) => (
    <div ref={ref} className={cn('px-3 py-2', className)} {...props}>
      {label && (
        <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
      )}
      <div className="space-y-1">{children}</div>
    </div>
  )
);
SidebarGroup.displayName = 'SidebarGroup';

/* -------------------------------------------------------------------------- */
/*  SidebarItem — individual navigation item                                   */
/* -------------------------------------------------------------------------- */

export interface SidebarItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Icon element rendered before the label. */
  icon?: React.ReactNode;
  /** Whether this item is the current active route. */
  active?: boolean;
  /** Optional trailing badge / count. */
  badge?: React.ReactNode;
  /** Visual variant — `studio` matches the Figma Studio dashboard nav. */
  variant?: 'default' | 'studio';
}

const sidebarItemVariants: Record<
  'default' | 'studio',
  { base: string; active: string; hover: string }
> = {
  default: {
    base: 'rounded-md',
    hover: 'hover:bg-accent hover:text-accent-foreground',
    active: 'bg-accent text-accent-foreground',
  },
  studio: {
    base: 'rounded-lg border border-black',
    hover: 'hover:bg-muted/50',
    active:
      'bg-[var(--pr-sidebar-active-bg)] text-white border-[var(--pr-sidebar-active-bg)]',
  },
};

const SidebarItem = React.forwardRef<HTMLButtonElement, SidebarItemProps>(
  ({ className, icon, active, badge, variant = 'default', children, ...props }, ref) => {
    const v = sidebarItemVariants[variant];
    return (
      <button
        ref={ref}
        type="button"
        data-active={active || undefined}
        className={cn(
          'group flex w-full items-center gap-3 px-2 py-2 text-sm font-medium transition-colors',
          v.base,
          v.hover,
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          active && v.active,
          className
        )}
        {...props}
      >
        {icon && <span className="h-4 w-4 shrink-0">{icon}</span>}
        <span className="flex-1 truncate">{children}</span>
        {badge && <span className="ml-auto">{badge}</span>}
      </button>
    );
  }
);
SidebarItem.displayName = 'SidebarItem';

/* -------------------------------------------------------------------------- */
/*  SidebarTrigger — toggle button for collapse                                */
/* -------------------------------------------------------------------------- */

export interface SidebarTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

/**
 * A small button that toggles collapsed state.
 * Wire it to your sidebar state:
 *
 * ```tsx
 * <SidebarTrigger onClick={() => setCollapsed(c => !c)} />
 * ```
 */
const SidebarTrigger = React.forwardRef<HTMLButtonElement, SidebarTriggerProps>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn(
        'inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className
      )}
      {...props}
    >
      <PanelLeft className="h-4 w-4" />
      <span className="sr-only">Toggle sidebar</span>
    </button>
  )
);
SidebarTrigger.displayName = 'SidebarTrigger';

/* -------------------------------------------------------------------------- */
/*  Exports                                                                    */
/* -------------------------------------------------------------------------- */

export {
  Sidebar,
  sidebarVariants,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarItem,
  SidebarTrigger,
};
