import React from "react";

export interface ProductSwatch {
  id: string;
  label: string;
  hex: string;
}

type Props = {
  swatches: ProductSwatch[];
  value?: string | null;
  onChange: (colorId: string) => void;
  disabled?: boolean;
};

export const ColorSwatches: React.FC<Props> = ({ swatches, value, onChange, disabled }) => {
  if (!swatches?.length) {
    return (
      <div className="text-sm text-gray-500">
        No colors available for this product.
      </div>
    );
  }

  return (
    <div role="radiogroup" aria-label="Select product color" className="flex flex-wrap gap-1.5 sm:gap-2">
      {swatches.map((sw) => {
        const isSelected = value === sw.id;
        return (
          <button
            key={sw.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={`Select color ${sw.label} ${sw.hex}`}
            className="transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full"
            data-selected={isSelected ? "true" : "false"}
            disabled={disabled}
            onClick={() => onChange(sw.id)}
            style={{
              backgroundColor: sw.hex,
              borderColor: isSelected ? "rgb(59, 130, 246)" : "rgb(229, 231, 235)",
              boxShadow: isSelected ? "rgba(59, 130, 246, 0.4) 0 0 0 2px" : "rgba(156, 163, 175, 0) 0 0 0 0",
              transform: isSelected ? "scale(1.1)" : "none",
              width: 32,
              height: 32,
              borderWidth: 2,
              borderStyle: "solid",
              borderRadius: "9999px",
              cursor: disabled ? "not-allowed" : "pointer",
              opacity: disabled ? 0.5 : 1,
            }}
            title={sw.label}
          />
        );
      })}
    </div>
  );
};
