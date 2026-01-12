/**
 * Flexbox Utilities Plugin
 *
 * Flexbox layout utilities.
 * @module plugins/core/utilities/flexbox
 */

import type { Plugin, Rule, PluginContext } from '../../../types'

/**
 * Flexbox utilities plugin
 */
export function flexboxPlugin(): Plugin {
  return {
    name: 'flexbox',
    version: '1.0.0',

    install(ctx: PluginContext) {
      const rules: Rule[] = []

      // Flex basis
      rules.push({ pattern: 'basis-0', properties: { 'flex-basis': '0px' } })
      rules.push({ pattern: 'basis-1', properties: { 'flex-basis': '0.25rem' } })
      rules.push({ pattern: 'basis-2', properties: { 'flex-basis': '0.5rem' } })
      rules.push({ pattern: 'basis-3', properties: { 'flex-basis': '0.75rem' } })
      rules.push({ pattern: 'basis-4', properties: { 'flex-basis': '1rem' } })
      rules.push({ pattern: 'basis-5', properties: { 'flex-basis': '1.25rem' } })
      rules.push({ pattern: 'basis-6', properties: { 'flex-basis': '1.5rem' } })
      rules.push({ pattern: 'basis-7', properties: { 'flex-basis': '1.75rem' } })
      rules.push({ pattern: 'basis-8', properties: { 'flex-basis': '2rem' } })
      rules.push({ pattern: 'basis-9', properties: { 'flex-basis': '2.25rem' } })
      rules.push({ pattern: 'basis-10', properties: { 'flex-basis': '2.5rem' } })
      rules.push({ pattern: 'basis-11', properties: { 'flex-basis': '2.75rem' } })
      rules.push({ pattern: 'basis-12', properties: { 'flex-basis': '3rem' } })
      rules.push({ pattern: 'basis-14', properties: { 'flex-basis': '3.5rem' } })
      rules.push({ pattern: 'basis-16', properties: { 'flex-basis': '4rem' } })
      rules.push({ pattern: 'basis-20', properties: { 'flex-basis': '5rem' } })
      rules.push({ pattern: 'basis-24', properties: { 'flex-basis': '6rem' } })
      rules.push({ pattern: 'basis-28', properties: { 'flex-basis': '7rem' } })
      rules.push({ pattern: 'basis-32', properties: { 'flex-basis': '8rem' } })
      rules.push({ pattern: 'basis-36', properties: { 'flex-basis': '9rem' } })
      rules.push({ pattern: 'basis-40', properties: { 'flex-basis': '10rem' } })
      rules.push({ pattern: 'basis-44', properties: { 'flex-basis': '11rem' } })
      rules.push({ pattern: 'basis-48', properties: { 'flex-basis': '12rem' } })
      rules.push({ pattern: 'basis-52', properties: { 'flex-basis': '13rem' } })
      rules.push({ pattern: 'basis-56', properties: { 'flex-basis': '14rem' } })
      rules.push({ pattern: 'basis-60', properties: { 'flex-basis': '15rem' } })
      rules.push({ pattern: 'basis-64', properties: { 'flex-basis': '16rem' } })
      rules.push({ pattern: 'basis-72', properties: { 'flex-basis': '18rem' } })
      rules.push({ pattern: 'basis-80', properties: { 'flex-basis': '20rem' } })
      rules.push({ pattern: 'basis-96', properties: { 'flex-basis': '24rem' } })
      rules.push({ pattern: 'basis-auto', properties: { 'flex-basis': 'auto' } })
      rules.push({ pattern: 'basis-px', properties: { 'flex-basis': '1px' } })
      rules.push({ pattern: 'basis-0.5', properties: { 'flex-basis': '0.125rem' } })
      rules.push({ pattern: 'basis-1.5', properties: { 'flex-basis': '0.375rem' } })
      rules.push({ pattern: 'basis-2.5', properties: { 'flex-basis': '0.625rem' } })
      rules.push({ pattern: 'basis-3.5', properties: { 'flex-basis': '0.875rem' } })
      rules.push({ pattern: 'basis-1/2', properties: { 'flex-basis': '50%' } })
      rules.push({ pattern: 'basis-1/3', properties: { 'flex-basis': '33.333333%' } })
      rules.push({ pattern: 'basis-2/3', properties: { 'flex-basis': '66.666667%' } })
      rules.push({ pattern: 'basis-1/4', properties: { 'flex-basis': '25%' } })
      rules.push({ pattern: 'basis-2/4', properties: { 'flex-basis': '50%' } })
      rules.push({ pattern: 'basis-3/4', properties: { 'flex-basis': '75%' } })
      rules.push({ pattern: 'basis-1/5', properties: { 'flex-basis': '20%' } })
      rules.push({ pattern: 'basis-2/5', properties: { 'flex-basis': '40%' } })
      rules.push({ pattern: 'basis-3/5', properties: { 'flex-basis': '60%' } })
      rules.push({ pattern: 'basis-4/5', properties: { 'flex-basis': '80%' } })
      rules.push({ pattern: 'basis-1/6', properties: { 'flex-basis': '16.666667%' } })
      rules.push({ pattern: 'basis-2/6', properties: { 'flex-basis': '33.333333%' } })
      rules.push({ pattern: 'basis-3/6', properties: { 'flex-basis': '50%' } })
      rules.push({ pattern: 'basis-4/6', properties: { 'flex-basis': '66.666667%' } })
      rules.push({ pattern: 'basis-5/6', properties: { 'flex-basis': '83.333333%' } })
      rules.push({ pattern: 'basis-1/12', properties: { 'flex-basis': '8.333333%' } })
      rules.push({ pattern: 'basis-2/12', properties: { 'flex-basis': '16.666667%' } })
      rules.push({ pattern: 'basis-3/12', properties: { 'flex-basis': '25%' } })
      rules.push({ pattern: 'basis-4/12', properties: { 'flex-basis': '33.333333%' } })
      rules.push({ pattern: 'basis-5/12', properties: { 'flex-basis': '41.666667%' } })
      rules.push({ pattern: 'basis-6/12', properties: { 'flex-basis': '50%' } })
      rules.push({ pattern: 'basis-7/12', properties: { 'flex-basis': '58.333333%' } })
      rules.push({ pattern: 'basis-8/12', properties: { 'flex-basis': '66.666667%' } })
      rules.push({ pattern: 'basis-9/12', properties: { 'flex-basis': '75%' } })
      rules.push({ pattern: 'basis-10/12', properties: { 'flex-basis': '83.333333%' } })
      rules.push({ pattern: 'basis-11/12', properties: { 'flex-basis': '91.666667%' } })
      rules.push({ pattern: 'basis-full', properties: { 'flex-basis': '100%' } })

      // Flex direction
      rules.push({ pattern: 'flex-row', properties: { 'flex-direction': 'row' } })
      rules.push({ pattern: 'flex-row-reverse', properties: { 'flex-direction': 'row-reverse' } })
      rules.push({ pattern: 'flex-col', properties: { 'flex-direction': 'column' } })
      rules.push({ pattern: 'flex-col-reverse', properties: { 'flex-direction': 'column-reverse' } })

      // Flex wrap
      rules.push({ pattern: 'flex-wrap', properties: { 'flex-wrap': 'wrap' } })
      rules.push({ pattern: 'flex-wrap-reverse', properties: { 'flex-wrap': 'wrap-reverse' } })
      rules.push({ pattern: 'flex-nowrap', properties: { 'flex-wrap': 'nowrap' } })

      // Flex (shorthand)
      rules.push({ pattern: 'flex-1', properties: { flex: '1 1 0%' } })
      rules.push({ pattern: 'flex-auto', properties: { flex: '1 1 auto' } })
      rules.push({ pattern: 'flex-initial', properties: { flex: '0 1 auto' } })
      rules.push({ pattern: 'flex-none', properties: { flex: 'none' } })

      // Flex grow
      rules.push({ pattern: 'grow', properties: { 'flex-grow': '1' } })
      rules.push({ pattern: 'grow-0', properties: { 'flex-grow': '0' } })

      // Flex shrink
      rules.push({ pattern: 'shrink', properties: { 'flex-shrink': '1' } })
      rules.push({ pattern: 'shrink-0', properties: { 'flex-shrink': '0' } })

      // Order
      rules.push({ pattern: 'order-1', properties: { order: '1' } })
      rules.push({ pattern: 'order-2', properties: { order: '2' } })
      rules.push({ pattern: 'order-3', properties: { order: '3' } })
      rules.push({ pattern: 'order-4', properties: { order: '4' } })
      rules.push({ pattern: 'order-5', properties: { order: '5' } })
      rules.push({ pattern: 'order-6', properties: { order: '6' } })
      rules.push({ pattern: 'order-7', properties: { order: '7' } })
      rules.push({ pattern: 'order-8', properties: { order: '8' } })
      rules.push({ pattern: 'order-9', properties: { order: '9' } })
      rules.push({ pattern: 'order-10', properties: { order: '10' } })
      rules.push({ pattern: 'order-11', properties: { order: '11' } })
      rules.push({ pattern: 'order-12', properties: { order: '12' } })
      rules.push({ pattern: 'order-first', properties: { order: '-9999' } })
      rules.push({ pattern: 'order-last', properties: { order: '9999' } })
      rules.push({ pattern: 'order-none', properties: { order: '0' } })
      rules.push({ pattern: '-order-1', properties: { order: '-1' } })
      rules.push({ pattern: '-order-2', properties: { order: '-2' } })
      rules.push({ pattern: '-order-3', properties: { order: '-3' } })
      rules.push({ pattern: '-order-4', properties: { order: '-4' } })
      rules.push({ pattern: '-order-5', properties: { order: '-5' } })
      rules.push({ pattern: '-order-6', properties: { order: '-6' } })
      rules.push({ pattern: '-order-7', properties: { order: '-7' } })
      rules.push({ pattern: '-order-8', properties: { order: '-8' } })
      rules.push({ pattern: '-order-9', properties: { order: '-9' } })
      rules.push({ pattern: '-order-10', properties: { order: '-10' } })
      rules.push({ pattern: '-order-11', properties: { order: '-11' } })
      rules.push({ pattern: '-order-12', properties: { order: '-12' } })

      // Justify content
      rules.push({ pattern: 'justify-normal', properties: { 'justify-content': 'normal' } })
      rules.push({ pattern: 'justify-start', properties: { 'justify-content': 'flex-start' } })
      rules.push({ pattern: 'justify-end', properties: { 'justify-content': 'flex-end' } })
      rules.push({ pattern: 'justify-center', properties: { 'justify-content': 'center' } })
      rules.push({ pattern: 'justify-between', properties: { 'justify-content': 'space-between' } })
      rules.push({ pattern: 'justify-around', properties: { 'justify-content': 'space-around' } })
      rules.push({ pattern: 'justify-evenly', properties: { 'justify-content': 'space-evenly' } })
      rules.push({ pattern: 'justify-stretch', properties: { 'justify-content': 'stretch' } })

      // Justify items
      rules.push({ pattern: 'justify-items-start', properties: { 'justify-items': 'start' } })
      rules.push({ pattern: 'justify-items-end', properties: { 'justify-items': 'end' } })
      rules.push({ pattern: 'justify-items-center', properties: { 'justify-items': 'center' } })
      rules.push({ pattern: 'justify-items-stretch', properties: { 'justify-items': 'stretch' } })

      // Justify self
      rules.push({ pattern: 'justify-self-auto', properties: { 'justify-self': 'auto' } })
      rules.push({ pattern: 'justify-self-start', properties: { 'justify-self': 'start' } })
      rules.push({ pattern: 'justify-self-end', properties: { 'justify-self': 'end' } })
      rules.push({ pattern: 'justify-self-center', properties: { 'justify-self': 'center' } })
      rules.push({ pattern: 'justify-self-stretch', properties: { 'justify-self': 'stretch' } })

      // Align content
      rules.push({ pattern: 'content-normal', properties: { 'align-content': 'normal' } })
      rules.push({ pattern: 'content-center', properties: { 'align-content': 'center' } })
      rules.push({ pattern: 'content-start', properties: { 'align-content': 'flex-start' } })
      rules.push({ pattern: 'content-end', properties: { 'align-content': 'flex-end' } })
      rules.push({ pattern: 'content-between', properties: { 'align-content': 'space-between' } })
      rules.push({ pattern: 'content-around', properties: { 'align-content': 'space-around' } })
      rules.push({ pattern: 'content-evenly', properties: { 'align-content': 'space-evenly' } })
      rules.push({ pattern: 'content-baseline', properties: { 'align-content': 'baseline' } })
      rules.push({ pattern: 'content-stretch', properties: { 'align-content': 'stretch' } })

      // Align items
      rules.push({ pattern: 'items-start', properties: { 'align-items': 'flex-start' } })
      rules.push({ pattern: 'items-end', properties: { 'align-items': 'flex-end' } })
      rules.push({ pattern: 'items-center', properties: { 'align-items': 'center' } })
      rules.push({ pattern: 'items-baseline', properties: { 'align-items': 'baseline' } })
      rules.push({ pattern: 'items-stretch', properties: { 'align-items': 'stretch' } })

      // SAFE ALIGNMENT (Tailwind 4.1+)
      // Last baseline alignment - aligns to last baseline instead of first
      rules.push({ pattern: 'items-baseline-last', properties: { 'align-items': 'last baseline' } })

      // Safe alignment - auto-switch to start on overflow (prevents overflow in both directions)
      rules.push({ pattern: 'justify-center-safe', properties: { 'justify-content': 'safe center' } })
      rules.push({ pattern: 'justify-start-safe', properties: { 'justify-content': 'safe flex-start' } })
      rules.push({ pattern: 'justify-end-safe', properties: { 'justify-content': 'safe flex-end' } })
      rules.push({ pattern: 'items-center-safe', properties: { 'align-items': 'safe center' } })
      rules.push({ pattern: 'items-start-safe', properties: { 'align-items': 'safe flex-start' } })
      rules.push({ pattern: 'items-end-safe', properties: { 'align-items': 'safe flex-end' } })

      // Align self
      rules.push({ pattern: 'self-auto', properties: { 'align-self': 'auto' } })
      rules.push({ pattern: 'self-start', properties: { 'align-self': 'flex-start' } })
      rules.push({ pattern: 'self-end', properties: { 'align-self': 'flex-end' } })
      rules.push({ pattern: 'self-center', properties: { 'align-self': 'center' } })
      rules.push({ pattern: 'self-stretch', properties: { 'align-self': 'stretch' } })
      rules.push({ pattern: 'self-baseline', properties: { 'align-self': 'baseline' } })

      // Safe alignment for align-self
      rules.push({ pattern: 'self-baseline-last', properties: { 'align-self': 'last baseline' } })
      rules.push({ pattern: 'self-center-safe', properties: { 'align-self': 'safe center' } })
      rules.push({ pattern: 'self-start-safe', properties: { 'align-self': 'safe flex-start' } })
      rules.push({ pattern: 'self-end-safe', properties: { 'align-self': 'safe flex-end' } })

      // Place content
      rules.push({ pattern: 'place-content-center', properties: { 'place-content': 'center' } })
      rules.push({ pattern: 'place-content-start', properties: { 'place-content': 'start' } })
      rules.push({ pattern: 'place-content-end', properties: { 'place-content': 'end' } })
      rules.push({ pattern: 'place-content-between', properties: { 'place-content': 'space-between' } })
      rules.push({ pattern: 'place-content-around', properties: { 'place-content': 'space-around' } })
      rules.push({ pattern: 'place-content-evenly', properties: { 'place-content': 'space-evenly' } })
      rules.push({ pattern: 'place-content-baseline', properties: { 'place-content': 'baseline' } })
      rules.push({ pattern: 'place-content-stretch', properties: { 'place-content': 'stretch' } })

      // Place items
      rules.push({ pattern: 'place-items-start', properties: { 'place-items': 'start' } })
      rules.push({ pattern: 'place-items-end', properties: { 'place-items': 'end' } })
      rules.push({ pattern: 'place-items-center', properties: { 'place-items': 'center' } })
      rules.push({ pattern: 'place-items-baseline', properties: { 'place-items': 'baseline' } })
      rules.push({ pattern: 'place-items-stretch', properties: { 'place-items': 'stretch' } })

      // Place self
      rules.push({ pattern: 'place-self-auto', properties: { 'place-self': 'auto' } })
      rules.push({ pattern: 'place-self-start', properties: { 'place-self': 'start' } })
      rules.push({ pattern: 'place-self-end', properties: { 'place-self': 'end' } })
      rules.push({ pattern: 'place-self-center', properties: { 'place-self': 'center' } })
      rules.push({ pattern: 'place-self-stretch', properties: { 'place-self': 'stretch' } })

      // Arbitrary values
      rules.push({
        pattern: /^basis-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { 'flex-basis': v } }
        },
      })
      rules.push({
        pattern: /^flex-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { flex: v } }
        },
      })
      rules.push({
        pattern: /^grow-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { 'flex-grow': v } }
        },
      })
      rules.push({
        pattern: /^shrink-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { 'flex-shrink': v } }
        },
      })
      rules.push({
        pattern: /^order-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { order: v } }
        },
      })

      // Register all rules
      for (const rule of rules) {
        ctx.addRule(rule)
      }
    },
  }
}

export default flexboxPlugin
