import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

/* ── Inlined types ── */

export interface FilterItem {
  id: string;
  label: string;
}

export interface ItemFiltersProps {
  /** Currently selected filter IDs */
  selectedFilters?: string[];
  /** Called when filters change */
  onFiltersChange: (filters: string[]) => void;
  /** Override the default filter items */
  filters?: FilterItem[];
}

export interface SupplierFilterProps {
  /** Currently selected supplier value */
  selectedOption?: string;
  /** Called when selection changes */
  onOptionChange: (option: string) => void;
  /** Override the default supplier options */
  options?: { value: string; label: string }[];
}

/* ── Default data (Print Room product types) ── */

const DEFAULT_FILTERS: FilterItem[] = [
  { id: 't_shirt', label: 'T-Shirt' },
  { id: 'hood', label: 'Hood' },
  { id: 'hat', label: 'Cap' },
  { id: 'crew_neck', label: 'Crew' },
  { id: 'tote_bag', label: 'Tote' },
  { id: 'tea_towel', label: 'Tea Towel' },
];

const DEFAULT_SUPPLIER_OPTIONS = [
  { value: 'as-colour', label: 'AS Colour' },
  { value: 'stanley-stella', label: 'Stanley/Stella' },
  { value: 'all', label: 'All Suppliers' },
];

/**
 * Dropdown filter for product types.
 * Allows toggling multiple filters on/off.
 */
export function ItemFilters({
  selectedFilters = [],
  onFiltersChange,
  filters: customFilters,
}: ItemFiltersProps) {
  const displayFilters = customFilters ?? DEFAULT_FILTERS;
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set(selectedFilters));
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveFilters(new Set(selectedFilters));
  }, [selectedFilters]);

  const toggleFilter = (filterId: string) => {
    const newFilters = new Set(activeFilters);
    if (newFilters.has(filterId)) {
      newFilters.delete(filterId);
    } else {
      newFilters.add(filterId);
    }
    setActiveFilters(newFilters);
    onFiltersChange(Array.from(newFilters));
  };

  const getButtonLabel = () => {
    if (activeFilters.size === 0) return 'All Products';
    const selectedLabels = displayFilters
      .filter((f) => activeFilters.has(f.id))
      .map((f) => f.label);
    if (selectedLabels.length > 2) return `${selectedLabels.length} selected`;
    return selectedLabels.join(', ');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-full shadow-sm border border-black/10 hover:bg-gray-50 transition-colors h-[44px]"
      >
        <span className="text-xs font-medium text-gray-700">{getButtonLabel()}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 left-0 bg-white rounded-lg shadow-lg border border-black/10 py-1 min-w-[200px] z-10">
          {displayFilters.map((filter) => {
            const isActive = activeFilters.has(filter.id);
            return (
              <button
                key={filter.id}
                onClick={() => toggleFilter(filter.id)}
                className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center justify-between ${
                  isActive ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'
                }`}
                aria-label={`Filter by ${filter.label}`}
                aria-pressed={isActive}
              >
                <span>{filter.label}</span>
                {isActive && (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/**
 * Dropdown filter for supplier/brand selection.
 */
export function SupplierFilter({
  selectedOption = 'all',
  onOptionChange,
  options: customOptions,
}: SupplierFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const options = customOptions ?? DEFAULT_SUPPLIER_OPTIONS;

  const handleSelect = (value: string) => {
    onOptionChange(value);
    setIsOpen(false);
  };

  const selectedLabel =
    options.find((opt) => opt.value === selectedOption)?.label || 'Select Supplier';

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-full shadow-sm border border-black/10 hover:bg-gray-50 transition-colors h-[44px]"
      >
        <span className="text-xs font-medium text-gray-700">{selectedLabel}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg border border-black/10 py-1 min-w-[180px] z-10">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                selectedOption === option.value
                  ? 'bg-primary/10 text-primary'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
