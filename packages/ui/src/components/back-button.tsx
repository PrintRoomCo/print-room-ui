'use client';

import * as React from 'react';
import { ChevronLeft } from 'lucide-react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { buttonVariants } from './button';
import { cn } from '../utils';

export interface BackButtonProps extends HTMLMotionProps<'button'> {
  label?: string;
}

const BackButton = React.forwardRef<HTMLButtonElement, BackButtonProps>(
  ({ className, label = 'Back', ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'group',
          className
        )}
        whileHover={{ scale: 1.05, x: -2 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        {...props}
      >
        <ChevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
        {label}
      </motion.button>
    );
  }
);

BackButton.displayName = 'BackButton';

export { BackButton }; 