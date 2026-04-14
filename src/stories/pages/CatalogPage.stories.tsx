import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  GlobalHeader,
  FilterButtons,
  ProductCard,
  CatalogPagination,
} from '@print-room-studio/ui';

const meta: Meta = {
  title: 'Pages/CatalogPage',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Full page composition: Catalog page matching Figma node 2:2. GlobalHeader + icon-only filters + ProductCard grid (catalog layout) + CatalogPagination.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const products = [
  { title: 'AS Colour Staple Tee', imageSrc: 'https://placehold.co/400x400/f1f5f9/475569?text=Staple+Tee' },
  { title: 'Continental Hoodie', imageSrc: 'https://placehold.co/400x400/f1f5f9/475569?text=Hoodie' },
  { title: 'Stanley/Stella Creator 2.0', imageSrc: 'https://placehold.co/400x400/f1f5f9/475569?text=Creator' },
  { title: 'Earth Positive Classic', imageSrc: 'https://placehold.co/400x400/f1f5f9/475569?text=Classic' },
  { title: 'AS Colour Heavy Tee', imageSrc: 'https://placehold.co/400x400/f1f5f9/475569?text=Heavy+Tee' },
  { title: 'Gildan Ultra Cotton', imageSrc: 'https://placehold.co/400x400/f1f5f9/475569?text=Ultra' },
  { title: 'Bella+Canvas 3001', imageSrc: 'https://placehold.co/400x400/f1f5f9/475569?text=3001' },
  { title: 'Next Level Apparel', imageSrc: 'https://placehold.co/400x400/f1f5f9/475569?text=NLA' },
];

export const Default: Story = {
  render: () => {
    const CatalogPageDemo = () => {
      const [page, setPage] = useState(1);
      return (
        <div className="min-h-screen bg-background">
          <GlobalHeader subtitle="Studio" />
          <div className="px-6 py-4">
            <div className="mb-6">
              <FilterButtons
                filters={[
                  { label: 'All', value: 'all' },
                  { label: 'T-Shirts', value: 'tshirts' },
                  { label: 'Hoodies', value: 'hoodies' },
                  { label: 'Accessories', value: 'accessories' },
                ]}
                value="all"
                onValueChange={() => {}}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mb-8">
              {products.map((p) => (
                <ProductCard key={p.title} {...p} layout="catalog" />
              ))}
            </div>
            <CatalogPagination
              currentPage={page}
              totalPages={4}
              onPrevious={() => setPage((prev) => Math.max(1, prev - 1))}
              onNext={() => setPage((prev) => Math.min(4, prev + 1))}
            />
          </div>
        </div>
      );
    };
    return <CatalogPageDemo />;
  },
};
