import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  QuoteDetailsForm,
} from '@print-room-studio/ui';
import { nzQuoteDetails } from '../fixtures/production-data';

const meta: Meta<typeof Modal> = {
  title: 'Storefront/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A modal dialog component with customizable size, header, body, and footer sections.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'The size of the modal',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Close modal when pressing Escape key',
    },
    closeOnBackdrop: {
      control: 'boolean',
      description: 'Close modal when clicking the backdrop',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Show the close button in the modal',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultModalExample = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open branding service</Button>
      <Modal open={open} onOpenChange={setOpen}>
        <ModalContent>
          <ModalHeader>
            <h2 className="text-lg font-semibold">Embroidery</h2>
          </ModalHeader>
          <ModalBody>
            <p>Use this surface for Shopify-aligned service overlays, quote flows, and review steps.</p>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button onClick={() => setOpen(false)}>Get a quote</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: () => <DefaultModalExample />,
};

const SmallModalExample = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open stock alert</Button>
      <Modal open={open} onOpenChange={setOpen} size="sm">
        <ModalContent>
          <ModalHeader>
            <h2 className="text-lg font-semibold">Low stock warning</h2>
          </ModalHeader>
          <ModalBody>
            <p>Stanley/Stella Creator 2.0 is running low in natural raw across sizes S to L.</p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setOpen(false)}>Dismiss</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export const Small: Story = {
  render: () => <SmallModalExample />,
};

const LargeModalExample = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open service brief</Button>
      <Modal open={open} onOpenChange={setOpen} size="lg">
        <ModalContent>
          <ModalHeader>
            <h2 className="text-lg font-semibold">Screen Printing Overview</h2>
          </ModalHeader>
          <ModalBody>
            <p>
              Screen printing is the best-value technique for larger runs with clean spot-colour
              artwork and repeat production.
            </p>
            <p className="mt-4 text-muted-foreground">
              Use this layout for service explainers, quote review steps, or long-form help content
              that needs more reading width.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button onClick={() => setOpen(false)}>Start a quote</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export const Large: Story = {
  render: () => <LargeModalExample />,
};

const ConfirmationDialogExample = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="destructive" onClick={() => setOpen(true)}>
        Delete saved design
      </Button>
      <Modal open={open} onOpenChange={setOpen} size="sm">
        <ModalContent>
          <ModalHeader>
            <h2 className="text-lg font-semibold">Delete saved design</h2>
          </ModalHeader>
          <ModalBody>
            <p className="text-muted-foreground">
              Are you sure you want to delete this saved design? This action cannot be
              undone.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setOpen(false)}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export const ConfirmationDialog: Story = {
  render: () => <ConfirmationDialogExample />,
};

const FormModalExample = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(nzQuoteDetails);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open quote request modal</Button>
      <Modal open={open} onOpenChange={setOpen} size="xl">
        <ModalContent>
          <ModalHeader>
            <h2 className="text-lg font-semibold">Request a Quote</h2>
          </ModalHeader>
          <ModalBody>
            <QuoteDetailsForm
              data={data}
              onChange={(field, value) => setData((prev) => ({ ...prev, [field]: value }))}
              className="bg-transparent p-0 shadow-none"
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Send Request</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export const FormModal: Story = {
  render: () => <FormModalExample />,
};

const NoCloseButtonExample = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open approval gate</Button>
      <Modal
        open={open}
        onOpenChange={setOpen}
        showCloseButton={false}
        closeOnBackdrop={false}
      >
        <ModalContent>
          <ModalHeader>
            <h2 className="text-lg font-semibold">Artwork approval required</h2>
          </ModalHeader>
          <ModalBody>
            <p>
              The production team cannot book this job until the final proof is approved. Backdrop
              click and the close icon are disabled on purpose.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setOpen(false)}>Approve proof</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export const NoCloseButton: Story = {
  render: () => <NoCloseButtonExample />,
};
