// packages/ui/src/lib/recolor.ts
import {
  buildInsetFeatherFromAlpha,
  maskedMeanLinearRGB,
  maskedLumaStats,
  whiteBalanceGains,
  applyWhiteBalanceMasked,
  adaptiveRecolor,
  applyTextureKeeperFromSource,
  maskedChromaticNudgeTowardTarget,
  applyToneGuard,
  fabricDefaults,
  fabricAutoDefaults,
  autoParamsFromSwatch,
  recolorOKLabHueChroma,
  hex_to_oklch,
  type FabricProfile,
} from "./canvasTint";
import { iterativeMeanMatch } from "./color-accuracy";

type AutoKeyOpts = {
  hexColor: string;            // target dye color
  overlayOpacity?: number;     // 0.35–0.6 feels good; default 0.45
  dpr?: number;                // device pixel ratio
  tolerance?: number;          // 12–28: bg similarity threshold (default 18)
  featherPx?: number;          // soften mask edge in CSS px (default 0.75)
  fabric?: FabricProfile;      // fabric material type for calibrated recolor
};

// object-contain destination rect for (iw, ih) in canvas CSS size (W, H)
function containRect(W: number, H: number, iw: number, ih: number) {
  const r = Math.min(W / iw, H / ih);
  const w = Math.round(iw * r);
  const h = Math.round(ih * r);
  const x = Math.floor((W - w) / 2);
  const y = Math.floor((H - h) / 2);
  return { x, y, w, h };
}


/**
 * Fabric-aware auto-key recolor with calibrated color mapping:
 * - draws the base photo object-contained inside the canvas
 * - applies 3-step calibrated recolor only to garment pixels that became more opaque
 * - white-balances garment area to neutralize base photo cast before recoloring
 * - adaptive blend: multiply in shadows (dye-like), luminance-preserve in highlights
 * - restores fabric texture details for realistic appearance
 */
export async function paintBaseContainedAuto(
  canvas: HTMLCanvasElement,
  baseImage: HTMLImageElement,
  {
    hexColor,
    overlayOpacity = 0.45,
    dpr = (typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1),
    featherPx = 0.75,
    fabric = "cotton_jersey",
  }: AutoKeyOpts
) {
  // Respect canvas CSS size (parent controls layout)
  const canvasRect = canvas.getBoundingClientRect();
  let cssW = Math.round(canvasRect.width);
  let cssH = Math.round(canvasRect.height);
  
  // Guard against zero dimensions when CSS fails
  if (!cssW || !cssH) {
    cssW = 512;
    cssH = 512;
    canvas.style.width = "512px";
    canvas.style.height = "512px";
  }

  canvas.width  = Math.max(1, Math.round(cssW * dpr));
  canvas.height = Math.max(1, Math.round(cssH * dpr));

  const ctx = canvas.getContext("2d")!;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, cssW, cssH);

  // Safety guard for late-loading images
  if (!baseImage.complete || !baseImage.naturalWidth || !baseImage.naturalHeight) {
    const errorMsg = `Image not ready for processing - complete: ${baseImage.complete}, dimensions: ${baseImage.naturalWidth}x${baseImage.naturalHeight}`;
    throw new Error(errorMsg);
  }

  // Processing image for recoloring

  const rect = containRect(cssW, cssH, baseImage.naturalWidth, baseImage.naturalHeight);

  try {
    // Snapshot BEFORE we draw the base
    const before = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Final validation before drawing to prevent broken image errors
    if (!baseImage.complete || baseImage.naturalWidth === 0 || baseImage.naturalHeight === 0) {
      throw new Error("Image validation failed before drawImage");
    }

    // Draw the base image exactly as before
    ctx.drawImage(baseImage, rect.x, rect.y, rect.w, rect.h);

    // Snapshot AFTER the draw
    const after = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Build a mask of ONLY the pixels that became more opaque (newly drawn base area)
    const W = ctx.canvas.width;
    const H = ctx.canvas.height;

    const hard = new Uint8ClampedArray(W * H);
    for (let i = 0, p = 0; i < after.data.length; i += 4, p++) {
      const a0 = before.data[i + 3];
      const a1 = after.data[i + 3];
      hard[p] = a1 > a0 ? a1 : 0;   // EXACT base area only
    }

    // Fabric-aware edge softness with inset-only feather
    const f = fabricDefaults(fabric);
    const soft = buildInsetFeatherFromAlpha(hard, W, H, Math.max(featherPx, f.featherPx));

    // a) Calibrate: white-balance the garment area so the swatch maps accurately
    const mean = maskedMeanLinearRGB(after, soft);
    const gains = whiteBalanceGains(mean); // now luminance-preserving
    const calibrated = new ImageData(new Uint8ClampedArray(after.data), W, H);
    applyWhiteBalanceMasked(calibrated, gains, soft);

    // b) Auto params from swatch + base luminance statistics
    const stats = maskedLumaStats(calibrated, soft);
    const autoFabric = fabricAutoDefaults(fabric);
    const auto = autoParamsFromSwatch(hexColor, { meanL: stats.mean, stdevL: stats.stdev }, autoFabric);
    
    // Removed JADE color analysis debug logging
    
    const t_oklch = hex_to_oklch(hexColor);
    
    // OKLCH auto-params guard for dark+chroma
    let strength = Math.min(overlayOpacity * 2, auto.strength);
    if (t_oklch.L < 0.35 && t_oklch.C > 0.12) {
      strength = Math.max(strength, 0.78);
    }

    const tuned = { 
      strength, // Apply strength floor for dark+chroma
      shadowKnee: auto.shadowKnee, 
      shadowMax: auto.shadowMax 
    };

    // c) Route dark+chroma swatches through OKLab to avoid cyan drift
    const { L, C } = t_oklch;
    const isDarkChroma = (L < 0.35) && (C > 0.12);
    const tinted = isDarkChroma
      ? recolorOKLabHueChroma(
          calibrated,
          hexColor,
          soft,
          {
            strength: tuned.strength,                       // after strength floor
            chromaCap: 0.18,                                // tweak per fabric if needed
            L_pull: 0.08                                    // subtle, only darkens
          }
        )
      : adaptiveRecolor(
          calibrated, hexColor, soft,
          { strength: tuned.strength, shadowKnee: tuned.shadowKnee, shadowMax: tuned.shadowMax }
        );

    // d) Texture keeper: bring knit/weave back subtly
    const withTexture = applyTextureKeeperFromSource(
      new ImageData(new Uint8ClampedArray(tinted.data), W, H),
      after,              // detail source = original base
      soft,
      f.textureIntensity,
      f.blurPx
    );

    // e) Iterative mean matching for high accuracy
    // Apply more aggressive matching for dark/saturated colors
    const matchingRate = isDarkChroma ? 0.25 : 0.15;
    const matched = iterativeMeanMatch(
      withTexture,
      hexColor,
      soft,
      {
        maxIterations: 5,
        deltaEThreshold: 0.02,
        adjustmentRate: matchingRate
      }
    );

    // f) Skip chromatic nudge for dark colors to prevent brightness creep
    // Only apply gentle nudge for lighter colors
    if (t_oklch.L >= 0.40) {
      maskedChromaticNudgeTowardTarget(matched, soft, hexColor, 0.03); // Even softer nudge
    }

    // g) Apply tone guard to prevent dark swatches from brightening
    const corrected = applyToneGuard(
      new ImageData(new Uint8ClampedArray(matched.data), matched.width, matched.height),
      calibrated, // pre-recolor, post-WB image
      soft,
      hexColor
    );

    ctx.putImageData(corrected, 0, 0);
  } catch (error) {
    // Re-throw to let caller handle
    throw error;
  }
}
