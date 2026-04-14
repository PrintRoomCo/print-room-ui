import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@print-room-studio/ui';

const meta: Meta<typeof Accordion> = {
  title: 'Primitives/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'An accordion component built with Radix UI for expandable/collapsible content sections.',
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
      description: 'Whether single or multiple items can be open at once',
    },
    collapsible: {
      control: 'boolean',
      description: 'Whether all items can be collapsed (only for single type)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-[400px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>How does artwork approval work?</AccordionTrigger>
        <AccordionContent>
          We send a digital proof before production starts so you can confirm placement, colour,
          and sizing.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>What garments do you stock most often?</AccordionTrigger>
        <AccordionContent>
          AS Colour, Continental, Stanley/Stella, and Earth Positive are the most common options
          across quotes and online orders.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Can you split deliveries?</AccordionTrigger>
        <AccordionContent>
          Yes. We can ship cartons to multiple sites or hold part of a run for phased dispatch.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" className="w-[400px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Garment selection</AccordionTrigger>
        <AccordionContent>
          This order includes AS Colour Staple Tees in black and bone, plus a smaller run of
          Continental hoodies for staff.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Decoration details</AccordionTrigger>
        <AccordionContent>
          Use a 2-colour front screen print on the tees and a left-chest embroidery setup on the
          hoodies.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Freight and handover</AccordionTrigger>
        <AccordionContent>Split dispatch between Wellington pickup and Auckland courier.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const WithDefaultOpen: Story = {
  render: () => (
    <Accordion type="single" defaultValue="item-2" collapsible className="w-[400px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Quote received</AccordionTrigger>
        <AccordionContent>
          Garments, decoration method, and freight options have been estimated and sent for review.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Artwork approved</AccordionTrigger>
        <AccordionContent>
          The proof is approved and the job is queued for production. This item starts open to
          highlight the current milestone.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const FAQ: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-[500px]">
      <AccordionItem value="faq-1">
        <AccordionTrigger>What print methods do you offer?</AccordionTrigger>
        <AccordionContent>
          We offer screen printing, embroidery, heat transfers, finishing, and custom patches
          across apparel, headwear, and accessories.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="faq-2">
        <AccordionTrigger>What is the minimum order quantity?</AccordionTrigger>
        <AccordionContent>
          Minimums depend on technique. Screen printing usually starts at 24 units, while
          embroidery and transfers are suitable for smaller runs.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="faq-3">
        <AccordionTrigger>How long does production take?</AccordionTrigger>
        <AccordionContent>
          Standard production is typically 7 to 10 working days after artwork approval, with rush
          options available when capacity allows.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="faq-4">
        <AccordionTrigger>Do you offer design services?</AccordionTrigger>
        <AccordionContent>
          Yes. We can refine supplied artwork, prepare separations, and help choose the right print
          method before the job is booked.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  parameters: {
    layout: 'padded',
  },
};
