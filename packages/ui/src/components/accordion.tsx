"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown, Info } from "lucide-react"

import { cn } from "../utils"

type AccordionVariant = 'flat' | 'card'

const AccordionVariantContext = React.createContext<AccordionVariant>('flat')

type AccordionProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> & {
  variant?: AccordionVariant
}

function Accordion({ variant = 'flat', ...props }: AccordionProps) {
  return (
    <AccordionVariantContext.Provider value={variant}>
      <AccordionPrimitive.Root {...props} />
    </AccordionVariantContext.Provider>
  )
}
Accordion.displayName = "Accordion"

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => {
  const variant = React.useContext(AccordionVariantContext)
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn(
        variant === 'card'
          ? 'bg-card rounded-xl border border-border shadow-sm mb-3 overflow-hidden'
          : 'border-b',
        className
      )}
      {...props}
    />
  )
})
AccordionItem.displayName = "AccordionItem"

interface AccordionTriggerProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {
  /** Show an info icon between the title text and the chevron. */
  info?: boolean
}

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(({ className, children, info, ...props }, ref) => {
  const variant = React.useContext(AccordionVariantContext)
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex flex-1 items-center justify-between font-medium transition-all [&[data-state=open]>svg.accordion-chevron]:rotate-180",
          variant === 'card'
            ? 'px-5 py-4'
            : 'py-4 hover:underline',
          className
        )}
        {...props}
      >
        {children}
        <span className="flex items-center gap-2 shrink-0">
          {info && (
            <Info className="h-4 w-4 text-muted-foreground" />
          )}
          <ChevronDown className="accordion-chevron h-4 w-4 shrink-0 transition-transform duration-200" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
})
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  const variant = React.useContext(AccordionVariantContext)
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn(
        "pb-4 pt-0",
        variant === 'card' && 'px-5',
        className
      )}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
})

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
export type { AccordionProps, AccordionTriggerProps }
