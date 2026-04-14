// packages/ui/src/lib/canvasTint.ts
// Side-effect free helpers for luminance-preserving tint on RGBA ImageData.
// Auto-keys from alpha so only the base product image (non-zero alpha) is affected.

const srgbToLinear = (c: number) => {
  const cs = c / 255;
  return cs <= 0.04045 ? cs / 12.92 : Math.pow((cs + 0.055) / 1.055, 2.4);
};
const linearToSrgb = (c: number) => {
  const cl = Math.max(0, Math.min(1, c));
  const sr = cl <= 0.0031308 ? 12.92 * cl : 1.055 * Math.pow(cl, 1 / 2.4) - 0.055;
  return Math.round(sr * 255);
};
const luminance = (rL: number, gL: number, bL: number) => 0.2126 * rL + 0.7152 * gL + 0.0722 * bL;
const clamp8 = (v: number) => (v < 0 ? 0 : v > 255 ? 255 : v);

export function parseColor(input: string | { r: number; g: number; b: number }): [number, number, number] {
  if (typeof input === "string") {
    const s = input.trim().toLowerCase();
    const m6 = s.match(/^#?([a-f0-9]{6})$/i);
    const m3 = m6 ? null : s.match(/^#?([a-f0-9]{3})$/i);
    if (m6 || m3) {
      let hex = (m6?.[1] ?? m3![1])!;
      if (hex.length === 3) hex = hex.split("").map((ch) => ch + ch).join("");
      const n = parseInt(hex, 16);
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    }
    return [255, 255, 255];
  }

  return [input.r | 0, input.g | 0, input.b | 0];
}

// Build feathered mask directly from an alpha-only array (len = width*height).
export function buildFeatherMaskFromAlpha(
  alpha: Uint8ClampedArray,
  width: number,
  height: number,
  featherPx = 1.5
): Uint8ClampedArray {
  const eroded = new Uint8ClampedArray(alpha.length);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let min = 255;
      for (let j = -1; j <= 1; j++) {
        for (let i = -1; i <= 1; i++) {
          const xx = Math.min(width - 1, Math.max(0, x + i));
          const yy = Math.min(height - 1, Math.max(0, y + j));
          min = Math.min(min, alpha[yy * width + xx]);
        }
      }
      eroded[y * width + x] = min;
    }
  }
  if (featherPx <= 0) return eroded;

  const r = Math.max(1, Math.floor(featherPx));
  const tmp = new Float32Array(eroded.length);

  // Horizontal blur
  for (let y = 0; y < height; y++) {
    let acc = 0;
    for (let x = -r; x <= r; x++)
      acc += eroded[y * width + Math.min(width - 1, Math.max(0, x))];
    for (let x = 0; x < width; x++) {
      tmp[y * width + x] = acc / (2 * r + 1);
      const xAdd = x + r + 1, xSub = x - r;
      acc += eroded[y * width + Math.min(width - 1, xAdd)];
      acc -= eroded[y * width + Math.max(0, xSub)];
    }
  }

  // Vertical blur
  const out = new Uint8ClampedArray(eroded.length);
  for (let x = 0; x < width; x++) {
    let acc = 0;
    for (let y = -r; y <= r; y++)
      acc += tmp[Math.min(height - 1, Math.max(0, y)) * width + x];
    for (let y = 0; y < height; y++) {
      const v = acc / (2 * r + 1);
      out[y * width + x] = v > 255 ? 255 : v < 0 ? 0 : v;
      const yAdd = y + r + 1, ySub = y - r;
      acc += tmp[Math.min(height - 1, yAdd) * width + x];
      acc -= tmp[Math.max(0, ySub) * width + x];
    }
  }
  return out;
}

/** Build a soft mask from alpha with 1px erosion to kill edge halos, then feather. */
export function buildFeatherMask(src: ImageData, width: number, height: number, featherPx = 1.5): Uint8ClampedArray {
  const a = new Uint8ClampedArray(width * height);
  for (let i = 0, p = 0; i < src.data.length; i += 4, p++) a[p] = src.data[i + 3];
  return buildFeatherMaskFromAlpha(a, width, height, featherPx);
}

/** Luminance-preserving tint in linear space, gated by soft mask (alpha by default). */
export function tintPreserveLuminance(
  src: ImageData,
  target: string | { r: number; g: number; b: number },
  mask?: Uint8ClampedArray,
  strength = 1.0
): ImageData {
  const [tr, tg, tb] = parseColor(target);
  const trL = srgbToLinear(tr), tgL = srgbToLinear(tg), tbL = srgbToLinear(tb);
  const tLum = Math.max(1e-6, luminance(trL, tgL, tbL));

  const out = new ImageData(new Uint8ClampedArray(src.data), src.width, src.height);
  const d = out.data;

  for (let i = 0; i < d.length; i += 4) {
    const a = d[i + 3];
    if (a === 0) continue;
    const w = (mask ? mask[i / 4] : a) / 255 * strength;
    if (w <= 0) continue;

    const rL = srgbToLinear(d[i]), gL = srgbToLinear(d[i + 1]), bL = srgbToLinear(d[i + 2]);
    const srcLum = Math.max(1e-6, luminance(rL, gL, bL));

    const nr = trL / tLum, ng = tgL / tLum, nb = tbL / tLum; // unit luminance target
    let rr = nr * srcLum, gg = ng * srcLum, bb = nb * srcLum;

    rr = rL * (1 - w) + rr * w;
    gg = gL * (1 - w) + gg * w;
    bb = bL * (1 - w) + bb * w;

    d[i] = clamp8(linearToSrgb(rr));
    d[i + 1] = clamp8(linearToSrgb(gg));
    d[i + 2] = clamp8(linearToSrgb(bb));
  }
  return out;
}

/** Convenience: build soft mask from alpha and apply luminance-preserving tint. */
export function applyAutoKeyTintToCanvas(
  ctx: CanvasRenderingContext2D,
  target: string | { r: number; g: number; b: number },
  opts?: { featherPx?: number; strength?: number }
) {
  const { width, height } = ctx.canvas;
  const src = ctx.getImageData(0, 0, width, height);
  const mask = buildFeatherMask(src, width, height, opts?.featherPx ?? 1.5);
  const out = tintPreserveLuminance(src, target, mask, opts?.strength ?? 1.0);
  ctx.putImageData(out, 0, 0);
}

/** Optional: Multiply in linear space (still masked) for a classic "dyed" look. */
export function multiplyLinear(
  src: ImageData,
  color: string | { r: number; g: number; b: number },
  mask?: Uint8ClampedArray,
  strength = 1
) {
  const [tr, tg, tb] = parseColor(color);
  const trL = srgbToLinear(tr), tgL = srgbToLinear(tg), tbL = srgbToLinear(tb);
  const out = new ImageData(new Uint8ClampedArray(src.data), src.width, src.height);
  const d = out.data;
  for (let i = 0; i < d.length; i += 4) {
    const a = d[i + 3]; if (!a) continue;
    const w = (mask ? mask[i / 4] : a) / 255 * strength; if (!w) continue;
    const rL = srgbToLinear(d[i]), gL = srgbToLinear(d[i + 1]), bL = srgbToLinear(d[i + 2]);
    const rr = rL * (1 - w) + (rL * trL) * w;
    const gg = gL * (1 - w) + (gL * tgL) * w;
    const bb = bL * (1 - w) + (bL * tbL) * w;
    d[i] = linearToSrgb(rr);
    d[i + 1] = linearToSrgb(gg);
    d[i + 2] = linearToSrgb(bb);
  }
  return out;
}

// ---------- Calibration + Adaptive Recolor + Texture Keeper ----------

const toLin = (v:number)=> (v<=10? v/3294 : Math.pow((v/255+0.055)/1.055,2.4));
const toSRGB = (L:number)=> L<=0.0031308 ? Math.round(L*12.92*255) : Math.round((1.055*Math.pow(L,1/2.4)-0.055)*255);

export type FabricProfile = "cotton_jersey" | "fleece_brushed" | "nylon_woven" | "heather_knit";

// Masked mean RGB (linear)
export function maskedMeanLinearRGB(src: ImageData, mask?: Uint8ClampedArray) {
  const d = src.data; let r=0,g=0,b=0,n=0;
  for (let i=0,p=0;i<d.length;i+=4,p++){
    const a=d[i+3]; if(!a) continue;
    const w=(mask?mask[p]:a)/255; if(w<=0) continue;
    r+=toLin(d[i])*w; g+=toLin(d[i+1])*w; b+=toLin(d[i+2])*w; n+=w;
  }
  if(!n) return {r:0,g:0,b:0};
  return { r:r/n, g:g/n, b:b/n };
}

// Luma weights in linear
const Lr = 0.2126, Lg = 0.7152, Lb = 0.0722;

// Compute neutralizing gains, then normalize so overall luminance stays the same.
// Also clamp the gains so we never swing wildly (banded casts won't blow up).
export function whiteBalanceGains(mean:{r:number,g:number,b:number}) {
  const gray = (mean.r + mean.g + mean.b) / 3 || 1e-6;
  let gr = gray / (mean.r || 1e-6);
  let gg = gray / (mean.g || 1e-6);
  let gb = gray / (mean.b || 1e-6);

  // clamp individual channel gains
  const clamp = (x:number)=> Math.min(1.1, Math.max(0.9, x));
  gr = clamp(gr); gg = clamp(gg); gb = clamp(gb);

  // normalize so luminance is preserved on average
  const lBefore = Lr*mean.r + Lg*mean.g + Lb*mean.b;
  const lAfter  = Lr*(mean.r*gr) + Lg*(mean.g*gg) + Lb*(mean.b*gb);
  const k = lAfter > 1e-6 ? (lBefore / lAfter) : 1.0;

  return { gr: gr*k, gg: gg*k, gb: gb*k };
}

// Apply WB but never brighten pixels outside the mask; bounded & luma-safe already.
export function applyWhiteBalanceMasked(
  src: ImageData,
  gains:{gr:number,gg:number,gb:number},
  mask?: Uint8ClampedArray
) {
  const d=src.data;
  for(let i=0,p=0;i<d.length;i+=4,p++){
    const a=d[i+3]; if(!a) continue;
    const w=(mask?mask[p]:a)/255; if(w<=0) continue;

    const rL = toLin(d[i])   * (1 + (gains.gr-1)*w);
    const gL = toLin(d[i+1]) * (1 + (gains.gg-1)*w);
    const bL = toLin(d[i+2]) * (1 + (gains.gb-1)*w);

    d[i]   = toSRGB(Math.min(1, Math.max(0, rL)));
    d[i+1] = toSRGB(Math.min(1, Math.max(0, gL)));
    d[i+2] = toSRGB(Math.min(1, Math.max(0, bL)));
  }
  return src;
}

// Adaptive recolor: multiply in shadows, luminance-preserve in mids/highs
export function adaptiveRecolor(
  src: ImageData,
  target: string | {r:number;g:number;b:number},
  mask?: Uint8ClampedArray,
  opts?: { strength?: number; shadowKnee?: number; shadowMax?: number }
){
  const strength=opts?.strength ?? 1.0;
  const knee=opts?.shadowKnee ?? 0.22;
  const max=opts?.shadowMax ?? 0.45;

  const [tr8,tg8,tb8]=parseColor(target);
  const trL=toLin(tr8), tgL=toLin(tg8), tbL=toLin(tb8);
  const tLum=Math.max(1e-6,0.2126*trL+0.7152*tgL+0.0722*tbL);
  const nr=trL/tLum, ng=tgL/tLum, nb=tbL/tLum;

  const out=new ImageData(new Uint8ClampedArray(src.data),src.width,src.height);
  const d=out.data;

  for(let i=0,p=0;i<d.length;i+=4,p++){
    const a=d[i+3]; if(!a) continue;
    const m=(mask?mask[p]:a)/255*strength; if(m<=0) continue;

    const rL=toLin(d[i]), gL=toLin(d[i+1]), bL=toLin(d[i+2]);
    const L=0.2126*rL+0.7152*gL+0.0722*bL;

    let wShadow=0;
    if(L<max){
      const t=Math.max(0,Math.min(1,(max-L)/Math.max(1e-6,(max-knee))));
      wShadow=t;
    }

    const mulR=rL*trL, mulG=gL*tgL, mulB=bL*tbL;
    const lumR=nr*L,  lumG=ng*L,  lumB=nb*L;

    const tR=(1-wShadow)*lumR + wShadow*mulR;
    const tG=(1-wShadow)*lumG + wShadow*mulG;
    const tB=(1-wShadow)*lumB + wShadow*mulB;

    const rr=rL*(1-m)+tR*m, gg=gL*(1-m)+tG*m, bb=bL*(1-m)+tB*m;

    d[i]=toSRGB(Math.min(1,Math.max(0,rr)));
    d[i+1]=toSRGB(Math.min(1,Math.max(0,gg)));
    d[i+2]=toSRGB(Math.min(1,Math.max(0,bb)));
  }
  return out;
}

// --- Texture keeper (uses CSS filter blur for speed) ---
function blurImageDataViaFilter(src: ImageData, radiusPx: number): ImageData {
  const w=src.width,h=src.height;
  const c=document.createElement("canvas"); c.width=w; c.height=h;
  const ctx=c.getContext("2d",{willReadFrequently:true})!;
  ctx.putImageData(src,0,0);
  const c2=document.createElement("canvas"); c2.width=w; c2.height=h;
  const ctx2=c2.getContext("2d",{willReadFrequently:true})!;
  try {
    ctx2.filter=`blur(${Math.max(0,radiusPx)}px)`;
    ctx2.drawImage(c,0,0);
    return ctx2.getImageData(0,0,w,h);
  } catch {
    return new ImageData(new Uint8ClampedArray(src.data),w,h);
  }
}

function buildHighFreqMap(src: ImageData, blurRadiusPx=2.5): Float32Array {
  const w=src.width,h=src.height;
  const b=blurImageDataViaFilter(src,blurRadiusPx).data;
  const s=src.data;
  const out=new Float32Array(w*h*3); let o=0;
  for(let i=0;i<s.length;i+=4){
    const rL=toLin(s[i]), gL=toLin(s[i+1]), bL=toLin(s[i+2]);
    const rb=toLin(b[i]), gb=toLin(b[i+1]), bb=toLin(b[i+2]);
    out[o++]=rL-rb; out[o++]=gL-gb; out[o++]=bL-bb;
  }
  return out;
}

export function applyTextureKeeperFromSource(
  target: ImageData,
  sourceForDetail: ImageData,
  mask?: Uint8ClampedArray,
  intensity=0.22,
  blurRadiusPx=2.5
){
  if(target.width!==sourceForDetail.width || target.height!==sourceForDetail.height) return target;
  const detail=buildHighFreqMap(sourceForDetail,blurRadiusPx);
  const t=target.data; let di=0;
  for(let i=0,p=0;i<t.length;i+=4,p++){
    const a=t[i+3]; if(!a){ di+=3; continue; }
    const w=(mask?mask[p]:a)/255*intensity; if(w<=0){ di+=3; continue; }
    const rL=toLin(t[i]), gL=toLin(t[i+1]), bL=toLin(t[i+2]);
    let rr=rL+detail[di++]*w, gg=gL+detail[di++]*w, bb=bL+detail[di++]*w;
    rr=Math.min(1,Math.max(0,rr)); gg=Math.min(1,Math.max(0,gg)); bb=Math.min(1,Math.max(0,bb));
    t[i]=toSRGB(rr); t[i+1]=toSRGB(gg); t[i+2]=toSRGB(bb);
  }
  return target;
}

// Fabric presets (edge softness + texture + shadow behavior)
export function fabricDefaults(profile: FabricProfile){
  switch(profile){
    case "cotton_jersey":  return { featherPx:1.0, textureIntensity:0.22, blurPx:2.5, shadowKnee:0.25, shadowMax:0.5 };
    case "fleece_brushed": return { featherPx:1.2, textureIntensity:0.16, blurPx:3.0, shadowKnee:0.28, shadowMax:0.55 };
    case "nylon_woven":    return { featherPx:0.9, textureIntensity:0.12, blurPx:2.0, shadowKnee:0.18, shadowMax:0.4 };
    case "heather_knit":   return { featherPx:1.3, textureIntensity:0.14, blurPx:2.0, shadowKnee:0.22, shadowMax:0.48 };
  }
}

// Inset-only feather: soft edges without expanding beyond the original hard mask.
// alpha: Uint8ClampedArray length = W*H with 0 or 0..255 inside base area.
export function buildInsetFeatherFromAlpha(
  alpha: Uint8ClampedArray,
  width: number,
  height: number,
  featherPx = 1.0
): Uint8ClampedArray {
  if (featherPx <= 0) return alpha; // exact area, no soft edge
  // Box blur like before, but we will clamp to original
  const r = Math.max(1, Math.floor(featherPx));
  const tmp = new Float32Array(alpha.length);

  // Horizontal
  for (let y = 0; y < height; y++) {
    let acc = 0;
    for (let x = -r; x <= r; x++) acc += alpha[y * width + Math.min(width - 1, Math.max(0, x))];
    for (let x = 0; x < width; x++) {
      tmp[y * width + x] = acc / (2 * r + 1);
      const xAdd = x + r + 1, xSub = x - r;
      acc += alpha[y * width + Math.min(width - 1, xAdd)];
      acc -= alpha[y * width + Math.max(0, xSub)];
    }
  }
  // Vertical + clamp to original mask so it cannot expand
  const out = new Uint8ClampedArray(alpha.length);
  for (let x = 0; x < width; x++) {
    let acc = 0;
    for (let y = -r; y <= r; y++) acc += tmp[Math.min(height - 1, Math.max(0, y)) * width + x];
    for (let y = 0; y < height; y++) {
      const v = acc / (2 * r + 1);
      const idx = y * width + x;
      // Clamp: if original pixel was 0 (outside), keep 0. Only soften *inside*.
      out[idx] = alpha[idx] === 0 ? 0 : (v > 255 ? 255 : v < 0 ? 0 : v);
      const yAdd = y + r + 1, ySub = y - r;
      acc += tmp[Math.min(height - 1, yAdd) * width + x];
      acc -= tmp[Math.max(0, ySub) * width + x];
    }
  }
  return out;
}

// Optional micro-correction nudge toward target swatch (masked, luminance-preserving)
export function maskedChromaticNudgeTowardTarget(
  img: ImageData,            // tinted image
  mask: Uint8ClampedArray,   // your soft mask
  targetHex: string,         // swatch
  amount = 0.25              // 0..1, small
) {
  const tMean = maskedMeanLinearRGB(img, mask);              // current mean (linear)
  const [tr, tg, tb] = ((): [number, number, number] => {
    const [r8,g8,b8] = ((): [number, number, number] => {
      let h = targetHex.replace(/^#/, "");
      if (h.length === 3) h = h.split("").map(c => c + c).join("");
      const n = parseInt(h, 16);
      return [(n>>16)&255, (n>>8)&255, n&255];
    })();
    // to linear
    const toLin = (v:number)=> (v<=10? v/3294 : Math.pow((v/255+0.055)/1.055,2.4));
    return [toLin(r8), toLin(g8), toLin(b8)];
  })();

  // Match luminance to current mean to avoid brightness shifts
  const tLum = Math.max(1e-6, 0.2126*tr + 0.7152*tg + 0.0722*tb);
  const curLum = Math.max(1e-6, 0.2126*tMean.r + 0.7152*tMean.g + 0.0722*tMean.b);
  const k = curLum / tLum;
  const trN = tr * k, tgN = tg * k, tbN = tb * k;

  // Delta vector in linear
  const dR = (trN - tMean.r) * amount;
  const dG = (tgN - tMean.g) * amount;
  const dB = (tbN - tMean.b) * amount;

  const toSRGB = (L:number)=> L<=0.0031308 ? Math.round(L*12.92*255) : Math.round((1.055*Math.pow(L,1/2.4)-0.055)*255);
  const data = img.data;
  for (let i=0,p=0;i<data.length;i+=4,p++){
    const a = data[i+3]; if(!a) continue;
    const w = (mask[p] ?? a)/255; if(w<=0) continue;
    const wAmt = w; // weight nudge by mask strength
    // to linear
    const rL = (data[i]  <=10?data[i]/3294:Math.pow((data[i]/255 +0.055)/1.055,2.4));
    const gL = (data[i+1]<=10?data[i+1]/3294:Math.pow((data[i+1]/255+0.055)/1.055,2.4));
    const bL = (data[i+2]<=10?data[i+2]/3294:Math.pow((data[i+2]/255+0.055)/1.055,2.4));
    // apply small delta
    let rr = rL + dR*wAmt, gg = gL + dG*wAmt, bb = bL + dB*wAmt;
    rr = Math.min(1, Math.max(0, rr));
    gg = Math.min(1, Math.max(0, gg));
    bb = Math.min(1, Math.max(0, bb));
    data[i]   = toSRGB(rr);
    data[i+1] = toSRGB(gg);
    data[i+2] = toSRGB(bb);
  }
  return img;
}

// Prevent global brightening: if the target swatch is darker than the calibrated mean,
// we allow only darkening (never lightening) inside the mask.
export function applyToneGuard(
  tinted: ImageData,
  calibratedBefore: ImageData,
  mask: Uint8ClampedArray,
  targetHex: string
) {
  // mean luminance (linear) helpers
  const meanL = (img: ImageData, m?: Uint8ClampedArray) => {
    const d = img.data; let s=0, n=0;
    for (let i=0,p=0;i<d.length;i+=4,p++){
      const a=d[i+3]; if(!a) continue;
      const w=(m?m[p]:a)/255; if(w<=0) continue;
      const r=toLin(d[i]), g=toLin(d[i+1]), b=toLin(d[i+2]);
      s += (Lr*r + Lg*g + Lb*b) * w; n += w;
    }
    return n ? s/n : 0;
  };

  const tb = targetHex.replace(/^#/,'');
  const [tr8,tg8,tb8] = [parseInt(tb.slice(0,2),16), parseInt(tb.slice(2,4),16), parseInt(tb.slice(4,6),16)];
  const tLum = Lr*toLin(tr8) + Lg*toLin(tg8) + Lb*toLin(tb8);

  const Lbefore = meanL(calibratedBefore, mask);
  const Lafter  = meanL(tinted, mask);

  // If target is darker than the calibrated base, and we brightened, scale back.
  // Be more aggressive: also prevent brightening if target is close to base lightness
  if (tLum < Lbefore && Lafter > Lbefore) {
    const scale = Lbefore / Lafter; // 0..1
    const d = tinted.data;
    for (let i=0,p=0;i<d.length;i+=4,p++){
      const a=d[i+3]; if(!a) continue;
      const w=(mask?mask[p]:a)/255; if(w<=0) continue;

      // to linear → scale → back to sRGB
      const r = toLin(d[i])   * scale;
      const g = toLin(d[i+1]) * scale;
      const b = toLin(d[i+2]) * scale;
      d[i]   = toSRGB(Math.min(1, Math.max(0, r)));
      d[i+1] = toSRGB(Math.min(1, Math.max(0, g)));
      d[i+2] = toSRGB(Math.min(1, Math.max(0, b)));
    }
  }
  return tinted;
}

// ---------- OKLab / OKLCH utilities ----------
function srgb8_to_lin(v:number){ return v<=10 ? v/3294 : Math.pow((v/255+0.055)/1.055,2.4); }
function lin_to_srgb8(L:number){ return L<=0.0031308 ? Math.round(L*12.92*255) : Math.round((1.055*Math.pow(L,1/2.4)-0.055)*255); }

function lin_to_oklab(r:number,g:number,b:number){
  // https://bottosson.github.io/posts/oklab/
  const l = 0.4122214708*r + 0.5363325363*g + 0.0514459929*b;
  const m = 0.2119034982*r + 0.6806995451*g + 0.1073969566*b;
  const s = 0.0883024619*r + 0.2817188376*g + 0.6299787005*b;
  const l_ = Math.cbrt(l), m_ = Math.cbrt(m), s_ = Math.cbrt(s);
  const L = 0.2104542553*l_ + 0.7936177850*m_ - 0.0040720468*s_;
  const a = 1.9779984951*l_ - 2.4285922050*m_ + 0.4505937099*s_;
  const b2= 0.0259040371*l_ + 0.7827717662*m_ - 0.8086757660*s_;
  return { L, a, b: b2 };
}
function oklab_to_oklch(L:number,a:number,b:number){
  const C = Math.hypot(a,b);
  let h = Math.atan2(b,a); if (h<0) h += 2*Math.PI;
  return { L, C, h }; // L∈[0..1], C≈[0..0.4+], h radians
}
export function hex_to_oklch(hex:string){
  let h = hex.replace(/^#/,''); if (h.length===3) h = h.split('').map(c=>c+c).join('');
  const r = srgb8_to_lin(parseInt(h.slice(0,2),16));
  const g = srgb8_to_lin(parseInt(h.slice(2,4),16));
  const b = srgb8_to_lin(parseInt(h.slice(4,6),16));
  const {L,a,b:b2} = lin_to_oklab(r,g,b);
  return oklab_to_oklch(L,a,b2);
}
function oklab_to_lin(L:number,a:number,b:number){
  const l_ = (L + 0.3963377774*a + 0.2158037573*b)**3;
  const m_ = (L - 0.1055613458*a - 0.0638541728*b)**3;
  const s_ = (L - 0.0894841775*a - 1.2914855480*b)**3;
  return {
    r:  4.0767416621*l_ - 3.3077115913*m_ + 0.2309699292*s_,
    g: -1.2684380046*l_ + 2.6097574011*m_ - 0.3413193965*s_,
    b: -0.0041960863*l_ - 0.7034186147*m_ + 1.7076147010*s_,
  };
}

// ---------- Base stats (masked) ----------
export function maskedLumaStats(src: ImageData, mask?: Uint8ClampedArray){
  // mean & std dev of linear luminance inside mask
  const d = src.data; let sum=0, sum2=0, n=0;
  for (let i=0,p=0;i<d.length;i+=4,p++){
    const a=d[i+3]; if(!a) continue;
    const w=(mask?mask[p]:a)/255; if(w<=0) continue;
    const r=srgb8_to_lin(d[i]), g=srgb8_to_lin(d[i+1]), b=srgb8_to_lin(d[i+2]);
    const Y=0.2126*r+0.7152*g+0.0722*b;
    sum += Y*w; sum2 += Y*Y*w; n += w;
  }
  const mean = n? sum/n : 0;
  const variance = n? Math.max(0, sum2/n - mean*mean) : 0;
  return { mean, stdev: Math.sqrt(variance) };
}

// ---------- Fabric response "gamut" model ----------
export type FabricAutoPreset = { k_chroma: number; p_chroma: number; kneeMin: number; kneeMax: number; multMax: number };
export function fabricAutoDefaults(profile: "cotton_jersey" | "fleece_brushed" | "nylon_woven" | "heather_knit"): FabricAutoPreset {
  switch(profile){
    case "fleece_brushed": return { k_chroma: 0.32, p_chroma: 1.10, kneeMin: 0.22, kneeMax: 0.34, multMax: 0.55 };
    case "nylon_woven":    return { k_chroma: 0.28, p_chroma: 0.95, kneeMin: 0.18, kneeMax: 0.28, multMax: 0.45 };
    case "heather_knit":   return { k_chroma: 0.26, p_chroma: 1.00, kneeMin: 0.24, kneeMax: 0.36, multMax: 0.50 };
    default: /* cotton_jersey */ return { k_chroma: 0.30, p_chroma: 1.05, kneeMin: 0.20, kneeMax: 0.32, multMax: 0.50 };
  }
}

// ---------- Auto parameterization from swatch + base ----------
export function autoParamsFromSwatch(
  swatchHex: string,
  baseStats: { meanL: number; stdevL: number },
  fabric: FabricAutoPreset
){
  const t = hex_to_oklch(swatchHex); // target L,C,h in perceptual space
  // 1) Expected achievable chroma on fabric: darker base reduces max chroma
  //    C_cap ≈ k * (1 - meanL)^p, then ease toward target
  const C_cap = fabric.k_chroma * Math.pow(Math.max(0, 1 - baseStats.meanL), fabric.p_chroma);
  const chromaRatio = Math.min(1, t.C > 1e-6 ? (C_cap / t.C) : 1); // ≤1 means we should not oversaturate
  // 2) Strength: back off when target chroma is high vs cap (and when base texture contrast is low)
  let strength = 0.92 * Math.pow(chromaRatio, 0.5) * (0.85 + 0.30*Math.min(0.15, baseStats.stdevL)/0.15);
  
  // floor for dark, saturated swatches (e.g., JADE) - prevents "minting"
  if (t.L < 0.35 && t.C > 0.12) {
    strength = Math.max(strength, 0.78);
  }
  
  strength = Math.min(1.0, Math.max(0.65, strength));
  // 3) Multiply knee/max from target lightness: darker swatches multiply earlier
  const knee = Math.min(fabric.kneeMax, Math.max(fabric.kneeMin, 0.12 + 0.5*(0.5 - t.L))); // map L↓ → knee↓
  const shadowMax = Math.min(fabric.multMax, Math.max(knee+0.12, knee + 0.20)); // ensure spacing
  // 4) Saturation cap for any external filters from chroma headroom
  const satCap = 0.85 + 0.15*chromaRatio; // 0.85..1.0
  return { strength, shadowKnee: knee, shadowMax, satCap, chromaRatio };
}

/** Dark-swatch mode: keep per-pixel OKLab L, inject swatch hue, clamp chroma. */
export function recolorOKLabHueChroma(
  src: ImageData,
  targetHex: string,
  mask?: Uint8ClampedArray,
  opts?: { strength?: number; chromaCap?: number; L_pull?: number }
){
  const strength = Math.min(1, Math.max(0, opts?.strength ?? 0.8));
  const Lpull    = Math.min(0.35, Math.max(0, opts?.L_pull ?? 0.0)); // tiny L pull toward darker target
  // target OKLab a,b normalized
  let h = targetHex.replace(/^#/,''); if (h.length===3) h = h.split('').map(c=>c+c).join('');
  const tr = srgb8_to_lin(parseInt(h.slice(0,2),16));
  const tg = srgb8_to_lin(parseInt(h.slice(2,4),16));
  const tb = srgb8_to_lin(parseInt(h.slice(4,6),16));
  const tLab = lin_to_oklab(tr,tg,tb);
  const tC = Math.hypot(tLab.a, tLab.b) || 1e-6;
  const ta = tLab.a / tC, tbv = tLab.b / tC; // unit hue vector

  const Ccap = Math.max(0, opts?.chromaCap ?? 0.18); // fabric headroom; tune per fabric

  const out = new ImageData(new Uint8ClampedArray(src.data), src.width, src.height);
  const d = out.data;
  for (let i=0,p=0;i<d.length;i+=4,p++){
    const a = d[i+3]; if (!a) continue;
    const w = (mask ? mask[p] : a) / 255 * strength; if (!w) continue;

    const rL = srgb8_to_lin(d[i]), gL = srgb8_to_lin(d[i+1]), bL = srgb8_to_lin(d[i+2]);
    const lab = lin_to_oklab(rL,gL,bL);
    const L0  = lab.L;

    // desired chroma within cap, eased by mask weight
    const Cdes = Math.min(Ccap, tC) * w + (1-w)*Math.hypot(lab.a, lab.b);
    const aNew = ta * Cdes;
    const bNew = tbv * Cdes;

    // tiny pull of L toward darker target (only darken)
    const Ltar = Math.min(L0, tLab.L);
    const Lnew = L0*(1-Lpull*w) + Ltar*(Lpull*w);

    const lin = oklab_to_lin(Lnew, aNew, bNew);
    d[i]   = clamp8(lin_to_srgb8(lin.r));
    d[i+1] = clamp8(lin_to_srgb8(lin.g));
    d[i+2] = clamp8(lin_to_srgb8(lin.b));
  }
  return out;
}
