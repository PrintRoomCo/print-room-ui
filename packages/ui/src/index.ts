// Export all components
export * from "./components"

// Export utilities
export * from "./utils"

// Export hooks
export * from "./hooks"

// Export recolor utilities
export { paintBaseContainedAuto } from "./lib/recolor"

// Export canvas tint helpers
export {
  parseColor,
  buildFeatherMask,
  buildFeatherMaskFromAlpha,
  tintPreserveLuminance,
  applyAutoKeyTintToCanvas,
  multiplyLinear,
  adaptiveRecolor,
  applyTextureKeeperFromSource,
} from "./lib/canvasTint";

// Export color accuracy utilities
export {
  hexToOKLab,
  oklabDeltaE,
  maskedMeanOKLab,
  iterativeMeanMatch,
} from "./lib/color-accuracy"; 