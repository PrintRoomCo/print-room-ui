// color-accuracy.ts - High-accuracy color matching utilities
import { hex_to_oklch } from "./canvasTint";

// Convert hex to OKLab color space
export function hexToOKLab(hex: string) {
  const { L, C, h } = hex_to_oklch(hex);
  return { 
    L, 
    a: Math.cos(h) * C, 
    b: Math.sin(h) * C 
  };
}

// Calculate perceptual distance in OKLab space
export function oklabDeltaE(
  a: { L: number; a: number; b: number }, 
  b: { L: number; a: number; b: number }
) {
  const dL = a.L - b.L;
  const da = a.a - b.a;
  const db = a.b - b.b;
  return Math.sqrt(dL * dL + da * da + db * db);
}

// Linear RGB to OKLab conversion
function linToOKLab(r: number, g: number, b: number) {
  // https://bottosson.github.io/posts/oklab/
  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;
  const l_ = Math.cbrt(l), m_ = Math.cbrt(m), s_ = Math.cbrt(s);
  const L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_;
  const a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_;
  const b2 = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_;
  return { L, a, b: b2 };
}

// OKLab to linear RGB conversion
function oklabToLin(L: number, a: number, b: number) {
  const l_ = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m_ = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s_ = (L - 0.0894841775 * a - 1.2914855480 * b) ** 3;
  return {
    r: 4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
    g: -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
    b: -0.0041960863 * l_ - 0.7034186147 * m_ + 1.7076147010 * s_,
  };
}

// sRGB conversions
const srgbToLin = (v: number) => (v <= 10 ? v / 3294 : Math.pow((v / 255 + 0.055) / 1.055, 2.4));
const linToSrgb = (L: number) => L <= 0.0031308 ? Math.round(L * 12.92 * 255) : Math.round((1.055 * Math.pow(L, 1 / 2.4) - 0.055) * 255);

// Calculate masked mean in OKLab space
export function maskedMeanOKLab(
  img: ImageData,
  mask?: Uint8ClampedArray
): { L: number; a: number; b: number } {
  const d = img.data;
  let L = 0, a = 0, b = 0, n = 0;
  
  for (let i = 0, p = 0; i < d.length; i += 4, p++) {
    const alpha = d[i + 3];
    if (!alpha) continue;
    const w = (mask ? mask[p] : alpha) / 255;
    if (w <= 0) continue;
    
    const r = srgbToLin(d[i]);
    const g = srgbToLin(d[i + 1]);
    const b_ = srgbToLin(d[i + 2]);
    const lab = linToOKLab(r, g, b_);
    
    L += lab.L * w;
    a += lab.a * w;
    b += lab.b * w;
    n += w;
  }
  
  if (!n) return { L: 0, a: 0, b: 0 };
  return { L: L / n, a: a / n, b: b / n };
}

// Iteratively adjust image colors to match target mean in OKLab space
export function iterativeMeanMatch(
  img: ImageData,
  targetHex: string,
  mask?: Uint8ClampedArray,
  opts?: {
    maxIterations?: number;
    deltaEThreshold?: number;
    adjustmentRate?: number;
  }
): ImageData {
  const maxIter = opts?.maxIterations ?? 5;
  const threshold = opts?.deltaEThreshold ?? 0.02;
  const rate = opts?.adjustmentRate ?? 0.15;
  
  const targetLab = hexToOKLab(targetHex);
  const out = new ImageData(new Uint8ClampedArray(img.data), img.width, img.height);
  
  for (let iter = 0; iter < maxIter; iter++) {
    const currentMean = maskedMeanOKLab(out, mask);
    const deltaE = oklabDeltaE(currentMean, targetLab);
    
    // Stop if we're close enough
    if (deltaE < threshold) break;
    
    // Calculate adjustment vector
    const dL = (targetLab.L - currentMean.L) * rate;
    const da = (targetLab.a - currentMean.a) * rate;
    const db = (targetLab.b - currentMean.b) * rate;
    
    // Apply adjustment
    const d = out.data;
    for (let i = 0, p = 0; i < d.length; i += 4, p++) {
      const alpha = d[i + 3];
      if (!alpha) continue;
      const w = (mask ? mask[p] : alpha) / 255;
      if (w <= 0) continue;
      
      // Convert to OKLab
      const r = srgbToLin(d[i]);
      const g = srgbToLin(d[i + 1]); 
      const b = srgbToLin(d[i + 2]);
      const lab = linToOKLab(r, g, b);
      
      // Apply adjustment weighted by mask
      const newL = lab.L + dL * w;
      const newA = lab.a + da * w;
      const newB = lab.b + db * w;
      
      // Convert back to sRGB
      const rgb = oklabToLin(newL, newA, newB);
      d[i] = linToSrgb(Math.max(0, Math.min(1, rgb.r)));
      d[i + 1] = linToSrgb(Math.max(0, Math.min(1, rgb.g)));
      d[i + 2] = linToSrgb(Math.max(0, Math.min(1, rgb.b)));
    }
  }
  
  return out;
}