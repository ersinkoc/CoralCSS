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
  ]
}

export default coreUtilitiesPlugins
