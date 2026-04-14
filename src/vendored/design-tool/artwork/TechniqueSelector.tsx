import React, { useEffect, useMemo, useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Lock } from 'lucide-react';

/* ── Inlined types ── */

export type ArtworkFileCategory = 'vector' | 'raster' | 'unknown';

export type TechniqueId =
  | 'hybrid-digital-print'
  | 'screen-print'
  | 'puff-screen-print'
  | 'embroidery'
  | '3d-embroidery'
  | 'reflective-heat-transfer'
  | 'dtf-digital-transfer'
  | 'dtg-digital-print';

export interface TechniqueConfig {
  id: TechniqueId;
  label: string;
  description: string;
  imageUrl?: string;
  thumbnailUrl?: string;
  printMethod: 'screen' | 'heat' | 'embroidery';
}

export interface ValidatedTechnique {
  id: TechniqueId;
  isLocked: boolean;
  lockReason?: string;
}

/* ── Default technique configs (real Print Room data) ── */

const TECHNIQUE_CONFIGS: Record<TechniqueId, TechniqueConfig> = {
  'screen-print': {
    id: 'screen-print',
    label: 'Screen Print',
    description: 'Our most popular method — bold, durable prints ideal for larger runs.',
    printMethod: 'screen',
  },
  'puff-screen-print': {
    id: 'puff-screen-print',
    label: 'Puff Screen Print',
    description: 'Raised, textured screen print for a premium 3D feel.',
    printMethod: 'screen',
  },
  'embroidery': {
    id: 'embroidery',
    label: 'Embroidery',
    description: 'Stitched finish for caps, polos, and premium corporate apparel.',
    printMethod: 'embroidery',
  },
  '3d-embroidery': {
    id: '3d-embroidery',
    label: '3D Puff Embroidery',
    description: 'Raised foam embroidery that adds dimension and texture.',
    printMethod: 'embroidery',
  },
  'dtf-digital-transfer': {
    id: 'dtf-digital-transfer',
    label: 'DTF Digital Transfer',
    description: 'Full-colour heat transfers with fine detail — great for short runs.',
    printMethod: 'heat',
  },
  'dtg-digital-print': {
    id: 'dtg-digital-print',
    label: 'DTG Digital Print',
    description: 'Direct-to-garment inkjet printing for photographic artwork.',
    printMethod: 'heat',
  },
  'hybrid-digital-print': {
    id: 'hybrid-digital-print',
    label: 'Hybrid Digital Print',
    description: 'Combines screen and digital for vibrant results at mid-volume.',
    printMethod: 'heat',
  },
  'reflective-heat-transfer': {
    id: 'reflective-heat-transfer',
    label: 'Reflective Heat Transfer',
    description: 'Hi-vis reflective transfers for workwear and safety apparel.',
    printMethod: 'heat',
  },
};

function getTechniqueConfig(id: TechniqueId): TechniqueConfig {
  return TECHNIQUE_CONFIGS[id];
}

/* ── Inlined animation transition ── */

const transitions = {
  accordion: { type: 'spring' as const, stiffness: 300, damping: 30 },
  dropdown: { duration: 0.15 },
};

/* ── Component props ── */

export type TechniqueSelectorProps = {
  /** Available techniques with lock/unlock state */
  techniques: ValidatedTechnique[];
  /** Currently selected technique ID */
  selectedTechnique?: TechniqueId;
  /** Called when a technique is selected */
  onSelect: (techniqueId: TechniqueId) => void;
  /** Optional handler to open techniques guide */
  onOpenGuide?: () => void;
  /** Whether the selector is disabled */
  disabled?: boolean;
  /** Label prefix, e.g. "Front" or "Back" */
  placement?: string;
  /** Signal to programmatically open the dropdown */
  externalOpenSignal?: number | null;
};

export function TechniqueSelector({
  techniques,
  selectedTechnique,
  onSelect,
  onOpenGuide,
  disabled = false,
  placement = 'Front',
  externalOpenSignal,
}: TechniqueSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedConfig = useMemo(
    () => (selectedTechnique ? getTechniqueConfig(selectedTechnique) : null),
    [selectedTechnique],
  );

  useEffect(() => {
    if (!externalOpenSignal || disabled) return;
    setIsOpen(true);
  }, [disabled, externalOpenSignal]);

  const handleSelect = (id: TechniqueId) => {
    onSelect(id);
    setIsOpen(false);
  };

  return (
    <motion.div layout transition={transitions.accordion} className="space-y-2">
      <div className="flex flex-nowrap items-center justify-between">
        <p className="text-sm font-semibold text-neutral-900">
          {placement} Artwork Technique<span className="text-red-500">*</span>
        </p>
        {onOpenGuide && (
          <button
            type="button"
            onClick={onOpenGuide}
            className="text-sm text-neutral-900 underline opacity-60 transition-opacity hover:opacity-100"
          >
            Techniques Guide
          </button>
        )}
      </div>

      <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenu.Trigger asChild>
          <button
            type="button"
            disabled={disabled}
            className={`flex h-9 w-full items-center justify-between gap-4 rounded-lg border bg-white px-3 py-2.5 text-sm text-neutral-900 transition-colors ${
              isOpen ? 'border-neutral-900 ring-1 ring-neutral-900' : 'border-neutral-300'
            } ${disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer hover:border-neutral-400'}`}
          >
            <span className={`truncate text-left ${selectedConfig ? 'text-neutral-900' : 'text-neutral-500'}`}>
              {selectedConfig ? selectedConfig.label : 'Select your technique'}
            </span>
            <ChevronDown
              className={`h-4 w-4 shrink-0 text-neutral-700 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <AnimatePresence>
            {isOpen && (
              <DropdownMenu.Content forceMount sideOffset={6} align="start" asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -4 }}
                  transition={transitions.dropdown}
                  className="z-50 max-h-[min(420px,var(--radix-dropdown-menu-content-available-height))] w-[var(--radix-dropdown-menu-trigger-width)] overflow-y-auto rounded-lg border border-neutral-900 bg-white shadow-md"
                >
                  {techniques.map((technique) => {
                    const isSelected = selectedTechnique === technique.id;
                    const isLocked = technique.isLocked;
                    const config = getTechniqueConfig(technique.id);
                    const thumbnail = config.thumbnailUrl ?? config.imageUrl;

                    return (
                      <DropdownMenu.Item key={technique.id} asChild disabled={isLocked}>
                        <button
                          type="button"
                          disabled={isLocked}
                          onClick={() => handleSelect(technique.id)}
                          className={`flex w-full cursor-pointer items-start gap-3 p-4 text-left ${
                            isLocked
                              ? 'cursor-not-allowed opacity-45'
                              : isSelected
                                ? 'bg-neutral-50'
                                : 'hover:bg-neutral-100'
                          }`}
                        >
                          <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-neutral-200">
                            {thumbnail ? (
                              <img src={thumbnail} alt={config.label} className="h-full w-full object-cover" />
                            ) : (
                              <div className="h-full w-full bg-neutral-200" />
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              <p className="text-sm font-medium text-neutral-900">{config.label}</p>
                              {isLocked && <Lock className="h-3.5 w-3.5 text-neutral-400" />}
                            </div>
                            <p className="mt-0.5 text-xs leading-relaxed text-neutral-500">
                              {config.description}
                            </p>
                            {isLocked && technique.lockReason && (
                              <p className="mt-1 text-xs leading-relaxed text-neutral-500">
                                {technique.lockReason}
                              </p>
                            )}
                          </div>
                        </button>
                      </DropdownMenu.Item>
                    );
                  })}
                </motion.div>
              </DropdownMenu.Content>
            )}
          </AnimatePresence>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </motion.div>
  );
}

export default TechniqueSelector;
