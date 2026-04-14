import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
} from '@print-room-studio/ui';
import {
  buildPlaceholderImage,
  storefrontProducts,
  storefrontServices,
} from '../fixtures/production-data';

const meta: Meta<typeof Card> = {
  title: 'Primitives/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A card component with header, content, and footer sections for grouping related content.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Quote Summary</CardTitle>
        <CardDescription>AS Colour Staple Tee, black, 72 units.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span>Front print</span>
            <span>2-colour screen print</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Dispatch</span>
            <span>Wellington</span>
          </div>
          <div className="flex items-center justify-between font-semibold">
            <span>Total</span>
            <span>$1,728.00 NZD</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button>Review artwork</Button>
      </CardFooter>
    </Card>
  ),
};

export const Simple: Story = {
  render: () => (
    <Card className="w-[350px] p-6">
      <div className="space-y-1">
        <p className="font-medium">Production update</p>
        <p className="text-sm text-muted-foreground">
          Embroidery approval received. Caps are booked for stitching tomorrow morning.
        </p>
      </div>
    </Card>
  ),
};

export const WithHeaderOnly: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Product Details</CardTitle>
        <CardDescription>Continental Hoodie selected for a retail launch run.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm">
            <strong>Name:</strong> Continental Hoodie
          </p>
          <p className="text-sm">
            <strong>Price:</strong> $58.00 NZD
          </p>
          <p className="text-sm">
            <strong>Stock:</strong> 124 units ready to quote
          </p>
        </div>
      </CardContent>
    </Card>
  ),
};

export const WithFooterActions: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Approve Quote</CardTitle>
        <CardDescription>Send this job to production and lock the artwork proof.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          This will confirm garment quantities, print placements, and freight selections for the
          current order.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Keep editing</Button>
        <Button>Approve and send</Button>
      </CardFooter>
    </Card>
  ),
};

export const ProductCard: Story = {
  render: () => (
    <Card className="w-[300px] overflow-hidden">
      <img
        src={storefrontProducts[0].imageSrc}
        alt={storefrontProducts[0].title}
        className="h-48 w-full object-cover"
      />
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{storefrontProducts[0].title}</CardTitle>
        <CardDescription>{storefrontProducts[0].vendor}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-2xl font-bold">{storefrontProducts[0].price}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Request a quote</Button>
      </CardFooter>
    </Card>
  ),
};

export const CardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {storefrontServices.slice(0, 3).map((service) => (
        <Card key={service.key} className="w-[250px] overflow-hidden">
          <img
            src={buildPlaceholderImage(service.title, 'FBFBF6', '2B3990')}
            alt={service.title}
            className="h-32 w-full object-cover"
          />
          <CardHeader>
            <CardTitle>{service.title}</CardTitle>
            <CardDescription>{service.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium text-primary">{service.ctaLabel}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
