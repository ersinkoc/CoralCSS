import { useState, useEffect } from 'react'
import { ComponentPageLayout } from './ComponentPageLayout'

const feedbackComponents = [
  {
    id: 'loader',
    name: 'Loader',
    description: 'Animated loading indicator with multiple styles.',
    usage: `<div data-coral-loader data-variant="spinner"></div>
<div data-coral-loader data-variant="dots"></div>
<div data-coral-loader data-variant="pulse"></div>`,
    props: [
      { name: 'data-variant', type: '"spinner" | "dots" | "pulse" | "bars"', default: '"spinner"', description: 'Loader animation style' },
      { name: 'data-size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Loader size' },
    ],
    preview: LoaderPreview,
  },
  {
    id: 'watermark',
    name: 'Watermark',
    description: 'Text overlay for images and content.',
    usage: `<div data-coral-watermark data-text="DRAFT">
  <img src="document.jpg" />
</div>`,
    props: [
      { name: 'data-text', type: 'string', default: '"DRAFT"', description: 'Watermark text' },
      { name: 'data-opacity', type: 'number', default: '0.15', description: 'Opacity level' },
    ],
    preview: WatermarkPreview,
  },
  {
    id: 'backdrop',
    name: 'Backdrop',
    description: 'Semi-transparent overlay for modals and popovers.',
    usage: `<div data-coral-backdrop data-visible></div>`,
    props: [
      { name: 'data-visible', type: 'boolean', default: 'false', description: 'Show/hide backdrop' },
      { name: 'data-blur', type: 'boolean', default: 'true', description: 'Enable blur effect' },
    ],
    preview: BackdropPreview,
  },
  {
    id: 'announcement-bar',
    name: 'AnnouncementBar',
    description: 'Top announcement bar with dismiss functionality.',
    usage: `<div data-coral-announcement-bar data-variant="info">
  <p data-coral-announcement-bar-content>New features available!</p>
  <button data-coral-announcement-bar-action>Learn More</button>
  <button data-coral-announcement-bar-close>×</button>
</div>`,
    props: [
      { name: 'data-variant', type: '"info" | "warning" | "success" | "error"', default: '"info"', description: 'Announcement type' },
      { name: 'data-sticky', type: 'boolean', default: 'true', description: 'Stick to top' },
    ],
    preview: AnnouncementBarPreview,
  },
  {
    id: 'pulse',
    name: 'Pulse',
    description: 'Pulsing animation for emphasis.',
    usage: `<div data-coral-pulse data-color="primary"></div>`,
    props: [
      { name: 'data-color', type: '"primary" | "success" | "warning" | "error"', default: '"primary"', description: 'Pulse color' },
      { name: 'data-speed', type: '"slow" | "normal" | "fast"', default: '"normal"', description: 'Animation speed' },
    ],
    preview: PulsePreview,
  },
  {
    id: 'dot-pagination',
    name: 'DotPagination',
    description: 'Dot indicators for carousel or slideshow navigation.',
    usage: `<div data-coral-dot-pagination>
  <button data-coral-dot data-active></button>
  <button data-coral-dot></button>
  <button data-coral-dot></button>
</div>`,
    props: [
      { name: 'data-total', type: 'number', default: '3', description: 'Total dots' },
      { name: 'data-current', type: 'number', default: '0', description: 'Current active dot' },
    ],
    preview: DotPaginationPreview,
  },
  {
    id: 'progress-steps',
    name: 'ProgressSteps',
    description: 'Step-by-step progress indicator.',
    usage: `<div data-coral-progress-steps>
  <div data-coral-step data-completed>1</div>
  <div data-coral-step data-active>2</div>
  <div data-coral-step>3</div>
</div>`,
    props: [
      { name: 'data-current', type: 'number', default: '0', description: 'Current step' },
      { name: 'data-variant', type: '"default" | "compact"', default: '"default"', description: 'Display style' },
    ],
    preview: ProgressStepsPreview,
  },
  {
    id: 'loading-dots',
    name: 'LoadingDots',
    description: 'Animated loading dots.',
    usage: `<div data-coral-loading-dots></div>`,
    props: [
      { name: 'data-color', type: '"primary" | "secondary" | "muted"', default: '"primary"', description: 'Dot color' },
      { name: 'data-size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Dot size' },
    ],
    preview: LoadingDotsPreview,
  },
  {
    id: 'shimmer',
    name: 'Shimmer',
    description: 'Shimmer loading effect for content.',
    usage: `<div data-coral-shimmer data-width="200">
  <div data-coral-shimmer-line></div>
  <div data-coral-shimmer-line></div>
</div>`,
    props: [
      { name: 'data-speed', type: 'number', default: '1500', description: 'Animation speed (ms)' },
      { name: 'data-variant', type: '"light" | "dark"', default: '"light"', description: 'Shimmer theme' },
    ],
    preview: ShimmerPreview,
  },
  {
    id: 'callout',
    name: 'Callout',
    description: 'Highlighted callout box with icon and description.',
    usage: `<div data-coral-callout data-variant="info">
  <div data-coral-callout-icon></div>
  <div data-coral-callout-content>
    <h4>Pro Tip</h4>
    <p>Use keyboard shortcuts to speed up your workflow.</p>
  </div>
</div>`,
    props: [
      { name: 'data-variant', type: '"info" | "success" | "warning" | "error" | "tip"', default: '"info"', description: 'Callout style' },
      { name: 'data-collapsible', type: 'boolean', default: 'false', description: 'Make collapsible' },
    ],
    preview: CalloutPreview,
  },
  {
    id: 'guide-tip',
    name: 'GuideTip',
    description: 'Tooltip with guide/lightbulb icon for helpful tips.',
    usage: `<div data-coral-guide-tip data-position="top">
  <div data-coral-guide-tip-trigger>
    <svg class="icon-lightbulb"></svg>
  </div>
  <div data-coral-guide-tip-content>
    Tip: Use Ctrl+K to open the command palette
  </div>
</div>`,
    props: [
      { name: 'data-position', type: '"top" | "bottom" | "left" | "right"', default: '"top"', description: 'Tooltip position' },
      { name: 'data-variant', type: '"tip" | "info" | "warning"', default: '"tip"', description: 'Tip type' },
    ],
    preview: GuideTipPreview,
  },
  {
    id: 'highlight-box',
    name: 'HighlightBox',
    description: 'Box with colored border and icon for highlighting content.',
    usage: `<div data-coral-highlight-box data-variant="info">
  <div data-coral-highlight-box-icon></div>
  <div data-coral-highlight-box-content>
    <h4>Important Note</h4>
    <p>Your subscription will renew in 3 days.</p>
  </div>
</div>`,
    props: [
      { name: 'data-variant', type: '"info" | "success" | "warning" | "error"', default: '"info"', description: 'Box style' },
      { name: 'data-border-width', type: 'number', default: '2', description: 'Border width' },
    ],
    preview: HighlightBoxPreview,
  },
  {
    id: 'alert',
    name: 'Alert',
    description: 'A component for displaying important messages and notifications.',
    usage: `<div data-coral-alert data-variant="info">
  <svg data-coral-alert-icon>...</svg>
  <div data-coral-alert-content>
    <h4 data-coral-alert-title>Info</h4>
    <p data-coral-alert-description>This is an informational message.</p>
  </div>
  <button data-coral-alert-close>...</button>
</div>`,
    props: [
      { name: 'data-variant', type: '"info" | "success" | "warning" | "error"', default: '"info"', description: 'Alert type/color' },
      { name: 'data-dismissible', type: 'boolean', default: 'false', description: 'Show close button' },
    ],
    preview: AlertPreview,
  },
  {
    id: 'toast',
    name: 'Toast',
    description: 'A brief notification that appears temporarily.',
    usage: `<div data-coral-toast-container data-position="bottom-right">
  <div data-coral-toast data-variant="success">
    <svg data-coral-toast-icon>...</svg>
    <div data-coral-toast-content>
      <span data-coral-toast-title>Success!</span>
      <span data-coral-toast-description>Your changes have been saved.</span>
    </div>
    <button data-coral-toast-close>...</button>
  </div>
</div>`,
    props: [
      { name: 'data-position', type: '"top-left" | "top-right" | "bottom-left" | "bottom-right"', default: '"bottom-right"', description: 'Toast position' },
      { name: 'data-duration', type: 'number', default: '5000', description: 'Auto-dismiss duration (ms)' },
    ],
    preview: ToastPreview,
  },
  {
    id: 'notification',
    name: 'Notification',
    description: 'A notification component with avatar, title, and actions.',
    usage: `<div data-coral-notification>
  <img data-coral-notification-avatar src="..." />
  <div data-coral-notification-content>
    <span data-coral-notification-title>New message</span>
    <span data-coral-notification-description>John sent you a message.</span>
    <time data-coral-notification-time>2 min ago</time>
  </div>
  <button data-coral-notification-action>View</button>
</div>`,
    props: [
      { name: 'data-read', type: 'boolean', default: 'false', description: 'Mark as read' },
      { name: 'data-interactive', type: 'boolean', default: 'true', description: 'Enable hover effects' },
    ],
    preview: NotificationPreview,
  },
  {
    id: 'banner',
    name: 'Banner',
    description: 'A full-width banner for announcements and promotions.',
    usage: `<div data-coral-banner data-variant="info">
  <p data-coral-banner-content>
    New feature available! Check out our latest update.
  </p>
  <button data-coral-banner-action>Learn More</button>
  <button data-coral-banner-close>...</button>
</div>`,
    props: [
      { name: 'data-variant', type: '"info" | "warning" | "error" | "promo"', default: '"info"', description: 'Banner style' },
      { name: 'data-sticky', type: 'boolean', default: 'false', description: 'Stick to top of page' },
    ],
    preview: BannerPreview,
  },
  {
    id: 'spinner',
    name: 'Spinner',
    description: 'A loading spinner for indicating progress.',
    usage: `<div data-coral-spinner></div>
<div data-coral-spinner data-size="lg"></div>
<div data-coral-spinner data-variant="dots"></div>`,
    props: [
      { name: 'data-size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Spinner size' },
      { name: 'data-variant', type: '"default" | "dots" | "bars" | "ring"', default: '"default"', description: 'Spinner style' },
    ],
    preview: SpinnerPreview,
  },
  {
    id: 'progress-ring',
    name: 'ProgressRing',
    description: 'A circular progress indicator.',
    usage: `<div data-coral-progress-ring data-value="75">
  <svg>
    <circle data-coral-progress-ring-track />
    <circle data-coral-progress-ring-progress />
  </svg>
  <span data-coral-progress-ring-label>75%</span>
</div>`,
    props: [
      { name: 'data-value', type: 'number', default: '0', description: 'Progress value (0-100)' },
      { name: 'data-size', type: 'number', default: '64', description: 'Ring diameter in pixels' },
      { name: 'data-stroke-width', type: 'number', default: '4', description: 'Ring thickness' },
    ],
    preview: ProgressRingPreview,
  },
  {
    id: 'empty-state',
    name: 'EmptyState',
    description: 'A placeholder for empty content states.',
    usage: `<div data-coral-empty-state>
  <svg data-coral-empty-state-icon>...</svg>
  <h3 data-coral-empty-state-title>No results found</h3>
  <p data-coral-empty-state-description>
    Try adjusting your search or filters.
  </p>
  <button data-coral-empty-state-action>Clear Filters</button>
</div>`,
    props: [
      { name: 'data-variant', type: '"default" | "compact"', default: '"default"', description: 'Layout variant' },
    ],
    preview: EmptyStatePreview,
  },
  {
    id: 'status-indicator',
    name: 'StatusIndicator',
    description: 'A small indicator dot for showing status.',
    usage: `<span data-coral-status data-status="online">Online</span>
<span data-coral-status data-status="offline">Offline</span>
<span data-coral-status data-status="busy">Busy</span>
<span data-coral-status data-status="away">Away</span>`,
    props: [
      { name: 'data-status', type: '"online" | "offline" | "busy" | "away"', default: '"offline"', description: 'Status type' },
      { name: 'data-pulse', type: 'boolean', default: 'false', description: 'Enable pulse animation' },
    ],
    preview: StatusIndicatorPreview,
  },
  {
    id: 'snackbar',
    name: 'Snackbar',
    description: 'A transient message bar at the bottom of the screen for quick feedback.',
    usage: `<div data-coral-snackbar data-position="bottom-center">
  <span data-coral-snackbar-message>Message sent successfully</span>
  <button data-coral-snackbar-action>Undo</button>
</div>`,
    props: [
      { name: 'data-position', type: '"bottom-left" | "bottom-center" | "bottom-right"', default: '"bottom-center"', description: 'Snackbar position' },
      { name: 'data-duration', type: 'number', default: '4000', description: 'Auto-dismiss duration (ms)' },
    ],
    preview: SnackbarPreview,
  },
  {
    id: 'progress-bar',
    name: 'ProgressBar',
    description: 'A linear progress indicator for showing task completion.',
    usage: `<div data-coral-progress data-value="65" data-max="100">
  <div data-coral-progress-track></div>
  <div data-coral-progress-fill></div>
  <span data-coral-progress-label>65%</span>
</div>`,
    props: [
      { name: 'data-value', type: 'number', default: '0', description: 'Current progress value' },
      { name: 'data-max', type: 'number', default: '100', description: 'Maximum value' },
      { name: 'data-size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Progress bar size' },
    ],
    preview: ProgressBarPreview,
  },
  {
    id: 'skeleton-loader',
    name: 'SkeletonLoader',
    description: 'A placeholder component for loading states.',
    usage: `<div data-coral-skeleton data-variant="text">
  <div data-coral-skeleton-line></div>
  <div data-coral-skeleton-line></div>
</div>

<div data-coral-skeleton data-variant="card">
  <div data-coral-skeleton-avatar></div>
  <div data-coral-skeleton-content>
    <div data-coral-skeleton-line></div>
    <div data-coral-skeleton-line></div>
  </div>
</div>`,
    props: [
      { name: 'data-variant', type: '"text" | "card" | "avatar" | "button"', default: '"text"', description: 'Skeleton shape' },
      { name: 'data-animate', type: 'boolean', default: 'true', description: 'Enable shimmer animation' },
    ],
    preview: SkeletonLoaderPreview,
  },
  {
    id: 'inline-message',
    name: 'InlineMessage',
    description: 'A compact inline message for form validation and small notifications.',
    usage: `<div data-coral-inline-message data-variant="warning">
  <svg data-coral-inline-message-icon>...</svg>
  <span data-coral-inline-message-text>Please check your email address</span>
</div>`,
    props: [
      { name: 'data-variant', type: '"info" | "success" | "warning" | "error"', default: '"info"', description: 'Message type' },
      { name: 'data-size', type: '"sm" | "md"', default: '"md"', description: 'Message size' },
    ],
    preview: InlineMessagePreview,
  },
  {
    id: 'success-animation',
    name: 'SuccessAnimation',
    description: 'Animated checkmark for successful actions.',
    usage: `<div data-coral-success-animation data-active></div>`,
    props: [
      { name: 'data-active', type: 'boolean', default: 'false', description: 'Trigger animation' },
      { name: 'data-size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Animation size' },
    ],
    preview: SuccessAnimationPreview,
  },
  {
    id: 'error-animation',
    name: 'ErrorAnimation',
    description: 'Animated error indicator for failed actions.',
    usage: `<div data-coral-error-animation data-active></div>`,
    props: [
      { name: 'data-active', type: 'boolean', default: 'false', description: 'Trigger animation' },
      { name: 'data-shake', type: 'boolean', default: 'true', description: 'Enable shake effect' },
    ],
    preview: ErrorAnimationPreview,
  },
  {
    id: 'countdown',
    name: 'Countdown',
    description: 'Countdown timer with visual feedback.',
    usage: `<div data-coral-countdown data-seconds="60"></div>`,
    props: [
      { name: 'data-seconds', type: 'number', default: '60', description: 'Countdown duration' },
      { name: 'data-auto-start', type: 'boolean', default: 'true', description: 'Start automatically' },
    ],
    preview: CountdownPreview,
  },
  {
    id: 'rating-feedback',
    name: 'RatingFeedback',
    description: 'Emoji-based rating feedback collection.',
    usage: `<div data-coral-rating-feedback>
  <button data-coral-rating-option data-value="sad">😞</button>
  <button data-coral-rating-option data-value="neutral">😐</button>
  <button data-coral-rating-option data-value="happy">😊</button>
</div>`,
    props: [
      { name: 'data-selected', type: 'string', default: 'undefined', description: 'Selected value' },
    ],
    preview: RatingFeedbackPreview,
  },
  {
    id: 'upload-progress',
    name: 'UploadProgress',
    description: 'File upload progress indicator.',
    usage: `<div data-coral-upload-progress data-percent="60">
  <span data-coral-upload-filename>file.pdf</span>
  <span data-coral-upload-size>2.4 MB</span>
</div>`,
    props: [
      { name: 'data-percent', type: 'number', default: '0', description: 'Upload progress' },
      { name: 'data-status', type: '"uploading" | "complete" | "error"', default: '"uploading"', description: 'Upload status' },
    ],
    preview: UploadProgressPreview,
  },
  {
    id: 'connection-status',
    name: 'ConnectionStatus',
    description: 'Network connection status indicator.',
    usage: `<div data-coral-connection-status data-status="online">
  <span data-coral-connection-dot></span>
  <span>Connected</span>
</div>`,
    props: [
      { name: 'data-status', type: '"online" | "offline" | "reconnecting"', default: '"online"', description: 'Connection state' },
    ],
    preview: ConnectionStatusPreview,
  },
  {
    id: 'typing-indicator',
    name: 'TypingIndicator',
    description: 'Chat typing indicator with animated dots.',
    usage: `<div data-coral-typing-indicator>
  <span data-coral-typing-dot></span>
  <span data-coral-typing-dot></span>
  <span data-coral-typing-dot></span>
</div>`,
    props: [
      { name: 'data-visible', type: 'boolean', default: 'true', description: 'Show indicator' },
    ],
    preview: TypingIndicatorPreview,
  },
  {
    id: 'read-receipt',
    name: 'ReadReceipt',
    description: 'Message read status indicator.',
    usage: `<div data-coral-read-receipt data-status="read">
  <svg data-coral-read-icon></svg>
</div>`,
    props: [
      { name: 'data-status', type: '"sent" | "delivered" | "read"', default: '"sent"', description: 'Receipt status' },
    ],
    preview: ReadReceiptPreview,
  },
  {
    id: 'sync-status',
    name: 'SyncStatus',
    description: 'Data synchronization status indicator.',
    usage: `<div data-coral-sync-status data-syncing>
  <svg data-coral-sync-icon></svg>
  <span>Syncing...</span>
</div>`,
    props: [
      { name: 'data-syncing', type: 'boolean', default: 'false', description: 'Is syncing' },
      { name: 'data-last-sync', type: 'string', default: 'undefined', description: 'Last sync time' },
    ],
    preview: SyncStatusPreview,
  },
  {
    id: 'form-validation',
    name: 'FormValidation',
    description: 'Real-time form field validation feedback.',
    usage: `<div data-coral-form-validation data-status="error">
  <input type="text" />
  <span data-coral-validation-message>Invalid email</span>
</div>`,
    props: [
      { name: 'data-status', type: '"valid" | "invalid" | "pending"', default: '"pending"', description: 'Validation state' },
    ],
    preview: FormValidationPreview,
  },
  {
    id: 'step-indicator',
    name: 'StepIndicator',
    description: 'Multi-step process indicator.',
    usage: `<div data-coral-step-indicator data-current="2" data-total="4"></div>`,
    props: [
      { name: 'data-current', type: 'number', default: '1', description: 'Current step' },
      { name: 'data-total', type: 'number', default: '3', description: 'Total steps' },
    ],
    preview: StepIndicatorPreview,
  },
  {
    id: 'copy-feedback',
    name: 'CopyFeedback',
    description: 'Copy to clipboard feedback with animation.',
    usage: `<button data-coral-copy-button data-copied>
  <svg data-coral-copy-icon></svg>
  <span data-coral-copy-text>Copied!</span>
</button>`,
    props: [
      { name: 'data-copied', type: 'boolean', default: 'false', description: 'Show copied state' },
      { name: 'data-duration', type: 'number', default: '2000', description: 'Feedback duration (ms)' },
    ],
    preview: CopyFeedbackPreview,
  },
  {
    id: 'action-feedback',
    name: 'ActionFeedback',
    description: 'Inline action feedback with undo option.',
    usage: `<div data-coral-action-feedback data-visible>
  <span>Item deleted</span>
  <button data-coral-undo-button>Undo</button>
</div>`,
    props: [
      { name: 'data-visible', type: 'boolean', default: 'false', description: 'Show feedback' },
      { name: 'data-timeout', type: 'number', default: '5000', description: 'Auto-hide delay' },
    ],
    preview: ActionFeedbackPreview,
  },
  {
    id: 'quota-indicator',
    name: 'QuotaIndicator',
    description: 'Storage or usage quota indicator.',
    usage: `<div data-coral-quota-indicator data-used="80" data-total="100">
  <span>80 GB / 100 GB</span>
</div>`,
    props: [
      { name: 'data-used', type: 'number', default: '0', description: 'Used amount' },
      { name: 'data-total', type: 'number', default: '100', description: 'Total quota' },
      { name: 'data-warning-threshold', type: 'number', default: '80', description: 'Warning threshold %' },
    ],
    preview: QuotaIndicatorPreview,
  },
  {
    id: 'password-feedback',
    name: 'PasswordFeedback',
    description: 'Password strength requirements feedback.',
    usage: `<div data-coral-password-feedback>
  <div data-coral-requirement data-met>8+ characters</div>
  <div data-coral-requirement>Uppercase letter</div>
</div>`,
    props: [
      { name: 'data-show-meter', type: 'boolean', default: 'true', description: 'Show strength meter' },
    ],
    preview: PasswordFeedbackPreview,
  },
  {
    id: 'save-indicator',
    name: 'SaveIndicator',
    description: 'Auto-save status indicator.',
    usage: `<div data-coral-save-indicator data-status="saved">
  <span>All changes saved</span>
</div>`,
    props: [
      { name: 'data-status', type: '"saving" | "saved" | "error" | "idle"', default: '"idle"', description: 'Save state' },
    ],
    preview: SaveIndicatorPreview,
  },
  {
    id: 'reaction-picker',
    name: 'ReactionPicker',
    description: 'Emoji reaction picker with feedback.',
    usage: `<div data-coral-reaction-picker>
  <button data-coral-reaction>👍</button>
  <button data-coral-reaction data-selected>❤️</button>
  <button data-coral-reaction>😂</button>
</div>`,
    props: [
      { name: 'data-selected', type: 'string[]', default: '[]', description: 'Selected reactions' },
    ],
    preview: ReactionPickerPreview,
  },
  {
    id: 'live-indicator',
    name: 'LiveIndicator',
    description: 'Live streaming or recording indicator.',
    usage: `<div data-coral-live-indicator data-live>
  <span data-coral-live-dot></span>
  <span>LIVE</span>
</div>`,
    props: [
      { name: 'data-live', type: 'boolean', default: 'false', description: 'Is live' },
      { name: 'data-recording', type: 'boolean', default: 'false', description: 'Is recording' },
    ],
    preview: LiveIndicatorPreview,
  },
  {
    id: 'update-banner',
    name: 'UpdateBanner',
    description: 'App update available notification banner.',
    usage: `<div data-coral-update-banner data-visible>
  <span>A new version is available</span>
  <button data-coral-update-action>Update now</button>
</div>`,
    props: [
      { name: 'data-visible', type: 'boolean', default: 'false', description: 'Show banner' },
      { name: 'data-dismissible', type: 'boolean', default: 'true', description: 'Can dismiss' },
    ],
    preview: UpdateBannerPreview,
  },
  {
    id: 'voice-feedback',
    name: 'VoiceFeedback',
    description: 'Voice recording level indicator.',
    usage: `<div data-coral-voice-feedback data-active>
  <div data-coral-voice-bar></div>
  <div data-coral-voice-bar></div>
  <div data-coral-voice-bar></div>
</div>`,
    props: [
      { name: 'data-active', type: 'boolean', default: 'false', description: 'Is recording' },
      { name: 'data-level', type: 'number', default: '0', description: 'Audio level (0-100)' },
    ],
    preview: VoiceFeedbackPreview,
  },
]

function FeedbackPage() {
  return (
    <ComponentPageLayout
      categoryName="Feedback"
      categoryId="feedback"
      components={feedbackComponents}
      accessibilityFeatures={[
        'ARIA live regions',
        'Role announcements',
        'Keyboard dismissible',
        'Color + icon status',
        'Focus management',
        'Screen reader support',
        'Progress indicators',
        'Skeleton loading states',
      ]}
    />
  )
}

// Preview Components with data-coral-* attributes
function AlertPreview() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div data-coral-alert data-variant="info">
        <svg data-coral-alert-icon className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div data-coral-alert-content>
          <h4 data-coral-alert-title>Information</h4>
          <p data-coral-alert-description>This is an informational alert message.</p>
        </div>
      </div>
      <div data-coral-alert data-variant="success">
        <svg data-coral-alert-icon className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <div data-coral-alert-content>
          <h4 data-coral-alert-title>Success</h4>
          <p data-coral-alert-description>Your changes have been saved successfully.</p>
        </div>
      </div>
      <div data-coral-alert data-variant="error">
        <svg data-coral-alert-icon className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div data-coral-alert-content>
          <h4 data-coral-alert-title>Error</h4>
          <p data-coral-alert-description>Something went wrong. Please try again.</p>
        </div>
      </div>
    </div>
  )
}

function ToastPreview() {
  const [toasts, setToasts] = useState<string[]>([])

  const addToast = (type: string) => {
    const id = Date.now().toString()
    setToasts([...toasts, type + '-' + id])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t !== type + '-' + id))
    }, 3000)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        <button onClick={() => addToast('success')} data-coral-button data-variant="primary">
          Success Toast
        </button>
        <button onClick={() => addToast('error')} data-coral-button data-variant="destructive">
          Error Toast
        </button>
      </div>
      <div data-coral-toast-container data-position="bottom-right">
        {toasts.map((toast) => (
          <div key={toast} data-coral-toast data-variant={toast.startsWith('success') ? 'success' : 'error'} data-open>
            <svg data-coral-toast-icon className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {toast.startsWith('success') ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              )}
            </svg>
            <div data-coral-toast-content>
              <span data-coral-toast-title>{toast.startsWith('success') ? 'Success!' : 'Error!'}</span>
              <span data-coral-toast-description>
                {toast.startsWith('success') ? 'Changes saved.' : 'Something went wrong.'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function NotificationPreview() {
  return (
    <div className="w-full max-w-sm space-y-2">
      {[
        { name: 'John Doe', message: 'Sent you a message', time: '2 min ago', unread: true },
        { name: 'Jane Smith', message: 'Liked your post', time: '1 hour ago', unread: true },
        { name: 'Bob Wilson', message: 'Commented on your photo', time: '3 hours ago', unread: false },
      ].map((notification, i) => (
        <div key={i} data-coral-notification data-unread={notification.unread || undefined}>
          <div data-coral-avatar data-size="md">
            {notification.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div data-coral-notification-content>
            <div className="flex items-center gap-2">
              <span data-coral-notification-title>{notification.name}</span>
              {notification.unread && <span data-coral-notification-badge />}
            </div>
            <p data-coral-notification-description>{notification.message}</p>
            <time data-coral-notification-time>{notification.time}</time>
          </div>
        </div>
      ))}
    </div>
  )
}

function BannerPreview() {
  const [visible, setVisible] = useState(true)
  return visible ? (
    <div data-coral-banner data-variant="info" className="w-full max-w-2xl">
      <svg data-coral-banner-icon className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
      <p data-coral-banner-content>
        New feature! Check out our latest update with improved performance.
      </p>
      <button data-coral-button data-variant="primary" data-size="sm">Learn More</button>
      <button onClick={() => setVisible(false)} data-coral-icon-button data-variant="ghost" aria-label="Dismiss">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  ) : (
    <button onClick={() => setVisible(true)} data-coral-button data-variant="outline">
      Show Banner
    </button>
  )
}

function SpinnerPreview() {
  return (
    <div className="flex items-center gap-8">
      <div data-coral-spinner data-size="sm" />
      <div data-coral-spinner data-size="md" />
      <div data-coral-spinner data-size="lg" />
      <div data-coral-spinner data-variant="dots" />
    </div>
  )
}

function ProgressRingPreview() {
  const [value, setValue] = useState(75)
  const radius = 45
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  return (
    <div className="flex items-center gap-8">
      <div data-coral-progress-ring style={{ width: 96, height: 96 }}>
        <svg className="w-24 h-24 transform -rotate-90">
          <circle data-coral-progress-ring-track cx="48" cy="48" r={radius} strokeWidth="8" fill="none" />
          <circle
            data-coral-progress-ring-progress
            cx="48"
            cy="48"
            r={radius}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.3s' }}
          />
        </svg>
        <span data-coral-progress-ring-label>{value}%</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
        data-coral-slider
      />
    </div>
  )
}

function EmptyStatePreview() {
  return (
    <div data-coral-empty-state className="w-full max-w-sm">
      <div data-coral-empty-state-icon>
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 data-coral-empty-state-title>No results found</h3>
      <p data-coral-empty-state-description>
        We couldn't find any items matching your search. Try adjusting your filters.
      </p>
      <button data-coral-button data-variant="primary">Clear Filters</button>
    </div>
  )
}

function StatusIndicatorPreview() {
  return (
    <div className="flex flex-wrap gap-6">
      {[
        { status: 'online', label: 'Online' },
        { status: 'away', label: 'Away' },
        { status: 'busy', label: 'Busy' },
        { status: 'offline', label: 'Offline' },
      ].map((item) => (
        <span key={item.status} data-coral-status data-status={item.status}>
          {item.label}
        </span>
      ))}
    </div>
  )
}

function SnackbarPreview() {
  const [snackbar, setSnackbar] = useState<{ message: string; type: string } | null>(null)

  const showSnackbar = (type: string) => {
    const messages = {
      success: 'Message sent successfully!',
      error: 'Failed to send message. Please try again.',
      info: 'New update available!',
      warning: 'Your session will expire soon.',
    }
    setSnackbar({ message: messages[type as keyof typeof messages] || 'Unknown', type })
    setTimeout(() => setSnackbar(null), 3000)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        <button onClick={() => showSnackbar('success')} data-coral-button data-variant="primary" data-size="sm">
          Show Success
        </button>
        <button onClick={() => showSnackbar('error')} data-coral-button data-variant="destructive" data-size="sm">
          Show Error
        </button>
      </div>
      {snackbar && (
        <div
          className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-3 rounded-lg bg-card border border-border shadow-lg text-card-foreground max-w-md animate-in slide-in-from-bottom-4"
          style={{ position: 'relative', left: 0, transform: 'none' }}
        >
          <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm flex-1">{snackbar.message}</span>
          <button onClick={() => setSnackbar(null)} className="text-muted-foreground hover:text-foreground">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}

function ProgressBarPreview() {
  const [progress, setProgress] = useState(65)

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">Progress</span>
        <span className="text-sm text-muted-foreground">{progress}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2.5">
        <div
          className="bg-primary h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={(e) => setProgress(parseInt(e.target.value))}
        className="w-full"
        data-coral-slider
      />
    </div>
  )
}

function SkeletonLoaderPreview() {
  return (
    <div className="space-y-4">
      <div data-coral-skeleton data-variant="text" className="space-y-2">
        <div className="h-4 bg-muted rounded animate-pulse" />
        <div className="h-4 bg-muted rounded animate-pulse w-5/6" />
        <div className="h-4 bg-muted rounded animate-pulse w-4/6" />
      </div>
      <div data-coral-skeleton data-variant="card" className="flex gap-3 p-4">
        <div className="w-12 h-12 bg-muted rounded-full animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
          <div className="h-3 bg-muted rounded animate-pulse w-1/2" />
        </div>
      </div>
      <div data-coral-skeleton data-variant="button" className="flex gap-2">
        <div className="h-10 w-24 bg-muted rounded animate-pulse" />
        <div className="h-10 w-24 bg-muted rounded animate-pulse" />
      </div>
    </div>
  )
}

function InlineMessagePreview() {
  return (
    <div className="space-y-3 w-full max-w-md">
      <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-info/10 text-info dark:text-info border border-info/20">
        <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-sm">Information message with helpful context</span>
      </div>
      <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-success/10 text-success dark:text-success border border-success/20">
        <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <span className="text-sm">Success message confirming action completed</span>
      </div>
      <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-warning/10 text-warning dark:text-warning border border-warning/20">
        <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span className="text-sm">Warning message about potential issues</span>
      </div>
      <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-destructive/10 text-destructive dark:text-destructive border border-destructive/20">
        <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
        <span className="text-sm">Error message requiring attention</span>
      </div>
    </div>
  )
}

function LoaderPreview() {
  return (
    <div className="flex flex-col gap-6 items-center">
      <div className="flex items-center gap-8">
        <div className="relative w-8 h-8">
          <div className="absolute inset-0 border-4 border-muted rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-primary rounded-full animate-spin"></div>
        </div>
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
        <div className="flex gap-1">
          <div className="w-1 h-6 bg-primary rounded animate-pulse"></div>
          <div className="w-1 h-6 bg-primary rounded animate-pulse" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-1 h-6 bg-primary rounded animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-1 h-6 bg-primary rounded animate-pulse" style={{ animationDelay: '0.3s' }}></div>
        </div>
      </div>
    </div>
  )
}

function WatermarkPreview() {
  return (
    <div className="w-full max-w-sm">
      <div data-coral-watermark data-text="DRAFT" className="relative aspect-[4/3] bg-muted rounded-lg overflow-hidden flex items-center justify-center">
        <svg className="w-16 h-16 text-muted-foreground/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-6xl font-bold text-muted-foreground/20 rotate-12 select-none">DRAFT</span>
        </div>
      </div>
    </div>
  )
}

function BackdropPreview() {
  return (
    <div className="w-full max-w-md">
      <div className="relative">
        <div className="bg-card border border-border rounded-lg p-8 flex items-center justify-center">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">Content behind backdrop</p>
            <div className="relative">
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg">Click to toggle</button>
              <div className="absolute inset-0 bg-black/50 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AnnouncementBarPreview() {
  const [visible, setVisible] = useState(true)

  if (!visible) {
    return (
      <button onClick={() => setVisible(true)} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg">
        Show Announcement
      </button>
    )
  }

  return (
    <div data-coral-announcement-bar data-variant="info" className="w-full max-w-2xl">
      <svg data-coral-announcement-bar-icon className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
      <p data-coral-announcement-bar-content>
        New feature: Dark mode is now available! Switch to dark theme in your settings.
      </p>
      <button data-coral-announcement-bar-action className="px-3 py-1 bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded text-sm">
        Learn More
      </button>
      <button onClick={() => setVisible(false)} data-coral-announcement-bar-close className="ml-2" aria-label="Dismiss">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}

function PulsePreview() {
  return (
    <div className="flex flex-wrap items-center gap-8">
      <div className="relative flex items-center gap-4">
        <div data-coral-pulse data-color="primary" className="w-6 h-6 bg-primary rounded-full animate-ping absolute"></div>
        <div className="w-6 h-6 bg-primary rounded-full relative z-10"></div>
      </div>
      <div className="relative flex items-center gap-4">
        <div data-coral-pulse data-color="success" className="w-6 h-6 bg-success rounded-full animate-ping absolute"></div>
        <div className="w-6 h-6 bg-success rounded-full relative z-10"></div>
      </div>
      <div className="relative flex items-center gap-4">
        <div data-coral-pulse data-color="warning" className="w-6 h-6 bg-warning rounded-full animate-ping absolute"></div>
        <div className="w-6 h-6 bg-warning rounded-full relative z-10"></div>
      </div>
    </div>
  )
}

function DotPaginationPreview() {
  const [current, setCurrent] = useState(0)
  const total = 5

  return (
    <div className="flex flex-col gap-4 items-center">
      <div data-coral-dot-pagination className="flex gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            data-coral-dot
            data-active={i === current || undefined}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? 'bg-primary scale-125' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setCurrent(Math.max(0, current - 1))}
          disabled={current === 0}
          className="px-3 py-1 bg-muted rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrent(Math.min(total - 1, current + 1))}
          disabled={current === total - 1}
          className="px-3 py-1 bg-muted rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}

function ProgressStepsPreview() {
  const steps = ['Account', 'Profile', 'Verification', 'Complete']
  const [currentStep, setCurrentStep] = useState(1)

  return (
    <div className="w-full max-w-2xl">
      <div data-coral-progress-steps data-current={currentStep} className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1
          return (
            <div key={index} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  data-coral-step
                  data-completed={currentStep > stepNumber}
                  data-active={currentStep === stepNumber}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    currentStep > stepNumber
                      ? 'bg-success text-white'
                      : currentStep === stepNumber
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {stepNumber}
                </div>
                <span className="text-xs mt-2 text-center">{step}</span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 transition-colors ${
                    currentStep > stepNumber ? 'bg-success' : 'bg-muted'
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>
      <div className="flex gap-2 mt-6">
        <button
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
          className="px-4 py-2 bg-muted rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
          disabled={currentStep === steps.length}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}

function LoadingDotsPreview() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex gap-1">
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
      <div className="flex gap-1">
        <div className="w-3 h-3 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-3 h-3 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-3 h-3 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  )
}

function ShimmerPreview() {
  return (
    <div className="w-full max-w-md space-y-3">
      <div className="relative overflow-hidden bg-muted rounded-lg p-4">
        <div className="h-4 bg-muted-foreground/20 rounded mb-3 relative">
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            style={{
              animation: 'shimmer 1.5s infinite',
              transform: 'translateX(-100%)',
            }}
          />
        </div>
        <div className="h-4 bg-muted-foreground/20 rounded mb-3 w-3/4 relative">
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            style={{
              animation: 'shimmer 1.5s infinite',
              animationDelay: '0.2s',
              transform: 'translateX(-100%)',
            }}
          />
        </div>
        <div className="h-4 bg-muted-foreground/20 rounded w-1/2 relative">
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            style={{
              animation: 'shimmer 1.5s infinite',
              animationDelay: '0.4s',
              transform: 'translateX(-100%)',
            }}
          />
        </div>
      </div>
      <style>
        {`@keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }`}
      </style>
    </div>
  )
}

function CalloutPreview() {
  return (
    <div className="space-y-4 w-full max-w-md">
      <div data-coral-callout data-variant="info" className="p-4 border border-border rounded-lg">
        <div className="flex gap-3">
          <svg data-coral-callout-icon className="w-5 h-5 flex-shrink-0 mt-0.5 text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div data-coral-callout-content className="flex-1">
            <h4 className="font-semibold text-sm mb-1">Pro Tip</h4>
            <p className="text-sm text-muted-foreground">Use keyboard shortcuts to speed up your workflow. Press <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">Ctrl + K</kbd> to open the command palette.</p>
          </div>
        </div>
      </div>
      <div data-coral-callout data-variant="tip" className="p-4 border border-border rounded-lg">
        <div className="flex gap-3">
          <svg data-coral-callout-icon className="w-5 h-5 flex-shrink-0 mt-0.5 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <div data-coral-callout-content className="flex-1">
            <h4 className="font-semibold text-sm mb-1">Did you know?</h4>
            <p className="text-sm text-muted-foreground">You can customize your dashboard layout by dragging and dropping widgets.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function GuideTipPreview() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <div className="flex flex-wrap gap-4">
      {[
        { id: 1, icon: 'lightbulb', tip: 'Press Ctrl+K to open the command palette' },
        { id: 2, icon: 'info', tip: 'Your profile is 80% complete' },
        { id: 3, icon: 'warning', tip: 'You have 3 pending notifications' },
      ].map((item) => (
        <div
          key={item.id}
          className="relative"
          onMouseEnter={() => setHoveredId(item.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <button className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </button>
          {hoveredId === item.id && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-foreground text-background text-xs rounded-lg whitespace-nowrap z-10">
              {item.tip}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function HighlightBoxPreview() {
  return (
    <div className="space-y-4 w-full max-w-md">
      <div data-coral-highlight-box data-variant="info" className="p-4 border-l-4 border-info bg-info/10 rounded-r-lg">
        <div className="flex gap-3">
          <svg data-coral-highlight-box-icon className="w-5 h-5 flex-shrink-0 mt-0.5 text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div data-coral-highlight-box-content>
            <h4 className="font-semibold text-sm mb-1">Important Note</h4>
            <p className="text-sm text-muted-foreground">Your subscription will renew in 3 days. Update your payment method to avoid service interruption.</p>
          </div>
        </div>
      </div>
      <div data-coral-highlight-box data-variant="warning" className="p-4 border-l-4 border-warning bg-warning/10 rounded-r-lg">
        <div className="flex gap-3">
          <svg data-coral-highlight-box-icon className="w-5 h-5 flex-shrink-0 mt-0.5 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div data-coral-highlight-box-content>
            <h4 className="font-semibold text-sm mb-1">Warning</h4>
            <p className="text-sm text-muted-foreground">You are approaching your storage limit. Consider upgrading your plan.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function SuccessAnimationPreview() {
  const [active, setActive] = useState(false)

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        data-coral-success-animation
        data-active={active || undefined}
        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
          active ? 'bg-success scale-110' : 'bg-muted'
        }`}
      >
        <svg
          className={`w-8 h-8 transition-all duration-300 ${active ? 'text-white scale-100' : 'text-muted-foreground scale-75 opacity-50'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M5 13l4 4L19 7"
            className={active ? 'animate-[draw_0.5s_ease-out_forwards]' : ''}
          />
        </svg>
      </div>
      <button
        onClick={() => {
          setActive(true)
          setTimeout(() => setActive(false), 2000)
        }}
        data-coral-button
        data-variant="primary"
      >
        Trigger Success
      </button>
    </div>
  )
}

function ErrorAnimationPreview() {
  const [active, setActive] = useState(false)

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        data-coral-error-animation
        data-active={active || undefined}
        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
          active ? 'bg-destructive animate-shake' : 'bg-muted'
        }`}
      >
        <svg
          className={`w-8 h-8 transition-all duration-300 ${active ? 'text-white' : 'text-muted-foreground opacity-50'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <button
        onClick={() => {
          setActive(true)
          setTimeout(() => setActive(false), 1500)
        }}
        data-coral-button
        data-variant="destructive"
      >
        Trigger Error
      </button>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake { animation: shake 0.3s ease-in-out 3; }
      `}</style>
    </div>
  )
}

function CountdownPreview() {
  const [count, setCount] = useState(10)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (running && count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000)
      return () => clearTimeout(timer)
    } else if (count === 0) {
      setRunning(false)
    }
  }, [count, running])

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        data-coral-countdown
        data-running={running || undefined}
        className="relative w-24 h-24"
      >
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="48" cy="48" r="44" fill="none" stroke="currentColor" className="text-muted" strokeWidth="4" />
          <circle
            cx="48"
            cy="48"
            r="44"
            fill="none"
            stroke="currentColor"
            className="text-primary"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={276.46}
            strokeDashoffset={276.46 * (1 - count / 10)}
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold">{count}</span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setRunning(!running)}
          data-coral-button
          data-variant={running ? 'destructive' : 'primary'}
        >
          {running ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={() => { setCount(10); setRunning(false) }}
          data-coral-button
          data-variant="outline"
        >
          Reset
        </button>
      </div>
    </div>
  )
}

function RatingFeedbackPreview() {
  const [rating, setRating] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const labels = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-sm">
      {!submitted ? (
        <>
          <p className="text-sm text-muted-foreground">How was your experience?</p>
          <div data-coral-rating-feedback className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`text-2xl transition-transform hover:scale-125 ${
                  star <= rating ? 'text-warning' : 'text-muted-foreground/30'
                }`}
              >
                ★
              </button>
            ))}
          </div>
          {rating > 0 && <p className="text-sm font-medium">{labels[rating - 1]}</p>}
          <button
            onClick={() => rating > 0 && setSubmitted(true)}
            data-coral-button
            data-variant="primary"
            disabled={rating === 0}
          >
            Submit Feedback
          </button>
        </>
      ) : (
        <div className="text-center">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-medium">Thanks for your feedback!</p>
          <button
            onClick={() => { setRating(0); setSubmitted(false) }}
            className="text-sm text-primary hover:underline mt-2"
          >
            Rate again
          </button>
        </div>
      )}
    </div>
  )
}

function UploadProgressPreview() {
  const [progress, setProgress] = useState(0)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (uploading && progress < 100) {
      const timer = setTimeout(() => setProgress(p => Math.min(p + Math.random() * 15, 100)), 300)
      return () => clearTimeout(timer)
    } else if (progress >= 100) {
      setUploading(false)
    }
  }, [uploading, progress])

  return (
    <div className="w-full max-w-sm space-y-3">
      <div data-coral-upload-progress data-uploading={uploading || undefined}>
        <div className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg">
          <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">
            <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">document.pdf</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground">{Math.round(progress)}%</span>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => { setProgress(0); setUploading(true) }}
        data-coral-button
        data-variant="primary"
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : progress >= 100 ? 'Upload Again' : 'Start Upload'}
      </button>
    </div>
  )
}

function ConnectionStatusPreview() {
  const [status, setStatus] = useState<'connected' | 'connecting' | 'disconnected'>('connected')

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-6">
        {(['connected', 'connecting', 'disconnected'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            data-coral-connection-status
            data-status={s}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
              status === s ? 'border-primary bg-primary/10' : 'border-border'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                s === 'connected' ? 'bg-success' :
                s === 'connecting' ? 'bg-warning animate-pulse' :
                'bg-destructive'
              }`}
            />
            <span className="text-sm capitalize">{s}</span>
          </button>
        ))}
      </div>
      <div className="text-center">
        <p className="text-sm text-muted-foreground">Current status:</p>
        <p className={`font-medium capitalize ${
          status === 'connected' ? 'text-success' :
          status === 'connecting' ? 'text-warning' :
          'text-destructive'
        }`}>{status}</p>
      </div>
    </div>
  )
}

function TypingIndicatorPreview() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-end gap-2">
        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">JD</div>
        <div data-coral-typing-indicator className="px-4 py-3 bg-muted rounded-2xl rounded-bl-sm">
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">John is typing...</p>
    </div>
  )
}

function ReadReceiptPreview() {
  const [status, setStatus] = useState<'sent' | 'delivered' | 'read'>('read')

  return (
    <div className="w-full max-w-sm mx-auto space-y-4">
      <div className="flex justify-end">
        <div className="bg-primary text-primary-foreground px-4 py-2 rounded-2xl rounded-br-sm max-w-[80%]">
          <p className="text-sm">Hey! Are you coming to the party tonight?</p>
          <div className="flex items-center justify-end gap-1 mt-1">
            <span className="text-xs opacity-70">10:42 PM</span>
            <div data-coral-read-receipt data-status={status}>
              {status === 'sent' && (
                <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
              {status === 'delivered' && (
                <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7M5 7l4 4" />
                </svg>
              )}
              {status === 'read' && (
                <svg className="w-4 h-4 text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7M5 7l4 4" />
                </svg>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 justify-center">
        {(['sent', 'delivered', 'read'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            data-coral-button
            data-variant={status === s ? 'primary' : 'outline'}
            data-size="sm"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}

function SyncStatusPreview() {
  const [syncing, setSyncing] = useState(false)
  const [lastSync, setLastSync] = useState('2 minutes ago')

  const handleSync = () => {
    setSyncing(true)
    setTimeout(() => {
      setSyncing(false)
      setLastSync('Just now')
    }, 2000)
  }

  return (
    <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg">
      <button
        onClick={handleSync}
        disabled={syncing}
        data-coral-sync-status
        data-syncing={syncing || undefined}
        className="p-2 rounded-lg hover:bg-muted transition-colors disabled:opacity-50"
      >
        <svg
          className={`w-5 h-5 ${syncing ? 'animate-spin text-primary' : 'text-muted-foreground'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>
      <div>
        <p className="text-sm font-medium">{syncing ? 'Syncing...' : 'Synced'}</p>
        <p className="text-xs text-muted-foreground">Last sync: {lastSync}</p>
      </div>
    </div>
  )
}

function FormValidationPreview() {
  const [value, setValue] = useState('')
  const [touched, setTouched] = useState(false)

  const isValid = value.length >= 8
  const showError = touched && !isValid

  return (
    <div className="w-full max-w-sm space-y-2">
      <label className="text-sm font-medium">Password</label>
      <div className="relative">
        <input
          type="password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => setTouched(true)}
          data-coral-input
          data-error={showError || undefined}
          data-valid={isValid || undefined}
          className={`w-full px-3 py-2 rounded-lg border transition-colors ${
            showError ? 'border-destructive bg-destructive/5' :
            isValid ? 'border-success bg-success/5' :
            'border-border'
          }`}
          placeholder="Enter password"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {isValid && (
            <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
          {showError && (
            <svg className="w-5 h-5 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </div>
      </div>
      <p className={`text-xs ${showError ? 'text-destructive' : 'text-muted-foreground'}`}>
        {showError ? 'Password must be at least 8 characters' : 'Minimum 8 characters required'}
      </p>
    </div>
  )
}

function StepIndicatorPreview() {
  const [step, setStep] = useState(2)
  const steps = ['Cart', 'Shipping', 'Payment', 'Confirm']

  return (
    <div className="w-full max-w-md">
      <div data-coral-step-indicator className="flex items-center justify-between mb-4">
        {steps.map((_label, i) => (
          <div key={i} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                i < step ? 'bg-success text-white' :
                i === step ? 'bg-primary text-primary-foreground' :
                'bg-muted text-muted-foreground'
              }`}
            >
              {i < step ? '✓' : i + 1}
            </div>
            {i < steps.length - 1 && (
              <div className={`w-12 h-0.5 mx-1 ${i < step ? 'bg-success' : 'bg-muted'}`} />
            )}
          </div>
        ))}
      </div>
      <p className="text-center text-sm mb-4">Step {step + 1}: {steps[step]}</p>
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          data-coral-button
          data-variant="outline"
          data-size="sm"
        >
          Back
        </button>
        <button
          onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
          disabled={step === steps.length - 1}
          data-coral-button
          data-variant="primary"
          data-size="sm"
        >
          Next
        </button>
      </div>
    </div>
  )
}

function CopyFeedbackPreview() {
  const [copied, setCopied] = useState(false)
  const textToCopy = 'npm install @coral-css/core'

  const handleCopy = () => {
    navigator.clipboard?.writeText(textToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="w-full max-w-sm">
      <div data-coral-copy-feedback data-copied={copied || undefined} className="flex items-center gap-2 p-3 bg-muted rounded-lg font-mono text-sm">
        <code className="flex-1 truncate">{textToCopy}</code>
        <button
          onClick={handleCopy}
          className="p-1.5 hover:bg-background rounded transition-colors"
        >
          {copied ? (
            <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
        </button>
      </div>
      {copied && <p className="text-xs text-success mt-2 text-center">Copied to clipboard!</p>}
    </div>
  )
}

function ActionFeedbackPreview() {
  const [action, setAction] = useState<string | null>(null)

  const actions = [
    { id: 'like', icon: '👍', label: 'Liked!' },
    { id: 'save', icon: '🔖', label: 'Saved!' },
    { id: 'share', icon: '📤', label: 'Shared!' },
  ]

  const handleAction = (id: string) => {
    setAction(id)
    setTimeout(() => setAction(null), 1500)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        {actions.map((a) => (
          <button
            key={a.id}
            onClick={() => handleAction(a.id)}
            data-coral-action-feedback
            data-active={action === a.id || undefined}
            className={`px-4 py-2 rounded-lg border transition-all ${
              action === a.id
                ? 'border-primary bg-primary/10 scale-105'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <span className="text-lg">{a.icon}</span>
          </button>
        ))}
      </div>
      {action && (
        <div className="px-4 py-2 bg-primary text-primary-foreground rounded-lg animate-bounce">
          {actions.find(a => a.id === action)?.label}
        </div>
      )}
    </div>
  )
}

function QuotaIndicatorPreview() {
  const used = 7.2
  const total = 10
  const percentage = (used / total) * 100

  return (
    <div className="w-full max-w-sm p-4 bg-card border border-border rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">Storage</span>
        <span className="text-xs text-muted-foreground">{used} GB / {total} GB</span>
      </div>
      <div data-coral-quota-indicator data-percentage={percentage} className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${
            percentage > 90 ? 'bg-destructive' :
            percentage > 70 ? 'bg-warning' :
            'bg-primary'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className={`text-xs mt-2 ${percentage > 70 ? 'text-warning' : 'text-muted-foreground'}`}>
        {percentage > 90 ? 'Critical: Storage almost full!' :
         percentage > 70 ? 'Warning: Running low on storage' :
         '2.8 GB remaining'}
      </p>
    </div>
  )
}

function PasswordFeedbackPreview() {
  const [password, setPassword] = useState('')

  const checks = [
    { label: '8+ characters', valid: password.length >= 8 },
    { label: 'Uppercase letter', valid: /[A-Z]/.test(password) },
    { label: 'Lowercase letter', valid: /[a-z]/.test(password) },
    { label: 'Number', valid: /[0-9]/.test(password) },
    { label: 'Special character', valid: /[!@#$%^&*]/.test(password) },
  ]

  const strength = checks.filter(c => c.valid).length

  return (
    <div className="w-full max-w-sm space-y-3">
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        data-coral-input
        className="w-full px-3 py-2 rounded-lg border border-border"
        placeholder="Create password"
      />
      <div data-coral-password-feedback className="space-y-2">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded transition-colors ${
                i <= strength
                  ? strength <= 2 ? 'bg-destructive' : strength <= 3 ? 'bg-warning' : 'bg-success'
                  : 'bg-muted'
              }`}
            />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-1">
          {checks.map((check, i) => (
            <div key={i} className={`flex items-center gap-1 text-xs ${check.valid ? 'text-success' : 'text-muted-foreground'}`}>
              {check.valid ? '✓' : '○'} {check.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SaveIndicatorPreview() {
  const [status, setStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved')

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        data-coral-save-indicator
        data-status={status}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted"
      >
        {status === 'saving' && (
          <>
            <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-muted-foreground">Saving...</span>
          </>
        )}
        {status === 'saved' && (
          <>
            <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm text-success">All changes saved</span>
          </>
        )}
        {status === 'unsaved' && (
          <>
            <div className="w-2 h-2 rounded-full bg-warning" />
            <span className="text-sm text-warning">Unsaved changes</span>
          </>
        )}
      </div>
      <div className="flex gap-2">
        {(['unsaved', 'saving', 'saved'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            data-coral-button
            data-variant={status === s ? 'primary' : 'outline'}
            data-size="sm"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}

function ReactionPickerPreview() {
  const [selected, setSelected] = useState<string[]>([])
  const reactions = ['👍', '❤️', '😂', '😮', '😢', '😡']

  const toggleReaction = (r: string) => {
    setSelected(prev =>
      prev.includes(r) ? prev.filter(x => x !== r) : [...prev, r]
    )
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div data-coral-reaction-picker className="flex gap-1 p-2 bg-card border border-border rounded-full">
        {reactions.map((r) => (
          <button
            key={r}
            onClick={() => toggleReaction(r)}
            className={`w-10 h-10 rounded-full text-xl transition-all hover:bg-muted ${
              selected.includes(r) ? 'bg-primary/20 scale-110' : ''
            }`}
          >
            {r}
          </button>
        ))}
      </div>
      {selected.length > 0 && (
        <div className="flex gap-2">
          {selected.map((r) => (
            <span key={r} className="px-2 py-1 bg-muted rounded-full text-sm">
              {r} <span className="text-muted-foreground">1</span>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

function LiveIndicatorPreview() {
  const [isLive, setIsLive] = useState(true)

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        data-coral-live-indicator
        data-live={isLive || undefined}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
          isLive ? 'bg-destructive text-white' : 'bg-muted text-muted-foreground'
        }`}
      >
        <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-white animate-pulse' : 'bg-muted-foreground'}`} />
        <span className="text-sm font-medium uppercase">{isLive ? 'Live' : 'Offline'}</span>
      </div>
      <button
        onClick={() => setIsLive(!isLive)}
        data-coral-button
        data-variant={isLive ? 'destructive' : 'primary'}
      >
        {isLive ? 'Go Offline' : 'Go Live'}
      </button>
    </div>
  )
}

function UpdateBannerPreview() {
  const [visible, setVisible] = useState(true)

  if (!visible) {
    return (
      <button onClick={() => setVisible(true)} data-coral-button data-variant="outline">
        Show Update Banner
      </button>
    )
  }

  return (
    <div
      data-coral-update-banner
      data-visible
      className="w-full max-w-lg flex items-center gap-3 p-3 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg"
    >
      <div className="p-2 bg-primary/20 rounded-lg">
        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium">A new version is available</p>
        <p className="text-xs text-muted-foreground">Version 2.0 includes bug fixes and new features</p>
      </div>
      <button data-coral-button data-variant="primary" data-size="sm">
        Update Now
      </button>
      <button
        onClick={() => setVisible(false)}
        className="p-1 hover:bg-muted rounded"
      >
        <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}

function VoiceFeedbackPreview() {
  const [active, setActive] = useState(false)
  const [levels, setLevels] = useState([20, 40, 60, 80, 60])

  useEffect(() => {
    if (active) {
      const interval = setInterval(() => {
        setLevels(prev => prev.map(() => Math.random() * 100))
      }, 100)
      return () => clearInterval(interval)
    } else {
      setLevels([20, 40, 60, 80, 60])
    }
  }, [active])

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        data-coral-voice-feedback
        data-active={active || undefined}
        className="flex items-end justify-center gap-1 h-16 p-4 bg-card border border-border rounded-lg"
      >
        {levels.map((level, i) => (
          <div
            key={i}
            data-coral-voice-bar
            className={`w-1.5 rounded-full transition-all duration-100 ${active ? 'bg-primary' : 'bg-muted-foreground/30'}`}
            style={{ height: `${active ? level : 30}%` }}
          />
        ))}
      </div>
      <button
        onClick={() => setActive(!active)}
        data-coral-button
        data-variant={active ? 'destructive' : 'primary'}
        className="flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
        {active ? 'Stop Recording' : 'Start Recording'}
      </button>
    </div>
  )
}

export default FeedbackPage
