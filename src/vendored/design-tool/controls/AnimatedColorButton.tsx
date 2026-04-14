import React from 'react';
import { motion } from 'framer-motion';
import styles from './ProductCustomizer.module.css';

interface AnimatedColorButtonProps {
  colorHex: string;
  isSelected: boolean;
  onClick: () => void;
}

const AnimatedColorButton: React.FC<AnimatedColorButtonProps> = ({
  colorHex,
  isSelected,
  onClick,
}) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={`Select color ${colorHex}`}
      className={styles.colorButton}
      style={{ backgroundColor: colorHex }}
      data-selected={isSelected}
      initial={false}
      animate={
        isSelected
          ? {
              scale: 1.1,
              borderColor: '#9CA3AF',
              boxShadow: [
                '0 0 0 0px rgba(156, 163, 175, 0)',
                '0 0 0 4px rgba(156, 163, 175, 0.2)',
                '0 0 0 2px rgba(156, 163, 175, 0.4)',
              ],
            }
          : {
              scale: 1,
              borderColor: '#E5E7EB',
              boxShadow: '0 0 0 0px rgba(156, 163, 175, 0)',
            }
      }
      whileHover={{
        scale: isSelected ? 1.1 : 1.05,
        transition: { duration: 0.2 },
      }}
      whileTap={{
        scale: 0.95,
      }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 30,
        boxShadow: {
          duration: 0.4,
          times: [0, 0.5, 1],
        },
      }}
    />
  );
};

export default AnimatedColorButton;
