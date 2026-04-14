// Minimal DB-first loader for print areas. No UI changes.
// Reads product_images.print_areas by viewId and exposes a bounds lookup.
// Safe fallback handled in print-areas.ts wrapper.

import { createClient } from '@supabase/supabase-js';

export type PrintAreaBounds = {
  centerX: number; centerY: number; width: number; height: number;
};

type ViewAreas = Record<string, PrintAreaBounds>;

type DbPrintArea = {
  key?: string;
  shape?: {
    type?: string;
    rect?: { x: number; y: number; w: number; h: number };
  };
};

const cache = new Map<string, ViewAreas>();

let ctx: { viewId: string | null; productKind: string | null } = {
  viewId: null,
  productKind: null,
};

// Optional: map generic UI IDs to product-specific DB keys (tote etc.)
const PRODUCT_ALIASES: Record<string, Record<string, string>> = {
  tote: {
    front: 'front',              // matches seeded DB keys
    'back-full': 'back_center',  // matches seeded DB keys  
    'side-panel': 'side_panel',  // matches seeded DB keys
    'neck-label': 'label',       // matches seeded DB keys
  },
  cap: {
    left: 'side_panel',
    right: 'side_panel',
  },
  hood: {
    front: 'front',
    left_chest: 'left_chest',
    right_chest: 'right_chest',
    hood_center: 'hood_center',
    pouch: 'pouch',
  },
  // tees/longsleeve tees don't need aliases; IDs already match DB keys
};

const norm = (k: string) => k.toLowerCase().replace(/\s+/g, '_').replace(/-/g, '_');

function resolveAlias(inputKey: string): string {
  const key = norm(inputKey);
  const aliases = PRODUCT_ALIASES[ctx.productKind ?? ''] || {};
  return norm(aliases[key] ?? key);
}

export function setPrintAreaContext(args: { viewId: string; productKind?: string }) {
  ctx.viewId = args.viewId;
  ctx.productKind = args.productKind?.toLowerCase() ?? null;
}

export async function primeViewAreas(viewId: string) {
  if (cache.has(viewId)) return;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Read print_areas directly from product_images by id
  const { data, error } = await supabase
    .from('product_images')
    .select('print_areas')
    .eq('id', viewId)
    .single();

  // On error or missing data, cache empty so we fall back quickly
  if (error || !data?.print_areas) { 
    cache.set(viewId, {}); 
    return; 
  }

  const bag: ViewAreas = {};
  const areas: DbPrintArea[] = Array.isArray(data.print_areas) ? data.print_areas : [];
  for (const area of areas) {
    if (!area?.shape || !area.key) continue;

    // Only rects for now; polygons can be added later
    if (area.shape.type === 'rect' && area.shape.rect) {
      const { x, y, w, h } = area.shape.rect;
      bag[norm(area.key)] = {
        centerX: x + w / 2,
        centerY: y + h / 2,
        width: w,
        height: h,
      };
    }
  }
  cache.set(viewId, bag);
}

export function lookupDbBounds(printAreaId: string): PrintAreaBounds | null {
  const viewId = ctx.viewId;
  if (!viewId) return null;
  const bag = cache.get(viewId);
  if (!bag) return null;
  const key = resolveAlias(printAreaId);
  return bag[key] ?? null;
}
