/**
 * CoralCSS Headless Components
 *
 * Framework-agnostic, accessible UI components.
 * @module components
 */

// Base
export { BaseComponent, createComponentFactory, autoInit } from './base'
import { autoInit } from './base'

// Core Components
export { Button, createButton, ButtonGroup, createButtonGroup } from './button'
export type { ButtonConfig, ButtonState, ButtonVariant, ButtonSize, ButtonGroupConfig, ButtonGroupState } from './button'

export { Dialog, createDialog } from './dialog'
export type { DialogConfig, DialogState } from './dialog'

export { Dropdown, createDropdown } from './dropdown'
export type { DropdownConfig, DropdownState } from './dropdown'

export { Tabs, createTabs } from './tabs'
export type { TabsConfig, TabsState } from './tabs'

export { Accordion, createAccordion } from './accordion'
export type { AccordionConfig, AccordionState } from './accordion'

export { Tooltip, createTooltip } from './tooltip'
export type { TooltipConfig, TooltipState } from './tooltip'

export { Switch, createSwitch } from './switch'
export type { SwitchConfig, SwitchState } from './switch'

export { Toast, createToast, ToastContainer, createToastContainer } from './toast'
export type { ToastConfig, ToastState } from './toast'

// New Components
export { Popover, createPopover } from './popover'
export type { PopoverConfig, PopoverState, PopoverPlacement, PopoverTrigger } from './popover'

export { Select, createSelect } from './select'
export type { SelectConfig, SelectState, SelectOption } from './select'

export { Menu, createMenu } from './menu'
export type { MenuConfig, MenuState, MenuItem } from './menu'

export { Slider, createSlider } from './slider'
export type { SliderConfig, SliderState } from './slider'

export { Progress, createProgress } from './progress'
export type { ProgressConfig, ProgressState } from './progress'

export { Avatar, createAvatar } from './avatar'
export type { AvatarConfig, AvatarState, AvatarSize, AvatarStatus } from './avatar'

export { Alert, createAlert } from './alert'
export type { AlertConfig, AlertState, AlertVariant } from './alert'

export { Breadcrumb, createBreadcrumb } from './breadcrumb'
export type { BreadcrumbConfig, BreadcrumbState, BreadcrumbItem } from './breadcrumb'

export { Pagination, createPagination } from './pagination'
export type { PaginationConfig, PaginationState } from './pagination'

export { Drawer, createDrawer } from './drawer'
export type { DrawerConfig, DrawerState, DrawerPlacement } from './drawer'

export { Command, createCommand } from './command'
export type { CommandConfig, CommandState, CommandItem, CommandGroup } from './command'

export { Skeleton, createSkeleton, SkeletonGroup, createSkeletonGroup } from './skeleton'
export type { SkeletonConfig, SkeletonState, SkeletonVariant, SkeletonAnimation } from './skeleton'

export { Carousel, createCarousel } from './carousel'
export type { CarouselConfig, CarouselState } from './carousel'

export { ContextMenu, createContextMenu } from './context-menu'
export type { ContextMenuConfig, ContextMenuState, ContextMenuItem } from './context-menu'

// New Components (Batch 2)
export { AlertDialog, createAlertDialog } from './alert-dialog'
export type { AlertDialogConfig, AlertDialogState } from './alert-dialog'

export { AspectRatio, createAspectRatio } from './aspect-ratio'
export type { AspectRatioConfig, AspectRatioState } from './aspect-ratio'

export { Badge, createBadge } from './badge'
export type { BadgeConfig, BadgeState } from './badge'

export { Calendar, createCalendar } from './calendar'
export type { CalendarConfig, CalendarState } from './calendar'

export { Card, createCard } from './card'
export type { CardConfig, CardState } from './card'

export { Checkbox, createCheckbox } from './checkbox'
export type { CheckboxConfig, CheckboxState } from './checkbox'

export { Collapsible, createCollapsible } from './collapsible'
export type { CollapsibleConfig, CollapsibleState } from './collapsible'

export { HoverCard, createHoverCard } from './hover-card'
export type { HoverCardConfig, HoverCardState } from './hover-card'

export { Input, createInput } from './input'
export type { InputConfig, InputState } from './input'

export { Label, createLabel } from './label'
export type { LabelConfig, LabelState } from './label'

export { NavigationMenu, createNavigationMenu } from './navigation-menu'
export type { NavigationMenuConfig, NavigationMenuState } from './navigation-menu'

export { RadioGroup, createRadioGroup } from './radio-group'
export type { RadioGroupConfig, RadioGroupState } from './radio-group'

export { Resizable, createResizable } from './resizable'
export type { ResizableConfig, ResizableState } from './resizable'

export { ScrollArea, createScrollArea } from './scroll-area'
export type { ScrollAreaConfig, ScrollAreaState } from './scroll-area'

export { Separator, createSeparator } from './separator'
export type { SeparatorConfig, SeparatorState } from './separator'

export { Table, createTable } from './table'
export type { TableConfig, TableState } from './table'

export { Textarea, createTextarea } from './textarea'
export type { TextareaConfig, TextareaState } from './textarea'

export { Toggle, createToggle } from './toggle'
export type { ToggleConfig, ToggleState } from './toggle'

export { ToggleGroup, createToggleGroup } from './toggle-group'
export type { ToggleGroupConfig, ToggleGroupState } from './toggle-group'

// Batch 3 Components
export { Rating, createRating } from './rating'
export type { RatingConfig, RatingState } from './rating'

export { Stepper, createStepper } from './stepper'
export type { StepperConfig, StepperState } from './stepper'

export { Chip, createChip } from './chip'
export type { ChipConfig, ChipState } from './chip'

export { Timeline, createTimeline } from './timeline'
export type { TimelineConfig, TimelineState } from './timeline'

export { Stat, createStat } from './stat'
export type { StatConfig, StatState } from './stat'

export { Kbd, createKbd } from './kbd'
export type { KbdConfig, KbdState } from './kbd'

export { Code, createCode } from './code'
export type { CodeConfig, CodeState } from './code'

export { EmptyState, createEmptyState } from './empty-state'
export type { EmptyStateConfig, EmptyStateState } from './empty-state'

export { Spinner, createSpinner } from './spinner'
export type { SpinnerConfig, SpinnerState } from './spinner'

export { Tree, createTree } from './tree'
export type { TreeConfig, TreeState } from './tree'

export { NumberInput, createNumberInput } from './number-input'
export type { NumberInputConfig, NumberInputState } from './number-input'

export { PinInput, createPinInput } from './pin-input'
export type { PinInputConfig, PinInputState } from './pin-input'

export { FileUpload, createFileUpload } from './file-upload'
export type { FileUploadConfig, FileUploadState } from './file-upload'

export { ColorPicker, createColorPicker } from './color-picker'
export type { ColorPickerConfig, ColorPickerState } from './color-picker'

export { DatePicker, createDatePicker } from './date-picker'
export type { DatePickerConfig, DatePickerState } from './date-picker'

export { Marquee, createMarquee } from './marquee'
export type { MarqueeConfig, MarqueeState } from './marquee'

export { ImageGallery, createImageGallery } from './image-gallery'
export type { ImageGalleryConfig, ImageGalleryState } from './image-gallery'

export { RangeSlider, createRangeSlider } from './range-slider'
export type { RangeSliderConfig, RangeSliderState } from './range-slider'

export { DataTable, createDataTable } from './data-table'
export type { DataTableConfig, DataTableState, DataTableColumn } from './data-table'

// Batch 4 Components
export { Sheet, createSheet } from './sheet'
export type { SheetConfig, SheetState, SheetSide } from './sheet'

export { Menubar, createMenubar } from './menubar'
export type { MenubarConfig, MenubarState, MenubarItem, MenubarSubItem } from './menubar'

export { VirtualList, createVirtualList } from './virtual-list'
export type { VirtualListConfig, VirtualListState } from './virtual-list'

export { Combobox, createCombobox } from './combobox'
export type { ComboboxConfig, ComboboxState, ComboboxOption } from './combobox'

export { MultiSelect, createMultiSelect } from './multi-select'
export type { MultiSelectConfig, MultiSelectState, MultiSelectOption } from './multi-select'

export { TagInput, createTagInput } from './tag-input'
export type { TagInputConfig, TagInputState, TagItem } from './tag-input'

export { Mention, createMention } from './mention'
export type { MentionConfig, MentionState, MentionItem } from './mention'

export { DateRangePicker, createDateRangePicker } from './date-range-picker'
export type { DateRangePickerConfig, DateRangePickerState, DateRange, PresetRange } from './date-range-picker'

export { Tour, createTour } from './tour'
export type { TourConfig, TourState, TourStep, TourStepAction } from './tour'

export { ImageCrop, createImageCrop } from './image-crop'
export type { ImageCropConfig, ImageCropState, CropArea, CropResult } from './image-crop'

// Batch 7 components
export { TimePicker, createTimePicker } from './time-picker'
export type { TimePickerConfig, TimePickerState, TimeValue, TimeFormat, TimePeriod } from './time-picker'

export { SegmentedControl, createSegmentedControl } from './segmented-control'
export type { SegmentedControlConfig, SegmentedControlState, SegmentOption } from './segmented-control'

export { Transfer, createTransfer } from './transfer'
export type { TransferConfig, TransferComponentState, TransferItem, TransferListState } from './transfer'

export { QRCode, createQRCode } from './qrcode'
export type { QRCodeConfig, QRCodeState, QRDataType, ErrorCorrectionLevel } from './qrcode'

export { Countdown, createCountdown } from './countdown'
export type { CountdownConfig, CountdownState, CountdownTarget, TimeUnits } from './countdown'

// Layout Components
export { Navbar, createNavbar } from './navbar'
export type { NavbarConfig, NavbarState } from './navbar'

export { Sidebar, createSidebar } from './sidebar'
export type { SidebarConfig, SidebarState, SidebarVariant, SidebarPosition } from './sidebar'

export { Footer, createFooter } from './footer'
export type { FooterConfig, FooterState, FooterVariant } from './footer'

// Advanced Components (Phase 6)
export { AIChat, createAIChat } from './ai-chat'
export type {
  AIChatConfig,
  AIChatState,
  ChatMessage,
  MessageRole,
  MessageStatus,
} from './ai-chat'

export { Kanban, createKanban } from './kanban'
export type {
  KanbanConfig,
  KanbanState,
  KanbanCard,
  KanbanColumn,
  KanbanLabel,
  KanbanAssignee,
} from './kanban'

export { Terminal, createTerminal, TERMINAL_THEMES } from './terminal'
export type {
  TerminalConfig,
  TerminalState,
  TerminalLine,
  TerminalTheme,
  OutputType,
} from './terminal'

// Batch 8 Components (New)
export { OTPInput, createOTPInput } from './otp-input'
export type { OTPInputConfig, OTPInputState } from './otp-input'

export { InfiniteScroll, createInfiniteScroll } from './infinite-scroll'
export type { InfiniteScrollConfig, InfiniteScrollState } from './infinite-scroll'

export { Masonry, createMasonry } from './masonry'
export type { MasonryConfig, MasonryState } from './masonry'

export { SplitView, createSplitView } from './split-view'
export type { SplitViewConfig, SplitViewState } from './split-view'

// Batch 9 Components (Modern UI)
export { Spotlight, createSpotlight } from './spotlight'
export type { SpotlightConfig, SpotlightState, SpotlightItem } from './spotlight'

export { Dock, createDock } from './dock'
export type { DockConfig, DockState, DockItem } from './dock'

export { CompareSlider, createCompareSlider } from './compare-slider'
export type { CompareSliderConfig, CompareSliderState } from './compare-slider'

// Batch 10 Components (Enterprise)
export { DataGrid, createDataGrid } from './data-grid'
export type { DataGridConfig, DataGridState, DataGridColumn, DataGridSort, DataGridFilter, DataGridPagination } from './data-grid'

export { StepperForm, createStepperForm } from './stepper-form'
export type { StepperFormConfig, StepperFormState, StepperFormStep, ValidationRule, FieldValidation } from './stepper-form'

// Imports for initComponents and registries
import { Button, ButtonGroup } from './button'
import { Dialog } from './dialog'
import { Dropdown } from './dropdown'
import { Tabs } from './tabs'
import { Accordion } from './accordion'
import { Tooltip } from './tooltip'
import { Switch } from './switch'
import { Toast } from './toast'
import { Popover } from './popover'
import { Select } from './select'
import { Menu } from './menu'
import { Slider } from './slider'
import { Progress } from './progress'
import { Avatar } from './avatar'
import { Alert } from './alert'
import { Breadcrumb } from './breadcrumb'
import { Pagination } from './pagination'
import { Drawer } from './drawer'
import { Command } from './command'
import { Skeleton, SkeletonGroup } from './skeleton'
import { Carousel } from './carousel'
import { ContextMenu } from './context-menu'
import { AlertDialog } from './alert-dialog'
import { AspectRatio } from './aspect-ratio'
import { Badge } from './badge'
import { Calendar } from './calendar'
import { Card } from './card'
import { Checkbox } from './checkbox'
import { Collapsible } from './collapsible'
import { HoverCard } from './hover-card'
import { Input } from './input'
import { Label } from './label'
import { NavigationMenu } from './navigation-menu'
import { RadioGroup } from './radio-group'
import { Resizable } from './resizable'
import { ScrollArea } from './scroll-area'
import { Separator } from './separator'
import { Table } from './table'
import { Textarea } from './textarea'
import { Toggle } from './toggle'
import { ToggleGroup } from './toggle-group'
// Batch 3
import { Rating } from './rating'
import { Stepper } from './stepper'
import { Chip } from './chip'
import { Timeline } from './timeline'
import { Stat } from './stat'
import { Kbd } from './kbd'
import { Code } from './code'
import { EmptyState } from './empty-state'
import { Spinner } from './spinner'
import { Tree } from './tree'
import { NumberInput } from './number-input'
import { PinInput } from './pin-input'
import { FileUpload } from './file-upload'
import { ColorPicker } from './color-picker'
import { DatePicker } from './date-picker'
import { Marquee } from './marquee'
import { ImageGallery } from './image-gallery'
import { RangeSlider } from './range-slider'
import { DataTable } from './data-table'
// Batch 4
import { Sheet } from './sheet'
import { Menubar } from './menubar'
import { VirtualList } from './virtual-list'
import { Combobox } from './combobox'
// Batch 5
import { MultiSelect } from './multi-select'
import { TagInput } from './tag-input'
// Batch 6
import { Mention } from './mention'
import { DateRangePicker } from './date-range-picker'
import { Tour } from './tour'
import { ImageCrop } from './image-crop'
// Batch 7
import { TimePicker } from './time-picker'
import { SegmentedControl } from './segmented-control'
import { Transfer } from './transfer'
import { QRCode } from './qrcode'
import { Countdown } from './countdown'

import { createButton, createButtonGroup } from './button'
import { createDialog } from './dialog'
import { createDropdown } from './dropdown'
import { createTabs } from './tabs'
import { createAccordion } from './accordion'
import { createTooltip } from './tooltip'
import { createSwitch } from './switch'
import { createToast, createToastContainer } from './toast'
import { createPopover } from './popover'
import { createSelect } from './select'
import { createMenu } from './menu'
import { createSlider } from './slider'
import { createProgress } from './progress'
import { createAvatar } from './avatar'
import { createAlert } from './alert'
import { createBreadcrumb } from './breadcrumb'
import { createPagination } from './pagination'
import { createDrawer } from './drawer'
import { createCommand } from './command'
import { createSkeleton, createSkeletonGroup } from './skeleton'
import { createCarousel } from './carousel'
import { createContextMenu } from './context-menu'
import { createAlertDialog } from './alert-dialog'
import { createAspectRatio } from './aspect-ratio'
import { createBadge } from './badge'
import { createCalendar } from './calendar'
import { createCard } from './card'
import { createCheckbox } from './checkbox'
import { createCollapsible } from './collapsible'
import { createHoverCard } from './hover-card'
import { createInput } from './input'
import { createLabel } from './label'
import { createNavigationMenu } from './navigation-menu'
import { createRadioGroup } from './radio-group'
import { createResizable } from './resizable'
import { createScrollArea } from './scroll-area'
import { createSeparator } from './separator'
import { createTable } from './table'
import { createTextarea } from './textarea'
import { createToggle } from './toggle'
import { createToggleGroup } from './toggle-group'
// Batch 3
import { createRating } from './rating'
import { createStepper } from './stepper'
import { createChip } from './chip'
import { createTimeline } from './timeline'
import { createStat } from './stat'
import { createKbd } from './kbd'
import { createCode } from './code'
import { createEmptyState } from './empty-state'
import { createSpinner } from './spinner'
import { createTree } from './tree'
import { createNumberInput } from './number-input'
import { createPinInput } from './pin-input'
import { createFileUpload } from './file-upload'
import { createColorPicker } from './color-picker'
import { createDatePicker } from './date-picker'
import { createMarquee } from './marquee'
import { createImageGallery } from './image-gallery'
import { createRangeSlider } from './range-slider'
import { createDataTable } from './data-table'
// Batch 4
import { createSheet } from './sheet'
import { createMenubar } from './menubar'
import { createVirtualList } from './virtual-list'
import { createCombobox } from './combobox'
// Batch 5
import { createMultiSelect } from './multi-select'
import { createTagInput } from './tag-input'
// Batch 6
import { createMention } from './mention'
import { createDateRangePicker } from './date-range-picker'
import { createTour } from './tour'
import { createImageCrop } from './image-crop'
// Batch 7
import { createTimePicker } from './time-picker'
import { createSegmentedControl } from './segmented-control'
import { createTransfer } from './transfer'
import { createQRCode } from './qrcode'
import { createCountdown } from './countdown'
// Layout
import { Navbar } from './navbar'
import { Sidebar } from './sidebar'
import { Footer } from './footer'
import { createNavbar } from './navbar'
import { createSidebar } from './sidebar'
import { createFooter } from './footer'
// Advanced Components (Phase 6)
import { AIChat } from './ai-chat'
import { Kanban } from './kanban'
import { Terminal } from './terminal'
import { createAIChat } from './ai-chat'
import { createKanban } from './kanban'
import { createTerminal } from './terminal'
// Batch 8
import { OTPInput } from './otp-input'
import { InfiniteScroll } from './infinite-scroll'
import { Masonry } from './masonry'
import { SplitView } from './split-view'
import { createOTPInput } from './otp-input'
import { createInfiniteScroll } from './infinite-scroll'
import { createMasonry } from './masonry'
import { createSplitView } from './split-view'
// Batch 9
import { Spotlight } from './spotlight'
import { Dock } from './dock'
import { CompareSlider } from './compare-slider'
import { createSpotlight } from './spotlight'
import { createDock } from './dock'
import { createCompareSlider } from './compare-slider'
// Batch 10
import { DataGrid } from './data-grid'
import { createDataGrid } from './data-grid'
import { StepperForm } from './stepper-form'
import { createStepperForm } from './stepper-form'

/**
 * Auto-initialize all components from data attributes
 *
 * @example
 * ```typescript
 * import { initComponents } from '@coral-css/core/components'
 *
 * // Initialize all components on page load
 * document.addEventListener('DOMContentLoaded', () => {
 *   initComponents()
 * })
 * ```
 */
export function initComponents(): void {
  // Core components
  autoInit('[data-coral-button]', Button as never)
  autoInit('[data-coral-button-group]', ButtonGroup as never)
  autoInit('[data-coral-dialog]', Dialog as never)
  autoInit('[data-coral-dropdown]', Dropdown as never)
  autoInit('[data-coral-tabs]', Tabs as never)
  autoInit('[data-coral-accordion]', Accordion as never)
  autoInit('[data-coral-tooltip]', Tooltip as never)
  autoInit('[data-coral-switch]', Switch as never)
  autoInit('[data-coral-toast]', Toast as never)

  // New components
  autoInit('[data-coral-popover]', Popover as never)
  autoInit('[data-coral-select]', Select as never)
  autoInit('[data-coral-menu]', Menu as never)
  autoInit('[data-coral-slider]', Slider as never)
  autoInit('[data-coral-progress]', Progress as never)
  autoInit('[data-coral-avatar]', Avatar as never)
  autoInit('[data-coral-alert]', Alert as never)
  autoInit('[data-coral-breadcrumb]', Breadcrumb as never)
  autoInit('[data-coral-pagination]', Pagination as never)
  autoInit('[data-coral-drawer]', Drawer as never)
  autoInit('[data-coral-command]', Command as never)
  autoInit('[data-coral-skeleton]', Skeleton as never)
  autoInit('[data-coral-skeleton-group]', SkeletonGroup as never)
  autoInit('[data-coral-carousel]', Carousel as never)
  autoInit('[data-coral-context-menu]', ContextMenu as never)

  // Batch 2 components
  autoInit('[data-coral-alert-dialog]', AlertDialog as never)
  autoInit('[data-coral-aspect-ratio]', AspectRatio as never)
  autoInit('[data-coral-badge]', Badge as never)
  autoInit('[data-coral-calendar]', Calendar as never)
  autoInit('[data-coral-card]', Card as never)
  autoInit('[data-coral-checkbox]', Checkbox as never)
  autoInit('[data-coral-collapsible]', Collapsible as never)
  autoInit('[data-coral-hover-card]', HoverCard as never)
  autoInit('[data-coral-input]', Input as never)
  autoInit('[data-coral-label]', Label as never)
  autoInit('[data-coral-navigation-menu]', NavigationMenu as never)
  autoInit('[data-coral-radio-group]', RadioGroup as never)
  autoInit('[data-coral-resizable]', Resizable as never)
  autoInit('[data-coral-scroll-area]', ScrollArea as never)
  autoInit('[data-coral-separator]', Separator as never)
  autoInit('[data-coral-table]', Table as never)
  autoInit('[data-coral-textarea]', Textarea as never)
  autoInit('[data-coral-toggle]', Toggle as never)
  autoInit('[data-coral-toggle-group]', ToggleGroup as never)

  // Batch 3 components
  autoInit('[data-coral-rating]', Rating as never)
  autoInit('[data-coral-stepper]', Stepper as never)
  autoInit('[data-coral-chip]', Chip as never)
  autoInit('[data-coral-timeline]', Timeline as never)
  autoInit('[data-coral-stat]', Stat as never)
  autoInit('[data-coral-kbd]', Kbd as never)
  autoInit('[data-coral-code]', Code as never)
  autoInit('[data-coral-empty-state]', EmptyState as never)
  autoInit('[data-coral-spinner]', Spinner as never)
  autoInit('[data-coral-tree]', Tree as never)
  autoInit('[data-coral-number-input]', NumberInput as never)
  autoInit('[data-coral-pin-input]', PinInput as never)
  autoInit('[data-coral-file-upload]', FileUpload as never)
  autoInit('[data-coral-color-picker]', ColorPicker as never)
  autoInit('[data-coral-date-picker]', DatePicker as never)
  autoInit('[data-coral-marquee]', Marquee as never)
  autoInit('[data-coral-image-gallery]', ImageGallery as never)
  autoInit('[data-coral-range-slider]', RangeSlider as never)
  autoInit('[data-coral-data-table]', DataTable as never)

  // Batch 4 components
  autoInit('[data-coral-sheet]', Sheet as never)
  autoInit('[data-coral-menubar]', Menubar as never)
  autoInit('[data-coral-virtual-list]', VirtualList as never)
  autoInit('[data-coral-combobox]', Combobox as never)

  // Batch 5 components
  autoInit('[data-coral-multi-select]', MultiSelect as never)
  autoInit('[data-coral-tag-input]', TagInput as never)

  // Batch 6 components
  autoInit('[data-coral-mention]', Mention as never)
  autoInit('[data-coral-date-range-picker]', DateRangePicker as never)
  autoInit('[data-coral-tour]', Tour as never)
  autoInit('[data-coral-image-crop]', ImageCrop as never)

  // Batch 7 components
  autoInit('[data-coral-time-picker]', TimePicker as never)
  autoInit('[data-coral-segmented-control]', SegmentedControl as never)
  autoInit('[data-coral-transfer]', Transfer as never)
  autoInit('[data-coral-qrcode]', QRCode as never)
  autoInit('[data-coral-countdown]', Countdown as never)

  // Layout components
  autoInit('[data-coral-navbar]', Navbar as never)
  autoInit('[data-coral-sidebar]', Sidebar as never)
  autoInit('[data-coral-footer]', Footer as never)

  // Advanced Components (Phase 6)
  autoInit('[data-coral-ai-chat]', AIChat as never)
  autoInit('[data-coral-kanban]', Kanban as never)
  autoInit('[data-coral-terminal]', Terminal as never)

  // Batch 8 components
  autoInit('[data-coral-otp-input]', OTPInput as never)
  autoInit('[data-coral-infinite-scroll]', InfiniteScroll as never)
  autoInit('[data-coral-masonry]', Masonry as never)
  autoInit('[data-coral-split-view]', SplitView as never)

  // Batch 9 components
  autoInit('[data-coral-spotlight]', Spotlight as never)
  autoInit('[data-coral-dock]', Dock as never)
  autoInit('[data-coral-compare-slider]', CompareSlider as never)

  // Batch 10 components
  autoInit('[data-coral-data-grid]', DataGrid as never)
  autoInit('[data-coral-stepper-form]', StepperForm as never)
}

/**
 * Component registry for easy access
 */
export const components = {
  // Core
  Button,
  ButtonGroup,
  Dialog,
  Dropdown,
  Tabs,
  Accordion,
  Tooltip,
  Switch,
  Toast,
  // Extended
  Popover,
  Select,
  Menu,
  Slider,
  Progress,
  Avatar,
  Alert,
  Breadcrumb,
  Pagination,
  Drawer,
  Command,
  Skeleton,
  SkeletonGroup,
  Carousel,
  ContextMenu,
  // Batch 2
  AlertDialog,
  AspectRatio,
  Badge,
  Calendar,
  Card,
  Checkbox,
  Collapsible,
  HoverCard,
  Input,
  Label,
  NavigationMenu,
  RadioGroup,
  Resizable,
  ScrollArea,
  Separator,
  Table,
  Textarea,
  Toggle,
  ToggleGroup,
  // Batch 3
  Rating,
  Stepper,
  Chip,
  Timeline,
  Stat,
  Kbd,
  Code,
  EmptyState,
  Spinner,
  Tree,
  NumberInput,
  PinInput,
  FileUpload,
  ColorPicker,
  DatePicker,
  Marquee,
  ImageGallery,
  RangeSlider,
  DataTable,
  // Batch 4
  Sheet,
  Menubar,
  VirtualList,
  Combobox,
  // Batch 5
  MultiSelect,
  TagInput,
  // Batch 6
  Mention,
  DateRangePicker,
  Tour,
  ImageCrop,
  // Batch 7
  TimePicker,
  SegmentedControl,
  Transfer,
  QRCode,
  Countdown,
  // Layout
  Navbar,
  Sidebar,
  Footer,
  // Advanced Components (Phase 6)
  AIChat,
  Kanban,
  Terminal,
  // Batch 8
  OTPInput,
  InfiniteScroll,
  Masonry,
  SplitView,
  // Batch 9
  Spotlight,
  Dock,
  CompareSlider,
  // Batch 10
  DataGrid,
  StepperForm,
}

/**
 * Factory functions for creating component instances
 */
export const factories = {
  // Core
  createButton,
  createButtonGroup,
  createDialog,
  createDropdown,
  createTabs,
  createAccordion,
  createTooltip,
  createSwitch,
  createToast,
  createToastContainer,
  // Extended
  createPopover,
  createSelect,
  createMenu,
  createSlider,
  createProgress,
  createAvatar,
  createAlert,
  createBreadcrumb,
  createPagination,
  createDrawer,
  createCommand,
  createSkeleton,
  createSkeletonGroup,
  createCarousel,
  createContextMenu,
  // Batch 2
  createAlertDialog,
  createAspectRatio,
  createBadge,
  createCalendar,
  createCard,
  createCheckbox,
  createCollapsible,
  createHoverCard,
  createInput,
  createLabel,
  createNavigationMenu,
  createRadioGroup,
  createResizable,
  createScrollArea,
  createSeparator,
  createTable,
  createTextarea,
  createToggle,
  createToggleGroup,
  // Batch 3
  createRating,
  createStepper,
  createChip,
  createTimeline,
  createStat,
  createKbd,
  createCode,
  createEmptyState,
  createSpinner,
  createTree,
  createNumberInput,
  createPinInput,
  createFileUpload,
  createColorPicker,
  createDatePicker,
  createMarquee,
  createImageGallery,
  createRangeSlider,
  createDataTable,
  // Batch 4
  createSheet,
  createMenubar,
  createVirtualList,
  createCombobox,
  // Batch 5
  createMultiSelect,
  createTagInput,
  // Batch 6
  createMention,
  createDateRangePicker,
  createTour,
  createImageCrop,
  // Batch 7
  createTimePicker,
  createSegmentedControl,
  createTransfer,
  createQRCode,
  createCountdown,
  // Layout
  createNavbar,
  createSidebar,
  createFooter,
  // Advanced Components (Phase 6)
  createAIChat,
  createKanban,
  createTerminal,
  // Batch 8
  createOTPInput,
  createInfiniteScroll,
  createMasonry,
  createSplitView,
  // Batch 9
  createSpotlight,
  createDock,
  createCompareSlider,
  // Batch 10
  createDataGrid,
  createStepperForm,
}

export default components
