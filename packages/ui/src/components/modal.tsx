'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '../utils';

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnEscape?: boolean;
  closeOnBackdrop?: boolean;
  showCloseButton?: boolean;
}

interface ModalOverlayProps {
  children: React.ReactNode;
  onBackdropClick?: () => void;
  className?: string;
}

interface ModalContentProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  onClose?: () => void;
  showCloseButton?: boolean;
}

interface ModalHeaderProps {
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
  showCloseButton?: boolean;
}

interface ModalBodyProps {
  children: React.ReactNode;
  className?: string;
}

interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

// Modal Overlay
const ModalOverlay = React.forwardRef<HTMLDivElement, ModalOverlayProps>(
  ({ children, onBackdropClick, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm",
        className
      )}
      onClick={onBackdropClick}
      {...props}
    >
      {children}
    </div>
  )
);
ModalOverlay.displayName = "ModalOverlay";

// Modal Content
const ModalContent = React.forwardRef<HTMLDivElement, ModalContentProps>(
  ({ children, className, size = 'md', onClose, showCloseButton = true, ...props }, ref) => {
    const sizeClasses = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      full: 'max-w-full mx-4',
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full bg-white rounded-lg shadow-xl",
          sizeClasses[size],
          className
        )}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        {...props}
      >
        {showCloseButton && onClose && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-1 rounded-sm opacity-70 hover:opacity-100 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-opacity z-10"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        {children}
      </div>
    );
  }
);
ModalContent.displayName = "ModalContent";

// Modal Header
const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("px-6 py-4 border-b border-gray-200", className)}
      {...props}
    >
      {children}
    </div>
  )
);
ModalHeader.displayName = "ModalHeader";

// Modal Body
const ModalBody = React.forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("px-6 py-4", className)}
      {...props}
    >
      {children}
    </div>
  )
);
ModalBody.displayName = "ModalBody";

// Modal Footer
const ModalFooter = React.forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("px-6 py-4 border-t border-gray-200 flex justify-end space-x-2", className)}
      {...props}
    >
      {children}
    </div>
  )
);
ModalFooter.displayName = "ModalFooter";

// Main Modal Component
const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ 
    open,
    onOpenChange,
    children,
    className,
    size = 'md',
    closeOnEscape = true,
    closeOnBackdrop = true,
    showCloseButton = true,
    ...props 
  }, ref) => {
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
      setIsMounted(true);
    }, []);

    React.useEffect(() => {
      if (!open) return;

      const handleEscape = (e: KeyboardEvent) => {
        if (closeOnEscape && e.key === 'Escape') {
          onOpenChange(false);
        }
      };

      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';

      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
      };
    }, [open, closeOnEscape, onOpenChange]);

    if (!isMounted || !open) return null;

    return createPortal(
      <ModalOverlay
        ref={ref}
        onBackdropClick={closeOnBackdrop ? () => onOpenChange(false) : undefined}
        className={className}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === ModalContent) {
            return React.cloneElement(child as React.ReactElement<ModalContentProps>, {
              size,
              onClose: () => onOpenChange(false),
              showCloseButton,
            });
          }
          return child;
        })}
      </ModalOverlay>,
      document.body
    );
  }
);
Modal.displayName = "Modal";

export {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
};