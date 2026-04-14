// Per-swatch parameter heuristics to keep color realistic but accurate.
// Pure functions; no side effects.

export type RecolorParams = {
  strength: number;     // feeds adaptiveRecolor.strength
  shadowKnee: number;   // pixel L below which multiply ramps in
  shadowMax: number;    // pixel L where multiply is full
  satCap: number;       // clamp for any external saturation boosting (e.g., SVG filter)
};

// Lightweight HSL (sRGB 0..255 -> normalized 0..1)
function hexToRgb(hex: string): [number, number, number] {
  let h = hex.trim().replace(/^#/, "");
  if (h.length === 3) h = h.split("").map(c => c + c).join("");
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function rgbToHsl(r8: number, g8: number, b8: number): { h: number; s: number; l: number } {
  const r = r8 / 255, g = g8 / 255, b = b8 / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0, s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h, s, l };
}

/**
 * Compute sane recolor params from a swatch hex.
 * - Very saturated mid-tone greens can look "inked" → reduce strength, raise knee.
 * - Dark, saturated colors get earlier multiply (deeper dye).
 * - Pastels get a bit more strength and lower knee so they don't go gray.
 * - satCap controls any *external* saturation boosts (e.g., SVG filters).
 */
export function paramsForSwatch(hex: string, base?: Partial<RecolorParams>): RecolorParams {
  const [r, g, b] = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);

  // defaults roughly from cotton_jersey
  let strength = base?.strength ?? 0.90;   // your overlayOpacity * 2 default
  let knee     = base?.shadowKnee ?? 0.25;
  let max      = base?.shadowMax  ?? 0.50;
  let satCap   = base?.satCap     ?? 1.00;

  // Heuristic buckets
  const isGreenBand = h >= 0.25 && h <= 0.47;   // ~90–170°
  const isMidTone   = l > 0.32 && l < 0.68;
  const isDark      = l <= 0.32;
  const isPastel    = s < 0.30 && l >= 0.70;

  if (isGreenBand && isMidTone && s >= 0.55) {
    // Reduce over-ink on JADE/EMERALD types
    strength -= 0.10;            // 0.80
    knee     += 0.04;            // 0.29
    max      += 0.03;            // 0.53
    satCap    = 0.92;            // cap any saturation boost
  }

  if (isDark && s >= 0.45) {
    // Deep saturated colors: earlier multiply for believable absorption
    knee = Math.max(0.18, knee - 0.04); // 0.21
    max  = Math.max(knee + 0.18, max - 0.05); // 0.45
    strength = Math.min(1.0, strength + 0.04); // slight push
  }

  if (isPastel) {
    // Pastels: avoid washed look
    strength += 0.06;            // 0.96
    knee     = Math.min(knee + 0.02, 0.32);
    max      = Math.min(max  + 0.02, 0.55);
    satCap    = 1.00;            // allow gentle saturation
  }

  // Clamp and tidy
  strength = Math.min(1, Math.max(0.65, strength));
  knee     = Math.min(0.45, Math.max(0.12, knee));
  max      = Math.min(0.70, Math.max(knee + 0.12, max));
  satCap   = Math.min(1.00, Math.max(0.80, satCap));

  return { strength, shadowKnee: knee, shadowMax: max, satCap };
}