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
      <div data-coral-qrcode className="p-4 bg-card rounded-lg border border-border">
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

function IframePreview() {
  return (
    <div className="w-full max-w-md">
      <div data-coral-iframe className="aspect-video rounded-lg overflow-hidden border border-border">
        <div className="w-full h-full bg-muted flex items-center justify-center">
          <div className="text-center">
            <svg className="w-12 h-12 text-muted-foreground mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            <p className="text-sm text-muted-foreground">Embedded content</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function BarcodePreview() {
  return (
    <div className="flex items-center gap-6">
      <div data-coral-barcode className="p-4 bg-card rounded-lg border border-border">
        <div className="flex gap-0.5 h-16">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="bg-foreground"
              style={{ width: `${Math.random() > 0.5 ? 2 : 1}px` }}
            />
          ))}
        </div>
        <p className="text-xs text-center text-muted-foreground mt-2">1234567890</p>
      </div>
    </div>
  )
}

function GifPickerPreview() {
  const gifs = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    color: ['from-primary to-accent', 'from-info to-primary', 'from-success to-info', 'from-warning to-success', 'from-error to-warning', 'from-accent to-error'][i]
  }))
  return (
    <div className="w-64">
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search GIFs..."
          className="w-full px-3 py-2 bg-card border border-border rounded-lg text-sm"
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {gifs.map((gif) => (
          <div
            key={gif.id}
            className={`h-20 bg-gradient-to-br ${gif.color} rounded-lg cursor-pointer hover:scale-105 transition-transform`}
          />
        ))}
      </div>
    </div>
  )
}

function MediaPlayerPreview() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(35)
  return (
    <div className="w-full max-w-md bg-card rounded-xl border border-border overflow-hidden">
      <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-16 h-16 rounded-full bg-primary/90 hover:bg-primary flex items-center justify-center transition-colors"
          >
            {isPlaying ? (
              <svg className="w-6 h-6 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-primary-foreground ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => setIsPlaying(!isPlaying)} className="text-foreground">
            {isPlaying ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          <div className="flex-1 h-1 bg-muted rounded-full cursor-pointer" onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            setProgress((e.clientX - rect.left) / rect.width * 100)
          }}>
            <div className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-xs text-muted-foreground">1:24 / 4:02</span>
          <button className="text-foreground">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

function AvatarGroupPreview() {
  const avatars = ['JD', 'AS', 'MK', 'LP', 'RW']
  return (
    <div className="flex items-center">
      <div className="flex -space-x-3">
        {avatars.slice(0, 4).map((initials, i) => (
          <div
            key={i}
            className="w-10 h-10 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-sm font-medium text-primary"
          >
            {initials}
          </div>
        ))}
        <div className="w-10 h-10 rounded-full bg-muted border-2 border-background flex items-center justify-center text-sm font-medium text-muted-foreground">
          +3
        </div>
      </div>
    </div>
  )
}

function ImageGridPreview() {
  return (
    <div className="w-full max-w-sm">
      <div className="grid grid-cols-3 gap-1 rounded-xl overflow-hidden">
        <div className="aspect-square bg-gradient-to-br from-primary to-accent" />
        <div className="aspect-square bg-gradient-to-br from-info to-primary" />
        <div className="aspect-square bg-gradient-to-br from-success to-info" />
        <div className="aspect-square bg-gradient-to-br from-warning to-success" />
        <div className="aspect-square bg-gradient-to-br from-error to-warning relative">
          <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
            <span className="text-background font-medium">+5</span>
          </div>
        </div>
        <div className="aspect-square bg-gradient-to-br from-accent to-error" />
      </div>
    </div>
  )
}

function ThumbnailPreview() {
  return (
    <div className="flex gap-4">
      <div className="relative w-24">
        <div className="aspect-video bg-gradient-to-br from-primary to-accent rounded-lg" />
        <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-foreground/80 rounded text-xs text-background">
          3:45
        </div>
      </div>
      <div className="relative w-24">
        <div className="aspect-video bg-gradient-to-br from-info to-success rounded-lg" />
        <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-foreground/80 rounded text-xs text-background">
          12:30
        </div>
        <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-destructive rounded text-xs text-destructive-foreground">
          LIVE
        </div>
      </div>
    </div>
  )
}

function CarouselPreview() {
  const [current, setCurrent] = useState(0)
  const items = ['from-primary to-accent', 'from-info to-primary', 'from-success to-info', 'from-warning to-success']
  return (
    <div className="w-full max-w-md">
      <div className="relative overflow-hidden rounded-lg">
        <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${current * 100}%)` }}>
          {items.map((gradient, i) => (
            <div key={i} className={`w-full flex-shrink-0 aspect-video bg-gradient-to-br ${gradient} flex items-center justify-center text-background text-2xl font-bold`}>
              {i + 1}
            </div>
          ))}
        </div>
        <button onClick={() => setCurrent(Math.max(0, current - 1))} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-foreground/50 rounded-full text-background">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button onClick={() => setCurrent(Math.min(items.length - 1, current + 1))} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-foreground/50 rounded-full text-background">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
      <div className="flex justify-center gap-2 mt-3">
        {items.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full ${i === current ? 'bg-primary' : 'bg-muted'}`} />
        ))}
      </div>
    </div>
  )
}

function LightboxPreview() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)} className="w-32 h-24 bg-gradient-to-br from-primary to-accent rounded-lg hover:scale-105 transition-transform cursor-zoom-in" />
      {open && (
        <div className="fixed inset-0 bg-foreground/95 z-50 flex items-center justify-center" onClick={() => setOpen(false)}>
          <button className="absolute top-4 right-4 text-background/70 hover:text-background">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <div className="w-[80vw] max-w-2xl aspect-video bg-gradient-to-br from-primary to-accent rounded-lg" />
        </div>
      )}
    </>
  )
}

function CompareSliderPreview() {
  const [position, setPosition] = useState(50)
  return (
    <div className="w-full max-w-sm relative overflow-hidden rounded-lg" style={{ touchAction: 'none' }}>
      <div className="aspect-video bg-gradient-to-br from-muted-foreground to-muted" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
        <div className="aspect-video bg-gradient-to-br from-primary to-accent" style={{ width: '100%' }} />
      </div>
      <div className="absolute inset-y-0" style={{ left: `${position}%` }}>
        <div className="absolute inset-y-0 w-0.5 bg-background -translate-x-1/2" />
        <button
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-background rounded-full shadow-lg flex items-center justify-center cursor-ew-resize"
          onMouseDown={(e) => {
            const parent = e.currentTarget.parentElement?.parentElement
            const move = (ev: MouseEvent) => {
              if (!parent) return
              const rect = parent.getBoundingClientRect()
              const pos = Math.max(0, Math.min(100, ((ev.clientX - rect.left) / rect.width) * 100))
              setPosition(pos)
            }
            const up = () => { document.removeEventListener('mousemove', move); document.removeEventListener('mouseup', up) }
            document.addEventListener('mousemove', move)
            document.addEventListener('mouseup', up)
          }}
        >
          <svg className="w-4 h-4 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
        </button>
      </div>
    </div>
  )
}

function GalleryPreview() {
  const images = ['from-primary to-accent', 'from-info to-primary', 'from-success to-info', 'from-warning to-success', 'from-error to-warning']
  return (
    <div className="w-full max-w-md grid grid-cols-4 gap-1 rounded-lg overflow-hidden">
      <div className={`col-span-2 row-span-2 aspect-square bg-gradient-to-br ${images[0]}`} />
      {images.slice(1).map((g, i) => (
        <div key={i} className={`aspect-square bg-gradient-to-br ${g}`} />
      ))}
    </div>
  )
}

function MasonryMediaPreview() {
  const heights = ['h-32', 'h-40', 'h-24', 'h-36', 'h-28', 'h-44']
  const gradients = ['from-primary to-accent', 'from-info to-primary', 'from-success to-info', 'from-warning to-success', 'from-error to-warning', 'from-accent to-error']
  return (
    <div className="columns-3 gap-2 w-full max-w-md">
      {heights.map((h, i) => (
        <div key={i} className={`${h} bg-gradient-to-br ${gradients[i]} rounded-lg mb-2`} />
      ))}
    </div>
  )
}

function PosterPreview() {
  return (
    <div className="w-32 bg-card rounded-lg overflow-hidden shadow-lg border border-border">
      <div className="aspect-[2/3] bg-gradient-to-br from-primary to-accent relative">
        <div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-foreground/80 to-transparent">
          <h4 className="text-background text-sm font-bold">Movie Title</h4>
          <p className="text-background/70 text-xs">2024</p>
        </div>
      </div>
    </div>
  )
}

function CoverPreview() {
  return (
    <div className="w-full max-w-sm relative rounded-xl overflow-hidden">
      <div className="aspect-[21/9] bg-gradient-to-br from-primary to-accent" />
      <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center">
        <div className="text-center text-background">
          <h3 className="text-2xl font-bold mb-1">Cover Title</h3>
          <p className="text-sm opacity-80">Subtitle text</p>
        </div>
      </div>
    </div>
  )
}

function BackgroundMediaPreview() {
  return (
    <div className="w-full max-w-md h-48 relative rounded-xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent" />
      <div className="absolute inset-0 bg-foreground/30" />
      <div className="relative h-full flex flex-col items-center justify-center p-6">
        <h3 className="text-background text-xl font-bold mb-2">Background Media</h3>
        <p className="text-background/80 text-sm text-center">Content overlaid on background</p>
      </div>
    </div>
  )
}

function LogoCloudPreview() {
  return (
    <div className="w-full max-w-md">
      <div className="grid grid-cols-4 gap-4 items-center justify-items-center opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="w-16 h-8 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">Logo {i}</div>
        ))}
      </div>
    </div>
  )
}

function SpectrumPreview() {
  const [active, setActive] = useState(true)
  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="flex items-end justify-center gap-1 h-20 p-4 bg-card border border-border rounded-lg">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className={`w-1.5 bg-primary rounded-full transition-all ${active ? 'animate-pulse' : ''}`}
            style={{ height: active ? `${Math.random() * 80 + 20}%` : '30%', animationDelay: `${i * 50}ms` }} />
        ))}
      </div>
      <button onClick={() => setActive(!active)} className="mt-2 text-sm text-primary">{active ? 'Stop' : 'Start'}</button>
    </div>
  )
}

function EqualizerPreview() {
  const bands = [60, 80, 50, 70, 90, 60, 75, 55]
  return (
    <div className="w-full max-w-sm mx-auto p-4 bg-card border border-border rounded-lg">
      <div className="flex items-end justify-around h-24 gap-2">
        {bands.map((h, i) => (
          <div key={i} className="flex flex-col items-center gap-1 flex-1">
            <div className="w-full bg-muted rounded-full overflow-hidden flex flex-col-reverse" style={{ height: '100%' }}>
              <div className="bg-gradient-to-t from-primary to-accent transition-all" style={{ height: `${h}%` }} />
            </div>
            <span className="text-[10px] text-muted-foreground">{['60', '250', '1k', '4k', '8k', '12k', '14k', '16k'][i]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function VideoThumbnailsPreview() {
  return (
    <div className="w-full max-w-md">
      <div className="flex gap-1 overflow-x-auto pb-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={`w-20 flex-shrink-0 aspect-video rounded cursor-pointer hover:ring-2 ring-primary transition-all
            bg-gradient-to-br ${['from-primary to-accent', 'from-info to-primary', 'from-success to-info', 'from-warning to-success'][i % 4]}`}
          />
        ))}
      </div>
      <div className="h-1 bg-muted rounded-full mt-2">
        <div className="w-1/4 h-full bg-primary rounded-full" />
      </div>
    </div>
  )
}

function MusicPlayerPreview() {
  const [playing, setPlaying] = useState(false)
  return (
    <div className="w-full max-w-sm p-4 bg-card border border-border rounded-xl">
      <div className="flex gap-4">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-lg flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-foreground truncate">Song Title</h4>
          <p className="text-sm text-muted-foreground truncate">Artist Name</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-muted-foreground">1:24</span>
            <div className="flex-1 h-1 bg-muted rounded-full">
              <div className="w-1/3 h-full bg-primary rounded-full" />
            </div>
            <span className="text-xs text-muted-foreground">3:45</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 mt-4">
        <button className="text-muted-foreground hover:text-foreground"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" /></svg></button>
        <button onClick={() => setPlaying(!playing)} className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
          {playing ? <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6zm8 0h4v16h-4z" /></svg>
            : <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>}
        </button>
        <button className="text-muted-foreground hover:text-foreground"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" /></svg></button>
      </div>
    </div>
  )
}

function SlideshowPreview() {
  const [slide, setSlide] = useState(0)
  const slides = ['from-primary to-accent', 'from-info to-primary', 'from-success to-info']
  return (
    <div className="w-full max-w-sm">
      <div className="aspect-video bg-gradient-to-br rounded-lg relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${slides[slide]} transition-opacity`} />
        <div className="absolute bottom-2 inset-x-0 flex justify-center gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)} className={`w-8 h-1 rounded-full ${i === slide ? 'bg-background' : 'bg-background/40'}`} />
          ))}
        </div>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-2">Auto-advances every 5 seconds</p>
    </div>
  )
}

function FilmstripPreview() {
  return (
    <div className="w-full max-w-md p-3 bg-card border border-border rounded-lg">
      <div className="flex gap-1">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={`flex-1 aspect-[3/4] rounded bg-gradient-to-br ${
            ['from-primary to-accent', 'from-info to-primary', 'from-success to-info', 'from-warning to-success', 'from-error to-warning', 'from-accent to-error'][i]
          }`} />
        ))}
      </div>
      <div className="flex justify-between text-xs text-muted-foreground mt-2">
        <span>00:00</span><span>01:30</span><span>03:00</span>
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
      { name: 'data-color', type: 'string', default: '"hsl(var(--foreground))"', description: 'QR code color' },
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
  {
    id: 'iframe',
    name: 'Iframe',
    description: 'Responsive iframe container for embedded content.',
    usage: `<div data-coral-iframe data-ratio="16/9">
  <iframe src="..." title="..." />
</div>`,
    props: [
      { name: 'data-ratio', type: '"16/9" | "4/3" | "1/1"', default: '"16/9"', description: 'Aspect ratio' },
      { name: 'data-loading', type: '"lazy" | "eager"', default: '"lazy"', description: 'Loading behavior' },
    ],
    preview: IframePreview,
  },
  {
    id: 'barcode',
    name: 'Barcode',
    description: 'Generate barcodes for product codes and IDs.',
    usage: `<div data-coral-barcode data-value="1234567890">
</div>`,
    props: [
      { name: 'data-value', type: 'string', default: 'required', description: 'Data to encode' },
      { name: 'data-format', type: '"CODE128" | "EAN13" | "UPC"', default: '"CODE128"', description: 'Barcode format' },
    ],
    preview: BarcodePreview,
  },
  {
    id: 'gif-picker',
    name: 'GifPicker',
    description: 'A searchable GIF picker for adding animations.',
    usage: `<div data-coral-gif-picker>
  <input data-coral-gif-search placeholder="Search GIFs..." />
  <div data-coral-gif-grid>
    <!-- GIF items -->
  </div>
</div>`,
    props: [
      { name: 'data-provider', type: '"giphy" | "tenor"', default: '"giphy"', description: 'GIF provider' },
      { name: 'data-columns', type: '2 | 3 | 4', default: '2', description: 'Grid columns' },
    ],
    preview: GifPickerPreview,
  },
  {
    id: 'media-player',
    name: 'MediaPlayer',
    description: 'Full-featured media player with controls and progress.',
    usage: `<div data-coral-media-player>
  <video data-coral-media-video src="..." />
  <div data-coral-media-controls>
    <button data-coral-media-play />
    <div data-coral-media-progress />
    <button data-coral-media-volume />
    <button data-coral-media-fullscreen />
  </div>
</div>`,
    props: [
      { name: 'data-autoplay', type: 'boolean', default: 'false', description: 'Auto-play media' },
      { name: 'data-controls', type: 'boolean', default: 'true', description: 'Show controls' },
    ],
    preview: MediaPlayerPreview,
  },
  {
    id: 'avatar-group',
    name: 'AvatarGroup',
    description: 'Stacked avatar display for showing multiple users.',
    usage: `<div data-coral-avatar-group data-max="4">
  <img data-coral-avatar src="..." alt="User 1" />
  <img data-coral-avatar src="..." alt="User 2" />
  <span data-coral-avatar-overflow>+3</span>
</div>`,
    props: [
      { name: 'data-max', type: 'number', default: '5', description: 'Max visible avatars' },
      { name: 'data-size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Avatar size' },
    ],
    preview: AvatarGroupPreview,
  },
  {
    id: 'image-grid',
    name: 'ImageGrid',
    description: 'Multi-image grid layout with overflow indicator.',
    usage: `<div data-coral-image-grid data-max="5">
  <img src="..." />
  <img src="..." />
  <span data-coral-image-grid-overflow>+3</span>
</div>`,
    props: [
      { name: 'data-columns', type: '2 | 3 | 4', default: '3', description: 'Grid columns' },
      { name: 'data-max', type: 'number', default: '6', description: 'Max visible images' },
    ],
    preview: ImageGridPreview,
  },
  {
    id: 'thumbnail',
    name: 'Thumbnail',
    description: 'Video thumbnails with duration and live indicators.',
    usage: `<div data-coral-thumbnail>
  <img src="..." alt="Video thumbnail" />
  <span data-coral-thumbnail-duration>3:45</span>
  <span data-coral-thumbnail-live>LIVE</span>
</div>`,
    props: [
      { name: 'data-duration', type: 'string', default: 'undefined', description: 'Video duration' },
      { name: 'data-live', type: 'boolean', default: 'false', description: 'Show live indicator' },
    ],
    preview: ThumbnailPreview,
  },
  {
    id: 'carousel',
    name: 'Carousel',
    description: 'Image/media carousel with navigation.',
    usage: `<div data-coral-carousel>
  <div data-coral-carousel-track>
    <div data-coral-carousel-slide><img src="..." /></div>
  </div>
  <button data-coral-carousel-prev />
  <button data-coral-carousel-next />
</div>`,
    props: [
      { name: 'data-autoplay', type: 'boolean', default: 'false', description: 'Auto-advance' },
      { name: 'data-loop', type: 'boolean', default: 'true', description: 'Loop slides' },
    ],
    preview: CarouselPreview,
  },
  {
    id: 'lightbox',
    name: 'Lightbox',
    description: 'Image lightbox viewer overlay.',
    usage: `<div data-coral-lightbox>
  <img data-coral-lightbox-trigger src="thumbnail.jpg" />
  <div data-coral-lightbox-content>
    <img src="full.jpg" />
  </div>
</div>`,
    props: [
      { name: 'data-zoom', type: 'boolean', default: 'true', description: 'Enable zoom' },
    ],
    preview: LightboxPreview,
  },
  {
    id: 'compare-slider',
    name: 'CompareSlider',
    description: 'Before/after image comparison slider.',
    usage: `<div data-coral-compare-slider>
  <img data-coral-compare-before src="before.jpg" />
  <img data-coral-compare-after src="after.jpg" />
</div>`,
    props: [
      { name: 'data-initial', type: 'number', default: '50', description: 'Initial position %' },
    ],
    preview: CompareSliderPreview,
  },
  {
    id: 'gallery',
    name: 'Gallery',
    description: 'Photo gallery with mixed layouts.',
    usage: `<div data-coral-gallery data-layout="grid">
  <img data-coral-gallery-item src="..." />
</div>`,
    props: [
      { name: 'data-layout', type: '"grid" | "masonry" | "justified"', default: '"grid"', description: 'Layout style' },
    ],
    preview: GalleryPreview,
  },
  {
    id: 'masonry-media',
    name: 'MasonryMedia',
    description: 'Pinterest-style masonry media grid.',
    usage: `<div data-coral-masonry-media data-columns="3">
  <img data-coral-masonry-item src="..." />
</div>`,
    props: [
      { name: 'data-columns', type: '2 | 3 | 4', default: '3', description: 'Columns' },
    ],
    preview: MasonryMediaPreview,
  },
  {
    id: 'poster',
    name: 'Poster',
    description: 'Movie/media poster display.',
    usage: `<div data-coral-poster>
  <img src="..." />
  <div data-coral-poster-info>
    <h4>Title</h4>
  </div>
</div>`,
    props: [
      { name: 'data-ratio', type: '"2/3" | "3/4"', default: '"2/3"', description: 'Poster ratio' },
    ],
    preview: PosterPreview,
  },
  {
    id: 'cover',
    name: 'Cover',
    description: 'Cover image with text overlay.',
    usage: `<div data-coral-cover>
  <img data-coral-cover-image src="..." />
  <div data-coral-cover-content>Title</div>
</div>`,
    props: [
      { name: 'data-overlay', type: 'boolean', default: 'true', description: 'Show overlay' },
    ],
    preview: CoverPreview,
  },
  {
    id: 'background-media',
    name: 'BackgroundMedia',
    description: 'Background image/video with content overlay.',
    usage: `<div data-coral-background-media>
  <video data-coral-bg-video src="..." />
  <div data-coral-bg-content>Content</div>
</div>`,
    props: [
      { name: 'data-parallax', type: 'boolean', default: 'false', description: 'Parallax effect' },
    ],
    preview: BackgroundMediaPreview,
  },
  {
    id: 'logo-cloud',
    name: 'LogoCloud',
    description: 'Brand/partner logo display grid.',
    usage: `<div data-coral-logo-cloud>
  <img data-coral-logo src="logo1.svg" />
  <img data-coral-logo src="logo2.svg" />
</div>`,
    props: [
      { name: 'data-grayscale', type: 'boolean', default: 'true', description: 'Grayscale logos' },
    ],
    preview: LogoCloudPreview,
  },
  {
    id: 'spectrum',
    name: 'Spectrum',
    description: 'Audio spectrum visualizer.',
    usage: `<div data-coral-spectrum data-bars="16">
  <!-- Auto-generated bars -->
</div>`,
    props: [
      { name: 'data-bars', type: 'number', default: '16', description: 'Number of bars' },
    ],
    preview: SpectrumPreview,
  },
  {
    id: 'equalizer',
    name: 'Equalizer',
    description: 'Audio equalizer control.',
    usage: `<div data-coral-equalizer>
  <div data-coral-eq-band data-freq="60" />
  <div data-coral-eq-band data-freq="250" />
</div>`,
    props: [
      { name: 'data-bands', type: 'number', default: '8', description: 'Number of bands' },
    ],
    preview: EqualizerPreview,
  },
  {
    id: 'video-thumbnails',
    name: 'VideoThumbnails',
    description: 'Video thumbnail strip/timeline.',
    usage: `<div data-coral-video-thumbnails>
  <img data-coral-vt-item src="thumb1.jpg" />
</div>`,
    props: [
      { name: 'data-count', type: 'number', default: '8', description: 'Thumbnail count' },
    ],
    preview: VideoThumbnailsPreview,
  },
  {
    id: 'music-player',
    name: 'MusicPlayer',
    description: 'Full-featured music player.',
    usage: `<div data-coral-music-player>
  <div data-coral-mp-artwork />
  <div data-coral-mp-info />
  <div data-coral-mp-controls />
</div>`,
    props: [
      { name: 'data-mini', type: 'boolean', default: 'false', description: 'Mini mode' },
    ],
    preview: MusicPlayerPreview,
  },
  {
    id: 'slideshow',
    name: 'Slideshow',
    description: 'Auto-advancing slideshow.',
    usage: `<div data-coral-slideshow data-interval="5000">
  <div data-coral-slideshow-slide><img src="..." /></div>
</div>`,
    props: [
      { name: 'data-interval', type: 'number', default: '5000', description: 'Interval ms' },
    ],
    preview: SlideshowPreview,
  },
  {
    id: 'filmstrip',
    name: 'Filmstrip',
    description: 'Video filmstrip timeline preview.',
    usage: `<div data-coral-filmstrip>
  <div data-coral-filmstrip-frame />
</div>`,
    props: [
      { name: 'data-frames', type: 'number', default: '6', description: 'Frame count' },
    ],
    preview: FilmstripPreview,
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
