"use client"

import * as React from "react"
import { cn } from "../utils"

const PLACEHOLDER_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%23e5e7eb' width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-size='14'%3ENo image%3C/text%3E%3C/svg%3E";

function getSupabaseImageUrl(imageUrl: string | null | undefined, bustCache = false): string {
  if (!imageUrl) {
    return PLACEHOLDER_IMG;
  }

  if (!bustCache) {
    return imageUrl;
  }

  const separator = imageUrl.includes("?") ? "&" : "?";
  return `${imageUrl}${separator}cb=${Date.now()}`;
}

const SIZE = 1024; // Unified coordinate system for both canvases

type ProductCustomizations = {
  logos?: Array<{ id?: string; placement?: string; name?: string }>;
  [key: string]: unknown;
};

interface ProductViewerProps {
  currentView?: string
  imageUrl?: string  // Deprecated - use individual props below
  frontSrc?: string | null
  backSrc?: string | null
  sideSrc?: string | null
  neckSrc?: string | null
  labelSrc?: string | null
  leftSrc?: string | null
  rightSrc?: string | null
  imagesByView?: Record<string, string | null>  // Dynamic views support
  onViewChange?: (view: string) => void
  className?: string
  children?: React.ReactNode
  availableViews?: string[]
  bustCache?: boolean
  colorOverlay?: string
  svgColorFilter?: string | null
  enableSvgFiltering?: boolean
  customizations?: ProductCustomizations
  // Canvas recoloring props
  enableCanvasRecoloring?: boolean
  colorOpacity?: number // 0..1, default 0.4
  tolerance?: number // 12–28: bg similarity threshold (default 18)
  featherPx?: number // soften mask edge in CSS px (default 0.75)
}

const defaultViewOptions = [
  { id: "front", label: "Front" },
  { id: "back", label: "Back" },
  { id: "left", label: "Left" },
  { id: "right", label: "Right" },
  { id: "side", label: "Side" },
  { id: "neck", label: "Neck" },
  { id: "label", label: "Label" }
]

const ProductViewer = React.forwardRef<
  HTMLDivElement,
  ProductViewerProps
>(({
  currentView = "front",
  imageUrl: legacyImageUrl,
  frontSrc,
  backSrc,
  sideSrc,
  neckSrc,
  labelSrc,
  leftSrc,
  rightSrc,
  imagesByView,
  onViewChange,
  className,
  children,
  availableViews,
  bustCache = false,
  colorOverlay,
  svgColorFilter = null,
  enableSvgFiltering = false,
  customizations,
  enableCanvasRecoloring = false,
  colorOpacity = 0.4,
  tolerance = 18,
  featherPx = 0.75,
  ...props
}, ref) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const overlayCanvasRef = React.useRef<HTMLCanvasElement>(null)
  const stageRef = React.useRef<HTMLDivElement>(null)
  const [isCanvasReady, setIsCanvasReady] = React.useState(false)
  const [canvasError, setCanvasError] = React.useState<string | null>(null)
  const needsFrameRef = React.useRef(false)
  const bitmapCacheRef = React.useRef(new Map<string, ImageBitmap>())
  const tintedCacheRef = React.useRef(new Map<string, Blob>())
  const contentRectRef = React.useRef<{x: number, y: number, width: number, height: number} | null>(null)
  // Map view-specific images - support both legacy props and dynamic imagesByView
  const imageByView: Record<string, string | null | undefined> = imagesByView || {
    front: frontSrc,
    back: backSrc,
    side: sideSrc,
    left: leftSrc,
    right: rightSrc,
    neck: neckSrc,
    label: labelSrc
  };

  // Primary image for the active view, falling back to the legacy prop for compatibility
  const currentImageUrl = imageByView[currentView] ?? legacyImageUrl ?? null;

  const processedImageUrl = getSupabaseImageUrl(currentImageUrl, bustCache);

  // Canvas sizing and coordination effect - ensures both canvases use same coordinate system
  React.useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const resize = () => {
      // Use unified coordinate system with clamped DPR
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      
      // Initialize both canvases to the same logical size
      [canvasRef.current, overlayCanvasRef.current].forEach((canvas) => {
        if (!canvas) return;
        canvas.width = SIZE * dpr;
        canvas.height = SIZE * dpr;
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // Draw in 1024-space, scale by DPR for sharpness
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }
      });
    };

    resize();
    // Only resize on window resize, not container changes
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // RAF-scheduled draw function - removed scheduleDrawRef to break circular dependency

  // Helper to get/cache bitmaps with duplicate request prevention
  const pendingBitmapsRef = React.useRef(new Map<string, Promise<ImageBitmap>>());
  
  const toBitmap = React.useCallback(async (url?: string | null) => {
    if (!url) return null;
    
    // Return cached bitmap if available
    if (bitmapCacheRef.current.has(url)) {
      return bitmapCacheRef.current.get(url)!;
    }
    
    // Return pending request if already in progress
    if (pendingBitmapsRef.current.has(url)) {
      return pendingBitmapsRef.current.get(url)!;
    }
    
    // Start new request
    const promise = (async () => {
      try {
        const resp = await fetch(url, { cache: 'force-cache' });
        const blob = await resp.blob();
        const bmp = await createImageBitmap(blob);
        bitmapCacheRef.current.set(url, bmp);
        return bmp;
      } finally {
        pendingBitmapsRef.current.delete(url);
      }
    })();
    
    pendingBitmapsRef.current.set(url, promise);
    return promise;
  }, []);

  // Tint function (main thread only for now)
  const tintInWorker = React.useCallback(async (
    baseBmp: ImageBitmap,
    tint: [number, number, number],
    options?: { intensity?: number; alphaCutoff?: number }
  ) => {
    // Always use main thread fallback
    const off = document.createElement('canvas');
    off.width = baseBmp.width;
    off.height = baseBmp.height;
    const ctx = off.getContext('2d', { willReadFrequently: true })!;
    ctx.drawImage(baseBmp, 0, 0);

    const img = ctx.getImageData(0, 0, off.width, off.height);
    const data = img.data;
    const original = new Uint8ClampedArray(data);
    const [tR, tG, tB] = tint;
    const intensity = Math.max(0, Math.min(1, options?.intensity ?? 1));
    const alphaCutoff = Math.max(0, Math.min(255, options?.alphaCutoff ?? 0));
    for (let i = 0; i < data.length; i += 4) {
      const alpha = data[i + 3];
      if (alpha <= alphaCutoff) {
        continue;
      }

      const tintedR = (original[i] * tR) >> 8;
      const tintedG = (original[i + 1] * tG) >> 8;
      const tintedB = (original[i + 2] * tB) >> 8;

      data[i] = Math.round(original[i] * (1 - intensity) + tintedR * intensity);
      data[i + 1] = Math.round(original[i + 1] * (1 - intensity) + tintedG * intensity);
      data[i + 2] = Math.round(original[i + 2] * (1 - intensity) + tintedB * intensity);
    }
    ctx.putImageData(img, 0, 0);
    return await new Promise<Blob>((res) => off.toBlob(b => res(b!), 'image/png'));
  }, []);

  // Convert hex color to RGB tint
  const hexToRgb = React.useCallback((hex: string): [number, number, number] => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ] : [255, 255, 255];
  }, []);

  // Performance tracking
  const drawCallsRef = React.useRef(0);
  const lastDrawTimeRef = React.useRef(0);

  // Main draw function
  const draw = React.useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas || !enableCanvasRecoloring || !colorOverlay || !processedImageUrl) return;

    // Performance safeguards
    const now = performance.now();
    drawCallsRef.current++;
    
    // Throttle draws to prevent excessive calls
    if (now - lastDrawTimeRef.current < 16) { // ~60fps limit
      return;
    }
    lastDrawTimeRef.current = now;
    
    if (drawCallsRef.current > 100 && drawCallsRef.current % 10 === 0) {
      console.warn(`[ProductViewer] High draw call count: ${drawCallsRef.current}`);
    }

    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, SIZE, SIZE);

    try {
      const tintIntensity = Math.max(0, Math.min(1, colorOpacity));
      const alphaCutoff = Math.max(0, Math.min(255, Math.round(tolerance * 2 + featherPx * 10)));

      // Cache key for tinted results
      const cacheKey = `${processedImageUrl}|${colorOverlay}|${tintIntensity}|${alphaCutoff}`;
      
      let tintedBlob = tintedCacheRef.current.get(cacheKey);
      if (!tintedBlob) {
        const baseBmp = await toBitmap(processedImageUrl);
        if (!baseBmp) return;
        
        tintedBlob = await tintInWorker(baseBmp, hexToRgb(colorOverlay), {
          intensity: tintIntensity,
          alphaCutoff,
        });
        tintedCacheRef.current.set(cacheKey, tintedBlob);
      }

      const tintedBmp = await createImageBitmap(tintedBlob);
      
      // Draw image to fit in SIZE x SIZE canvas (object-contain)
      const aspect = tintedBmp.width / tintedBmp.height;
      let drawW = SIZE;
      let drawH = SIZE;
      let drawX = 0;
      let drawY = 0;
      
      if (aspect > 1) {
        drawH = SIZE / aspect;
        drawY = (SIZE - drawH) / 2;
      } else {
        drawW = SIZE * aspect;
        drawX = (SIZE - drawW) / 2;
      }
      
      ctx.drawImage(tintedBmp, drawX, drawY, drawW, drawH);
      
      // Throttled broadcast content rect to prevent cascade updates
      try {
        // Only broadcast if content rect actually changed
        const newRect = { x: drawX, y: drawY, width: drawW, height: drawH };
        const currentRect = contentRectRef.current;
        if (!currentRect || 
            Math.abs(currentRect.x - newRect.x) > 1 ||
            Math.abs(currentRect.y - newRect.y) > 1 ||
            Math.abs(currentRect.width - newRect.width) > 1 ||
            Math.abs(currentRect.height - newRect.height) > 1) {
          
          contentRectRef.current = newRect;
          stageRef.current?.dispatchEvent(
            new CustomEvent('viewer:contentRect', {
              detail: { x: drawX, y: drawY, width: drawW, height: drawH, size: SIZE },
              bubbles: true,
              composed: true,
            })
          );
        }
      } catch {}
      
      setIsCanvasReady(true);
      setCanvasError(null);
    } catch (error) {
      console.error('Canvas recoloring error:', error);
      setCanvasError(error instanceof Error ? error.message : 'Recoloring failed');
      setIsCanvasReady(false);
    }
  }, [
    enableCanvasRecoloring,
    colorOverlay,
    processedImageUrl,
    colorOpacity,
    tolerance,
    featherPx,
    toBitmap,
    tintInWorker,
    hexToRgb,
  ]);

  // Store draw function reference to avoid circular dependencies
  const drawRef = React.useRef<() => Promise<void>>();
  drawRef.current = draw;

  // Stable scheduleDraw function - does not recreate on draw changes
  const scheduleDraw = React.useCallback(() => {
    if (needsFrameRef.current) return;
    needsFrameRef.current = true;
    requestAnimationFrame(() => {
      needsFrameRef.current = false;
      if (drawRef.current) {
        drawRef.current().catch(console.error);
      }
    });
  }, []);

  // Schedule draw on changes - now uses stable scheduleDraw
  React.useEffect(() => {
    if (enableCanvasRecoloring && colorOverlay && processedImageUrl) {
      scheduleDraw();
    }
  }, [enableCanvasRecoloring, colorOverlay, currentView, processedImageUrl, scheduleDraw]);

  // Simple logging
  if (currentImageUrl) {
  } else {
  }

  // Auto-detect available views based on which images are provided
  let detectedViews: string[] | undefined = availableViews;
  if (!availableViews) {
    if (imagesByView) {
      // Use all views from imagesByView that have valid images
      detectedViews = Object.keys(imagesByView).filter(view => imagesByView[view]);
    } else if (frontSrc !== undefined || backSrc !== undefined || sideSrc !== undefined || neckSrc !== undefined || labelSrc !== undefined || leftSrc !== undefined || rightSrc !== undefined) {
      detectedViews = [];
      if (frontSrc) detectedViews.push('front');
      if (backSrc) detectedViews.push('back');
      if (leftSrc) detectedViews.push('left');
      if (rightSrc) detectedViews.push('right');
      if (sideSrc) detectedViews.push('side');
      if (neckSrc) detectedViews.push('neck');
      if (labelSrc) detectedViews.push('label');
    }
  }

  // Create view options based on available views
  const viewOptions = detectedViews
    ? detectedViews.map(view => ({
        id: view,
        label: view.charAt(0).toUpperCase() + view.slice(1)
      }))
    : defaultViewOptions;

  const logoCount = Array.isArray(customizations?.logos) ? customizations!.logos.length : 0;

  return (
    <div
      ref={ref}
      data-testid="product-viewer"
      className={cn(
        "relative flex-1 rounded-3xl",
        className
      )}
      {...props}
    >
      {/* Product Image Container */}
      <div className="relative h-full w-full rounded-3xl bg-[#747A7B] overflow-hidden">
        {/* ✅ Single positioning root - all canvases inside this stage */}
        <div
          ref={stageRef}
          className="relative w-full h-full p-8"
          style={{ minHeight: 360 }}
          aria-busy={enableCanvasRecoloring ? !isCanvasReady : undefined}
          data-recolor-ready={isCanvasReady}
        >
          {logoCount > 0 && (
            <div className="absolute top-6 left-6 z-30 rounded-full bg-black/60 text-white text-xs px-3 py-1 shadow-lg">
              {logoCount} logo{logoCount === 1 ? "" : "s"} applied
            </div>
          )}
          {processedImageUrl && processedImageUrl !== PLACEHOLDER_IMG ? (
            <>
              {enableCanvasRecoloring && colorOverlay && currentImageUrl ? (
                // Canvas-based recoloring - positioned in stage
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 rounded-2xl z-0"
                  style={{ pointerEvents: 'none' }}
                />
              ) : (
                // Traditional image with SVG filters - positioned in stage
                <img
                  src={processedImageUrl}
                  alt={`Product image - ${currentView} view`}
                  className="absolute inset-0 w-full h-full object-contain rounded-2xl z-0"
                  style={{
                    filter: enableSvgFiltering && svgColorFilter 
                      ? `url(#${svgColorFilter})` 
                      : undefined
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              )}
              
              {/* ✅ Overlay canvas - positioned in SAME stage as product image */}
              <canvas
                ref={overlayCanvasRef}
                className="absolute inset-0 z-10 w-full h-full"
                style={{ pointerEvents: 'none' }} // Will be enabled only during drag
              />
              
              {/* Fallback color overlay for non-SVG filtering and non-canvas mode */}
              {colorOverlay && !enableSvgFiltering && !(enableCanvasRecoloring && currentImageUrl) && (
                <div className="absolute inset-0 pointer-events-none z-5">
                  <svg
                    className="w-full h-full"
                    style={{ mixBlendMode: 'multiply' }}
                    preserveAspectRatio="none"
                  >
                    <rect 
                      width="100%" 
                      height="100%" 
                      fill={colorOverlay} 
                      opacity={0.8}
                    />
                  </svg>
                </div>
              )}
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-lg font-medium">
              PRODUCT IMAGE ASSET
            </div>
          )}
          
          {/* Legacy children support - positioned in stage */}
          <div className="absolute inset-0 pointer-events-none z-20">
            {children}
          </div>

          {canvasError && enableCanvasRecoloring && (
            <div className="absolute inset-0 z-30 flex items-center justify-center rounded-3xl bg-black/70 text-white text-sm text-center px-4">
              <p>Unable to recolor preview: {canvasError}</p>
            </div>
          )}
        </div>
      </div>

      {/* View Options - Positioned at bottom */}
      <div className="absolute bottom-6 flex w-full justify-center z-20">
        <div 
          role="radiogroup" 
          aria-required="false" 
          dir="ltr" 
          className="group relative flex bg-gray-200 rounded-full h-8 p-1 text-xs"
        >
          <div className="relative flex">
            {viewOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                role="radio"
                aria-checked={currentView === option.id}
                data-state={currentView === option.id ? "checked" : "unchecked"}
                value={option.id}
                onClick={() => onViewChange?.(option.id)}
                className={cn(
                  "relative grow basis-0 hover:bg-white/60 active:bg-white hover:text-black active:text-black",
                  "h-full px-3 py-0.5 rounded-full select-none whitespace-nowrap",
                  "transition-all duration-200",
                  "before:absolute before:inset-0 before:-m-0.5 before:p-0.5",
                  currentView === option.id ? [
                    "bg-white text-black shadow-sm"
                  ] : [
                    "bg-transparent text-black/60"
                  ]
                )}
                tabIndex={-1}
              >
                <span className="relative z-10">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
})

ProductViewer.displayName = "ProductViewer"

const ProductViewerSkeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative flex-1 overflow-hidden rounded-2xl animate-pulse",
        className
      )}
      {...props}
    >
      {/* Image skeleton */}
      <div className="h-full w-full bg-gray-200" />
      
      {/* Button skeleton */}
      <div className="absolute bottom-4 flex w-full justify-center">
        <div className="bg-gray-300 rounded-full h-8 w-64" />
      </div>
    </div>
  )
})

ProductViewerSkeleton.displayName = "ProductViewerSkeleton"

export { ProductViewer, ProductViewerSkeleton, type ProductViewerProps } 
