import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  GlobalHeader,
  BackButton,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  StepTabs,
  StepTabsList,
  StepTabsTrigger,
  StepTabsContent,
  Button,
  QuantityInput,
} from '@print-room-studio/ui';

const meta: Meta = {
  title: 'Pages/DesignToolPage',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Full page composition: Design tool page matching Figma node 2:83. GlobalHeader + BackButton + product viewer area + card accordions + StepTabs + CTA button.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div className="min-h-screen bg-background flex flex-col">
      <GlobalHeader
        subtitle="Studio"
        backButton={<BackButton />}
        notifications={2}
      />

      <div className="flex-1 flex">
        {/* Product viewer area */}
        <div className="flex-1 flex items-center justify-center bg-gray-50 p-8">
          <div className="w-80 h-80 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center text-muted-foreground text-sm">
            Product Viewer
          </div>
        </div>

        {/* Right panel — accordions + quantity */}
        <div className="w-[420px] border-l bg-background p-6 overflow-y-auto">
          <Accordion
            type="single"
            defaultValue="sizing"
            collapsible
            variant="card"
          >
            <AccordionItem value="garment">
              <AccordionTrigger info>Garment &amp; Colour</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground">
                  AS Colour Staple Tee — Black, Bone, White
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="method">
              <AccordionTrigger info>Print Method</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground">
                  2-colour front screen print
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="artwork">
              <AccordionTrigger info>Artwork Placement</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground">
                  Front centre, 30cm wide
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="sizing">
              <AccordionTrigger info>Sizing &amp; Quantities</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  {['S', 'M', 'L', 'XL', '2XL'].map((size) => (
                    <div key={size} className="flex items-center justify-between">
                      <span className="text-sm font-medium w-12">{size}</span>
                      <QuantityInput value={0} min={0} max={500} onChange={() => {}} />
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-6">
            <Button variant="cta" size="cta" className="w-full">
              Add to Quote
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom step tabs */}
      <StepTabs defaultValue="design">
        <StepTabsList>
          <StepTabsTrigger value="design">Design</StepTabsTrigger>
          <StepTabsTrigger value="review">Review</StepTabsTrigger>
          <StepTabsTrigger value="details">Details</StepTabsTrigger>
          <StepTabsTrigger value="submit">Submit Quote</StepTabsTrigger>
        </StepTabsList>
      </StepTabs>
    </div>
  ),
};
