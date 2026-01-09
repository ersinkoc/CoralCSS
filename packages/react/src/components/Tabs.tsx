/**
 * Tabs Component
 *
 * React wrapper for CoralCSS Tabs component.
 */

import React, { forwardRef, createContext, useContext, useState, useCallback, HTMLAttributes, ButtonHTMLAttributes } from 'react'

interface TabsContextValue {
  value: string
  onValueChange: (value: string) => void
}

const TabsContext = createContext<TabsContextValue | null>(null)

function useTabsContext() {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs')
  }
  return context
}

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

/**
 * Tabs component for tabbed navigation
 *
 * @example
 * ```tsx
 * <Tabs defaultValue="tab1">
 *   <TabsList>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *     <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">Content 1</TabsContent>
 *   <TabsContent value="tab2">Content 2</TabsContent>
 * </Tabs>
 * ```
 */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ value, defaultValue = '', onValueChange, className, children, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState(defaultValue)
    const isControlled = value !== undefined
    const currentValue = isControlled ? value : internalValue

    const handleValueChange = useCallback(
      (newValue: string) => {
        if (!isControlled) {
          setInternalValue(newValue)
        }
        onValueChange?.(newValue)
      },
      [isControlled, onValueChange]
    )

    return (
      <TabsContext.Provider value={{ value: currentValue, onValueChange: handleValueChange }}>
        <div ref={ref} data-coral-tabs="" className={className} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    )
  }
)

Tabs.displayName = 'Tabs'

export const TabsList = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} role="tablist" data-coral-tabs-list="" className={className} {...props} />
  )
)

TabsList.displayName = 'TabsList'

export interface TabsTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, className, children, ...props }, ref) => {
    const { value: currentValue, onValueChange } = useTabsContext()
    const isSelected = currentValue === value

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isSelected}
        data-coral-tabs-trigger=""
        data-active={isSelected || undefined}
        data-value={value}
        onClick={() => onValueChange(value)}
        className={className}
        {...props}
      >
        {children}
      </button>
    )
  }
)

TabsTrigger.displayName = 'TabsTrigger'

export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string
}

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, className, children, ...props }, ref) => {
    const { value: currentValue } = useTabsContext()
    const isSelected = currentValue === value

    if (!isSelected) return null

    return (
      <div
        ref={ref}
        role="tabpanel"
        data-coral-tabs-content=""
        data-value={value}
        className={className}
        {...props}
      >
        {children}
      </div>
    )
  }
)

TabsContent.displayName = 'TabsContent'

export default Tabs
