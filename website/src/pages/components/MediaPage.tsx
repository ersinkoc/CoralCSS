import { useState } from 'react'
import { ComponentPageLayout } from './ComponentPageLayout'

// Preview Components
function ImagePreview() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="space-y-2">
        <div data-coral-image data-ratio="1/1" className="rounded-lg bg-gradient-to-br from-primary to-accent" />
        <p className="text-xs text-muted-foreground text-center">Square</p>
      </div>
      <div className="space-y-2">
        <div data-coral-image data-ratio="16/9" className="rounded-lg bg-gradient-to-br from-info to-success" />
        <p className="text-xs text-muted-foreground text-center">16:9</p>
      </div>
      <div className="space-y-2">
        <div data-coral-image data-ratio="4/3" className="rounded-lg bg-gradient-to-br from-warning to-destructive" />
        <p className="text-xs text-muted-foreground text-center">4:3</p>
      </div>
    </div>
  )
}

function VideoPreview() {
  const [isPlaying, setIsPlaying] = useState(false)
  return (
    <div data-coral-video className="w-full max-w-md">
      <div className="relative aspect-video bg-gradient-to-br from-muted to-muted/50 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            data-coral-video-play
            data-playing={isPlaying || undefined}
          >
            {isPlaying ? (
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>
        <div data-coral-video-controls>
          <span className="text-xs text-white">0:00 / 3:45</span>
          <div data-coral-video-progress>
            <div data-coral-video-progress-bar style={{ width: '33%' }} />
          </div>
          <button data-coral-video-volume>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

function AudioPreview() {
  const [isPlaying, setIsPlaying] = useState(false)
  return (
    <div data-coral-audio className="w-full max-w-md">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          data-coral-audio-play
          data-playing={isPlaying || undefined}
        >
          {isPlaying ? (
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        <div className="flex-1">
          <div data-coral-audio-waveform>
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                data-coral-audio-waveform-bar
                style={{ height: `${Math.random() * 100}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1:24</span>
            <span>4:32</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function FigurePreview() {
  return (
    <figure data-coral-figure className="w-full max-w-sm">
      <div data-coral-figure-image className="aspect-video bg-gradient-to-br from-primary to-accent rounded-t-lg" />
      <figcaption data-coral-figcaption>
        A beautiful gradient demonstrating the figure component with caption
      </figcaption>
    </figure>
  )
}

function IconPreview() {
  const icons = [
    'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
    'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
  ]
  return (
    <div className="flex items-end gap-6">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size, i) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <svg
            data-coral-icon
            data-size={size}
            data-color="primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icons[i % icons.length]} />
          </svg>
          <span className="text-xs text-muted-foreground">{size}</span>
        </div>
      ))}
    </div>
  )
}

function QRCodePreview() {
  return (
    <div className="flex items-center gap-6">
      <div data-coral-qrcode className="p-4 bg-white rounded-lg">
        <div className="w-24 h-24 grid grid-cols-5 gap-0.5">
          {Array.from({ length: 25 }).map((_, i) => (
            <div
              key={i}
              className={`${Math.random() > 0.5 ? 'bg-foreground' : 'bg-transparent'}`}
            />
          ))}
        </div>
      </div>
      <div className="text-sm text-muted-foreground">
        <p className="font-medium text-foreground mb-1">QR Code</p>
        <p>Scan to visit link</p>
      </div>
    </div>
  )
}

function EmojiPickerPreview() {
  const [selected, setSelected] = useState(':)')
  const emojis = [':)', ':D', ';)', ':P', ':O', 'XD', '<3', ':/', ':(', ':S', 'B)', ':*', '^_^', '-_-', 'o_O', 'T_T']
  return (
    <div data-coral-emoji-picker className="w-64">
      <div data-coral-emoji-picker-search>
        <input
          type="text"
          placeholder="Search emoji..."
          data-coral-input
        />
      </div>
      <div data-coral-emoji-picker-grid>
        {emojis.map((emoji) => (
          <button
            key={emoji}
            onClick={() => setSelected(emoji)}
            data-coral-emoji-picker-item
            data-selected={selected === emoji || undefined}
          >
            {emoji}
          </button>
        ))}
      </div>
      <div data-coral-emoji-picker-footer>
        <span className="text-muted-foreground">Selected:</span>
        <span className="text-2xl">{selected}</span>
      </div>
    </div>
  )
}

const mediaComponents = [
  {
    id: 'image',
    name: 'Image',
    description: 'Responsive image component with lazy loading and placeholders.',
    usage: `<img data-coral-image src="..." alt="..." />
<img data-coral-image data-lazy data-placeholder="blur" src="..." alt="..." />
<img data-coral-image data-ratio="16/9" src="..." alt="..." />`,
    props: [
      { name: 'data-lazy', type: 'boolean', default: 'false', description: 'Enable lazy loading' },
      { name: 'data-placeholder', type: '"blur" | "color" | "skeleton"', default: 'undefined', description: 'Placeholder type' },
      { name: 'data-ratio', type: 'string', default: 'undefined', description: 'Aspect ratio' },
    ],
    preview: ImagePreview,
  },
  {
    id: 'video',
    name: 'Video',
    description: 'Video player component with custom controls.',
    usage: `<div data-coral-video>
  <video src="..." poster="...">
  </video>
  <div data-coral-video-controls>
    <button data-coral-video-play></button>
    <div data-coral-video-progress></div>
    <button data-coral-video-fullscreen></button>
  </div>
</div>`,
    props: [
      { name: 'data-autoplay', type: 'boolean', default: 'false', description: 'Auto-play video' },
      { name: 'data-loop', type: 'boolean', default: 'false', description: 'Loop video' },
      { name: 'data-muted', type: 'boolean', default: 'false', description: 'Start muted' },
    ],
    preview: VideoPreview,
  },
  {
    id: 'audio',
    name: 'Audio',
    description: 'Audio player with waveform visualization.',
    usage: `<div data-coral-audio>
  <audio src="..."></audio>
  <div data-coral-audio-controls>
    <button data-coral-audio-play></button>
    <div data-coral-audio-waveform></div>
    <span data-coral-audio-time></span>
  </div>
</div>`,
    props: [
      { name: 'data-waveform', type: 'boolean', default: 'true', description: 'Show waveform' },
      { name: 'data-controls', type: 'boolean', default: 'true', description: 'Show controls' },
    ],
    preview: AudioPreview,
  },
  {
    id: 'figure',
    name: 'Figure',
    description: 'A figure element with caption for images and media.',
    usage: `<figure data-coral-figure>
  <img src="..." alt="..." />
  <figcaption data-coral-figcaption>
    Caption text describing the image
  </figcaption>
</figure>`,
    props: [
      { name: 'data-caption-position', type: '"bottom" | "overlay"', default: '"bottom"', description: 'Caption position' },
    ],
    preview: FigurePreview,
  },
  {
    id: 'icon',
    name: 'Icon',
    description: 'SVG icon component with size and color variants.',
    usage: `<svg data-coral-icon data-size="md">
  <path d="..." />
</svg>

<svg data-coral-icon data-size="lg" data-color="primary">
  <path d="..." />
</svg>`,
    props: [
      { name: 'data-size', type: '"xs" | "sm" | "md" | "lg" | "xl"', default: '"md"', description: 'Icon size' },
      { name: 'data-color', type: 'string', default: '"currentColor"', description: 'Icon color' },
    ],
    preview: IconPreview,
  },
  {
    id: 'qrcode',
    name: 'QRCode',
    description: 'Generate QR codes for URLs and data.',
    usage: `<div data-coral-qrcode data-value="https://example.com">
</div>

<div data-coral-qrcode data-value="..." data-size="200" data-color="#000">
</div>`,
    props: [
      { name: 'data-value', type: 'string', default: 'required', description: 'Data to encode' },
      { name: 'data-size', type: 'number', default: '128', description: 'QR code size in pixels' },
      { name: 'data-color', type: 'string', default: '"#000"', description: 'QR code color' },
    ],
    preview: QRCodePreview,
  },
  {
    id: 'emoji-picker',
    name: 'EmojiPicker',
    description: 'An emoji picker for adding emojis to content.',
    usage: `<div data-coral-emoji-picker>
  <button data-coral-emoji-trigger>:)</button>
  <div data-coral-emoji-content>
    <!-- Emoji grid -->
  </div>
</div>`,
    props: [
      { name: 'data-categories', type: 'string[]', default: 'all', description: 'Categories to show' },
      { name: 'data-search', type: 'boolean', default: 'true', description: 'Enable search' },
    ],
    preview: EmojiPickerPreview,
  },
]

function MediaPage() {
  return (
    <ComponentPageLayout
      categoryName="Media"
      categoryId="media"
      components={mediaComponents}
      accessibilityFeatures={[
        'Alt text support',
        'Media controls',
        'Keyboard accessible',
        'ARIA labels',
      ]}
    />
  )
}

export default MediaPage
