/**
 * Core Utilities Plugins
 *
 * All core utility plugins for CoralCSS.
 * @module plugins/core/utilities
 */

export { spacingPlugin } from './spacing'
export { sizingPlugin } from './sizing'
export { colorsPlugin } from './colors'
export { typographyPlugin } from './typography'
export { layoutPlugin } from './layout'
export { flexboxPlugin } from './flexbox'
export { gridPlugin } from './grid'
export { bordersPlugin } from './borders'
export { effectsPlugin } from './effects'
export { filtersPlugin } from './filters'
export { transformsPlugin } from './transforms'
export { transitionsPlugin } from './transitions'
export { textShadowsPlugin } from './text-shadows'
export { interactivityPlugin } from './interactivity'
export { backgroundsPlugin } from './backgrounds'
export { accessibilityPlugin } from './accessibility'
export { svgPlugin } from './svg'
export { layersPlugin } from './layers'
export { printPlugin } from './print'
export { columnsPlugin } from './columns'
export { performancePlugin } from './performance'
export { masksPlugin } from './masks'
export { gradientsPlugin } from './gradients'
export { patternsPlugin } from './patterns'
// Phase 3: Innovative Features
export { advancedAnimationsPlugin } from './advanced-animations'
export { smartGridPlugin } from './smart-grid'
export { smartSpacingPlugin } from './smart-spacing'
export { adaptiveColorsPlugin } from './adaptive-colors'
// Additional utilities
export { extrasUtilitiesPlugin } from './extras'
export { motionPathPlugin } from './motion-path'
export { scrollDrivenAnimationsPlugin } from './scroll-driven'
export { interpolationPlugin } from './interpolation'
export { focusManagementPlugin } from './focus-management'
// Tailwind 4.1+ Compatible Utilities
export { transforms3DPlugin } from './transforms-3d'
export { advancedGradientsPlugin } from './gradients-advanced'
export { aspectRatioPlugin } from './aspect-ratio'
export { objectFitPlugin } from './object-fit'
export { lineClampPlugin } from './line-clamp'
export { textDecorationPlugin } from './text-decoration'
export { listStylePlugin } from './list-style'
export { accentColorPlugin } from './accent-color'
export { appearancePlugin } from './appearance'
export { blendingPlugin } from './blending'
// Additional Tailwind 4.1+ Compatible Utilities
export { formsPlugin } from './forms'
export { tablesPlugin } from './tables'
export { scrollbarPlugin } from './scrollbar'
export { scrollSnapPlugin } from './scroll-snap'
export { scrollBehaviorPlugin } from './scroll-behavior'
export { caretPlacePlugin } from './caret-place'
export { positioningPlugin } from './positioning'
export { typographyAdvancedPlugin } from './typography-advanced'
// CoralCSS Exclusive Features (Beyond Tailwind 4.1)
export { advancedEffectsPlugin } from './advanced-effects'
export { keyframesPlugin } from './keyframes'
export { logicalPropertiesPlugin } from './logical-properties'
export { interactiveUtilitiesPlugin } from './interactive'
// Tailwind 4.1+ Full Compatibility Layer
export { tailwind4CompatPlugin } from './tailwind4-compat'

import type { Plugin } from '../../../types'

import { spacingPlugin } from './spacing'
import { sizingPlugin } from './sizing'
import { colorsPlugin } from './colors'
import { typographyPlugin } from './typography'
import { layoutPlugin } from './layout'
import { flexboxPlugin } from './flexbox'
import { gridPlugin } from './grid'
import { bordersPlugin } from './borders'
import { effectsPlugin } from './effects'
import { filtersPlugin } from './filters'
import { transformsPlugin } from './transforms'
import { transitionsPlugin } from './transitions'
import { textShadowsPlugin } from './text-shadows'
import { interactivityPlugin } from './interactivity'
import { backgroundsPlugin } from './backgrounds'
import { accessibilityPlugin } from './accessibility'
import { svgPlugin } from './svg'
import { layersPlugin } from './layers'
import { printPlugin } from './print'
import { columnsPlugin } from './columns'
import { performancePlugin } from './performance'
import { masksPlugin } from './masks'
import { gradientsPlugin } from './gradients'
import { patternsPlugin } from './patterns'
// Phase 3: Innovative Features
import { advancedAnimationsPlugin } from './advanced-animations'
import { smartGridPlugin } from './smart-grid'
import { smartSpacingPlugin } from './smart-spacing'
import { adaptiveColorsPlugin } from './adaptive-colors'
// Additional utilities
import { extrasUtilitiesPlugin } from './extras'
import { motionPathPlugin } from './motion-path'
import { scrollDrivenAnimationsPlugin } from './scroll-driven'
import { interpolationPlugin } from './interpolation'
import { focusManagementPlugin } from './focus-management'
// Tailwind 4.1+ Compatible Utilities
import { transforms3DPlugin } from './transforms-3d'
import { advancedGradientsPlugin } from './gradients-advanced'
import { aspectRatioPlugin } from './aspect-ratio'
import { objectFitPlugin } from './object-fit'
import { lineClampPlugin } from './line-clamp'
import { textDecorationPlugin } from './text-decoration'
import { listStylePlugin } from './list-style'
import { accentColorPlugin } from './accent-color'
import { appearancePlugin } from './appearance'
import { blendingPlugin } from './blending'
// Additional Tailwind 4.1+ Compatible Utilities
import { formsPlugin } from './forms'
import { tablesPlugin } from './tables'
import { scrollbarPlugin } from './scrollbar'
import { scrollSnapPlugin } from './scroll-snap'
import { scrollBehaviorPlugin } from './scroll-behavior'
import { caretPlacePlugin } from './caret-place'
import { positioningPlugin } from './positioning'
import { typographyAdvancedPlugin } from './typography-advanced'
// CoralCSS Exclusive Features (Beyond Tailwind 4.1)
import { advancedEffectsPlugin } from './advanced-effects'
import { keyframesPlugin } from './keyframes'
import { logicalPropertiesPlugin } from './logical-properties'
import { interactiveUtilitiesPlugin } from './interactive'
// Tailwind 4.1+ Full Compatibility Layer
import { tailwind4CompatPlugin } from './tailwind4-compat'

/**
 * Get all core utility plugins
 */
export function coreUtilitiesPlugins(): Plugin[] {
  return [
    spacingPlugin(),
    sizingPlugin(),
    colorsPlugin(),
    typographyPlugin(),
    layoutPlugin(),
    flexboxPlugin(),
    gridPlugin(),
    bordersPlugin(),
    effectsPlugin(),
    filtersPlugin(),
    transformsPlugin(),
    transitionsPlugin(),
    textShadowsPlugin(),
    interactivityPlugin(),
    backgroundsPlugin(),
    accessibilityPlugin(),
    svgPlugin(),
    layersPlugin(),
    printPlugin(),
    columnsPlugin(),
    performancePlugin(),
    masksPlugin(),
    gradientsPlugin(),
    patternsPlugin(),
    // Phase 3: Innovative Features
    advancedAnimationsPlugin(),
    smartGridPlugin(),
    smartSpacingPlugin(),
    adaptiveColorsPlugin(),
    // Additional utilities
    extrasUtilitiesPlugin(),
    motionPathPlugin(),
    scrollDrivenAnimationsPlugin(),
    interpolationPlugin(),
    focusManagementPlugin(),
    // Tailwind 4.1+ Compatible Utilities
    transforms3DPlugin(),
    advancedGradientsPlugin(),
    aspectRatioPlugin(),
    objectFitPlugin(),
    lineClampPlugin(),
    textDecorationPlugin(),
    listStylePlugin(),
    accentColorPlugin(),
    appearancePlugin(),
    blendingPlugin(),
    // Additional Tailwind 4.1+ Compatible Utilities
    formsPlugin(),
    tablesPlugin(),
    scrollbarPlugin(),
    scrollSnapPlugin(),
    scrollBehaviorPlugin(),
    caretPlacePlugin(),
    positioningPlugin(),
    typographyAdvancedPlugin(),
    // CoralCSS Exclusive Features (Beyond Tailwind 4.1)
    advancedEffectsPlugin(),
    keyframesPlugin(),
    logicalPropertiesPlugin(),
    interactiveUtilitiesPlugin(),
    // Tailwind 4.1+ Full Compatibility Layer
    tailwind4CompatPlugin(),
  ]
}

export default coreUtilitiesPlugins
