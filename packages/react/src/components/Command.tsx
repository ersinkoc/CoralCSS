/**
 * Command Component
 *
 * React wrapper for CoralCSS Command palette component.
 */

import React, {
  forwardRef,
  HTMLAttributes,
  InputHTMLAttributes,
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  KeyboardEvent,
} from 'react'

interface CommandContextValue {
  search: string
  setSearch: (value: string) => void
  selectedValue: string
  setSelectedValue: (value: string) => void
  items: string[]
  registerItem: (value: string) => void
  unregisterItem: (value: string) => void
}

const CommandContext = createContext<CommandContextValue | null>(null)

const useCommand = () => {
  const context = useContext(CommandContext)
  if (!context) {
    throw new Error('Command components must be used within a Command')
  }
  return context
}

export interface CommandProps extends HTMLAttributes<HTMLDivElement> {
  value?: string
  onValueChange?: (value: string) => void
  filter?: (value: string, search: string) => number
  loop?: boolean
}

/**
 * Command palette component for searchable command menus
 *
 * @example
 * ```tsx
 * <Command>
 *   <CommandInput placeholder="Search..." />
 *   <CommandList>
 *     <CommandEmpty>No results found.</CommandEmpty>
 *     <CommandGroup heading="Suggestions">
 *       <CommandItem>Calendar</CommandItem>
 *       <CommandItem>Search</CommandItem>
 *     </CommandGroup>
 *   </CommandList>
 * </Command>
 * ```
 */
export const Command = forwardRef<HTMLDivElement, CommandProps>(
  ({ value, onValueChange, filter, loop = false, className, children, ...props }, ref) => {
    const [search, setSearch] = useState('')
    const [selectedValue, setSelectedValue] = useState(value || '')
    const [items, setItems] = useState<string[]>([])

    const registerItem = useCallback((itemValue: string) => {
      setItems((prev) => [...prev, itemValue])
    }, [])

    const unregisterItem = useCallback((itemValue: string) => {
      setItems((prev) => prev.filter((v) => v !== itemValue))
    }, [])

    useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value)
      }
    }, [value])

    const handleValueChange = useCallback(
      (newValue: string) => {
        setSelectedValue(newValue)
        onValueChange?.(newValue)
      },
      [onValueChange]
    )

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      const currentIndex = items.indexOf(selectedValue)

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          if (currentIndex < items.length - 1) {
            handleValueChange(items[currentIndex + 1])
          } else if (loop) {
            handleValueChange(items[0])
          }
          break
        case 'ArrowUp':
          e.preventDefault()
          if (currentIndex > 0) {
            handleValueChange(items[currentIndex - 1])
          } else if (loop) {
            handleValueChange(items[items.length - 1])
          }
          break
        case 'Enter':
          e.preventDefault()
          // Trigger the selected item
          break
      }
    }

    return (
      <CommandContext.Provider
        value={{
          search,
          setSearch,
          selectedValue,
          setSelectedValue: handleValueChange,
          items,
          registerItem,
          unregisterItem,
        }}
      >
        <div
          ref={ref}
          data-coral-command=""
          className={className}
          onKeyDown={handleKeyDown}
          {...props}
        >
          {children}
        </div>
      </CommandContext.Provider>
    )
  }
)

Command.displayName = 'Command'

export interface CommandInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {}

export const CommandInput = forwardRef<HTMLInputElement, CommandInputProps>(
  ({ className, ...props }, ref) => {
    const { search, setSearch } = useCommand()

    return (
      <div data-coral-command-input-wrapper="">
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          data-coral-command-search-icon=""
        >
          <path
            d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
        <input
          ref={ref}
          data-coral-command-input=""
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={className}
          {...props}
        />
      </div>
    )
  }
)

CommandInput.displayName = 'CommandInput'

export const CommandList = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-coral-command-list="" role="listbox" className={className} {...props} />
  )
)

CommandList.displayName = 'CommandList'

export const CommandEmpty = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { search, items } = useCommand()

    // Only show when there's a search and no items match
    if (!search || items.length > 0) {
      return null
    }

    return <div ref={ref} data-coral-command-empty="" className={className} {...props} />
  }
)

CommandEmpty.displayName = 'CommandEmpty'

export interface CommandGroupProps extends HTMLAttributes<HTMLDivElement> {
  heading?: string
}

export const CommandGroup = forwardRef<HTMLDivElement, CommandGroupProps>(
  ({ heading, className, children, ...props }, ref) => (
    <div ref={ref} data-coral-command-group="" role="group" className={className} {...props}>
      {heading && <div data-coral-command-group-heading="">{heading}</div>}
      {children}
    </div>
  )
)

CommandGroup.displayName = 'CommandGroup'

export interface CommandItemProps extends HTMLAttributes<HTMLDivElement> {
  value?: string
  disabled?: boolean
  onSelect?: (value: string) => void
}

export const CommandItem = forwardRef<HTMLDivElement, CommandItemProps>(
  ({ value, disabled, onSelect, className, children, ...props }, ref) => {
    const { search, selectedValue, setSelectedValue, registerItem, unregisterItem } = useCommand()
    const itemValue = value || (typeof children === 'string' ? children : '')

    useEffect(() => {
      registerItem(itemValue)
      return () => unregisterItem(itemValue)
    }, [itemValue, registerItem, unregisterItem])

    // Filter based on search
    if (search && !itemValue.toLowerCase().includes(search.toLowerCase())) {
      return null
    }

    const isSelected = selectedValue === itemValue

    return (
      <div
        ref={ref}
        data-coral-command-item=""
        data-selected={isSelected || undefined}
        data-disabled={disabled || undefined}
        role="option"
        aria-selected={isSelected}
        aria-disabled={disabled}
        onClick={() => {
          if (!disabled) {
            setSelectedValue(itemValue)
            onSelect?.(itemValue)
          }
        }}
        className={className}
        {...props}
      >
        {children}
      </div>
    )
  }
)

CommandItem.displayName = 'CommandItem'

export const CommandSeparator = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-coral-command-separator="" className={className} {...props} />
  )
)

CommandSeparator.displayName = 'CommandSeparator'

export const CommandShortcut = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span ref={ref} data-coral-command-shortcut="" className={className} {...props} />
  )
)

CommandShortcut.displayName = 'CommandShortcut'

export default Command
