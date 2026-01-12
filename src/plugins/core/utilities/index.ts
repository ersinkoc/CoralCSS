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
  ]
}

export default coreUtilitiesPlugins
