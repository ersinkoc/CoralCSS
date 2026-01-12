import { useState } from 'react'
import { ComponentPageLayout } from './ComponentPageLayout'

// Button component data with detailed documentation
const buttonComponents = [
  {
    id: 'button',
    name: 'Button',
    description: 'A versatile button component with multiple variants, sizes, and states.',
    usage: `<button data-coral-button>Default</button>
<button data-coral-button data-variant="primary">Primary</button>
<button data-coral-button data-variant="secondary">Secondary</button>
<button data-coral-button data-variant="outline">Outline</button>
<button data-coral-button data-variant="ghost">Ghost</button>
<button data-coral-button data-variant="destructive">Destructive</button>`,
    props: [
      { name: 'data-variant', type: '"default" | "primary" | "secondary" | "outline" | "ghost" | "destructive"', default: '"default"', description: 'Visual style variant' },
      { name: 'data-size', type: '"sm" | "md" | "lg" | "xl"', default: '"md"', description: 'Button size' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the button' },
      { name: 'data-loading', type: 'boolean', default: 'false', description: 'Show loading spinner' },
    ],
    preview: ButtonPreview,
  },
  {
    id: 'icon-button',
    name: 'IconButton',
    description: 'A button designed for icons with equal width and height.',
    usage: `<button data-coral-icon-button aria-label="Menu">
  <svg><!-- icon --></svg>
</button>

<button data-coral-icon-button data-size="lg" aria-label="Settings">
  <svg><!-- icon --></svg>
</button>`,
    props: [
      { name: 'data-variant', type: '"default" | "primary" | "ghost" | "outline"', default: '"default"', description: 'Visual style variant' },
      { name: 'data-size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Button size' },
      { name: 'aria-label', type: 'string', default: 'required', description: 'Accessible label for screen readers' },
    ],
    preview: IconButtonPreview,
  },
  {
    id: 'button-group',
    name: 'ButtonGroup',
    description: 'Group related buttons together with connected styling.',
    usage: `<div data-coral-button-group>
  <button data-coral-button>Left</button>
  <button data-coral-button>Center</button>
  <button data-coral-button>Right</button>
</div>

<div data-coral-button-group data-orientation="vertical">
  <button data-coral-button>Top</button>
  <button data-coral-button>Bottom</button>
</div>`,
    props: [
      { name: 'data-orientation', type: '"horizontal" | "vertical"', default: '"horizontal"', description: 'Group direction' },
      { name: 'data-attached', type: 'boolean', default: 'true', description: 'Remove gaps between buttons' },
    ],
    preview: ButtonGroupPreview,
  },
  {
    id: 'toggle-button',
    name: 'ToggleButton',
    description: 'A button that can be toggled on and off.',
    usage: `<button data-coral-toggle aria-pressed="false">
  Bold
</button>

<button data-coral-toggle aria-pressed="true">
  <svg><!-- icon --></svg>
  Italic
</button>`,
    props: [
      { name: 'aria-pressed', type: 'boolean', default: 'false', description: 'Whether the button is pressed' },
      { name: 'data-variant', type: '"default" | "outline"', default: '"default"', description: 'Visual style variant' },
    ],
    preview: ToggleButtonPreview,
  },
  {
    id: 'copy-button',
    name: 'CopyButton',
    description: 'A button that copies text to clipboard with visual feedback.',
    usage: `<button data-coral-button data-variant="outline">
  <svg><!-- copy icon --></svg>
  Copy
</button>`,
    props: [
      { name: 'data-value', type: 'string', default: 'required', description: 'Text to copy to clipboard' },
      { name: 'data-success-duration', type: 'number', default: '2000', description: 'How long to show success state (ms)' },
    ],
    preview: CopyButtonPreview,
  },
  {
    id: 'split-button',
    name: 'SplitButton',
    description: 'A button with a dropdown for additional actions.',
    usage: `<div data-coral-split-button>
  <button data-coral-split-button-main>
    Save
  </button>
  <button data-coral-split-button-trigger aria-label="More options">
    <svg><!-- chevron icon --></svg>
  </button>
  <div data-coral-split-button-menu>
    <button data-coral-split-button-item>Save as Draft</button>
    <button data-coral-split-button-item>Save & Publish</button>
  </div>
</div>`,
    props: [
      { name: 'data-variant', type: '"primary" | "secondary" | "outline"', default: '"primary"', description: 'Visual style variant' },
      { name: 'data-size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Button size' },
    ],
    preview: SplitButtonPreview,
  },
  {
    id: 'floating-button',
    name: 'FloatingButton',
    description: 'A floating action button (FAB) for primary actions.',
    usage: `<button data-coral-fab data-position="bottom-right">
  <svg><!-- plus icon --></svg>
</button>

<button data-coral-fab data-size="lg" data-extended>
  <svg><!-- icon --></svg>
  <span>New Item</span>
</button>`,
    props: [
      { name: 'data-position', type: '"bottom-right" | "bottom-left" | "top-right" | "top-left"', default: '"bottom-right"', description: 'Fixed position on screen' },
      { name: 'data-size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Button size' },
      { name: 'data-extended', type: 'boolean', default: 'false', description: 'Show text label' },
    ],
    preview: FloatingButtonPreview,
  },
  {
    id: 'like-button',
    name: 'LikeButton',
    description: 'An animated like/heart button with counter.',
    usage: `<button data-coral-like-button>
  <svg data-coral-like-icon><!-- heart icon --></svg>
  <span data-coral-like-count>42</span>
</button>`,
    props: [
      { name: 'data-liked', type: 'boolean', default: 'false', description: 'Whether the item is liked' },
      { name: 'data-animate', type: 'boolean', default: 'true', description: 'Enable animation on click' },
    ],
    preview: LikeButtonPreview,
  },
  {
    id: 'share-button',
    name: 'ShareButton',
    description: 'A button for sharing content via native share API or custom menu.',
    usage: `<button data-coral-button data-variant="outline"
  data-title="Check this out"
  data-url="https://example.com">
  Share
</button>`,
    props: [
      { name: 'data-title', type: 'string', default: '""', description: 'Share title' },
      { name: 'data-text', type: 'string', default: '""', description: 'Share text/description' },
      { name: 'data-url', type: 'string', default: 'current URL', description: 'URL to share' },
    ],
    preview: ShareButtonPreview,
  },
  {
    id: 'button-with-progress',
    name: 'ButtonWithProgress',
    description: 'A button with an integrated progress indicator for long-running actions.',
    usage: `<button data-coral-button data-progress data-progress-value="65">
  Upload File
</button>`,
    props: [
      { name: 'data-progress', type: 'boolean', default: 'false', description: 'Show progress bar' },
      { name: 'data-progress-value', type: 'number', default: '0', description: 'Progress value (0-100)' },
    ],
    preview: ButtonWithProgressPreview,
  },
  {
    id: 'button-with-badge',
    name: 'ButtonWithBadge',
    description: 'A button with a notification badge counter.',
    usage: `<button data-coral-button data-variant="primary">
  Messages
  <span data-coral-badge data-count="5">5</span>
</button>`,
    props: [
      { name: 'data-count', type: 'number', default: '0', description: 'Badge count number' },
      { name: 'data-badge-variant', type: '"default" | "destructive" | "success"', default: '"default"', description: 'Badge style variant' },
    ],
    preview: ButtonWithBadgePreview,
  },
  {
    id: 'button-with-icon-badge',
    name: 'ButtonWithIconBadge',
    description: 'An icon button with a notification badge overlay.',
    usage: `<button data-coral-icon-button aria-label="Notifications">
  <svg><!-- bell icon --></svg>
  <span data-coral-badge data-count="3"></span>
</button>`,
    props: [
      { name: 'data-count', type: 'number', default: '0', description: 'Badge count number' },
      { name: 'data-dot', type: 'boolean', default: 'false', description: 'Show as dot only' },
    ],
    preview: ButtonWithIconBadgePreview,
  },
  {
    id: 'social-button',
    name: 'SocialButton',
    description: 'Pre-styled buttons for social media authentication and sharing.',
    usage: `<button data-coral-social-button data-provider="google">
  Continue with Google
</button>

<button data-coral-social-button data-provider="github">
  <svg><!-- github icon --></svg>
  GitHub
</button>`,
    props: [
      { name: 'data-provider', type: '"google" | "github" | "twitter" | "facebook" | "discord"', default: '"google"', description: 'Social provider' },
      { name: 'data-variant', type: '"filled" | "outline" | "minimal"', default: '"filled"', description: 'Button style' },
    ],
    preview: SocialButtonPreview,
  },
  {
    id: 'button-with-dropdown',
    name: 'ButtonWithDropdown',
    description: 'A button with an integrated dropdown menu.',
    usage: `<div data-coral-dropdown>
  <button data-coral-button data-variant="primary">
    Options
    <svg><!-- chevron --></svg>
  </button>
  <div data-coral-dropdown-menu>
    <button data-coral-dropdown-item>Profile</button>
    <button data-coral-dropdown-item>Settings</button>
  </div>
</div>`,
    props: [
      { name: 'data-variant', type: '"default" | "primary" | "outline"', default: '"default"', description: 'Button variant' },
      { name: 'data-size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Button size' },
    ],
    preview: ButtonWithDropdownPreview,
  },
  {
    id: 'gradient-button',
    name: 'GradientButton',
    description: 'A button with beautiful gradient backgrounds.',
    usage: `<button data-coral-button data-gradient="primary">
  Primary Gradient
</button>
<button data-coral-button data-gradient="sunset">
  Sunset Gradient
</button>`,
    props: [
      { name: 'data-gradient', type: '"primary" | "secondary" | "sunset" | "ocean" | "forest"', default: '"primary"', description: 'Gradient preset' },
      { name: 'data-animate', type: 'boolean', default: 'false', description: 'Animate gradient on hover' },
    ],
    preview: GradientButtonPreview,
  },
  {
    id: 'pulse-button',
    name: 'PulseButton',
    description: 'A button with a pulsing animation effect.',
    usage: `<button data-coral-button data-pulse>
  Live Now
</button>`,
    props: [
      { name: 'data-pulse', type: 'boolean', default: 'false', description: 'Enable pulse animation' },
      { name: 'data-pulse-color', type: 'string', default: 'primary', description: 'Pulse ring color' },
    ],
    preview: PulseButtonPreview,
  },
  {
    id: 'ripple-button',
    name: 'RippleButton',
    description: 'A button with material design ripple effect on click.',
    usage: `<button data-coral-button data-ripple>
  Click Me
</button>`,
    props: [
      { name: 'data-ripple', type: 'boolean', default: 'true', description: 'Enable ripple effect' },
      { name: 'data-ripple-color', type: 'string', default: 'hsl(var(--primary-foreground) / 0.3)', description: 'Ripple color' },
    ],
    preview: RippleButtonPreview,
  },
  {
    id: 'glow-button',
    name: 'GlowButton',
    description: 'A button with a glowing effect on hover.',
    usage: `<button data-coral-button data-glow>
  Glow Effect
</button>`,
    props: [
      { name: 'data-glow', type: 'boolean', default: 'false', description: 'Enable glow effect' },
      { name: 'data-glow-color', type: 'string', default: 'primary', description: 'Glow color' },
    ],
    preview: GlowButtonPreview,
  },
  {
    id: 'neon-button',
    name: 'NeonButton',
    description: 'A button with neon light effect styling.',
    usage: `<button data-coral-button data-neon="cyan">
  Neon Style
</button>`,
    props: [
      { name: 'data-neon', type: '"cyan" | "pink" | "green" | "yellow"', default: '"cyan"', description: 'Neon color' },
      { name: 'data-flicker', type: 'boolean', default: 'false', description: 'Enable flicker animation' },
    ],
    preview: NeonButtonPreview,
  },
  {
    id: 'pill-button',
    name: 'PillButton',
    description: 'A button with fully rounded pill shape.',
    usage: `<button data-coral-button data-shape="pill">
  Pill Shape
</button>`,
    props: [
      { name: 'data-shape', type: '"pill"', default: '"pill"', description: 'Pill shape' },
      { name: 'data-variant', type: '"primary" | "secondary" | "outline"', default: '"primary"', description: 'Style variant' },
    ],
    preview: PillButtonPreview,
  },
  {
    id: 'loading-button',
    name: 'LoadingButton',
    description: 'A button with built-in loading spinner states.',
    usage: `<button data-coral-button data-loading="true">
  <span data-coral-spinner></span>
  Loading...
</button>`,
    props: [
      { name: 'data-loading', type: 'boolean', default: 'false', description: 'Show loading state' },
      { name: 'data-loading-text', type: 'string', default: '"Loading..."', description: 'Text while loading' },
    ],
    preview: LoadingButtonPreview,
  },
  {
    id: 'success-button',
    name: 'SuccessButton',
    description: 'A button styled for success/confirmation actions.',
    usage: `<button data-coral-button data-variant="success">
  Confirm
</button>`,
    props: [
      { name: 'data-variant', type: '"success"', default: '"success"', description: 'Success variant' },
      { name: 'data-icon', type: 'boolean', default: 'true', description: 'Show checkmark icon' },
    ],
    preview: SuccessButtonPreview,
  },
  {
    id: 'warning-button',
    name: 'WarningButton',
    description: 'A button styled for warning/caution actions.',
    usage: `<button data-coral-button data-variant="warning">
  Caution
</button>`,
    props: [
      { name: 'data-variant', type: '"warning"', default: '"warning"', description: 'Warning variant' },
    ],
    preview: WarningButtonPreview,
  },
  {
    id: 'info-button',
    name: 'InfoButton',
    description: 'A button styled for informational actions.',
    usage: `<button data-coral-button data-variant="info">
  Learn More
</button>`,
    props: [
      { name: 'data-variant', type: '"info"', default: '"info"', description: 'Info variant' },
    ],
    preview: InfoButtonPreview,
  },
  {
    id: 'link-button',
    name: 'LinkButton',
    description: 'A button styled as a text link.',
    usage: `<button data-coral-button data-variant="link">
  Read more →
</button>`,
    props: [
      { name: 'data-variant', type: '"link"', default: '"link"', description: 'Link variant' },
      { name: 'data-underline', type: '"always" | "hover" | "none"', default: '"hover"', description: 'Underline behavior' },
    ],
    preview: LinkButtonPreview,
  },
  {
    id: 'download-button',
    name: 'DownloadButton',
    description: 'A button for file download actions with progress.',
    usage: `<button data-coral-download-button data-file="document.pdf">
  <svg><!-- download icon --></svg>
  Download
</button>`,
    props: [
      { name: 'data-file', type: 'string', default: 'required', description: 'File name to display' },
      { name: 'data-size', type: 'string', default: '""', description: 'File size to display' },
    ],
    preview: DownloadButtonPreview,
  },
  {
    id: 'upload-button',
    name: 'UploadButton',
    description: 'A button for file upload with drag and drop support.',
    usage: `<label data-coral-upload-button>
  <input type="file" hidden />
  <svg><!-- upload icon --></svg>
  Choose File
</label>`,
    props: [
      { name: 'data-accept', type: 'string', default: '"*"', description: 'Accepted file types' },
      { name: 'data-multiple', type: 'boolean', default: 'false', description: 'Allow multiple files' },
    ],
    preview: UploadButtonPreview,
  },
  {
    id: 'expand-button',
    name: 'ExpandButton',
    description: 'A button for expanding/collapsing content.',
    usage: `<button data-coral-expand-button aria-expanded="false">
  <span>Show More</span>
  <svg><!-- chevron icon --></svg>
</button>`,
    props: [
      { name: 'aria-expanded', type: 'boolean', default: 'false', description: 'Expanded state' },
      { name: 'data-expand-text', type: 'string', default: '"Show More"', description: 'Text when collapsed' },
      { name: 'data-collapse-text', type: 'string', default: '"Show Less"', description: 'Text when expanded' },
    ],
    preview: ExpandButtonPreview,
  },
  {
    id: 'close-button',
    name: 'CloseButton',
    description: 'A button for closing dialogs, modals, or dismissing content.',
    usage: `<button data-coral-close-button aria-label="Close">
  <svg><!-- x icon --></svg>
</button>`,
    props: [
      { name: 'data-size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Button size' },
      { name: 'aria-label', type: 'string', default: '"Close"', description: 'Accessible label' },
    ],
    preview: CloseButtonPreview,
  },
  {
    id: 'back-button',
    name: 'BackButton',
    description: 'A button for navigating back.',
    usage: `<button data-coral-back-button>
  <svg><!-- arrow left icon --></svg>
  Back
</button>`,
    props: [
      { name: 'data-variant', type: '"default" | "ghost"', default: '"ghost"', description: 'Style variant' },
    ],
    preview: BackButtonPreview,
  },
  {
    id: 'next-button',
    name: 'NextButton',
    description: 'A button for navigating forward or continuing.',
    usage: `<button data-coral-next-button>
  Next
  <svg><!-- arrow right icon --></svg>
</button>`,
    props: [
      { name: 'data-variant', type: '"primary" | "outline"', default: '"primary"', description: 'Style variant' },
    ],
    preview: NextButtonPreview,
  },
  {
    id: 'refresh-button',
    name: 'RefreshButton',
    description: 'A button for refreshing content with spinning animation.',
    usage: `<button data-coral-refresh-button>
  <svg data-coral-refresh-icon><!-- refresh icon --></svg>
  Refresh
</button>`,
    props: [
      { name: 'data-spinning', type: 'boolean', default: 'false', description: 'Show spinning animation' },
    ],
    preview: RefreshButtonPreview,
  },
  {
    id: 'bookmark-button',
    name: 'BookmarkButton',
    description: 'A button for bookmarking/saving items.',
    usage: `<button data-coral-bookmark-button aria-pressed="false">
  <svg><!-- bookmark icon --></svg>
</button>`,
    props: [
      { name: 'aria-pressed', type: 'boolean', default: 'false', description: 'Bookmarked state' },
      { name: 'data-animate', type: 'boolean', default: 'true', description: 'Animate on toggle' },
    ],
    preview: BookmarkButtonPreview,
  },
  {
    id: 'confirm-button',
    name: 'ConfirmButton',
    description: 'A button that requires confirmation before action.',
    usage: `<button data-coral-confirm-button data-confirm-text="Are you sure?">
  Delete Item
</button>`,
    props: [
      { name: 'data-confirm-text', type: 'string', default: '"Are you sure?"', description: 'Confirmation message' },
      { name: 'data-timeout', type: 'number', default: '3000', description: 'Confirmation timeout (ms)' },
    ],
    preview: ConfirmButtonPreview,
  },
  {
    id: 'counter-button',
    name: 'CounterButton',
    description: 'A button with increment/decrement controls.',
    usage: `<div data-coral-counter-button>
  <button data-coral-counter-decrement>-</button>
  <span data-coral-counter-value>0</span>
  <button data-coral-counter-increment>+</button>
</div>`,
    props: [
      { name: 'data-min', type: 'number', default: '0', description: 'Minimum value' },
      { name: 'data-max', type: 'number', default: '100', description: 'Maximum value' },
      { name: 'data-step', type: 'number', default: '1', description: 'Step increment' },
    ],
    preview: CounterButtonPreview,
  },
  {
    id: 'theme-toggle',
    name: 'ThemeToggle',
    description: 'A button for toggling between light and dark themes.',
    usage: `<button data-coral-theme-toggle aria-label="Toggle theme">
  <svg data-coral-sun-icon><!-- sun icon --></svg>
  <svg data-coral-moon-icon><!-- moon icon --></svg>
</button>`,
    props: [
      { name: 'data-theme', type: '"light" | "dark" | "system"', default: '"system"', description: 'Current theme' },
    ],
    preview: ThemeTogglePreview,
  },
  {
    id: 'language-button',
    name: 'LanguageButton',
    description: 'A button for selecting language with dropdown.',
    usage: `<button data-coral-language-button>
  <span data-coral-flag>🇺🇸</span>
  English
  <svg><!-- chevron --></svg>
</button>`,
    props: [
      { name: 'data-locale', type: 'string', default: '"en"', description: 'Current locale code' },
      { name: 'data-show-flag', type: 'boolean', default: 'true', description: 'Show country flag' },
    ],
    preview: LanguageButtonPreview,
  },
  {
    id: 'print-button',
    name: 'PrintButton',
    description: 'A button for printing the current page or content.',
    usage: `<button data-coral-print-button>
  <svg><!-- printer icon --></svg>
  Print
</button>`,
    props: [
      { name: 'data-target', type: 'string', default: '""', description: 'Selector for print target' },
    ],
    preview: PrintButtonPreview,
  },
  {
    id: 'fullscreen-button',
    name: 'FullscreenButton',
    description: 'A button for toggling fullscreen mode.',
    usage: `<button data-coral-fullscreen-button aria-pressed="false">
  <svg data-coral-expand-icon><!-- expand icon --></svg>
  <svg data-coral-compress-icon><!-- compress icon --></svg>
</button>`,
    props: [
      { name: 'data-target', type: 'string', default: 'document', description: 'Element to fullscreen' },
    ],
    preview: FullscreenButtonPreview,
  },
  {
    id: 'play-pause-button',
    name: 'PlayPauseButton',
    description: 'A button for media play/pause control.',
    usage: `<button data-coral-play-pause aria-pressed="false">
  <svg data-coral-play-icon><!-- play icon --></svg>
  <svg data-coral-pause-icon><!-- pause icon --></svg>
</button>`,
    props: [
      { name: 'aria-pressed', type: 'boolean', default: 'false', description: 'Playing state' },
      { name: 'data-size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Button size' },
    ],
    preview: PlayPauseButtonPreview,
  },
  {
    id: 'mute-button',
    name: 'MuteButton',
    description: 'A button for muting/unmuting audio.',
    usage: `<button data-coral-mute-button aria-pressed="false">
  <svg data-coral-volume-icon><!-- volume icon --></svg>
  <svg data-coral-mute-icon><!-- mute icon --></svg>
</button>`,
    props: [
      { name: 'aria-pressed', type: 'boolean', default: 'false', description: 'Muted state' },
    ],
    preview: MuteButtonPreview,
  },
  {
    id: 'edit-button',
    name: 'EditButton',
    description: 'A button for entering edit mode.',
    usage: `<button data-coral-edit-button>
  <svg><!-- pencil icon --></svg>
  Edit
</button>`,
    props: [
      { name: 'data-editing', type: 'boolean', default: 'false', description: 'Editing state' },
    ],
    preview: EditButtonPreview,
  },
  {
    id: 'delete-button',
    name: 'DeleteButton',
    description: 'A destructive button for delete actions.',
    usage: `<button data-coral-delete-button>
  <svg><!-- trash icon --></svg>
  Delete
</button>`,
    props: [
      { name: 'data-confirm', type: 'boolean', default: 'true', description: 'Require confirmation' },
    ],
    preview: DeleteButtonPreview,
  },
  {
    id: 'add-button',
    name: 'AddButton',
    description: 'A button for adding new items.',
    usage: `<button data-coral-add-button>
  <svg><!-- plus icon --></svg>
  Add Item
</button>`,
    props: [
      { name: 'data-variant', type: '"primary" | "dashed" | "ghost"', default: '"dashed"', description: 'Style variant' },
    ],
    preview: AddButtonPreview,
  },
  {
    id: 'filter-button',
    name: 'FilterButton',
    description: 'A button for opening filter options.',
    usage: `<button data-coral-filter-button data-active="false">
  <svg><!-- filter icon --></svg>
  Filters
  <span data-coral-filter-count>3</span>
</button>`,
    props: [
      { name: 'data-active', type: 'boolean', default: 'false', description: 'Filters active' },
      { name: 'data-count', type: 'number', default: '0', description: 'Active filter count' },
    ],
    preview: FilterButtonPreview,
  },
  {
    id: 'sort-button',
    name: 'SortButton',
    description: 'A button for sorting with direction indicator.',
    usage: `<button data-coral-sort-button data-direction="asc">
  Sort by Name
  <svg><!-- sort icon --></svg>
</button>`,
    props: [
      { name: 'data-direction', type: '"asc" | "desc" | "none"', default: '"none"', description: 'Sort direction' },
    ],
    preview: SortButtonPreview,
  },
  {
    id: 'menu-button',
    name: 'MenuButton',
    description: 'A hamburger menu button with animation.',
    usage: `<button data-coral-menu-button aria-expanded="false" aria-label="Menu">
  <span data-coral-menu-line></span>
  <span data-coral-menu-line></span>
  <span data-coral-menu-line></span>
</button>`,
    props: [
      { name: 'aria-expanded', type: 'boolean', default: 'false', description: 'Menu open state' },
    ],
    preview: MenuButtonPreview,
  },
  {
    id: 'reaction-button',
    name: 'ReactionButton',
    description: 'A button for emoji reactions.',
    usage: `<div data-coral-reaction-button>
  <button data-coral-reaction="👍">👍 12</button>
  <button data-coral-reaction="❤️">❤️ 5</button>
  <button data-coral-reaction-add>+</button>
</div>`,
    props: [
      { name: 'data-reactions', type: 'string[]', default: '["👍", "❤️", "😄"]', description: 'Available reactions' },
    ],
    preview: ReactionButtonPreview,
  },
  {
    id: 'follow-button',
    name: 'FollowButton',
    description: 'A button for following/unfollowing users.',
    usage: `<button data-coral-follow-button data-following="false">
  Follow
</button>`,
    props: [
      { name: 'data-following', type: 'boolean', default: 'false', description: 'Following state' },
    ],
    preview: FollowButtonPreview,
  },
  {
    id: 'subscribe-button',
    name: 'SubscribeButton',
    description: 'A button for subscribing to content or newsletters.',
    usage: `<button data-coral-subscribe-button data-subscribed="false">
  <svg><!-- bell icon --></svg>
  Subscribe
</button>`,
    props: [
      { name: 'data-subscribed', type: 'boolean', default: 'false', description: 'Subscribed state' },
    ],
    preview: SubscribeButtonPreview,
  },
]

function ButtonsPage() {
  return (
    <ComponentPageLayout
      categoryName="Buttons"
      categoryId="buttons"
      components={buttonComponents}
      accessibilityFeatures={[
        'Full keyboard support',
        'Focus visible states',
        'Screen reader announced',
        'ARIA roles & states',
        'Touch-friendly targets',
        'Disabled state handling',
        'Badge notifications',
        'Progress indicators',
      ]}
    />
  )
}

// Preview Components with data-coral-* attributes
function ButtonPreview() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button data-coral-button data-variant="primary">Primary</button>
      <button data-coral-button data-variant="secondary">Secondary</button>
      <button data-coral-button data-variant="outline">Outline</button>
      <button data-coral-button data-variant="ghost">Ghost</button>
      <button data-coral-button data-variant="destructive">Destructive</button>
      <button data-coral-button data-variant="primary" disabled>Disabled</button>
    </div>
  )
}

function IconButtonPreview() {
  return (
    <div className="flex items-center gap-4">
      <button data-coral-icon-button data-variant="primary" aria-label="Menu">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <button data-coral-icon-button data-variant="outline" aria-label="Search">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
      <button data-coral-icon-button data-variant="ghost" aria-label="Settings">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
      <button data-coral-icon-button data-variant="destructive" data-size="lg" aria-label="Delete">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  )
}

function ButtonGroupPreview() {
  const [active, setActive] = useState(0)
  return (
    <div className="space-y-6">
      <div data-coral-button-group>
        {['Left', 'Center', 'Right'].map((label, i) => (
          <button
            key={label}
            onClick={() => setActive(i)}
            data-coral-button
            data-variant={i === active ? 'primary' : 'outline'}
          >
            {label}
          </button>
        ))}
      </div>
      <div data-coral-button-group data-orientation="vertical">
        {['Top', 'Middle', 'Bottom'].map((label) => (
          <button key={label} data-coral-button data-variant="outline">
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

function ToggleButtonPreview() {
  const [bold, setBold] = useState(false)
  const [italic, setItalic] = useState(true)
  const [underline, setUnderline] = useState(false)
  return (
    <div data-coral-button-group>
      <button
        onClick={() => setBold(!bold)}
        data-coral-toggle
        data-pressed={bold || undefined}
        aria-pressed={bold}
      >
        <strong>B</strong>
      </button>
      <button
        onClick={() => setItalic(!italic)}
        data-coral-toggle
        data-pressed={italic || undefined}
        aria-pressed={italic}
      >
        <em>I</em>
      </button>
      <button
        onClick={() => setUnderline(!underline)}
        data-coral-toggle
        data-pressed={underline || undefined}
        aria-pressed={underline}
      >
        <span style={{ textDecoration: 'underline' }}>U</span>
      </button>
    </div>
  )
}

function CopyButtonPreview() {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard?.writeText('npm install @coral-css/core')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={handleCopy}
      data-coral-button
      data-variant="outline"
      data-copied={copied || undefined}
    >
      {copied ? (
        <>
          <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-success">Copied!</span>
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <span>Copy Code</span>
        </>
      )}
    </button>
  )
}

function SplitButtonPreview() {
  const [open, setOpen] = useState(false)
  return (
    <div data-coral-dropdown className="relative inline-flex">
      <div data-coral-button-group>
        <button data-coral-button data-variant="primary">Save</button>
        <button
          onClick={() => setOpen(!open)}
          data-coral-button
          data-variant="primary"
          aria-label="More options"
          style={{ borderLeft: '1px solid hsl(var(--primary-foreground) / 0.2)' }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      {open && (
        <div data-coral-dropdown-content data-open className="absolute top-full left-0 mt-1">
          <button data-coral-dropdown-item onClick={() => setOpen(false)}>Save as Draft</button>
          <button data-coral-dropdown-item onClick={() => setOpen(false)}>Save & Publish</button>
          <div data-coral-dropdown-separator />
          <button data-coral-dropdown-item onClick={() => setOpen(false)}>Save & Export</button>
        </div>
      )}
    </div>
  )
}

function FloatingButtonPreview() {
  return (
    <div className="relative w-full max-w-sm mx-auto h-32 bg-muted/30 rounded-xl border-2 border-dashed border-border">
      <button
        data-coral-fab
        className="absolute bottom-4 right-4"
        aria-label="Add new item"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  )
}

function LikeButtonPreview() {
  const [liked, setLiked] = useState(false)
  const [count, setCount] = useState(42)
  return (
    <button
      onClick={() => {
        setLiked(!liked)
        setCount(liked ? count - 1 : count + 1)
      }}
      data-coral-like-button
      data-liked={liked || undefined}
    >
      <svg
        className={`w-5 h-5 transition-transform ${liked ? 'scale-110' : ''}`}
        fill={liked ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
      <span className="font-medium">{count}</span>
    </button>
  )
}

function ShareButtonPreview() {
  const [shared, setShared] = useState(false)
  return (
    <button
      onClick={() => {
        setShared(true)
        setTimeout(() => setShared(false), 2000)
      }}
      data-coral-button
      data-variant="outline"
    >
      {shared ? (
        <>
          <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-success">Shared!</span>
        </>
      ) : (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          <span>Share</span>
        </>
      )}
    </button>
  )
}

function ButtonWithProgressPreview() {
  const [progress, setProgress] = useState(0)
  const [uploading, setUploading] = useState(false)

  const startUpload = () => {
    setUploading(true)
    setProgress(0)
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval)
          setUploading(false)
          return 100
        }
        return p + 10
      })
    }, 200)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={startUpload}
        disabled={uploading}
        data-coral-button
        data-variant="primary"
        data-progress={uploading}
      >
        {uploading ? 'Uploading...' : 'Upload File'}
        {uploading && (
          <div
            className="absolute bottom-0 left-0 h-1 bg-primary-foreground/30 rounded-full transition-all"
            style={{ width: '100%' }}
          >
            <div
              className="h-full bg-primary-foreground rounded-full transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </button>
      {uploading && <div className="text-sm text-muted-foreground">{progress}% complete</div>}
    </div>
  )
}

function ButtonWithBadgePreview() {
  const [messages, setMessages] = useState(5)

  return (
    <div className="flex items-center gap-4">
      <button
        data-coral-button
        data-variant="primary"
        onClick={() => setMessages((m) => Math.max(0, m - 1))}
      >
        Messages
        <span
          data-coral-badge
          data-count={messages}
          className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium bg-destructive text-destructive-foreground rounded-full min-w-[1.25rem] h-5"
        >
          {messages}
        </span>
      </button>
      <button
        data-coral-button
        data-variant="outline"
        onClick={() => setMessages((m) => m + 1)}
      >
        Notifications
        <span
          data-coral-badge
          data-count={messages}
          data-badge-variant="success"
          className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium bg-success text-success-foreground rounded-full min-w-[1.25rem] h-5"
        >
          {messages}
        </span>
      </button>
    </div>
  )
}

function ButtonWithIconBadgePreview() {
  return (
    <div className="flex items-center gap-6">
      <div className="relative">
        <button data-coral-icon-button data-variant="outline" aria-label="Notifications">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-xs font-medium">
          3
        </span>
      </div>
      <div className="relative">
        <button data-coral-icon-button data-variant="outline" aria-label="Messages">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
        <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-success"></span>
      </div>
      <div className="relative">
        <button data-coral-icon-button data-variant="outline" aria-label="Cart">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </button>
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">
          7
        </span>
      </div>
    </div>
  )
}

function SocialButtonPreview() {
  return (
    <div className="flex flex-col gap-3">
      <button
        data-coral-social-button
        data-provider="google"
        data-variant="filled"
        className="flex items-center justify-center gap-3 px-4 py-2 rounded-lg border border-border bg-card text-card-foreground hover:bg-accent transition-colors"
      >
        {/* Google brand colors preserved for brand recognition - these are official Google brand colors */}
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Continue with Google
      </button>
      <button
        data-coral-social-button
        data-provider="github"
        data-variant="filled"
        className="flex items-center justify-center gap-3 px-4 py-2 rounded-lg border border-border bg-card text-card-foreground hover:bg-accent transition-colors"
      >
        {/* GitHub brand color preserved for brand recognition */}
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        Continue with GitHub
      </button>
    </div>
  )
}

function ButtonWithDropdownPreview() {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        data-coral-button
        data-variant="primary"
        className="flex items-center gap-2"
      >
        Options
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 min-w-[10rem] bg-card border border-border rounded-lg shadow-lg py-1 z-10">
          <button
            onClick={() => setOpen(false)}
            className="w-full text-left px-4 py-2 text-sm text-card-foreground hover:bg-accent transition-colors"
          >
            Profile Settings
          </button>
          <button
            onClick={() => setOpen(false)}
            className="w-full text-left px-4 py-2 text-sm text-card-foreground hover:bg-accent transition-colors"
          >
            Account Preferences
          </button>
          <div className="border-t border-border my-1" />
          <button
            onClick={() => setOpen(false)}
            className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-accent transition-colors"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}

// New Button Preview Components
function GradientButtonPreview() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button className="px-4 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-[var(--coral-500)] to-[var(--coral-600)] hover:from-[var(--coral-600)] hover:to-[var(--coral-700)] transition-all">
        Coral Sunset
      </button>
      <button className="px-4 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-[var(--info)] to-[var(--success)] hover:opacity-90 transition-all">
        Ocean
      </button>
      <button className="px-4 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-[var(--success)] to-[var(--success)] hover:opacity-90 transition-all">
        Forest
      </button>
      <button className="px-4 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-[var(--primary)] to-[var(--primary)] hover:opacity-90 transition-all">
        Galaxy
      </button>
    </div>
  )
}

function PulseButtonPreview() {
  return (
    <div className="flex items-center gap-4">
      <button className="relative px-4 py-2 rounded-lg bg-destructive text-destructive-foreground font-medium">
        <span className="absolute inset-0 rounded-lg bg-destructive animate-ping opacity-75"></span>
        <span className="relative">Live Now</span>
      </button>
      <button className="relative px-4 py-2 rounded-lg bg-success text-success-foreground font-medium">
        <span className="absolute inset-0 rounded-lg bg-success animate-ping opacity-75"></span>
        <span className="relative">Online</span>
      </button>
    </div>
  )
}

function RippleButtonPreview() {
  const [ripples, setRipples] = useState<{x: number, y: number, id: number}[]>([])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()
    setRipples([...ripples, {x, y, id}])
    setTimeout(() => setRipples(r => r.filter(rip => rip.id !== id)), 600)
  }

  return (
    <button
      onClick={handleClick}
      className="relative overflow-hidden px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium"
    >
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full animate-ping"
          style={{ left: ripple.x - 10, top: ripple.y - 10, width: 20, height: 20 }}
        />
      ))}
      Click for Ripple
    </button>
  )
}

function GlowButtonPreview() {
  return (
    <div className="flex items-center gap-4">
      <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium shadow-lg shadow-primary/50 hover:shadow-xl hover:shadow-primary/60 transition-all">
        Glow Primary
      </button>
      <button className="px-4 py-2 rounded-lg bg-info text-info-foreground font-medium shadow-lg shadow-info/50 hover:shadow-xl hover:shadow-info/60 transition-all">
        Glow Info
      </button>
    </div>
  )
}

function NeonButtonPreview() {
  return (
    <div className="flex items-center gap-4 p-4 bg-slate-900 rounded-lg">
      <button className="px-4 py-2 rounded-lg border-2 text-[var(--info)] font-medium shadow-[0_0_10px_hsl(var(--info)/0.5),0_0_20px_hsl(var(--info)/0.3)] hover:shadow-[0_0_15px_hsl(var(--info)/0.7),0_0_30px_hsl(var(--info)/0.5)] transition-all" style={{borderColor: 'hsl(var(--info))'}}>
        Cyan Neon
      </button>
      <button className="px-4 py-2 rounded-lg border-2 text-[var(--destructive)] font-medium shadow-[0_0_10px_hsl(var(--destructive)/0.5),0_0_20px_hsl(var(--destructive)/0.3)] hover:shadow-[0_0_15px_hsl(var(--destructive)/0.7),0_0_30px_hsl(var(--destructive)/0.5)] transition-all" style={{borderColor: 'hsl(var(--destructive))'}}>
        Pink Neon
      </button>
    </div>
  )
}

function PillButtonPreview() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button className="px-6 py-2 rounded-full bg-primary text-primary-foreground font-medium">
        Primary Pill
      </button>
      <button className="px-6 py-2 rounded-full border border-border text-foreground font-medium hover:bg-accent">
        Outline Pill
      </button>
      <button className="px-6 py-2 rounded-full bg-muted text-muted-foreground font-medium hover:bg-muted/80">
        Muted Pill
      </button>
    </div>
  )
}

function LoadingButtonPreview() {
  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium disabled:opacity-70"
    >
      {loading && (
        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {loading ? 'Loading...' : 'Submit'}
    </button>
  )
}

function SuccessButtonPreview() {
  return (
    <div className="flex items-center gap-3">
      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-success text-success-foreground font-medium">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        Confirmed
      </button>
      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-success text-success-foreground font-medium">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Success
      </button>
    </div>
  )
}

function WarningButtonPreview() {
  return (
    <div className="flex items-center gap-3">
      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-warning text-warning-foreground font-medium">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        Warning
      </button>
      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-warning text-warning-foreground font-medium">
        Caution Required
      </button>
    </div>
  )
}

function InfoButtonPreview() {
  return (
    <div className="flex items-center gap-3">
      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-info text-info-foreground font-medium">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Learn More
      </button>
      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-info text-info-foreground font-medium">
        View Details
      </button>
    </div>
  )
}

function LinkButtonPreview() {
  return (
    <div className="flex items-center gap-4">
      <button className="text-primary underline-offset-4 hover:underline font-medium">
        Read more →
      </button>
      <button className="text-primary underline underline-offset-4 font-medium">
        Always underlined
      </button>
      <button className="text-muted-foreground hover:text-primary transition-colors font-medium">
        Subtle link
      </button>
    </div>
  )
}

function DownloadButtonPreview() {
  const [downloading, setDownloading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleDownload = () => {
    setDownloading(true)
    setProgress(0)
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval)
          setDownloading(false)
          return 100
        }
        return p + 20
      })
    }, 300)
  }

  return (
    <button
      onClick={handleDownload}
      disabled={downloading}
      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card hover:bg-accent transition-colors"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      <span>{downloading ? `${progress}%` : 'Download'}</span>
      <span className="text-xs text-muted-foreground">PDF • 2.4 MB</span>
    </button>
  )
}

function UploadButtonPreview() {
  const [fileName, setFileName] = useState<string | null>(null)

  return (
    <label className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed border-border hover:border-primary cursor-pointer transition-colors">
      <input
        type="file"
        className="hidden"
        onChange={(e) => setFileName(e.target.files?.[0]?.name || null)}
      />
      <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
      <span className="text-muted-foreground">{fileName || 'Choose File'}</span>
    </label>
  )
}

function ExpandButtonPreview() {
  const [expanded, setExpanded] = useState(false)

  return (
    <button
      onClick={() => setExpanded(!expanded)}
      className="flex items-center gap-2 px-4 py-2 text-primary hover:underline"
    >
      <span>{expanded ? 'Show Less' : 'Show More'}</span>
      <svg className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  )
}

function CloseButtonPreview() {
  return (
    <div className="flex items-center gap-4">
      <button className="p-1 rounded-full hover:bg-muted transition-colors" aria-label="Close">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <button className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors" aria-label="Close">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <button className="p-2 rounded-full bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors" aria-label="Close">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}

function BackButtonPreview() {
  return (
    <button className="flex items-center gap-2 px-3 py-2 text-muted-foreground hover:text-foreground transition-colors">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      <span>Back</span>
    </button>
  )
}

function NextButtonPreview() {
  return (
    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium">
      <span>Next</span>
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </button>
  )
}

function RefreshButtonPreview() {
  const [spinning, setSpinning] = useState(false)

  const handleRefresh = () => {
    setSpinning(true)
    setTimeout(() => setSpinning(false), 1000)
  }

  return (
    <button
      onClick={handleRefresh}
      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-accent transition-colors"
    >
      <svg className={`w-5 h-5 ${spinning ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      <span>Refresh</span>
    </button>
  )
}

function BookmarkButtonPreview() {
  const [bookmarked, setBookmarked] = useState(false)

  return (
    <button
      onClick={() => setBookmarked(!bookmarked)}
      className={`p-2 rounded-lg transition-colors ${bookmarked ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
    >
      <svg
        className={`w-6 h-6 transition-transform ${bookmarked ? 'scale-110' : ''}`}
        fill={bookmarked ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
    </button>
  )
}

function ConfirmButtonPreview() {
  const [confirming, setConfirming] = useState(false)

  const handleClick = () => {
    if (confirming) {
      setConfirming(false)
    } else {
      setConfirming(true)
      setTimeout(() => setConfirming(false), 3000)
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
        confirming
          ? 'bg-destructive text-destructive-foreground'
          : 'bg-muted hover:bg-muted/80'
      }`}
    >
      {confirming ? 'Click to confirm' : 'Delete Item'}
    </button>
  )
}

function CounterButtonPreview() {
  const [count, setCount] = useState(1)

  return (
    <div className="flex items-center rounded-lg border border-border overflow-hidden">
      <button
        onClick={() => setCount(Math.max(0, count - 1))}
        className="px-3 py-2 hover:bg-accent transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      </button>
      <span className="px-4 py-2 font-medium border-x border-border min-w-[3rem] text-center">
        {count}
      </span>
      <button
        onClick={() => setCount(count + 1)}
        className="px-3 py-2 hover:bg-accent transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  )
}

function ThemeTogglePreview() {
  const [dark, setDark] = useState(false)

  return (
    <button
      onClick={() => setDark(!dark)}
      className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
      aria-label="Toggle theme"
    >
      {dark ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  )
}

function LanguageButtonPreview() {
  const [open, setOpen] = useState(false)
  const [lang, setLang] = useState('English')

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border hover:bg-accent transition-colors"
      >
        <span>🇺🇸</span>
        <span>{lang}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-card border border-border rounded-lg shadow-lg py-1 min-w-[8rem]">
          {[{flag: '🇺🇸', name: 'English'}, {flag: '🇪🇸', name: 'Español'}, {flag: '🇫🇷', name: 'Français'}].map(l => (
            <button
              key={l.name}
              onClick={() => {setLang(l.name); setOpen(false)}}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent"
            >
              <span>{l.flag}</span>
              <span>{l.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function PrintButtonPreview() {
  return (
    <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-accent transition-colors">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
      </svg>
      <span>Print</span>
    </button>
  )
}

function FullscreenButtonPreview() {
  const [fullscreen, setFullscreen] = useState(false)

  return (
    <button
      onClick={() => setFullscreen(!fullscreen)}
      className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
    >
      {fullscreen ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
        </svg>
      )}
    </button>
  )
}

function PlayPauseButtonPreview() {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => setPlaying(!playing)}
        className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center"
      >
        {playing ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </button>
      <span className="text-sm text-muted-foreground">{playing ? 'Playing' : 'Paused'}</span>
    </div>
  )
}

function MuteButtonPreview() {
  const [muted, setMuted] = useState(false)

  return (
    <button
      onClick={() => setMuted(!muted)}
      className="p-2 rounded-lg hover:bg-muted transition-colors"
    >
      {muted ? (
        <svg className="w-6 h-6 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
        </svg>
      ) : (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
      )}
    </button>
  )
}

function EditButtonPreview() {
  const [editing, setEditing] = useState(false)

  return (
    <button
      onClick={() => setEditing(!editing)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
        editing ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
      }`}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
      <span>{editing ? 'Done' : 'Edit'}</span>
    </button>
  )
}

function DeleteButtonPreview() {
  return (
    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
      <span>Delete</span>
    </button>
  )
}

function AddButtonPreview() {
  return (
    <div className="flex items-center gap-4">
      <button className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed border-border hover:border-primary hover:text-primary transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        <span>Add Item</span>
      </button>
      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        <span>Add New</span>
      </button>
    </div>
  )
}

function FilterButtonPreview() {
  const [active, setActive] = useState(false)
  const filterCount = 3

  return (
    <button
      onClick={() => setActive(!active)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
        active ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
      }`}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
      </svg>
      <span>Filters</span>
      {active && (
        <span className="flex items-center justify-center w-5 h-5 text-xs rounded-full bg-primary-foreground text-primary">
          {filterCount}
        </span>
      )}
    </button>
  )
}

function SortButtonPreview() {
  const [direction, setDirection] = useState<'asc' | 'desc' | 'none'>('none')

  const cycle = () => {
    setDirection(d => d === 'none' ? 'asc' : d === 'asc' ? 'desc' : 'none')
  }

  return (
    <button
      onClick={cycle}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
    >
      <span>Sort by Name</span>
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {direction === 'asc' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />}
        {direction === 'desc' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />}
        {direction === 'none' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />}
      </svg>
    </button>
  )
}

function MenuButtonPreview() {
  const [open, setOpen] = useState(false)

  return (
    <button
      onClick={() => setOpen(!open)}
      className="p-2 rounded-lg hover:bg-muted transition-colors"
      aria-expanded={open}
      aria-label="Menu"
    >
      <div className="w-6 h-5 flex flex-col justify-between">
        <span className={`block h-0.5 w-6 bg-current transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`block h-0.5 w-6 bg-current transition-opacity ${open ? 'opacity-0' : ''}`}></span>
        <span className={`block h-0.5 w-6 bg-current transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </div>
    </button>
  )
}

function ReactionButtonPreview() {
  const [reactions, setReactions] = useState([
    {emoji: '👍', count: 12, active: false},
    {emoji: '❤️', count: 5, active: true},
    {emoji: '😄', count: 3, active: false},
  ])

  const toggleReaction = (index: number) => {
    setReactions(r => r.map((react, i) =>
      i === index ? {...react, active: !react.active, count: react.active ? react.count - 1 : react.count + 1} : react
    ))
  }

  return (
    <div className="flex items-center gap-2">
      {reactions.map((r, i) => (
        <button
          key={r.emoji}
          onClick={() => toggleReaction(i)}
          className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm transition-colors ${
            r.active ? 'bg-primary/10 text-primary' : 'bg-muted hover:bg-muted/80'
          }`}
        >
          <span>{r.emoji}</span>
          <span>{r.count}</span>
        </button>
      ))}
      <button className="w-8 h-8 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground">+</button>
    </div>
  )
}

function FollowButtonPreview() {
  const [following, setFollowing] = useState(false)

  return (
    <button
      onClick={() => setFollowing(!following)}
      className={`px-4 py-2 rounded-lg font-medium transition-all ${
        following
          ? 'bg-muted text-muted-foreground hover:bg-destructive/10 hover:text-destructive'
          : 'bg-primary text-primary-foreground'
      }`}
    >
      {following ? 'Following' : 'Follow'}
    </button>
  )
}

function SubscribeButtonPreview() {
  const [subscribed, setSubscribed] = useState(false)

  return (
    <button
      onClick={() => setSubscribed(!subscribed)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
        subscribed
          ? 'bg-muted text-muted-foreground'
          : 'bg-destructive text-destructive-foreground'
      }`}
    >
      <svg className="w-5 h-5" fill={subscribed ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
      <span>{subscribed ? 'Subscribed' : 'Subscribe'}</span>
    </button>
  )
}

export default ButtonsPage
