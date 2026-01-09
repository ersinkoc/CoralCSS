/**
 * Animations Plugin
 *
 * Comprehensive animation utilities for CoralCSS.
 * Includes keyframes, animation utilities, and pre-built animations.
 * @module plugins/optional/animations
 */

import type { Plugin, Rule, PluginContext } from '../../types'

/**
 * Animation configuration options
 */
export interface AnimationsPluginOptions {
  /** Include entrance animations */
  entrance?: boolean
  /** Include exit animations */
  exit?: boolean
  /** Include attention-seeking animations */
  attention?: boolean
  /** Include loading animations */
  loading?: boolean
  /** Include scroll-based animations */
  scroll?: boolean
  /** Custom keyframes to add */
  customKeyframes?: Record<string, string>
}

/**
 * Predefined keyframes
 */
const keyframes = {
  // Basic animations
  spin: `@keyframes spin {
  to { transform: rotate(360deg); }
}`,
  ping: `@keyframes ping {
  75%, 100% { transform: scale(2); opacity: 0; }
}`,
  pulse: `@keyframes pulse {
  50% { opacity: .5; }
}`,
  bounce: `@keyframes bounce {
  0%, 100% { transform: translateY(-25%); animation-timing-function: cubic-bezier(0.8,0,1,1); }
  50% { transform: none; animation-timing-function: cubic-bezier(0,0,0.2,1); }
}`,

  // Entrance animations
  fadeIn: `@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}`,
  fadeInUp: `@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}`,
  fadeInDown: `@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}`,
  fadeInLeft: `@keyframes fadeInLeft {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}`,
  fadeInRight: `@keyframes fadeInRight {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}`,
  slideInUp: `@keyframes slideInUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}`,
  slideInDown: `@keyframes slideInDown {
  from { transform: translateY(-100%); }
  to { transform: translateY(0); }
}`,
  slideInLeft: `@keyframes slideInLeft {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}`,
  slideInRight: `@keyframes slideInRight {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}`,
  scaleIn: `@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}`,
  scaleInUp: `@keyframes scaleInUp {
  from { opacity: 0; transform: scale(0.9) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}`,
  zoomIn: `@keyframes zoomIn {
  from { opacity: 0; transform: scale(0.5); }
  to { opacity: 1; transform: scale(1); }
}`,
  flipInX: `@keyframes flipInX {
  from { opacity: 0; transform: perspective(400px) rotateX(90deg); }
  to { opacity: 1; transform: perspective(400px) rotateX(0); }
}`,
  flipInY: `@keyframes flipInY {
  from { opacity: 0; transform: perspective(400px) rotateY(90deg); }
  to { opacity: 1; transform: perspective(400px) rotateY(0); }
}`,

  // Exit animations
  fadeOut: `@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}`,
  fadeOutUp: `@keyframes fadeOutUp {
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-20px); }
}`,
  fadeOutDown: `@keyframes fadeOutDown {
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(20px); }
}`,
  fadeOutLeft: `@keyframes fadeOutLeft {
  from { opacity: 1; transform: translateX(0); }
  to { opacity: 0; transform: translateX(-20px); }
}`,
  fadeOutRight: `@keyframes fadeOutRight {
  from { opacity: 1; transform: translateX(0); }
  to { opacity: 0; transform: translateX(20px); }
}`,
  slideOutUp: `@keyframes slideOutUp {
  from { transform: translateY(0); }
  to { transform: translateY(-100%); }
}`,
  slideOutDown: `@keyframes slideOutDown {
  from { transform: translateY(0); }
  to { transform: translateY(100%); }
}`,
  slideOutLeft: `@keyframes slideOutLeft {
  from { transform: translateX(0); }
  to { transform: translateX(-100%); }
}`,
  slideOutRight: `@keyframes slideOutRight {
  from { transform: translateX(0); }
  to { transform: translateX(100%); }
}`,
  scaleOut: `@keyframes scaleOut {
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.9); }
}`,
  zoomOut: `@keyframes zoomOut {
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.5); }
}`,

  // Attention seekers
  shake: `@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}`,
  wiggle: `@keyframes wiggle {
  0%, 100% { transform: rotate(-3deg); }
  50% { transform: rotate(3deg); }
}`,
  swing: `@keyframes swing {
  20% { transform: rotate(15deg); }
  40% { transform: rotate(-10deg); }
  60% { transform: rotate(5deg); }
  80% { transform: rotate(-5deg); }
  100% { transform: rotate(0deg); }
}`,
  tada: `@keyframes tada {
  0% { transform: scale(1); }
  10%, 20% { transform: scale(0.9) rotate(-3deg); }
  30%, 50%, 70%, 90% { transform: scale(1.1) rotate(3deg); }
  40%, 60%, 80% { transform: scale(1.1) rotate(-3deg); }
  100% { transform: scale(1) rotate(0); }
}`,
  wobble: `@keyframes wobble {
  0% { transform: translateX(0%); }
  15% { transform: translateX(-25%) rotate(-5deg); }
  30% { transform: translateX(20%) rotate(3deg); }
  45% { transform: translateX(-15%) rotate(-3deg); }
  60% { transform: translateX(10%) rotate(2deg); }
  75% { transform: translateX(-5%) rotate(-1deg); }
  100% { transform: translateX(0%); }
}`,
  jello: `@keyframes jello {
  0%, 11.1%, 100% { transform: none; }
  22.2% { transform: skewX(-12.5deg) skewY(-12.5deg); }
  33.3% { transform: skewX(6.25deg) skewY(6.25deg); }
  44.4% { transform: skewX(-3.125deg) skewY(-3.125deg); }
  55.5% { transform: skewX(1.5625deg) skewY(1.5625deg); }
  66.6% { transform: skewX(-0.78125deg) skewY(-0.78125deg); }
  77.7% { transform: skewX(0.390625deg) skewY(0.390625deg); }
  88.8% { transform: skewX(-0.1953125deg) skewY(-0.1953125deg); }
}`,
  heartbeat: `@keyframes heartbeat {
  0% { transform: scale(1); }
  14% { transform: scale(1.3); }
  28% { transform: scale(1); }
  42% { transform: scale(1.3); }
  70% { transform: scale(1); }
}`,
  rubber: `@keyframes rubber {
  0% { transform: scale(1, 1); }
  30% { transform: scale(1.25, 0.75); }
  40% { transform: scale(0.75, 1.25); }
  50% { transform: scale(1.15, 0.85); }
  65% { transform: scale(0.95, 1.05); }
  75% { transform: scale(1.05, 0.95); }
  100% { transform: scale(1, 1); }
}`,
  flash: `@keyframes flash {
  0%, 50%, 100% { opacity: 1; }
  25%, 75% { opacity: 0; }
}`,

  // Loading animations
  spinner: `@keyframes spinner {
  to { transform: rotate(360deg); }
}`,
  dots: `@keyframes dots {
  0%, 20% { opacity: 0; transform: scale(0); }
  50% { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(0); }
}`,
  progress: `@keyframes progress {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(400%); }
}`,
  skeleton: `@keyframes skeleton {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}`,
  shimmer: `@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}`,

  // Special effects
  float: `@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}`,
  breathe: `@keyframes breathe {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}`,
  glow: `@keyframes glow {
  0%, 100% { box-shadow: 0 0 5px hsl(var(--primary) / 0.5); }
  50% { box-shadow: 0 0 20px hsl(var(--primary) / 0.8); }
}`,
  marquee: `@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}`,
  scrollX: `@keyframes scrollX {
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
}`,
  scrollY: `@keyframes scrollY {
  0% { transform: translateY(0); }
  100% { transform: translateY(-100%); }
}`,

  // Advanced/Modern animations
  morph: `@keyframes morph {
  0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
  50% { border-radius: 50% 60% 30% 60% / 30% 60% 70% 40%; }
  75% { border-radius: 60% 40% 60% 30% / 60% 50% 40% 70%; }
}`,
  blob: `@keyframes blob {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(20px, -30px) scale(1.1); }
  50% { transform: translate(-20px, 20px) scale(0.9); }
  75% { transform: translate(30px, 20px) scale(1.05); }
}`,
  gradient: `@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}`,
  typing: `@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
}`,
  blink: `@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}`,
  reveal: `@keyframes reveal {
  from { clip-path: inset(0 100% 0 0); }
  to { clip-path: inset(0 0 0 0); }
}`,
  unreveal: `@keyframes unreveal {
  from { clip-path: inset(0 0 0 0); }
  to { clip-path: inset(0 100% 0 0); }
}`,
  ripple: `@keyframes ripple {
  to { transform: scale(4); opacity: 0; }
}`,
  wave: `@keyframes wave {
  0%, 60%, 100% { transform: initial; }
  30% { transform: translateY(-15px); }
}`,
  glitch: `@keyframes glitch {
  0%, 100% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
}`,
  neon: `@keyframes neon {
  0%, 100% { text-shadow: 0 0 5px hsl(var(--primary)), 0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary)); }
  50% { text-shadow: 0 0 2px hsl(var(--primary)), 0 0 5px hsl(var(--primary)), 0 0 10px hsl(var(--primary)); }
}`,
  rainbow: `@keyframes rainbow {
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}`,
  orbit: `@keyframes orbit {
  0% { transform: rotate(0deg) translateX(50px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(50px) rotate(-360deg); }
}`,
  tilt: `@keyframes tilt {
  0%, 50%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(5deg); }
  75% { transform: rotate(-5deg); }
}`,
  elastic: `@keyframes elastic {
  0% { transform: scale(1); }
  30% { transform: scale(1.25); }
  40% { transform: scale(0.75); }
  50% { transform: scale(1.15); }
  65% { transform: scale(0.95); }
  75% { transform: scale(1.05); }
  100% { transform: scale(1); }
}`,
  pop: `@keyframes pop {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}`,
  slideUpBounce: `@keyframes slideUpBounce {
  0% { transform: translateY(100%); opacity: 0; }
  50% { transform: translateY(-10%); }
  70% { transform: translateY(5%); }
  100% { transform: translateY(0); opacity: 1; }
}`,
  flip3D: `@keyframes flip3D {
  0% { transform: perspective(400px) rotateY(0); }
  100% { transform: perspective(400px) rotateY(360deg); }
}`,
  rotateIn3D: `@keyframes rotateIn3D {
  0% { transform: perspective(1000px) rotateX(-90deg); opacity: 0; }
  40% { transform: perspective(1000px) rotateX(20deg); }
  60% { transform: perspective(1000px) rotateX(-10deg); }
  80% { transform: perspective(1000px) rotateX(5deg); opacity: 1; }
  100% { transform: perspective(1000px) rotateX(0); }
}`,
}

/**
 * Animations plugin
 */
export function animationsPlugin(options: AnimationsPluginOptions = {}): Plugin {
  const {
    entrance = true,
    exit = true,
    attention = true,
    loading = true,
    scroll = true,
    customKeyframes = {},
  } = options

  return {
    name: 'animations',
    version: '1.0.0',

    install(ctx: PluginContext) {
      const rules: Rule[] = []

      // Note: Keyframes are exported separately via getAnimationKeyframes()
      // Users should include them in their CSS build or use generateAnimationCSS()

      // Basic animations
      rules.push({ pattern: 'animate-none', properties: { animation: 'none' } })
      rules.push({ pattern: 'animate-spin', properties: { animation: 'spin 1s linear infinite' } })
      rules.push({ pattern: 'animate-ping', properties: { animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite' } })
      rules.push({ pattern: 'animate-pulse', properties: { animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' } })
      rules.push({ pattern: 'animate-bounce', properties: { animation: 'bounce 1s infinite' } })

      // Entrance animations
      if (entrance) {
        rules.push({ pattern: 'animate-fade-in', properties: { animation: 'fadeIn 0.3s ease-out' } })
        rules.push({ pattern: 'animate-fade-in-up', properties: { animation: 'fadeInUp 0.3s ease-out' } })
        rules.push({ pattern: 'animate-fade-in-down', properties: { animation: 'fadeInDown 0.3s ease-out' } })
        rules.push({ pattern: 'animate-fade-in-left', properties: { animation: 'fadeInLeft 0.3s ease-out' } })
        rules.push({ pattern: 'animate-fade-in-right', properties: { animation: 'fadeInRight 0.3s ease-out' } })
        rules.push({ pattern: 'animate-slide-in-up', properties: { animation: 'slideInUp 0.3s ease-out' } })
        rules.push({ pattern: 'animate-slide-in-down', properties: { animation: 'slideInDown 0.3s ease-out' } })
        rules.push({ pattern: 'animate-slide-in-left', properties: { animation: 'slideInLeft 0.3s ease-out' } })
        rules.push({ pattern: 'animate-slide-in-right', properties: { animation: 'slideInRight 0.3s ease-out' } })
        rules.push({ pattern: 'animate-scale-in', properties: { animation: 'scaleIn 0.2s ease-out' } })
        rules.push({ pattern: 'animate-scale-in-up', properties: { animation: 'scaleInUp 0.2s ease-out' } })
        rules.push({ pattern: 'animate-zoom-in', properties: { animation: 'zoomIn 0.3s ease-out' } })
        rules.push({ pattern: 'animate-flip-in-x', properties: { animation: 'flipInX 0.5s ease-out' } })
        rules.push({ pattern: 'animate-flip-in-y', properties: { animation: 'flipInY 0.5s ease-out' } })
      }

      // Exit animations
      if (exit) {
        rules.push({ pattern: 'animate-fade-out', properties: { animation: 'fadeOut 0.3s ease-in' } })
        rules.push({ pattern: 'animate-fade-out-up', properties: { animation: 'fadeOutUp 0.3s ease-in' } })
        rules.push({ pattern: 'animate-fade-out-down', properties: { animation: 'fadeOutDown 0.3s ease-in' } })
        rules.push({ pattern: 'animate-fade-out-left', properties: { animation: 'fadeOutLeft 0.3s ease-in' } })
        rules.push({ pattern: 'animate-fade-out-right', properties: { animation: 'fadeOutRight 0.3s ease-in' } })
        rules.push({ pattern: 'animate-slide-out-up', properties: { animation: 'slideOutUp 0.3s ease-in' } })
        rules.push({ pattern: 'animate-slide-out-down', properties: { animation: 'slideOutDown 0.3s ease-in' } })
        rules.push({ pattern: 'animate-slide-out-left', properties: { animation: 'slideOutLeft 0.3s ease-in' } })
        rules.push({ pattern: 'animate-slide-out-right', properties: { animation: 'slideOutRight 0.3s ease-in' } })
        rules.push({ pattern: 'animate-scale-out', properties: { animation: 'scaleOut 0.2s ease-in' } })
        rules.push({ pattern: 'animate-zoom-out', properties: { animation: 'zoomOut 0.3s ease-in' } })
      }

      // Attention seekers
      if (attention) {
        rules.push({ pattern: 'animate-shake', properties: { animation: 'shake 0.5s ease-in-out' } })
        rules.push({ pattern: 'animate-wiggle', properties: { animation: 'wiggle 0.3s ease-in-out infinite' } })
        rules.push({ pattern: 'animate-swing', properties: { animation: 'swing 1s ease-in-out' } })
        rules.push({ pattern: 'animate-tada', properties: { animation: 'tada 1s ease-in-out' } })
        rules.push({ pattern: 'animate-wobble', properties: { animation: 'wobble 1s ease-in-out' } })
        rules.push({ pattern: 'animate-jello', properties: { animation: 'jello 1s ease-in-out' } })
        rules.push({ pattern: 'animate-heartbeat', properties: { animation: 'heartbeat 1.5s ease-in-out infinite' } })
        rules.push({ pattern: 'animate-rubber', properties: { animation: 'rubber 1s ease-in-out' } })
        rules.push({ pattern: 'animate-flash', properties: { animation: 'flash 1s ease-in-out' } })
      }

      // Loading animations
      if (loading) {
        rules.push({ pattern: 'animate-spinner', properties: { animation: 'spinner 0.75s linear infinite' } })
        rules.push({ pattern: 'animate-dots', properties: { animation: 'dots 1.4s ease-in-out infinite both' } })
        rules.push({ pattern: 'animate-progress', properties: { animation: 'progress 1.5s ease-in-out infinite' } })
        rules.push({ pattern: 'animate-skeleton', properties: { animation: 'skeleton 2s ease-in-out infinite', background: 'linear-gradient(90deg, hsl(var(--muted)) 25%, hsl(var(--muted-foreground) / 0.1) 50%, hsl(var(--muted)) 75%)', 'background-size': '200% 100%' } })
        rules.push({ pattern: 'animate-shimmer', properties: { animation: 'shimmer 2s linear infinite', background: 'linear-gradient(90deg, transparent 25%, hsl(var(--foreground) / 0.1) 50%, transparent 75%)', 'background-size': '200% 100%' } })
      }

      // Special effects
      rules.push({ pattern: 'animate-float', properties: { animation: 'float 3s ease-in-out infinite' } })
      rules.push({ pattern: 'animate-breathe', properties: { animation: 'breathe 4s ease-in-out infinite' } })
      rules.push({ pattern: 'animate-glow', properties: { animation: 'glow 2s ease-in-out infinite' } })

      // Advanced/Modern animations
      rules.push({ pattern: 'animate-morph', properties: { animation: 'morph 8s ease-in-out infinite' } })
      rules.push({ pattern: 'animate-blob', properties: { animation: 'blob 7s infinite' } })
      rules.push({ pattern: 'animate-gradient', properties: { animation: 'gradient 4s ease infinite', 'background-size': '200% 200%' } })
      rules.push({ pattern: 'animate-typing', properties: { animation: 'typing 3s steps(30, end)', overflow: 'hidden', 'white-space': 'nowrap' } })
      rules.push({ pattern: 'animate-blink', properties: { animation: 'blink 1s step-end infinite' } })
      rules.push({ pattern: 'animate-reveal', properties: { animation: 'reveal 1s ease-out forwards' } })
      rules.push({ pattern: 'animate-unreveal', properties: { animation: 'unreveal 1s ease-in forwards' } })
      rules.push({ pattern: 'animate-ripple', properties: { animation: 'ripple 0.6s ease-out' } })
      rules.push({ pattern: 'animate-wave', properties: { animation: 'wave 1.2s ease-in-out infinite' } })
      rules.push({ pattern: 'animate-glitch', properties: { animation: 'glitch 0.5s ease-in-out infinite' } })
      rules.push({ pattern: 'animate-neon', properties: { animation: 'neon 1.5s ease-in-out infinite' } })
      rules.push({ pattern: 'animate-rainbow', properties: { animation: 'rainbow 3s linear infinite' } })
      rules.push({ pattern: 'animate-orbit', properties: { animation: 'orbit 4s linear infinite' } })
      rules.push({ pattern: 'animate-tilt', properties: { animation: 'tilt 1s ease-in-out infinite' } })
      rules.push({ pattern: 'animate-elastic', properties: { animation: 'elastic 1s ease-out' } })
      rules.push({ pattern: 'animate-pop', properties: { animation: 'pop 0.3s ease-out' } })
      rules.push({ pattern: 'animate-slide-up-bounce', properties: { animation: 'slideUpBounce 0.6s ease-out' } })
      rules.push({ pattern: 'animate-flip-3d', properties: { animation: 'flip3D 1s ease-in-out' } })
      rules.push({ pattern: 'animate-rotate-in-3d', properties: { animation: 'rotateIn3D 0.8s ease-out' } })

      // Marquee/scroll animations
      if (scroll) {
        rules.push({ pattern: 'animate-marquee', properties: { animation: 'marquee 20s linear infinite' } })
        rules.push({ pattern: 'animate-marquee-fast', properties: { animation: 'marquee 10s linear infinite' } })
        rules.push({ pattern: 'animate-marquee-slow', properties: { animation: 'marquee 40s linear infinite' } })
        rules.push({ pattern: 'animate-scroll-x', properties: { animation: 'scrollX 20s linear infinite' } })
        rules.push({ pattern: 'animate-scroll-y', properties: { animation: 'scrollY 20s linear infinite' } })
      }

      // Animation duration utilities
      const durations = ['75', '100', '150', '200', '300', '500', '700', '1000']
      for (const d of durations) {
        rules.push({
          pattern: `duration-${d}`,
          properties: { 'animation-duration': `${d}ms` },
        })
      }

      // Animation delay utilities
      const delays = ['75', '100', '150', '200', '300', '500', '700', '1000']
      for (const d of delays) {
        rules.push({
          pattern: `delay-${d}`,
          properties: { 'animation-delay': `${d}ms` },
        })
      }

      // Animation iteration count
      rules.push({ pattern: 'animate-infinite', properties: { 'animation-iteration-count': 'infinite' } })
      rules.push({ pattern: 'animate-once', properties: { 'animation-iteration-count': '1' } })
      rules.push({ pattern: 'animate-twice', properties: { 'animation-iteration-count': '2' } })

      // Animation direction
      rules.push({ pattern: 'animate-normal', properties: { 'animation-direction': 'normal' } })
      rules.push({ pattern: 'animate-reverse', properties: { 'animation-direction': 'reverse' } })
      rules.push({ pattern: 'animate-alternate', properties: { 'animation-direction': 'alternate' } })
      rules.push({ pattern: 'animate-alternate-reverse', properties: { 'animation-direction': 'alternate-reverse' } })

      // Animation timing function
      rules.push({ pattern: 'ease-linear', properties: { 'animation-timing-function': 'linear' } })
      rules.push({ pattern: 'ease-in', properties: { 'animation-timing-function': 'cubic-bezier(0.4, 0, 1, 1)' } })
      rules.push({ pattern: 'ease-out', properties: { 'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)' } })
      rules.push({ pattern: 'ease-in-out', properties: { 'animation-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)' } })

      // Animation fill mode
      rules.push({ pattern: 'fill-none', properties: { 'animation-fill-mode': 'none' } })
      rules.push({ pattern: 'fill-forwards', properties: { 'animation-fill-mode': 'forwards' } })
      rules.push({ pattern: 'fill-backwards', properties: { 'animation-fill-mode': 'backwards' } })
      rules.push({ pattern: 'fill-both', properties: { 'animation-fill-mode': 'both' } })

      // Animation play state
      rules.push({ pattern: 'animate-running', properties: { 'animation-play-state': 'running' } })
      rules.push({ pattern: 'animate-paused', properties: { 'animation-play-state': 'paused' } })

      // Arbitrary animation
      rules.push({
        pattern: /^animate-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { animation: v.replace(/_/g, ' ') } }
        },
      })

      // Arbitrary duration
      rules.push({
        pattern: /^duration-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { 'animation-duration': v } }
        },
      })

      // Arbitrary delay
      rules.push({
        pattern: /^delay-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { 'animation-delay': v } }
        },
      })

      // ========================================
      // @starting-style Support (CSS Level 4 / Tailwind 4 parity)
      // Enables CSS-only entry animations without JavaScript
      // ========================================

      // Starting style base class - enables starting-style animations
      // Usage: Apply 'starting' class along with 'starting-*' utilities
      // Note: Include generateStartingStyleCSS() output in your CSS for @starting-style rules
      rules.push({
        pattern: 'starting',
        properties: {
          '--starting-opacity': '0',
          '--starting-scale': '0.95',
          '--starting-translate-x': '0',
          '--starting-translate-y': '0',
          transition: 'opacity var(--starting-duration, 300ms) var(--starting-easing, ease-out), transform var(--starting-duration, 300ms) var(--starting-easing, ease-out)',
        },
      })

      // Starting style opacity variants
      rules.push({
        pattern: 'starting-opacity-0',
        properties: { '--starting-opacity': '0' },
      })
      rules.push({
        pattern: 'starting-opacity-50',
        properties: { '--starting-opacity': '0.5' },
      })
      rules.push({
        pattern: 'starting-opacity-100',
        properties: { '--starting-opacity': '1' },
      })

      // Starting style scale variants
      rules.push({
        pattern: 'starting-scale-0',
        properties: { '--starting-scale': '0' },
      })
      rules.push({
        pattern: 'starting-scale-50',
        properties: { '--starting-scale': '0.5' },
      })
      rules.push({
        pattern: 'starting-scale-75',
        properties: { '--starting-scale': '0.75' },
      })
      rules.push({
        pattern: 'starting-scale-90',
        properties: { '--starting-scale': '0.9' },
      })
      rules.push({
        pattern: 'starting-scale-95',
        properties: { '--starting-scale': '0.95' },
      })
      rules.push({
        pattern: 'starting-scale-100',
        properties: { '--starting-scale': '1' },
      })
      rules.push({
        pattern: 'starting-scale-105',
        properties: { '--starting-scale': '1.05' },
      })
      rules.push({
        pattern: 'starting-scale-110',
        properties: { '--starting-scale': '1.1' },
      })

      // Starting style translate variants
      const startingTranslateValues = ['0', '1', '2', '4', '8', '12', '16', '24', '32']
      for (const v of startingTranslateValues) {
        const rem = parseInt(v) * 0.25
        rules.push({
          pattern: `starting-translate-x-${v}`,
          properties: { '--starting-translate-x': `${rem}rem` },
        })
        rules.push({
          pattern: `-starting-translate-x-${v}`,
          properties: { '--starting-translate-x': `-${rem}rem` },
        })
        rules.push({
          pattern: `starting-translate-y-${v}`,
          properties: { '--starting-translate-y': `${rem}rem` },
        })
        rules.push({
          pattern: `-starting-translate-y-${v}`,
          properties: { '--starting-translate-y': `-${rem}rem` },
        })
      }

      // Starting style duration
      rules.push({
        pattern: 'starting-duration-75',
        properties: { '--starting-duration': '75ms' },
      })
      rules.push({
        pattern: 'starting-duration-100',
        properties: { '--starting-duration': '100ms' },
      })
      rules.push({
        pattern: 'starting-duration-150',
        properties: { '--starting-duration': '150ms' },
      })
      rules.push({
        pattern: 'starting-duration-200',
        properties: { '--starting-duration': '200ms' },
      })
      rules.push({
        pattern: 'starting-duration-300',
        properties: { '--starting-duration': '300ms' },
      })
      rules.push({
        pattern: 'starting-duration-500',
        properties: { '--starting-duration': '500ms' },
      })
      rules.push({
        pattern: 'starting-duration-700',
        properties: { '--starting-duration': '700ms' },
      })
      rules.push({
        pattern: 'starting-duration-1000',
        properties: { '--starting-duration': '1000ms' },
      })

      // Starting style easing
      rules.push({
        pattern: 'starting-ease-linear',
        properties: { '--starting-easing': 'linear' },
      })
      rules.push({
        pattern: 'starting-ease-in',
        properties: { '--starting-easing': 'cubic-bezier(0.4, 0, 1, 1)' },
      })
      rules.push({
        pattern: 'starting-ease-out',
        properties: { '--starting-easing': 'cubic-bezier(0, 0, 0.2, 1)' },
      })
      rules.push({
        pattern: 'starting-ease-in-out',
        properties: { '--starting-easing': 'cubic-bezier(0.4, 0, 0.2, 1)' },
      })
      rules.push({
        pattern: 'starting-ease-bounce',
        properties: { '--starting-easing': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' },
      })

      // Pre-built starting style compositions for common patterns
      // Note: Include generateStartingStyleCSS() output in your CSS for @starting-style rules

      // Fade in from opacity 0
      rules.push({
        pattern: 'starting-fade',
        properties: {
          '--starting-opacity': '0',
          '--starting-scale': '1',
          transition: 'opacity var(--starting-duration, 300ms) var(--starting-easing, ease-out)',
        },
      })

      // Scale in from smaller
      rules.push({
        pattern: 'starting-scale',
        properties: {
          '--starting-opacity': '0',
          '--starting-scale': '0.9',
          transition: 'opacity var(--starting-duration, 300ms) var(--starting-easing, ease-out), transform var(--starting-duration, 300ms) var(--starting-easing, ease-out)',
        },
      })

      // Slide in from top
      rules.push({
        pattern: 'starting-slide-down',
        properties: {
          '--starting-opacity': '0',
          '--starting-translate-y': '-1rem',
          transition: 'opacity var(--starting-duration, 300ms) var(--starting-easing, ease-out), transform var(--starting-duration, 300ms) var(--starting-easing, ease-out)',
        },
      })

      // Slide in from bottom
      rules.push({
        pattern: 'starting-slide-up',
        properties: {
          '--starting-opacity': '0',
          '--starting-translate-y': '1rem',
          transition: 'opacity var(--starting-duration, 300ms) var(--starting-easing, ease-out), transform var(--starting-duration, 300ms) var(--starting-easing, ease-out)',
        },
      })

      // Slide in from left
      rules.push({
        pattern: 'starting-slide-right',
        properties: {
          '--starting-opacity': '0',
          '--starting-translate-x': '-1rem',
          transition: 'opacity var(--starting-duration, 300ms) var(--starting-easing, ease-out), transform var(--starting-duration, 300ms) var(--starting-easing, ease-out)',
        },
      })

      // Slide in from right
      rules.push({
        pattern: 'starting-slide-left',
        properties: {
          '--starting-opacity': '0',
          '--starting-translate-x': '1rem',
          transition: 'opacity var(--starting-duration, 300ms) var(--starting-easing, ease-out), transform var(--starting-duration, 300ms) var(--starting-easing, ease-out)',
        },
      })

      // Zoom in (scale from smaller with opacity)
      rules.push({
        pattern: 'starting-zoom',
        properties: {
          '--starting-opacity': '0',
          '--starting-scale': '0.5',
          transition: 'opacity var(--starting-duration, 300ms) var(--starting-easing, ease-out), transform var(--starting-duration, 300ms) var(--starting-easing, ease-out)',
        },
      })

      // Flip in (3D rotation)
      rules.push({
        pattern: 'starting-flip-x',
        properties: {
          '--starting-opacity': '0',
          transition: 'opacity var(--starting-duration, 500ms) var(--starting-easing, ease-out), transform var(--starting-duration, 500ms) var(--starting-easing, ease-out)',
        },
      })

      rules.push({
        pattern: 'starting-flip-y',
        properties: {
          '--starting-opacity': '0',
          transition: 'opacity var(--starting-duration, 500ms) var(--starting-easing, ease-out), transform var(--starting-duration, 500ms) var(--starting-easing, ease-out)',
        },
      })

      // Blur in
      rules.push({
        pattern: 'starting-blur',
        properties: {
          '--starting-opacity': '0',
          transition: 'opacity var(--starting-duration, 300ms) var(--starting-easing, ease-out), filter var(--starting-duration, 300ms) var(--starting-easing, ease-out)',
        },
      })

      // Register all rules
      for (const rule of rules) {
        ctx.addRule(rule)
      }
    },
  }
}

/**
 * Get all animation keyframes CSS
 */
export function getAnimationKeyframes(options: AnimationsPluginOptions = {}): string {
  const { customKeyframes = {} } = options
  const allKeyframes = { ...keyframes, ...customKeyframes }
  return Object.values(allKeyframes).join('\n\n')
}

/**
 * Generate complete animation CSS (keyframes + utilities base)
 */
export function generateAnimationCSS(options: AnimationsPluginOptions = {}): string {
  return getAnimationKeyframes(options)
}

/**
 * Generate @starting-style CSS for entry animations
 * This enables CSS-only entry animations without JavaScript
 */
export function generateStartingStyleCSS(): string {
  return `/* @starting-style - CSS-only entry animations */
@starting-style {
  .starting {
    opacity: var(--starting-opacity, 0);
    transform: scale(var(--starting-scale, 0.95)) translateX(var(--starting-translate-x, 0)) translateY(var(--starting-translate-y, 0));
  }
  .starting-fade {
    opacity: 0;
  }
  .starting-scale {
    opacity: 0;
    transform: scale(0.9);
  }
  .starting-slide-down {
    opacity: 0;
    transform: translateY(-1rem);
  }
  .starting-slide-up {
    opacity: 0;
    transform: translateY(1rem);
  }
  .starting-slide-right {
    opacity: 0;
    transform: translateX(-1rem);
  }
  .starting-slide-left {
    opacity: 0;
    transform: translateX(1rem);
  }
  .starting-zoom {
    opacity: 0;
    transform: scale(0.5);
  }
  .starting-flip-x {
    opacity: 0;
    transform: perspective(400px) rotateX(90deg);
  }
  .starting-flip-y {
    opacity: 0;
    transform: perspective(400px) rotateY(90deg);
  }
  .starting-blur {
    opacity: 0;
    filter: blur(8px);
  }
}

/* Starting style base classes */
.starting {
  transition: opacity var(--starting-duration, 300ms) var(--starting-easing, ease-out), transform var(--starting-duration, 300ms) var(--starting-easing, ease-out);
}
.starting-fade {
  transition: opacity var(--starting-duration, 300ms) var(--starting-easing, ease-out);
}
.starting-scale,
.starting-slide-down,
.starting-slide-up,
.starting-slide-right,
.starting-slide-left,
.starting-zoom {
  transition: opacity var(--starting-duration, 300ms) var(--starting-easing, ease-out), transform var(--starting-duration, 300ms) var(--starting-easing, ease-out);
}
.starting-flip-x,
.starting-flip-y {
  transition: opacity var(--starting-duration, 500ms) var(--starting-easing, ease-out), transform var(--starting-duration, 500ms) var(--starting-easing, ease-out);
}
.starting-blur {
  transition: opacity var(--starting-duration, 300ms) var(--starting-easing, ease-out), filter var(--starting-duration, 300ms) var(--starting-easing, ease-out);
}
`
}

/**
 * Export keyframes object for custom use
 */
export { keyframes }

export default animationsPlugin
