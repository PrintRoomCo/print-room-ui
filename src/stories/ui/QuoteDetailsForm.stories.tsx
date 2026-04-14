import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  QuoteDetailsForm,
  type QuoteFormData,
} from '@print-room-studio/ui';
import { auQuoteDetails, nzQuoteDetails } from '../fixtures/production-data';

const defaultFormData: QuoteFormData = {
  ...nzQuoteDetails,
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  businessName: '',
  shippingAddress: '',
  invoiceAddress: '',
  shippingCountry: '',
};

const meta: Meta<typeof QuoteDetailsForm> = {
  title: 'Storefront/QuoteDetailsForm',
  component: QuoteDetailsForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A two-column form for collecting customer quote details including contact info, shipping address, and freight options. Uses Framer Motion for staggered field animations.',
      },
    },
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Custom className for the form container',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive wrapper with state management
const InteractiveForm = ({ initialData = defaultFormData, className }: { initialData?: QuoteFormData; className?: string }) => {
  const [data, setData] = useState<QuoteFormData>(initialData);

  const handleChange = (field: keyof QuoteFormData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  return <QuoteDetailsForm data={data} onChange={handleChange} className={className} />;
};

export const Default: Story = {
  render: () => <InteractiveForm />,
  parameters: {
    docs: {
      description: {
        story: 'Empty form ready for customer input. Fields are arranged in a two-column layout on desktop.',
      },
    },
  },
};

export const PreFilled: Story = {
  render: () => <InteractiveForm initialData={nzQuoteDetails} />,
  parameters: {
    docs: {
      description: {
        story: 'A realistic New Zealand quote request based on the Shopify modal flow.',
      },
    },
  },
};

export const CustomStyling: Story = {
  render: () => (
    <InteractiveForm className="bg-gray-50 border border-gray-200 rounded-2xl p-6" />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Form with custom container styling via the `className` prop.',
      },
    },
  },
};

export const SeaFreight: Story = {
  render: () => (
    <InteractiveForm
      initialData={{
        ...auQuoteDetails,
        freightOption: 'sea',
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Quote configured with sea freight option selected.',
      },
    },
  },
};

export const AirFreight: Story = {
  render: () => (
    <InteractiveForm
      initialData={{
        ...nzQuoteDetails,
        freightOption: 'air',
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Quote configured with air freight option selected.',
      },
    },
  },
};

export const InQuoteRequestModal: Story = {
  render: () => (
    <div className="w-full max-w-5xl">
      <Modal open onOpenChange={() => undefined} size="xl">
        <ModalContent showCloseButton={false}>
          <ModalHeader>
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold">Request a Quote</h2>
              <p className="text-sm text-muted-foreground">
                Capture contact details, shipping destination, and freight preference before the team prices the job.
              </p>
            </div>
          </ModalHeader>
          <ModalBody>
            <InteractiveForm initialData={nzQuoteDetails} className="bg-transparent p-0 shadow-none" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};
