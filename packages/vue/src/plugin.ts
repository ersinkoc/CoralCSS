/**
 * CoralCSS Vue Plugin
 *
 * Plugin for global registration of CoralCSS Vue components.
 */

import type { App, Plugin } from 'vue'
import Button from './components/Button.vue'
import ButtonGroup from './components/ButtonGroup.vue'
import Dialog from './components/Dialog.vue'
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'
import Footer from './components/Footer.vue'

export interface CoralCSSPluginOptions {
  /**
   * Prefix for component names
   * @default 'Coral'
   */
  prefix?: string
}

/**
 * Vue plugin for CoralCSS
 *
 * @example
 * ```ts
 * import { createApp } from 'vue'
 * import { CoralCSSPlugin } from '@coral-css/vue'
 *
 * const app = createApp(App)
 * app.use(CoralCSSPlugin, { prefix: 'Coral' })
 * ```
 */
export const CoralCSSPlugin: Plugin = {
  install(app: App, options: CoralCSSPluginOptions = {}) {
    const prefix = options.prefix ?? 'Coral'

    // Register components globally
    app.component(`${prefix}Button`, Button)
    app.component(`${prefix}ButtonGroup`, ButtonGroup)
    app.component(`${prefix}Dialog`, Dialog)
    app.component(`${prefix}Navbar`, Navbar)
    app.component(`${prefix}Sidebar`, Sidebar)
    app.component(`${prefix}Footer`, Footer)
  },
}

export default CoralCSSPlugin
