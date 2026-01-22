/**
 * CVA (Class Variance Authority) Integration
 *
 * Type-safe variant-based component styles for CoralCSS.
 * Inspired by CVA but designed specifically for CoralCSS.
 * @module utils/cva
 */

/**
 * Class value type - string, array, object, undefined, null, or false
 */
export type ClassValue =
  | string
  | string[]
  | Record<string, boolean | undefined | null>
  | undefined
  | null
  | false

/**
 * Variant definition map
 */
export type VariantProps<T extends VariantConfig> = {
  [K in keyof T['variants']]?: keyof T['variants'][K]
}

/**
 * Variant configuration
 */
export interface VariantConfig {
  base?: ClassValue
  variants?: Record<string, Record<string, ClassValue>>
  compoundVariants?: Array<
    Record<string, string | string[]> & { class?: ClassValue; className?: ClassValue }
  >
  defaultVariants?: Record<string, string>
}

/**
 * CVA function return type
 */
export interface CVAReturn<T extends VariantConfig> {
  (props?: VariantProps<T> & { class?: ClassValue; className?: ClassValue }): string
  variants: T['variants']
  defaultVariants: T['defaultVariants']
}

/**
 * Merge class values into a single string
 */
export function cx(...inputs: ClassValue[]): string {
  const classes: string[] = []

  for (const input of inputs) {
    if (!input) {continue}

    if (typeof input === 'string') {
      classes.push(...input.split(/\s+/).filter(Boolean))
    } else if (Array.isArray(input)) {
      classes.push(...input.filter(Boolean).join(' ').split(/\s+/).filter(Boolean))
    } else if (typeof input === 'object') {
      for (const [key, value] of Object.entries(input)) {
        if (value) {
          classes.push(...key.split(/\s+/).filter(Boolean))
        }
      }
    }
  }

  return classes.join(' ')
}

/**
 * Class concatenation utility (alias for cx)
 */
export const cn = cx

/**
 * Create a variant-based class generator
 *
 * @example
 * ```typescript
 * const button = cva({
 *   base: 'inline-flex items-center justify-center rounded-md font-medium transition-colors',
 *   variants: {
 *     variant: {
 *       default: 'bg-primary text-primary-foreground hover:bg-primary/90',
 *       destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
 *       outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
 *       secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
 *       ghost: 'hover:bg-accent hover:text-accent-foreground',
 *       link: 'text-primary underline-offset-4 hover:underline',
 *     },
 *     size: {
 *       default: 'h-10 px-4 py-2',
 *       sm: 'h-9 rounded-md px-3',
 *       lg: 'h-11 rounded-md px-8',
 *       icon: 'h-10 w-10',
 *     },
 *   },
 *   defaultVariants: {
 *     variant: 'default',
 *     size: 'default',
 *   },
 * })
 *
 * // Usage
 * button() // default variant and size
 * button({ variant: 'destructive', size: 'lg' })
 * button({ variant: 'outline', className: 'my-custom-class' })
 * ```
 */
export function cva<T extends VariantConfig>(config: T): CVAReturn<T> {
  const { base = '', variants = {}, compoundVariants = [], defaultVariants = {} } = config

  const variantFn = (
    props: VariantProps<T> & { class?: ClassValue; className?: ClassValue } = {}
  ): string => {
    const { class: classValue, className, ...variantProps } = props as Record<string, unknown>

    // Collect classes
    const classes: ClassValue[] = [base]

    // Apply variant classes
    for (const [variantKey, variantValue] of Object.entries(variants)) {
      const selectedVariant =
        (variantProps[variantKey] as string | undefined) ?? defaultVariants[variantKey]

      if (selectedVariant && variantValue[selectedVariant]) {
        classes.push(variantValue[selectedVariant])
      }
    }

    // Apply compound variants
    for (const compound of compoundVariants) {
      const { class: compoundClass, className: compoundClassName, ...conditions } = compound

      let matches = true
      for (const [key, value] of Object.entries(conditions)) {
        const selectedValue =
          (variantProps[key] as string | undefined) ?? defaultVariants[key] ?? ''

        if (Array.isArray(value)) {
          if (!value.includes(selectedValue)) {
            matches = false
            break
          }
        } else if (selectedValue !== value) {
          matches = false
          break
        }
      }

      if (matches) {
        classes.push((compoundClass ?? compoundClassName) as ClassValue)
      }
    }

    // Add custom classes
    classes.push(classValue as ClassValue, className as ClassValue)

    return cx(...classes)
  }

  // Attach metadata for introspection
  variantFn.variants = variants
  variantFn.defaultVariants = defaultVariants

  return variantFn as CVAReturn<T>
}

/**
 * Extract variant props type from a cva function
 *
 * @example
 * ```typescript
 * const button = cva({...})
 * type ButtonProps = VariantPropsOf<typeof button>
 * ```
 */
export type VariantPropsOf<T extends (...args: unknown[]) => string> =
  T extends CVAReturn<infer V> ? VariantProps<V> : never

/**
 * Compose multiple cva variants together
 *
 * @example
 * ```typescript
 * const baseButton = cva({
 *   base: 'rounded font-medium',
 *   variants: { size: { sm: 'text-sm', lg: 'text-lg' } },
 * })
 *
 * const coloredButton = cva({
 *   variants: { color: { primary: 'bg-primary', secondary: 'bg-secondary' } },
 * })
 *
 * const button = compose(baseButton, coloredButton)
 * button({ size: 'sm', color: 'primary' })
 * ```
 */
export function compose<T extends CVAReturn<VariantConfig>[]>(
  ...cvns: T
): (
  props?: UnionToIntersection<Parameters<T[number]>[0]> & {
    class?: ClassValue
    className?: ClassValue
  }
) => string {
  return (props) => {
    const results: string[] = []
    const mergedProps = props ?? {}
    for (const cvaFn of cvns) {
      results.push(cvaFn(mergedProps as Parameters<typeof cvaFn>[0]))
    }
    return cx(...results)
  }
}

/**
 * Helper type for compose
 */
type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never

/**
 * Define slot-based component variants (compound components)
 *
 * @example
 * ```typescript
 * const card = slots({
 *   slots: {
 *     root: 'rounded-lg border bg-card text-card-foreground shadow-sm',
 *     header: 'flex flex-col space-y-1.5 p-6',
 *     title: 'text-2xl font-semibold leading-none tracking-tight',
 *     description: 'text-sm text-muted-foreground',
 *     content: 'p-6 pt-0',
 *     footer: 'flex items-center p-6 pt-0',
 *   },
 *   variants: {
 *     variant: {
 *       default: {},
 *       outline: { root: 'border-2' },
 *       ghost: { root: 'border-none shadow-none' },
 *     },
 *   },
 *   defaultVariants: {
 *     variant: 'default',
 *   },
 * })
 *
 * // Usage
 * const { root, header, title } = card({ variant: 'outline' })
 * ```
 */
export interface SlotsConfig<S extends Record<string, ClassValue>> {
  slots: S
  variants?: Record<string, Record<string, Partial<Record<keyof S, ClassValue>>>>
  defaultVariants?: Record<string, string>
}

export type SlotsReturn<S extends Record<string, ClassValue>> = (
  props?: Record<string, string | undefined> & { class?: ClassValue; className?: ClassValue }
) => Record<keyof S, string>

export function slots<S extends Record<string, ClassValue>>(
  config: SlotsConfig<S>
): SlotsReturn<S> {
  const { slots: slotDefs, variants = {}, defaultVariants = {} } = config

  return (props) => {
    const mergedProps = props ?? {}
    const { class: _classValue, className: _className, ...variantProps } = mergedProps

    const result = {} as Record<keyof S, string>

    for (const [slotName, baseClass] of Object.entries(slotDefs)) {
      const classes: ClassValue[] = [baseClass]

      // Apply variant classes for this slot
      for (const [variantKey, variantValue] of Object.entries(variants)) {
        const selectedVariant =
          (variantProps[variantKey] as string | undefined) ?? defaultVariants[variantKey]

        if (selectedVariant && variantValue[selectedVariant]) {
          const slotClass = variantValue[selectedVariant][slotName as keyof S]
          if (slotClass) {
            classes.push(slotClass)
          }
        }
      }

      result[slotName as keyof S] = cx(...classes)
    }

    return result
  }
}

/**
 * Define responsive variants
 *
 * @example
 * ```typescript
 * const responsiveButton = responsiveVariants({
 *   base: 'px-4 py-2',
 *   variants: {
 *     size: {
 *       sm: 'text-sm',
 *       md: 'text-base',
 *       lg: 'text-lg',
 *     },
 *   },
 * })
 *
 * // Usage with breakpoint-specific variants
 * responsiveButton({
 *   size: { default: 'sm', md: 'md', lg: 'lg' }
 * })
 * // Returns: "px-4 py-2 text-sm md:text-base lg:text-lg"
 * ```
 */
export interface ResponsiveVariantValue<T> {
  default?: T
  sm?: T
  md?: T
  lg?: T
  xl?: T
  '2xl'?: T
}

export type ResponsiveVariantProps<T extends VariantConfig> = {
  [K in keyof T['variants']]?:
    | keyof T['variants'][K]
    | ResponsiveVariantValue<keyof T['variants'][K]>
}

export function responsiveVariants<T extends VariantConfig>(config: T) {
  const { base = '', variants = {}, defaultVariants = {} } = config

  return (
    props: ResponsiveVariantProps<T> & { class?: ClassValue; className?: ClassValue } = {}
  ): string => {
    const { class: classValue, className, ...variantProps } = props as Record<string, unknown>

    const classes: ClassValue[] = [base]
    const breakpoints = ['default', 'sm', 'md', 'lg', 'xl', '2xl'] as const

    for (const [variantKey, variantValue] of Object.entries(variants)) {
      const selectedValue = variantProps[variantKey] ?? defaultVariants[variantKey]

      if (typeof selectedValue === 'string') {
        // Simple value
        if (variantValue[selectedValue]) {
          classes.push(variantValue[selectedValue])
        }
      } else if (selectedValue && typeof selectedValue === 'object') {
        // Responsive value
        const responsiveValue = selectedValue as ResponsiveVariantValue<string>

        for (const bp of breakpoints) {
          const bpValue = responsiveValue[bp]
          if (bpValue && variantValue[bpValue]) {
            const variantClass = variantValue[bpValue]
            if (typeof variantClass === 'string') {
              if (bp === 'default') {
                classes.push(variantClass)
              } else {
                // Add breakpoint prefix to each class
                const prefixedClasses = variantClass
                  .split(/\s+/)
                  .filter(Boolean)
                  .map((c) => `${bp}:${c}`)
                  .join(' ')
                classes.push(prefixedClasses)
              }
            }
          }
        }
      }
    }

    classes.push(classValue as ClassValue, className as ClassValue)

    return cx(...classes)
  }
}

/**
 * Type-safe variant keys extractor
 */
export type VariantKeys<T extends CVAReturn<VariantConfig>> = keyof NonNullable<
  T['variants']
>

/**
 * Type-safe variant values extractor
 */
export type VariantValues<
  T extends CVAReturn<VariantConfig>,
  K extends VariantKeys<T>,
> = keyof NonNullable<T['variants']>[K]

/**
 * Create a conditional class helper
 *
 * @example
 * ```typescript
 * const classes = when(isActive, 'bg-active', 'bg-inactive')
 * ```
 */
export function when(
  condition: boolean | undefined | null,
  trueClass: ClassValue,
  falseClass?: ClassValue
): ClassValue {
  return condition ? trueClass : (falseClass ?? '')
}

/**
 * Create a toggle class helper
 *
 * @example
 * ```typescript
 * const classes = toggle(isOpen, 'visible opacity-100', 'invisible opacity-0')
 * ```
 */
export const toggle = when

/**
 * Focus ring utility classes
 */
export const focusRing = [
  'focus:outline-none',
  'focus-visible:ring-2',
  'focus-visible:ring-ring',
  'focus-visible:ring-offset-2',
].join(' ')

/**
 * Disabled state utility classes
 */
export const disabledStyles = [
  'disabled:pointer-events-none',
  'disabled:opacity-50',
].join(' ')

/**
 * Common transition utility
 */
export const transition = 'transition-colors duration-200'

/**
 * Pre-built button variants
 */
export const buttonVariants = cva({
  base: [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md',
    'text-sm font-medium transition-colors',
    focusRing,
    disabledStyles,
  ].join(' '),
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 hover:underline',
    },
    size: {
      default: 'h-10 px-4 py-2',
      sm: 'h-9 rounded-md px-3',
      lg: 'h-11 rounded-md px-8',
      icon: 'h-10 w-10',
    },
  },
  compoundVariants: [
    {
      variant: 'outline',
      size: 'icon',
      class: 'border-2',
    },
  ],
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

/**
 * Pre-built badge variants
 */
export const badgeVariants = cva({
  base: 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
  variants: {
    variant: {
      default: 'border-transparent bg-primary text-primary-foreground',
      secondary: 'border-transparent bg-secondary text-secondary-foreground',
      destructive: 'border-transparent bg-destructive text-destructive-foreground',
      outline: 'text-foreground',
      success: 'border-transparent bg-green-500 text-white',
      warning: 'border-transparent bg-amber-500 text-white',
      info: 'border-transparent bg-blue-500 text-white',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

/**
 * Pre-built input variants
 */
export const inputVariants = cva({
  base: [
    'flex w-full rounded-md border border-input bg-background px-3 py-2',
    'text-sm ring-offset-background',
    'file:border-0 file:bg-transparent file:text-sm file:font-medium',
    'placeholder:text-muted-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    disabledStyles,
  ].join(' '),
  variants: {
    size: {
      default: 'h-10',
      sm: 'h-9 text-xs',
      lg: 'h-11 text-base',
    },
    state: {
      default: '',
      error: 'border-destructive focus-visible:ring-destructive',
      success: 'border-green-500 focus-visible:ring-green-500',
    },
  },
  defaultVariants: {
    size: 'default',
    state: 'default',
  },
})

/**
 * Pre-built card slot variants
 */
export const cardSlots = slots({
  slots: {
    root: 'rounded-lg border bg-card text-card-foreground shadow-sm',
    header: 'flex flex-col space-y-1.5 p-6',
    title: 'text-2xl font-semibold leading-none tracking-tight',
    description: 'text-sm text-muted-foreground',
    content: 'p-6 pt-0',
    footer: 'flex items-center p-6 pt-0',
  },
  variants: {
    variant: {
      default: {},
      outline: {
        root: 'border-2 shadow-none',
      },
      ghost: {
        root: 'border-none shadow-none',
      },
      elevated: {
        root: 'shadow-lg',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export default cva
