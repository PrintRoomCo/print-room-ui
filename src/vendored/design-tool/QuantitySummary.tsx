import React from 'react';
import { Info } from 'lucide-react';

interface QuantitySummaryProps {
  quantity: number;
  onEdit?: () => void;
  readOnly?: boolean;
}

export function QuantitySummary({
  quantity,
  onEdit,
  readOnly = false,
}: QuantitySummaryProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary">
          <Info className="h-3 w-3 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-700">Quantity</h3>
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Total Units</span>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-gray-900">{quantity}</span>
            {!readOnly && onEdit ? (
              <button
                onClick={onEdit}
                className="text-sm text-primary underline transition-colors hover:opacity-80"
                aria-label="Edit quantity"
                type="button"
              >
                Edit
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <p className="text-xs italic text-gray-500">
        This product does not require size selection.
      </p>
    </div>
  );
}

export default QuantitySummary;
