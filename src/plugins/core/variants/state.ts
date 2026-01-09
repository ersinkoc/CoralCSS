/**
 * State Variants Plugin
 *
 * ARIA attribute and data attribute variants.
 * Provides aria-*, data-* variants for accessible and state-driven styling.
 * @module plugins/core/variants/state
 */

import type { Plugin, Variant, PluginContext } from '../../../types'

/**
 * State variants plugin - aria-* and data-* attribute variants
 */
export function stateVariantsPlugin(): Plugin {
  return {
    name: 'state-variants',
    version: '1.0.0',

    install(ctx: PluginContext) {
      const variants: Variant[] = []

      // ========================================
      // ARIA Boolean Attribute Variants
      // ========================================

      // aria-checked
      variants.push({
        name: 'aria-checked',
        handler: (selector) => `${selector}[aria-checked="true"]`,
      })
      variants.push({
        name: 'aria-not-checked',
        handler: (selector) => `${selector}[aria-checked="false"]`,
      })
      variants.push({
        name: 'aria-mixed',
        handler: (selector) => `${selector}[aria-checked="mixed"]`,
      })

      // aria-disabled
      variants.push({
        name: 'aria-disabled',
        handler: (selector) => `${selector}[aria-disabled="true"]`,
      })
      variants.push({
        name: 'aria-enabled',
        handler: (selector) => `${selector}[aria-disabled="false"]`,
      })

      // aria-expanded
      variants.push({
        name: 'aria-expanded',
        handler: (selector) => `${selector}[aria-expanded="true"]`,
      })
      variants.push({
        name: 'aria-collapsed',
        handler: (selector) => `${selector}[aria-expanded="false"]`,
      })

      // aria-hidden
      variants.push({
        name: 'aria-hidden',
        handler: (selector) => `${selector}[aria-hidden="true"]`,
      })
      variants.push({
        name: 'aria-visible',
        handler: (selector) => `${selector}[aria-hidden="false"]`,
      })

      // aria-pressed
      variants.push({
        name: 'aria-pressed',
        handler: (selector) => `${selector}[aria-pressed="true"]`,
      })
      variants.push({
        name: 'aria-not-pressed',
        handler: (selector) => `${selector}[aria-pressed="false"]`,
      })

      // aria-selected
      variants.push({
        name: 'aria-selected',
        handler: (selector) => `${selector}[aria-selected="true"]`,
      })
      variants.push({
        name: 'aria-not-selected',
        handler: (selector) => `${selector}[aria-selected="false"]`,
      })

      // aria-current
      variants.push({
        name: 'aria-current',
        handler: (selector) => `${selector}[aria-current="true"]`,
      })
      variants.push({
        name: 'aria-current-page',
        handler: (selector) => `${selector}[aria-current="page"]`,
      })
      variants.push({
        name: 'aria-current-step',
        handler: (selector) => `${selector}[aria-current="step"]`,
      })
      variants.push({
        name: 'aria-current-location',
        handler: (selector) => `${selector}[aria-current="location"]`,
      })
      variants.push({
        name: 'aria-current-date',
        handler: (selector) => `${selector}[aria-current="date"]`,
      })
      variants.push({
        name: 'aria-current-time',
        handler: (selector) => `${selector}[aria-current="time"]`,
      })

      // aria-grabbed
      variants.push({
        name: 'aria-grabbed',
        handler: (selector) => `${selector}[aria-grabbed="true"]`,
      })
      variants.push({
        name: 'aria-not-grabbed',
        handler: (selector) => `${selector}[aria-grabbed="false"]`,
      })

      // aria-busy
      variants.push({
        name: 'aria-busy',
        handler: (selector) => `${selector}[aria-busy="true"]`,
      })
      variants.push({
        name: 'aria-not-busy',
        handler: (selector) => `${selector}[aria-busy="false"]`,
      })

      // aria-live
      variants.push({
        name: 'aria-live-polite',
        handler: (selector) => `${selector}[aria-live="polite"]`,
      })
      variants.push({
        name: 'aria-live-assertive',
        handler: (selector) => `${selector}[aria-live="assertive"]`,
      })
      variants.push({
        name: 'aria-live-off',
        handler: (selector) => `${selector}[aria-live="off"]`,
      })

      // aria-invalid
      variants.push({
        name: 'aria-invalid',
        handler: (selector) => `${selector}[aria-invalid="true"]`,
      })
      variants.push({
        name: 'aria-valid',
        handler: (selector) => `${selector}[aria-invalid="false"]`,
      })
      variants.push({
        name: 'aria-invalid-grammar',
        handler: (selector) => `${selector}[aria-invalid="grammar"]`,
      })
      variants.push({
        name: 'aria-invalid-spelling',
        handler: (selector) => `${selector}[aria-invalid="spelling"]`,
      })

      // aria-required
      variants.push({
        name: 'aria-required',
        handler: (selector) => `${selector}[aria-required="true"]`,
      })
      variants.push({
        name: 'aria-optional',
        handler: (selector) => `${selector}[aria-required="false"]`,
      })

      // aria-readonly
      variants.push({
        name: 'aria-readonly',
        handler: (selector) => `${selector}[aria-readonly="true"]`,
      })
      variants.push({
        name: 'aria-editable',
        handler: (selector) => `${selector}[aria-readonly="false"]`,
      })

      // aria-sort
      variants.push({
        name: 'aria-sort-ascending',
        handler: (selector) => `${selector}[aria-sort="ascending"]`,
      })
      variants.push({
        name: 'aria-sort-descending',
        handler: (selector) => `${selector}[aria-sort="descending"]`,
      })
      variants.push({
        name: 'aria-sort-none',
        handler: (selector) => `${selector}[aria-sort="none"]`,
      })
      variants.push({
        name: 'aria-sort-other',
        handler: (selector) => `${selector}[aria-sort="other"]`,
      })

      // aria-orientation
      variants.push({
        name: 'aria-horizontal',
        handler: (selector) => `${selector}[aria-orientation="horizontal"]`,
      })
      variants.push({
        name: 'aria-vertical',
        handler: (selector) => `${selector}[aria-orientation="vertical"]`,
      })

      // aria-autocomplete
      variants.push({
        name: 'aria-autocomplete-none',
        handler: (selector) => `${selector}[aria-autocomplete="none"]`,
      })
      variants.push({
        name: 'aria-autocomplete-list',
        handler: (selector) => `${selector}[aria-autocomplete="list"]`,
      })
      variants.push({
        name: 'aria-autocomplete-inline',
        handler: (selector) => `${selector}[aria-autocomplete="inline"]`,
      })
      variants.push({
        name: 'aria-autocomplete-both',
        handler: (selector) => `${selector}[aria-autocomplete="both"]`,
      })

      // aria-haspopup
      variants.push({
        name: 'aria-haspopup',
        handler: (selector) => `${selector}[aria-haspopup="true"]`,
      })
      variants.push({
        name: 'aria-haspopup-menu',
        handler: (selector) => `${selector}[aria-haspopup="menu"]`,
      })
      variants.push({
        name: 'aria-haspopup-dialog',
        handler: (selector) => `${selector}[aria-haspopup="dialog"]`,
      })
      variants.push({
        name: 'aria-haspopup-listbox',
        handler: (selector) => `${selector}[aria-haspopup="listbox"]`,
      })
      variants.push({
        name: 'aria-haspopup-tree',
        handler: (selector) => `${selector}[aria-haspopup="tree"]`,
      })
      variants.push({
        name: 'aria-haspopup-grid',
        handler: (selector) => `${selector}[aria-haspopup="grid"]`,
      })

      // aria-modal
      variants.push({
        name: 'aria-modal',
        handler: (selector) => `${selector}[aria-modal="true"]`,
      })

      // aria-multiselectable
      variants.push({
        name: 'aria-multiselectable',
        handler: (selector) => `${selector}[aria-multiselectable="true"]`,
      })

      // aria-multiline
      variants.push({
        name: 'aria-multiline',
        handler: (selector) => `${selector}[aria-multiline="true"]`,
      })

      // ========================================
      // Common Data Attribute Variants
      // ========================================

      // data-state (common in headless UI)
      variants.push({
        name: 'data-open',
        handler: (selector) => `${selector}[data-state="open"]`,
      })
      variants.push({
        name: 'data-closed',
        handler: (selector) => `${selector}[data-state="closed"]`,
      })
      variants.push({
        name: 'data-active',
        handler: (selector) => `${selector}[data-state="active"]`,
      })
      variants.push({
        name: 'data-inactive',
        handler: (selector) => `${selector}[data-state="inactive"]`,
      })
      variants.push({
        name: 'data-checked',
        handler: (selector) => `${selector}[data-state="checked"]`,
      })
      variants.push({
        name: 'data-unchecked',
        handler: (selector) => `${selector}[data-state="unchecked"]`,
      })
      variants.push({
        name: 'data-indeterminate',
        handler: (selector) => `${selector}[data-state="indeterminate"]`,
      })
      variants.push({
        name: 'data-on',
        handler: (selector) => `${selector}[data-state="on"]`,
      })
      variants.push({
        name: 'data-off',
        handler: (selector) => `${selector}[data-state="off"]`,
      })

      // data-orientation
      variants.push({
        name: 'data-horizontal',
        handler: (selector) => `${selector}[data-orientation="horizontal"]`,
      })
      variants.push({
        name: 'data-vertical',
        handler: (selector) => `${selector}[data-orientation="vertical"]`,
      })

      // data-side (popover positioning)
      variants.push({
        name: 'data-side-top',
        handler: (selector) => `${selector}[data-side="top"]`,
      })
      variants.push({
        name: 'data-side-bottom',
        handler: (selector) => `${selector}[data-side="bottom"]`,
      })
      variants.push({
        name: 'data-side-left',
        handler: (selector) => `${selector}[data-side="left"]`,
      })
      variants.push({
        name: 'data-side-right',
        handler: (selector) => `${selector}[data-side="right"]`,
      })

      // data-align (popover alignment)
      variants.push({
        name: 'data-align-start',
        handler: (selector) => `${selector}[data-align="start"]`,
      })
      variants.push({
        name: 'data-align-center',
        handler: (selector) => `${selector}[data-align="center"]`,
      })
      variants.push({
        name: 'data-align-end',
        handler: (selector) => `${selector}[data-align="end"]`,
      })

      // data-disabled
      variants.push({
        name: 'data-disabled',
        handler: (selector) => `${selector}[data-disabled]`,
      })

      // data-highlighted (for dropdown/combobox items)
      variants.push({
        name: 'data-highlighted',
        handler: (selector) => `${selector}[data-highlighted]`,
      })

      // data-selected
      variants.push({
        name: 'data-selected',
        handler: (selector) => `${selector}[data-selected]`,
      })

      // data-placeholder (for select)
      variants.push({
        name: 'data-placeholder',
        handler: (selector) => `${selector}[data-placeholder]`,
      })

      // data-loading
      variants.push({
        name: 'data-loading',
        handler: (selector) => `${selector}[data-loading]`,
      })

      // data-focus
      variants.push({
        name: 'data-focus',
        handler: (selector) => `${selector}[data-focus]`,
      })
      variants.push({
        name: 'data-focus-visible',
        handler: (selector) => `${selector}[data-focus-visible]`,
      })

      // data-pressed
      variants.push({
        name: 'data-pressed',
        handler: (selector) => `${selector}[data-pressed]`,
      })

      // data-dragging
      variants.push({
        name: 'data-dragging',
        handler: (selector) => `${selector}[data-dragging]`,
      })

      // data-resizing
      variants.push({
        name: 'data-resizing',
        handler: (selector) => `${selector}[data-resizing]`,
      })

      // data-swipe
      variants.push({
        name: 'data-swipe-start',
        handler: (selector) => `${selector}[data-swipe="start"]`,
      })
      variants.push({
        name: 'data-swipe-move',
        handler: (selector) => `${selector}[data-swipe="move"]`,
      })
      variants.push({
        name: 'data-swipe-end',
        handler: (selector) => `${selector}[data-swipe="end"]`,
      })
      variants.push({
        name: 'data-swipe-cancel',
        handler: (selector) => `${selector}[data-swipe="cancel"]`,
      })

      // data-swipe-direction
      variants.push({
        name: 'data-swipe-direction-up',
        handler: (selector) => `${selector}[data-swipe-direction="up"]`,
      })
      variants.push({
        name: 'data-swipe-direction-down',
        handler: (selector) => `${selector}[data-swipe-direction="down"]`,
      })
      variants.push({
        name: 'data-swipe-direction-left',
        handler: (selector) => `${selector}[data-swipe-direction="left"]`,
      })
      variants.push({
        name: 'data-swipe-direction-right',
        handler: (selector) => `${selector}[data-swipe-direction="right"]`,
      })

      // ========================================
      // Group ARIA Variants
      // ========================================

      variants.push({
        name: 'group-aria-expanded',
        handler: (selector) => `.group[aria-expanded="true"] ${selector}`,
      })
      variants.push({
        name: 'group-aria-collapsed',
        handler: (selector) => `.group[aria-expanded="false"] ${selector}`,
      })
      variants.push({
        name: 'group-aria-checked',
        handler: (selector) => `.group[aria-checked="true"] ${selector}`,
      })
      variants.push({
        name: 'group-aria-selected',
        handler: (selector) => `.group[aria-selected="true"] ${selector}`,
      })
      variants.push({
        name: 'group-aria-disabled',
        handler: (selector) => `.group[aria-disabled="true"] ${selector}`,
      })
      variants.push({
        name: 'group-aria-pressed',
        handler: (selector) => `.group[aria-pressed="true"] ${selector}`,
      })
      variants.push({
        name: 'group-aria-current',
        handler: (selector) => `.group[aria-current="true"] ${selector}`,
      })
      variants.push({
        name: 'group-aria-current-page',
        handler: (selector) => `.group[aria-current="page"] ${selector}`,
      })

      // ========================================
      // Group Data Variants
      // ========================================

      variants.push({
        name: 'group-data-open',
        handler: (selector) => `.group[data-state="open"] ${selector}`,
      })
      variants.push({
        name: 'group-data-closed',
        handler: (selector) => `.group[data-state="closed"] ${selector}`,
      })
      variants.push({
        name: 'group-data-active',
        handler: (selector) => `.group[data-state="active"] ${selector}`,
      })
      variants.push({
        name: 'group-data-checked',
        handler: (selector) => `.group[data-state="checked"] ${selector}`,
      })
      variants.push({
        name: 'group-data-disabled',
        handler: (selector) => `.group[data-disabled] ${selector}`,
      })
      variants.push({
        name: 'group-data-loading',
        handler: (selector) => `.group[data-loading] ${selector}`,
      })

      // ========================================
      // Peer ARIA Variants
      // ========================================

      variants.push({
        name: 'peer-aria-expanded',
        handler: (selector) => `.peer[aria-expanded="true"] ~ ${selector}`,
      })
      variants.push({
        name: 'peer-aria-collapsed',
        handler: (selector) => `.peer[aria-expanded="false"] ~ ${selector}`,
      })
      variants.push({
        name: 'peer-aria-checked',
        handler: (selector) => `.peer[aria-checked="true"] ~ ${selector}`,
      })
      variants.push({
        name: 'peer-aria-selected',
        handler: (selector) => `.peer[aria-selected="true"] ~ ${selector}`,
      })
      variants.push({
        name: 'peer-aria-disabled',
        handler: (selector) => `.peer[aria-disabled="true"] ~ ${selector}`,
      })

      // ========================================
      // Peer Data Variants
      // ========================================

      variants.push({
        name: 'peer-data-open',
        handler: (selector) => `.peer[data-state="open"] ~ ${selector}`,
      })
      variants.push({
        name: 'peer-data-closed',
        handler: (selector) => `.peer[data-state="closed"] ~ ${selector}`,
      })
      variants.push({
        name: 'peer-data-active',
        handler: (selector) => `.peer[data-state="active"] ~ ${selector}`,
      })
      variants.push({
        name: 'peer-data-checked',
        handler: (selector) => `.peer[data-state="checked"] ~ ${selector}`,
      })
      variants.push({
        name: 'peer-data-disabled',
        handler: (selector) => `.peer[data-disabled] ~ ${selector}`,
      })

      // ========================================
      // :has() ARIA/Data Variants (Modern CSS)
      // ========================================

      variants.push({
        name: 'has-aria-expanded',
        handler: (selector) => `${selector}:has([aria-expanded="true"])`,
      })
      variants.push({
        name: 'has-aria-checked',
        handler: (selector) => `${selector}:has([aria-checked="true"])`,
      })
      variants.push({
        name: 'has-aria-selected',
        handler: (selector) => `${selector}:has([aria-selected="true"])`,
      })
      variants.push({
        name: 'has-data-open',
        handler: (selector) => `${selector}:has([data-state="open"])`,
      })
      variants.push({
        name: 'has-data-active',
        handler: (selector) => `${selector}:has([data-state="active"])`,
      })
      variants.push({
        name: 'has-data-checked',
        handler: (selector) => `${selector}:has([data-state="checked"])`,
      })

      // ========================================
      // group-has-* Variants (Tailwind 4 parity)
      // Style based on whether group contains matching descendants
      // ========================================

      // group-has-* pseudo-class variants
      variants.push({
        name: 'group-has-hover',
        handler: (selector) => `.group:has(:hover) ${selector}`,
      })
      variants.push({
        name: 'group-has-focus',
        handler: (selector) => `.group:has(:focus) ${selector}`,
      })
      variants.push({
        name: 'group-has-focus-visible',
        handler: (selector) => `.group:has(:focus-visible) ${selector}`,
      })
      variants.push({
        name: 'group-has-active',
        handler: (selector) => `.group:has(:active) ${selector}`,
      })
      variants.push({
        name: 'group-has-checked',
        handler: (selector) => `.group:has(:checked) ${selector}`,
      })
      variants.push({
        name: 'group-has-disabled',
        handler: (selector) => `.group:has(:disabled) ${selector}`,
      })
      variants.push({
        name: 'group-has-invalid',
        handler: (selector) => `.group:has(:invalid) ${selector}`,
      })
      variants.push({
        name: 'group-has-valid',
        handler: (selector) => `.group:has(:valid) ${selector}`,
      })
      variants.push({
        name: 'group-has-required',
        handler: (selector) => `.group:has(:required) ${selector}`,
      })
      variants.push({
        name: 'group-has-placeholder-shown',
        handler: (selector) => `.group:has(:placeholder-shown) ${selector}`,
      })
      variants.push({
        name: 'group-has-empty',
        handler: (selector) => `.group:has(:empty) ${selector}`,
      })
      variants.push({
        name: 'group-has-indeterminate',
        handler: (selector) => `.group:has(:indeterminate) ${selector}`,
      })

      // group-has-* element/selector variants
      variants.push({
        name: 'group-has-input',
        handler: (selector) => `.group:has(input) ${selector}`,
      })
      variants.push({
        name: 'group-has-textarea',
        handler: (selector) => `.group:has(textarea) ${selector}`,
      })
      variants.push({
        name: 'group-has-select',
        handler: (selector) => `.group:has(select) ${selector}`,
      })
      variants.push({
        name: 'group-has-checkbox',
        handler: (selector) => `.group:has(input[type="checkbox"]) ${selector}`,
      })
      variants.push({
        name: 'group-has-radio',
        handler: (selector) => `.group:has(input[type="radio"]) ${selector}`,
      })
      variants.push({
        name: 'group-has-img',
        handler: (selector) => `.group:has(img) ${selector}`,
      })
      variants.push({
        name: 'group-has-svg',
        handler: (selector) => `.group:has(svg) ${selector}`,
      })
      variants.push({
        name: 'group-has-video',
        handler: (selector) => `.group:has(video) ${selector}`,
      })

      // group-has-* ARIA/data variants
      variants.push({
        name: 'group-has-aria-expanded',
        handler: (selector) => `.group:has([aria-expanded="true"]) ${selector}`,
      })
      variants.push({
        name: 'group-has-aria-checked',
        handler: (selector) => `.group:has([aria-checked="true"]) ${selector}`,
      })
      variants.push({
        name: 'group-has-aria-selected',
        handler: (selector) => `.group:has([aria-selected="true"]) ${selector}`,
      })
      variants.push({
        name: 'group-has-aria-disabled',
        handler: (selector) => `.group:has([aria-disabled="true"]) ${selector}`,
      })
      variants.push({
        name: 'group-has-data-open',
        handler: (selector) => `.group:has([data-state="open"]) ${selector}`,
      })
      variants.push({
        name: 'group-has-data-active',
        handler: (selector) => `.group:has([data-state="active"]) ${selector}`,
      })
      variants.push({
        name: 'group-has-data-checked',
        handler: (selector) => `.group:has([data-state="checked"]) ${selector}`,
      })

      // ========================================
      // peer-has-* Variants (Tailwind 4 parity)
      // Style based on whether sibling contains matching descendants
      // ========================================

      // peer-has-* pseudo-class variants
      variants.push({
        name: 'peer-has-hover',
        handler: (selector) => `.peer:has(:hover) ~ ${selector}`,
      })
      variants.push({
        name: 'peer-has-focus',
        handler: (selector) => `.peer:has(:focus) ~ ${selector}`,
      })
      variants.push({
        name: 'peer-has-focus-visible',
        handler: (selector) => `.peer:has(:focus-visible) ~ ${selector}`,
      })
      variants.push({
        name: 'peer-has-active',
        handler: (selector) => `.peer:has(:active) ~ ${selector}`,
      })
      variants.push({
        name: 'peer-has-checked',
        handler: (selector) => `.peer:has(:checked) ~ ${selector}`,
      })
      variants.push({
        name: 'peer-has-disabled',
        handler: (selector) => `.peer:has(:disabled) ~ ${selector}`,
      })
      variants.push({
        name: 'peer-has-invalid',
        handler: (selector) => `.peer:has(:invalid) ~ ${selector}`,
      })
      variants.push({
        name: 'peer-has-valid',
        handler: (selector) => `.peer:has(:valid) ~ ${selector}`,
      })
      variants.push({
        name: 'peer-has-required',
        handler: (selector) => `.peer:has(:required) ~ ${selector}`,
      })
      variants.push({
        name: 'peer-has-placeholder-shown',
        handler: (selector) => `.peer:has(:placeholder-shown) ~ ${selector}`,
      })
      variants.push({
        name: 'peer-has-empty',
        handler: (selector) => `.peer:has(:empty) ~ ${selector}`,
      })
      variants.push({
        name: 'peer-has-indeterminate',
        handler: (selector) => `.peer:has(:indeterminate) ~ ${selector}`,
      })

      // peer-has-* element/selector variants
      variants.push({
        name: 'peer-has-input',
        handler: (selector) => `.peer:has(input) ~ ${selector}`,
      })
      variants.push({
        name: 'peer-has-textarea',
        handler: (selector) => `.peer:has(textarea) ~ ${selector}`,
      })
      variants.push({
        name: 'peer-has-select',
        handler: (selector) => `.peer:has(select) ~ ${selector}`,
      })
      variants.push({
        name: 'peer-has-checkbox',
        handler: (selector) => `.peer:has(input[type="checkbox"]) ~ ${selector}`,
      })
      variants.push({
        name: 'peer-has-radio',
        handler: (selector) => `.peer:has(input[type="radio"]) ~ ${selector}`,
      })
      variants.push({
        name: 'peer-has-img',
        handler: (selector) => `.peer:has(img) ~ ${selector}`,
      })
      variants.push({
        name: 'peer-has-svg',
        handler: (selector) => `.peer:has(svg) ~ ${selector}`,
      })
      variants.push({
        name: 'peer-has-video',
        handler: (selector) => `.peer:has(video) ~ ${selector}`,
      })

      // peer-has-* ARIA/data variants
      variants.push({
        name: 'peer-has-aria-expanded',
        handler: (selector) => `.peer:has([aria-expanded="true"]) ~ ${selector}`,
      })
      variants.push({
        name: 'peer-has-aria-checked',
        handler: (selector) => `.peer:has([aria-checked="true"]) ~ ${selector}`,
      })
      variants.push({
        name: 'peer-has-aria-selected',
        handler: (selector) => `.peer:has([aria-selected="true"]) ~ ${selector}`,
      })
      variants.push({
        name: 'peer-has-aria-disabled',
        handler: (selector) => `.peer:has([aria-disabled="true"]) ~ ${selector}`,
      })
      variants.push({
        name: 'peer-has-data-open',
        handler: (selector) => `.peer:has([data-state="open"]) ~ ${selector}`,
      })
      variants.push({
        name: 'peer-has-data-active',
        handler: (selector) => `.peer:has([data-state="active"]) ~ ${selector}`,
      })
      variants.push({
        name: 'peer-has-data-checked',
        handler: (selector) => `.peer:has([data-state="checked"]) ~ ${selector}`,
      })

      // ========================================
      // :not() combination variants
      // ========================================

      variants.push({
        name: 'group-not-has-checked',
        handler: (selector) => `.group:not(:has(:checked)) ${selector}`,
      })
      variants.push({
        name: 'group-not-has-focus',
        handler: (selector) => `.group:not(:has(:focus)) ${selector}`,
      })
      variants.push({
        name: 'peer-not-has-checked',
        handler: (selector) => `.peer:not(:has(:checked)) ~ ${selector}`,
      })
      variants.push({
        name: 'peer-not-has-focus',
        handler: (selector) => `.peer:not(:has(:focus)) ~ ${selector}`,
      })

      // ========================================
      // Forced Colors Mode Variants (Tailwind 4 parity)
      // ========================================
      variants.push({
        name: 'forced-colors',
        handler: (selector) => `@media (forced-colors: active) { ${selector} }`,
      })
      variants.push({
        name: 'forced-colors-none',
        handler: (selector) => `@media (forced-colors: none) { ${selector} }`,
      })

      // ========================================
      // Contrast Preference Variants
      // ========================================
      variants.push({
        name: 'contrast-more',
        handler: (selector) => `@media (prefers-contrast: more) { ${selector} }`,
      })
      variants.push({
        name: 'contrast-less',
        handler: (selector) => `@media (prefers-contrast: less) { ${selector} }`,
      })
      variants.push({
        name: 'contrast-custom',
        handler: (selector) => `@media (prefers-contrast: custom) { ${selector} }`,
      })

      // ========================================
      // Transparency Preference Variants
      // ========================================
      variants.push({
        name: 'reduce-transparency',
        handler: (selector) => `@media (prefers-reduced-transparency: reduce) { ${selector} }`,
      })

      // ========================================
      // Color Scheme Preference Variants
      // ========================================
      variants.push({
        name: 'color-srgb',
        handler: (selector) => `@media (color-gamut: srgb) { ${selector} }`,
      })
      variants.push({
        name: 'color-p3',
        handler: (selector) => `@media (color-gamut: p3) { ${selector} }`,
      })
      variants.push({
        name: 'color-rec2020',
        handler: (selector) => `@media (color-gamut: rec2020) { ${selector} }`,
      })

      // ========================================
      // Display Mode Variants (for PWA)
      // ========================================
      variants.push({
        name: 'standalone',
        handler: (selector) => `@media (display-mode: standalone) { ${selector} }`,
      })
      variants.push({
        name: 'fullscreen',
        handler: (selector) => `@media (display-mode: fullscreen) { ${selector} }`,
      })
      variants.push({
        name: 'minimal-ui',
        handler: (selector) => `@media (display-mode: minimal-ui) { ${selector} }`,
      })
      variants.push({
        name: 'browser',
        handler: (selector) => `@media (display-mode: browser) { ${selector} }`,
      })
      variants.push({
        name: 'picture-in-picture',
        handler: (selector) => `@media (display-mode: picture-in-picture) { ${selector} }`,
      })

      // ========================================
      // Inverted Colors Variant
      // ========================================
      variants.push({
        name: 'inverted-colors',
        handler: (selector) => `@media (inverted-colors: inverted) { ${selector} }`,
      })

      // ========================================
      // Scripting Variants
      // ========================================
      variants.push({
        name: 'scripting-enabled',
        handler: (selector) => `@media (scripting: enabled) { ${selector} }`,
      })
      variants.push({
        name: 'scripting-none',
        handler: (selector) => `@media (scripting: none) { ${selector} }`,
      })
      variants.push({
        name: 'scripting-initial-only',
        handler: (selector) => `@media (scripting: initial-only) { ${selector} }`,
      })

      // ========================================
      // Pointer/Hover Capability Variants
      // ========================================
      variants.push({
        name: 'pointer-fine',
        handler: (selector) => `@media (pointer: fine) { ${selector} }`,
      })
      variants.push({
        name: 'pointer-coarse',
        handler: (selector) => `@media (pointer: coarse) { ${selector} }`,
      })
      variants.push({
        name: 'pointer-none',
        handler: (selector) => `@media (pointer: none) { ${selector} }`,
      })
      variants.push({
        name: 'any-pointer-fine',
        handler: (selector) => `@media (any-pointer: fine) { ${selector} }`,
      })
      variants.push({
        name: 'any-pointer-coarse',
        handler: (selector) => `@media (any-pointer: coarse) { ${selector} }`,
      })
      variants.push({
        name: 'hover-hover',
        handler: (selector) => `@media (hover: hover) { ${selector} }`,
      })
      variants.push({
        name: 'hover-none',
        handler: (selector) => `@media (hover: none) { ${selector} }`,
      })
      variants.push({
        name: 'any-hover-hover',
        handler: (selector) => `@media (any-hover: hover) { ${selector} }`,
      })
      variants.push({
        name: 'any-hover-none',
        handler: (selector) => `@media (any-hover: none) { ${selector} }`,
      })

      // ========================================
      // Update Frequency Variants
      // ========================================
      variants.push({
        name: 'update-fast',
        handler: (selector) => `@media (update: fast) { ${selector} }`,
      })
      variants.push({
        name: 'update-slow',
        handler: (selector) => `@media (update: slow) { ${selector} }`,
      })
      variants.push({
        name: 'update-none',
        handler: (selector) => `@media (update: none) { ${selector} }`,
      })

      // ========================================
      // DIRECTION VARIANTS (RTL/LTR Support)
      // ========================================

      variants.push({
        name: 'rtl',
        handler: (selector) => `[dir="rtl"] ${selector}, ${selector}:dir(rtl)`,
      })
      variants.push({
        name: 'ltr',
        handler: (selector) => `[dir="ltr"] ${selector}, ${selector}:dir(ltr)`,
      })

      // ========================================
      // OPEN/CLOSED STATE (HTML Details/Dialog)
      // ========================================

      variants.push({
        name: 'open',
        handler: (selector) => `${selector}[open], ${selector}:open`,
      })
      variants.push({
        name: 'closed',
        handler: (selector) => `${selector}:not([open]), ${selector}:closed`,
      })

      // Details/summary specific
      variants.push({
        name: 'details-open',
        handler: (selector) => `details[open] ${selector}`,
      })
      variants.push({
        name: 'dialog-open',
        handler: (selector) => `dialog[open] ${selector}`,
      })

      // ========================================
      // SELECTION VARIANTS
      // ========================================

      variants.push({
        name: 'selection',
        handler: (selector) => `${selector}::selection`,
      })
      variants.push({
        name: 'first-letter',
        handler: (selector) => `${selector}::first-letter`,
      })
      variants.push({
        name: 'first-line',
        handler: (selector) => `${selector}::first-line`,
      })

      // ========================================
      // MODAL BACKDROP VARIANTS
      // ========================================

      variants.push({
        name: 'backdrop',
        handler: (selector) => `${selector}::backdrop`,
      })

      // ========================================
      // ACCENT COLOR SCHEME VARIANTS (Beyond Tailwind 4)
      // ========================================

      // User color scheme preference
      variants.push({
        name: 'prefer-light',
        handler: (selector) => `@media (prefers-color-scheme: light) { ${selector} }`,
      })
      variants.push({
        name: 'prefer-dark',
        handler: (selector) => `@media (prefers-color-scheme: dark) { ${selector} }`,
      })

      // High dynamic range displays
      variants.push({
        name: 'hdr',
        handler: (selector) => `@media (dynamic-range: high) { ${selector} }`,
      })
      variants.push({
        name: 'sdr',
        handler: (selector) => `@media (dynamic-range: standard) { ${selector} }`,
      })

      // Video dynamic range
      variants.push({
        name: 'video-hdr',
        handler: (selector) => `@media (video-dynamic-range: high) { ${selector} }`,
      })
      variants.push({
        name: 'video-sdr',
        handler: (selector) => `@media (video-dynamic-range: standard) { ${selector} }`,
      })

      // ========================================
      // FORM STATE VARIANTS (Extended)
      // ========================================

      variants.push({
        name: 'autofill',
        handler: (selector) => `${selector}:autofill`,
      })
      variants.push({
        name: '-webkit-autofill',
        handler: (selector) => `${selector}:-webkit-autofill`,
      })
      variants.push({
        name: 'blank',
        handler: (selector) => `${selector}:blank`,
      })
      variants.push({
        name: 'user-invalid',
        handler: (selector) => `${selector}:user-invalid`,
      })
      variants.push({
        name: 'user-valid',
        handler: (selector) => `${selector}:user-valid`,
      })

      // ========================================
      // LINK STATE VARIANTS
      // ========================================

      variants.push({
        name: 'any-link',
        handler: (selector) => `${selector}:any-link`,
      })
      variants.push({
        name: 'local-link',
        handler: (selector) => `${selector}:local-link`,
      })

      // ========================================
      // FULLSCREEN VARIANTS
      // ========================================

      variants.push({
        name: 'fullscreen',
        handler: (selector) => `${selector}:fullscreen`,
      })
      variants.push({
        name: '-webkit-fullscreen',
        handler: (selector) => `${selector}:-webkit-full-screen`,
      })

      // ========================================
      // POPOVER VARIANTS (HTML Popover API)
      // ========================================

      variants.push({
        name: 'popover-open',
        handler: (selector) => `${selector}:popover-open`,
      })

      // ========================================
      // PICTURE-IN-PICTURE VARIANTS
      // ========================================

      variants.push({
        name: 'pip',
        handler: (selector) => `${selector}:picture-in-picture`,
      })

      // ========================================
      // PAUSED/PLAYING VARIANTS (Media)
      // ========================================

      variants.push({
        name: 'playing',
        handler: (selector) => `${selector}:playing`,
      })
      variants.push({
        name: 'paused',
        handler: (selector) => `${selector}:paused`,
      })
      variants.push({
        name: 'seeking',
        handler: (selector) => `${selector}:seeking`,
      })
      variants.push({
        name: 'buffering',
        handler: (selector) => `${selector}:buffering`,
      })
      variants.push({
        name: 'stalled',
        handler: (selector) => `${selector}:stalled`,
      })
      variants.push({
        name: 'muted',
        handler: (selector) => `${selector}:muted`,
      })
      variants.push({
        name: 'volume-locked',
        handler: (selector) => `${selector}:volume-locked`,
      })

      // ========================================
      // PAST/CURRENT/FUTURE VARIANTS (Timeline)
      // ========================================

      variants.push({
        name: 'past',
        handler: (selector) => `${selector}:past`,
      })
      variants.push({
        name: 'current',
        handler: (selector) => `${selector}:current`,
      })
      variants.push({
        name: 'future',
        handler: (selector) => `${selector}:future`,
      })

      // ========================================
      // STRUCTURAL VARIANTS (Extended)
      // ========================================

      variants.push({
        name: 'only',
        handler: (selector) => `${selector}:only-child`,
      })
      variants.push({
        name: 'first-of-type',
        handler: (selector) => `${selector}:first-of-type`,
      })
      variants.push({
        name: 'last-of-type',
        handler: (selector) => `${selector}:last-of-type`,
      })
      variants.push({
        name: 'only-of-type',
        handler: (selector) => `${selector}:only-of-type`,
      })

      // Nth-child variants
      variants.push({
        name: 'nth-2',
        handler: (selector) => `${selector}:nth-child(2)`,
      })
      variants.push({
        name: 'nth-3',
        handler: (selector) => `${selector}:nth-child(3)`,
      })
      variants.push({
        name: 'nth-4',
        handler: (selector) => `${selector}:nth-child(4)`,
      })
      variants.push({
        name: 'nth-5',
        handler: (selector) => `${selector}:nth-child(5)`,
      })

      // Nth-last-child variants
      variants.push({
        name: 'nth-last-2',
        handler: (selector) => `${selector}:nth-last-child(2)`,
      })
      variants.push({
        name: 'nth-last-3',
        handler: (selector) => `${selector}:nth-last-child(3)`,
      })

      // ========================================
      // TARGET VARIANTS
      // ========================================

      variants.push({
        name: 'target',
        handler: (selector) => `${selector}:target`,
      })
      variants.push({
        name: 'target-within',
        handler: (selector) => `${selector}:target-within`,
      })

      // ========================================
      // SCOPE VARIANT
      // ========================================

      variants.push({
        name: 'scope',
        handler: (selector) => `${selector}:scope`,
      })

      // ========================================
      // HOST VARIANTS (Shadow DOM)
      // ========================================

      variants.push({
        name: 'host',
        handler: (selector) => `:host(${selector})`,
      })
      variants.push({
        name: 'host-context',
        handler: (selector) => `:host-context(${selector})`,
      })

      // ========================================
      // DEFINED VARIANT (Custom Elements)
      // ========================================

      variants.push({
        name: 'defined',
        handler: (selector) => `${selector}:defined`,
      })

      // ========================================
      // STICKY STATE VARIANT (Intersection)
      // ========================================

      variants.push({
        name: 'stuck',
        handler: (selector) => `${selector}[data-stuck]`,
      })
      variants.push({
        name: 'stuck-top',
        handler: (selector) => `${selector}[data-stuck="top"]`,
      })
      variants.push({
        name: 'stuck-bottom',
        handler: (selector) => `${selector}[data-stuck="bottom"]`,
      })

      // ========================================
      // FILE SELECTOR VARIANTS
      // ========================================

      variants.push({
        name: 'file',
        handler: (selector) => `${selector}::file-selector-button`,
      })
      variants.push({
        name: 'file-hover',
        handler: (selector) => `${selector}::file-selector-button:hover`,
      })

      // ========================================
      // SLOT VARIANT (Shadow DOM)
      // ========================================

      variants.push({
        name: 'slotted',
        handler: (selector) => `::slotted(${selector})`,
      })

      // ========================================
      // CUE VARIANTS (WebVTT)
      // ========================================

      variants.push({
        name: 'cue',
        handler: (selector) => `${selector}::cue`,
      })
      variants.push({
        name: 'cue-region',
        handler: (selector) => `${selector}::cue-region`,
      })

      // ========================================
      // GRAMMAR/SPELLING VARIANTS
      // ========================================

      variants.push({
        name: 'spelling-error',
        handler: (selector) => `${selector}::spelling-error`,
      })
      variants.push({
        name: 'grammar-error',
        handler: (selector) => `${selector}::grammar-error`,
      })

      // ========================================
      // VIEW TIMELINE VARIANTS
      // ========================================

      variants.push({
        name: 'in-view',
        handler: (selector) => `${selector}[data-in-view]`,
      })
      variants.push({
        name: 'out-of-view',
        handler: (selector) => `${selector}:not([data-in-view])`,
      })

      // ========================================
      // ANIMATION STATE VARIANTS
      // ========================================

      variants.push({
        name: 'animating',
        handler: (selector) => `${selector}[data-animating]`,
      })
      variants.push({
        name: 'animation-paused',
        handler: (selector) => `${selector}[data-animation-state="paused"]`,
      })
      variants.push({
        name: 'animation-running',
        handler: (selector) => `${selector}[data-animation-state="running"]`,
      })

      // ========================================
      // OVERFLOWING STATE VARIANTS
      // ========================================

      variants.push({
        name: 'overflowing',
        handler: (selector) => `${selector}[data-overflowing]`,
      })
      variants.push({
        name: 'overflowing-x',
        handler: (selector) => `${selector}[data-overflowing-x]`,
      })
      variants.push({
        name: 'overflowing-y',
        handler: (selector) => `${selector}[data-overflowing-y]`,
      })

      // ========================================
      // TRUNCATED STATE VARIANT
      // ========================================

      variants.push({
        name: 'truncated',
        handler: (selector) => `${selector}[data-truncated]`,
      })

      // Register all variants
      for (const variant of variants) {
        ctx.addVariant(variant)
      }
    },
  }
}

export default stateVariantsPlugin
