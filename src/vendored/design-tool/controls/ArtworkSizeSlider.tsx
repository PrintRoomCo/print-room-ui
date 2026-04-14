import React, { useState, useCallback, useMemo } from 'react';
import styles from './ArtworkSizeSlider.module.css';

/* ── Inlined types ── */

export interface LogoPosition {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  unit?: 'px' | 'percent';
}

export interface ArtworkSizeSliderProps {
  /** Current slider value (0-100 percentage of print area) */
  value?: number;
  /** Minimum slider value (default 10) */
  min?: number;
  /** Maximum slider value (default 100) */
  max?: number;
  /** Callback when size changes */
  onSizeChange?: (size: number) => void;
  /** Print area width in MM (default 200) */
  printAreaMmW?: number;
  /** Print area height in MM (default 200) */
  printAreaMmH?: number;
  /** Artwork aspect ratio — width / height (default 1 = square) */
  artworkAspect?: number;
  /** DPI for px calculations (default 150) */
  dpi?: number;
  /** Additional CSS classes */
  className?: string;
  /** When true, slider is disabled */
  locked?: boolean;
}

/**
 * MM-calibrated artwork size slider from the design tool.
 *
 * Slider range: 0–100% of the print area. Computes bounding box in mm,
 * aspect-fits artwork, and displays real-world dimensions (mm, cm²).
 */
export const ArtworkSizeSlider: React.FC<ArtworkSizeSliderProps> = ({
  value: controlledValue,
  min = 10,
  max = 100,
  onSizeChange,
  printAreaMmW = 200,
  printAreaMmH = 200,
  artworkAspect = 1,
  dpi = 150,
  className = '',
  locked = false,
}) => {
  const [internalValue, setInternalValue] = useState(controlledValue ?? 50);
  const sliderValue = controlledValue ?? internalValue;

  const dimensions = useMemo(() => {
    const s = Math.max(min / 100, Math.min(1, sliderValue / 100));
    const bbox_mm_w = s * printAreaMmW;
    const bbox_mm_h = s * printAreaMmH;
    const bboxAspect = bbox_mm_w / bbox_mm_h;

    let art_mm_w: number;
    let art_mm_h: number;

    if (artworkAspect > bboxAspect) {
      art_mm_w = bbox_mm_w;
      art_mm_h = bbox_mm_w / artworkAspect;
    } else {
      art_mm_h = bbox_mm_h;
      art_mm_w = bbox_mm_h * artworkAspect;
    }

    const area_mm2 = art_mm_w * art_mm_h;
    const area_cm2 = area_mm2 / 100;

    return { art_mm_w, art_mm_h, area_cm2 };
  }, [sliderValue, printAreaMmW, printAreaMmH, artworkAspect, min]);

  const handleSliderChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const size = parseInt(e.target.value);
      setInternalValue(size);
      onSizeChange?.(size);
    },
    [onSizeChange],
  );

  return (
    <div className={`mt-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Artwork Size
      </label>
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-500">Small</span>
        <input
          type="range"
          min={min}
          max={max}
          value={Math.min(Math.max(sliderValue, min), max)}
          onChange={handleSliderChange}
          disabled={locked}
          className={`flex-1 ${styles.slider} ${locked ? 'opacity-50 cursor-not-allowed' : ''}`}
        />
        <span className="text-xs text-gray-500">Large</span>
      </div>

      <div className="mt-2 text-center space-y-0.5">
        <p className="text-xs font-medium text-gray-700">
          {Math.round(dimensions.art_mm_w)} × {Math.round(dimensions.art_mm_h)} mm
          <span className="text-gray-500 ml-2">
            ({dimensions.area_cm2.toFixed(1)} cm²)
          </span>
        </p>
        <p className="text-xs text-gray-500">{sliderValue}% of print area</p>
      </div>
    </div>
  );
};

export default ArtworkSizeSlider;
