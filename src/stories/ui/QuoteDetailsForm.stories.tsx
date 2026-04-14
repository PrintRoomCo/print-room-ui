import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { QuoteDetailsForm, type QuoteFormData } from '@print-room-studio/ui';

const defaultFormData: QuoteFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  businessName: '',
  shippingAddress: '',
  invoiceAddress: '',
  shippingCountry: '',
  freightOption: 'sea',
};

const filledFormData: QuoteFormData = {
  firstName: 'Jamie',
  lastName: 'Smith',
  email: 'jamie@printroom.nz',
  phone: '+64 21 555 1234',
  businessName: 'The Print Room NZ',
  shippingAddress: '123 Cuba Street\nWellington 6011\nNew Zealand',
  invoiceAddress: 'PO Box 456\nWellington 6140',
  shippingCountry: 'NZ',
  freightOption: 'air',
};

const meta: Meta<typeof QuoteDetailsForm> = {
  title: 'App/Quoting/QuoteDetailsForm',
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
  render: () => <InteractiveForm initialData={filledFormData} />,
  parameters: {
    docs: {
      description: {
        story: 'Form pre-populated with sample customer data, as it would appear when editing an existing quote.',
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
        ...filledFormData,
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
        ...filledFormData,
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
