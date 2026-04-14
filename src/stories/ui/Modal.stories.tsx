import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Label,
} from '@print-room-studio/ui';

const meta: Meta<typeof Modal> = {
  title: 'Primitives/Modal',
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
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal open={open} onOpenChange={setOpen}>
        <ModalContent>
          <ModalHeader>
            <h2 className="text-lg font-semibold">Modal Title</h2>
          </ModalHeader>
          <ModalBody>
            <p>This is the modal content. You can put any content here.</p>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
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
      <Button onClick={() => setOpen(true)}>Open Small Modal</Button>
      <Modal open={open} onOpenChange={setOpen} size="sm">
        <ModalContent>
          <ModalHeader>
            <h2 className="text-lg font-semibold">Small Modal</h2>
          </ModalHeader>
          <ModalBody>
            <p>This is a small modal with limited width.</p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
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
      <Button onClick={() => setOpen(true)}>Open Large Modal</Button>
      <Modal open={open} onOpenChange={setOpen} size="lg">
        <ModalContent>
          <ModalHeader>
            <h2 className="text-lg font-semibold">Large Modal</h2>
          </ModalHeader>
          <ModalBody>
            <p>
              This is a large modal with more width for displaying detailed
              content or forms.
            </p>
            <p className="mt-4 text-muted-foreground">
              Large modals are useful for complex forms, detailed information,
              or when you need more horizontal space.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
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
        Delete Item
      </Button>
      <Modal open={open} onOpenChange={setOpen} size="sm">
        <ModalContent>
          <ModalHeader>
            <h2 className="text-lg font-semibold">Confirm Deletion</h2>
          </ModalHeader>
          <ModalBody>
            <p className="text-muted-foreground">
              Are you sure you want to delete this item? This action cannot be
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
  return (
    <>
      <Button onClick={() => setOpen(true)}>Add New Product</Button>
      <Modal open={open} onOpenChange={setOpen} size="md">
        <ModalContent>
          <ModalHeader>
            <h2 className="text-lg font-semibold">Add New Product</h2>
          </ModalHeader>
          <ModalBody>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product-name">Product Name</Label>
                <Input id="product-name" placeholder="Enter product name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-sku">SKU</Label>
                <Input id="product-sku" placeholder="Enter SKU" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-price">Price</Label>
                <Input
                  id="product-price"
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Add Product</Button>
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
      <Button onClick={() => setOpen(true)}>Open Modal (No Close Button)</Button>
      <Modal
        open={open}
        onOpenChange={setOpen}
        showCloseButton={false}
        closeOnBackdrop={false}
      >
        <ModalContent>
          <ModalHeader>
            <h2 className="text-lg font-semibold">Important Notice</h2>
          </ModalHeader>
          <ModalBody>
            <p>
              This modal can only be closed using the button below. The X button
              and backdrop click are disabled.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setOpen(false)}>I Understand</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export const NoCloseButton: Story = {
  render: () => <NoCloseButtonExample />,
};
