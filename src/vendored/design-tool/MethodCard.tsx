import React, { memo } from 'react';
import {
  AlertTriangle,
  Check,
  ExternalLink,
  Flame,
  HelpCircle,
  Lock,
  Printer,
  Scissors,
  Star,
} from 'lucide-react';

/* ── Inlined types ── */

export type PrintMethod = 'screen' | 'heat' | 'embroidery';

export interface MethodLockReason {
  type: string;
  badge?: string;
}

export interface MethodBadge {
  id: string;
  label: string;
  icon?: string;
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
  warnings: string[];
  badges: MethodBadge[];
  maxColors?: number | string;
  maxSize?: string;
  helpLink?: string;
}

export interface MethodCardProps {
  method: MethodValidationResult;
  selected: boolean;
  onSelect: () => void;
  showHelpLink?: boolean;
  compact?: boolean;
  className?: string;
}

/* ── Icons ── */

const METHOD_ICONS: Record<PrintMethod, React.ComponentType<{ className?: string }>> = {
  screen: Printer,
  heat: Flame,
  embroidery: Scissors,
};

/* ── Badge helper ── */

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'default';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    success: 'bg-green-100 text-green-800 border-green-200',
    warning: 'bg-amber-100 text-amber-800 border-amber-200',
    error: 'bg-red-100 text-red-800 border-red-200',
    info: 'bg-blue-100 text-blue-800 border-blue-200',
    default: 'bg-gray-100 text-gray-700 border-gray-200',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

/* ── MethodCard ── */

export const MethodCard: React.FC<MethodCardProps> = memo(function MethodCard({
  method,
  selected,
  onSelect,
  showHelpLink = true,
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
    !isDisabled &&
      !selected &&
      'border-gray-200 bg-white hover:border-blue-300 hover:bg-gray-50 cursor-pointer',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      role="radio"
      aria-checked={selected ? 'true' : 'false'}
      aria-disabled={isDisabled ? 'true' : 'false'}
      tabIndex={isDisabled ? -1 : 0}
      onClick={isDisabled ? undefined : onSelect}
      onKeyDown={(e) => {
        if (!isDisabled && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onSelect();
        }
      }}
      className={cardClasses}
    >
      {/* Lock icon overlay */}
      {isDisabled && (
        <div className="absolute right-3 top-3">
          <Lock className="h-4 w-4 text-gray-400" />
        </div>
      )}

      {/* Selected checkmark */}
      {!isDisabled && selected && (
        <div className="absolute right-3 top-3">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2B3990]">
            <Check className="h-3 w-3 text-white" />
          </div>
        </div>
      )}

      {/* Recommended badge */}
      {method.isRecommended && !isDisabled && (
        <div className="absolute -top-2 left-3">
          <Badge variant="info" className="shadow-sm">
            <Star className="mr-1 h-3 w-3" />
            Recommended
          </Badge>
        </div>
      )}

      {/* Main content */}
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
            <h3
              className={`text-base font-medium ${isDisabled ? 'text-gray-500' : 'text-gray-900'}`}
            >
              {method.label}
            </h3>

            {/* MOQ Badge — uses warning variant when lock is MOQ-related */}
            {method.moq > 1 && (
              <Badge
                variant={
                  isDisabled && method.lockReasons.some((r) => r.type === 'moq')
                    ? 'warning'
                    : 'default'
                }
              >
                MOQ {method.moq}
              </Badge>
            )}
          </div>

          {/* Description */}
          {!compact && (
            <p className={`mt-1 text-sm ${isDisabled ? 'text-gray-400' : 'text-gray-600'}`}>
              {method.description}
            </p>
          )}

          {/* Lock reason message with action */}
          {isDisabled && method.lockReason && (
            <div className="mt-2 flex items-start gap-2 rounded-lg border border-amber-100 bg-amber-50 px-3 py-2 text-sm">
              <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500" />
              <div className="flex-1">
                <span className="font-medium text-amber-800">{method.lockReason}</span>
                {method.lockAction && (
                  <span className="mt-0.5 block text-xs text-amber-600">{method.lockAction}</span>
                )}
              </div>
            </div>
          )}

          {/* Lock badges (compact display of additional lock reasons) */}
          {isDisabled && method.lockReasons.length > 1 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {method.lockReasons.slice(1).map((reason, idx) => (
                <Badge key={`${reason.type}-${idx}`} variant="warning">
                  {reason.badge || reason.type}
                </Badge>
              ))}
            </div>
          )}

          {/* Warnings (when not locked) */}
          {!isDisabled && method.warnings.length > 0 && !compact && (
            <div className="mt-2 space-y-1">
              {method.warnings.slice(0, 2).map((warning, idx) => (
                <p key={idx} className="flex items-center gap-1 text-xs text-amber-600">
                  <AlertTriangle className="h-3 w-3" />
                  {warning}
                </p>
              ))}
            </div>
          )}

          {/* Sustainability badges (when unlocked) */}
          {!isDisabled && method.badges.length > 0 && !compact && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {method.badges.map((badge) => (
                <Badge key={badge.id} variant="success">
                  {badge.icon && <span className="mr-1">{badge.icon}</span>}
                  {badge.label}
                </Badge>
              ))}
            </div>
          )}

          {/* Specs row */}
          {!compact && (
            <div className="mt-3 flex items-center gap-3 text-xs text-gray-500">
              {method.maxColors && (
                <span>
                  {typeof method.maxColors === 'number'
                    ? `Up to ${method.maxColors} colors`
                    : method.maxColors}
                </span>
              )}
              {method.maxSize && (
                <>
                  <span className="text-gray-300">&middot;</span>
                  <span>Max {method.maxSize}</span>
                </>
              )}
              {showHelpLink && method.helpLink && (
                <>
                  <span className="text-gray-300">&middot;</span>
                  <a
                    href={method.helpLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    <HelpCircle className="mr-1 h-3 w-3" />
                    Learn more
                    <ExternalLink className="ml-0.5 h-3 w-3" />
                  </a>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

MethodCard.displayName = 'MethodCard';

/* ── MethodCardGroup ── */

export interface MethodCardGroupProps {
  methods: MethodValidationResult[];
  value?: PrintMethod;
  onChange: (methodId: PrintMethod) => void;
  gap?: 'sm' | 'md' | 'lg';
  compact?: boolean;
  className?: string;
}

export const MethodCardGroup: React.FC<MethodCardGroupProps> = memo(function MethodCardGroup({
  methods,
  value,
  onChange,
  gap = 'md',
  compact = false,
  className = '',
}) {
  const gapClasses = { sm: 'gap-2', md: 'gap-3', lg: 'gap-4' };

  return (
    <div
      role="radiogroup"
      aria-label="Select decoration method"
      className={`grid ${gapClasses[gap]} ${className}`}
    >
      {methods.map((method) => (
        <MethodCard
          key={method.id}
          method={method}
          selected={value === method.id}
          onSelect={() => onChange(method.id)}
          compact={compact}
        />
      ))}
    </div>
  );
});

MethodCardGroup.displayName = 'MethodCardGroup';

export default MethodCard;
