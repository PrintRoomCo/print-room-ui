import React, { memo } from 'react';
import {
  AlertTriangle,
  Check,
  Flame,
  Lock,
  Printer,
  Scissors,
  Star,
} from 'lucide-react';

export type PrintMethod = 'screen' | 'heat' | 'embroidery';

export interface MethodLockReason {
  type: string;
  badge?: string;
}

export interface MethodValidationResult {
  id: PrintMethod;
  label: string;
  description: string;
  moq: number;
  isLocked: boolean;
  isRecommended?: boolean;
  lockReason?: string;
  lockAction?: string;
  lockReasons: MethodLockReason[];
}

export interface MethodCardProps {
  method: MethodValidationResult;
  selected: boolean;
  onSelect: () => void;
  showHelpLink?: boolean;
  compact?: boolean;
  className?: string;
}

const METHOD_ICONS: Record<PrintMethod, React.ComponentType<{ className?: string }>> = {
  screen: Printer,
  heat: Flame,
  embroidery: Scissors,
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'default';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    success: 'border-green-200 bg-green-100 text-green-800',
    warning: 'border-amber-200 bg-amber-100 text-amber-800',
    error: 'border-red-200 bg-red-100 text-red-800',
    info: 'border-blue-200 bg-blue-100 text-blue-800',
    default: 'border-gray-200 bg-gray-100 text-gray-700',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export const MethodCard: React.FC<MethodCardProps> = memo(function MethodCard({
  method,
  selected,
  onSelect,
  compact = false,
  className = '',
}) {
  const Icon = METHOD_ICONS[method.id];
  const isDisabled = method.isLocked;

  const cardClasses = [
    'relative rounded-xl border-2 transition-all duration-200',
    compact ? 'p-3' : 'p-4',
    isDisabled && 'cursor-not-allowed bg-gray-50 opacity-60',
    !isDisabled && selected && 'border-[#2B3990] bg-blue-50 ring-2 ring-blue-200',
    !isDisabled && !selected && 'border-gray-200 bg-white hover:border-blue-300 hover:bg-gray-50 cursor-pointer',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      role="radio"
      aria-checked={selected}
      aria-disabled={isDisabled}
      tabIndex={isDisabled ? -1 : 0}
      onClick={isDisabled ? undefined : onSelect}
      onKeyDown={(event) => {
        if (!isDisabled && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault();
          onSelect();
        }
      }}
      className={cardClasses}
    >
      {isDisabled ? (
        <div className="absolute right-3 top-3">
          <Lock className="h-4 w-4 text-gray-400" />
        </div>
      ) : null}

      {!isDisabled && selected ? (
        <div className="absolute right-3 top-3">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2B3990]">
            <Check className="h-3 w-3 text-white" />
          </div>
        </div>
      ) : null}

      {method.isRecommended && !isDisabled ? (
        <div className="absolute -top-2 left-3">
          <Badge variant="info" className="shadow-sm">
            <Star className="mr-1 h-3 w-3" />
            Recommended
          </Badge>
        </div>
      ) : null}

      <div className="flex items-start gap-3 pr-6">
        <div
          className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${
            isDisabled ? 'bg-gray-200 text-gray-400' : 'bg-[#2B3990]/10 text-[#2B3990]'
          }`}
        >
          <Icon className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className={`text-base font-medium ${isDisabled ? 'text-gray-500' : 'text-gray-900'}`}>
              {method.label}
            </h3>
            {method.moq > 1 ? <Badge>{`MOQ ${method.moq}`}</Badge> : null}
          </div>

          {!compact ? (
            <p className={`mt-1 text-sm ${isDisabled ? 'text-gray-400' : 'text-gray-600'}`}>
              {method.description}
            </p>
          ) : null}

          {isDisabled && method.lockReason ? (
            <div className="mt-2 flex items-start gap-2 rounded-lg border border-amber-100 bg-amber-50 px-3 py-2 text-sm">
              <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500" />
              <div className="flex-1">
                <span className="font-medium text-amber-800">{method.lockReason}</span>
                {method.lockAction ? (
                  <span className="mt-0.5 block text-xs text-amber-600">{method.lockAction}</span>
                ) : null}
              </div>
            </div>
          ) : null}

          {isDisabled && method.lockReasons.length > 1 ? (
            <div className="mt-2 flex flex-wrap gap-1">
              {method.lockReasons.slice(1).map((reason, index) => (
                <Badge key={`${reason.type}-${index}`} variant="warning">
                  {reason.badge || reason.type}
                </Badge>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
});

export default MethodCard;
