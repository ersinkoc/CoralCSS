/**
 * CoralCSS React Components
 *
 * React bindings for CoralCSS headless components.
 * @module @coral-css/react
 */

// Core hooks
export { useCoralComponent } from './hooks/useCoralComponent'
export { useTheme, ThemeProvider } from './hooks/useTheme'

// Layout components
export { Navbar } from './components/Navbar'
export { Sidebar } from './components/Sidebar'
export { Footer } from './components/Footer'

// Core components
export { Button, ButtonGroup } from './components/Button'
export { Dialog } from './components/Dialog'
export { Drawer } from './components/Drawer'
export { Dropdown } from './components/Dropdown'
export { Tabs, TabsList, TabsTrigger, TabsContent } from './components/Tabs'
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './components/Accordion'
export { Tooltip, TooltipTrigger, TooltipContent } from './components/Tooltip'
export { Switch } from './components/Switch'
export { Toast, Toaster, useToast } from './components/Toast'

// Form components
export { Input } from './components/Input'
export { Textarea } from './components/Textarea'
export { Select, SelectTrigger, SelectContent, SelectItem } from './components/Select'
export { Checkbox } from './components/Checkbox'
export { RadioGroup, RadioGroupItem } from './components/RadioGroup'
export { Slider } from './components/Slider'

// Data display
export { Avatar, AvatarImage, AvatarFallback } from './components/Avatar'
export { Badge } from './components/Badge'
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './components/Card'
export { Progress } from './components/Progress'
export { Skeleton } from './components/Skeleton'
export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from './components/Table'

// Navigation
export { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from './components/Breadcrumb'
export { Pagination } from './components/Pagination'
export { NavigationMenu, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent } from './components/NavigationMenu'

// Feedback
export { Alert, AlertTitle, AlertDescription } from './components/Alert'
export { Spinner } from './components/Spinner'

// Overlay
export { Popover, PopoverTrigger, PopoverContent } from './components/Popover'
export { Command, CommandInput, CommandList, CommandItem, CommandGroup } from './components/Command'
export { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from './components/ContextMenu'

// Utility components
export { Separator } from './components/Separator'
export { ScrollArea } from './components/ScrollArea'
export { AspectRatio } from './components/AspectRatio'
export { Collapsible, CollapsibleTrigger, CollapsibleContent } from './components/Collapsible'

// Types
export type { ButtonProps, ButtonVariant, ButtonSize } from './components/Button'
export type { DialogProps } from './components/Dialog'
export type { DrawerProps } from './components/Drawer'
export type { ToastProps } from './components/Toast'
export type { ThemeConfig, ThemeName } from './hooks/useTheme'
