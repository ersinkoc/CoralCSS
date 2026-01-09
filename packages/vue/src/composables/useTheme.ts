/**
 * useTheme Composable
 *
 * Vue composable for managing CoralCSS themes.
 */

import { ref, computed, watch, provide, inject, type InjectionKey, type Ref } from 'vue'

export type ThemeName =
  | 'coral'
  | 'slate'
  | 'rose'
  | 'emerald'
  | 'violet'
  | 'amber'
  | 'ocean'
  | 'crimson'
  | 'teal'
  | 'indigo'
  | 'lime'
  | 'fuchsia'

export type UIStyle =
  | 'coral'
  | 'material'
  | 'bootstrap'
  | 'minimal'
  | 'brutalist'
  | 'neumorphism'
  | 'glass'

export interface ThemeConfig {
  theme: ThemeName
  darkMode: boolean
  uiStyle: UIStyle
}

interface ThemeState {
  theme: Ref<ThemeName>
  darkMode: Ref<boolean>
  uiStyle: Ref<UIStyle>
  setTheme: (theme: ThemeName) => void
  setDarkMode: (dark: boolean) => void
  toggleDarkMode: () => void
  setUIStyle: (style: UIStyle) => void
}

const THEME_KEY: InjectionKey<ThemeState> = Symbol('coralcss-theme')
const STORAGE_KEY = 'coralcss-theme'

/**
 * Provide theme state at the root of your app
 *
 * @example
 * ```vue
 * <script setup>
 * import { provideTheme } from '@coral-css/vue'
 *
 * provideTheme({
 *   defaultTheme: 'coral',
 *   defaultDarkMode: false,
 *   defaultUIStyle: 'coral'
 * })
 * </script>
 * ```
 */
export function provideTheme(options: {
  defaultTheme?: ThemeName
  defaultDarkMode?: boolean
  defaultUIStyle?: UIStyle
  storageKey?: string
} = {}) {
  const {
    defaultTheme = 'coral',
    defaultDarkMode = false,
    defaultUIStyle = 'coral',
    storageKey = STORAGE_KEY,
  } = options

  const theme = ref<ThemeName>(defaultTheme)
  const darkMode = ref(defaultDarkMode)
  const uiStyle = ref<UIStyle>(defaultUIStyle)

  // Load from localStorage
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(storageKey)
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<ThemeConfig>
        if (parsed.theme) theme.value = parsed.theme
        if (typeof parsed.darkMode === 'boolean') darkMode.value = parsed.darkMode
        if (parsed.uiStyle) uiStyle.value = parsed.uiStyle
      }
    } catch {
      // Ignore storage errors
    }
  }

  // Apply theme classes
  watch(
    [theme, darkMode, uiStyle],
    ([newTheme, newDark, newStyle]) => {
      if (typeof document === 'undefined') return

      const root = document.documentElement

      // Remove old classes
      const oldClasses = Array.from(root.classList).filter(
        (c) => c.startsWith('theme-') || c.startsWith('ui-')
      )
      oldClasses.forEach((c) => root.classList.remove(c))

      // Apply new classes
      root.classList.add(`theme-${newTheme}`)
      root.classList.add(`ui-${newStyle}`)

      if (newDark) {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }

      // Save to storage
      try {
        localStorage.setItem(
          storageKey,
          JSON.stringify({ theme: newTheme, darkMode: newDark, uiStyle: newStyle })
        )
      } catch {
        // Ignore storage errors
      }
    },
    { immediate: true }
  )

  const setTheme = (newTheme: ThemeName) => {
    theme.value = newTheme
  }

  const setDarkMode = (dark: boolean) => {
    darkMode.value = dark
  }

  const toggleDarkMode = () => {
    darkMode.value = !darkMode.value
  }

  const setUIStyle = (style: UIStyle) => {
    uiStyle.value = style
  }

  const state: ThemeState = {
    theme,
    darkMode,
    uiStyle,
    setTheme,
    setDarkMode,
    toggleDarkMode,
    setUIStyle,
  }

  provide(THEME_KEY, state)

  return state
}

/**
 * Use theme state in any component
 *
 * @example
 * ```vue
 * <script setup>
 * import { useTheme } from '@coral-css/vue'
 *
 * const { darkMode, toggleDarkMode, theme, setTheme } = useTheme()
 * </script>
 *
 * <template>
 *   <button @click="toggleDarkMode">
 *     {{ darkMode ? 'Light' : 'Dark' }} Mode
 *   </button>
 * </template>
 * ```
 */
export function useTheme(): ThemeState {
  const state = inject(THEME_KEY)
  if (!state) {
    throw new Error('useTheme must be used within a component tree with provideTheme')
  }
  return state
}

export default useTheme
