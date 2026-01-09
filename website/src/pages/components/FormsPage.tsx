import { useState } from 'react'
import { ComponentPageLayout } from './ComponentPageLayout'

const formComponents = [
  {
    id: 'input',
    name: 'Input',
    description: 'A basic text input field with validation and various states.',
    usage: `<div>
  <label data-coral-label>Email</label>
  <input data-coral-input type="email" placeholder="you@example.com" />
</div>

<input data-coral-input data-invalid type="email" />
<input data-coral-input disabled value="Cannot edit" />`,
    props: [
      { name: 'data-invalid', type: 'boolean', default: 'false', description: 'Show error state' },
      { name: 'data-size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Input size' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the input' },
    ],
    preview: InputPreview,
  },
  {
    id: 'textarea',
    name: 'Textarea',
    description: 'A multi-line text input for longer content.',
    usage: `<label data-coral-label>Message</label>
<textarea data-coral-textarea placeholder="Write your message..." rows={4} />`,
    props: [
      { name: 'data-invalid', type: 'boolean', default: 'false', description: 'Show error state' },
      { name: 'rows', type: 'number', default: '3', description: 'Number of visible rows' },
    ],
    preview: TextareaPreview,
  },
  {
    id: 'select',
    name: 'Select',
    description: 'A dropdown select menu with custom styling.',
    usage: `<div data-coral-select data-open>
  <button data-coral-select-trigger>
    <span>Select option</span>
    <svg data-coral-select-icon>...</svg>
  </button>
  <div data-coral-select-content>
    <div data-coral-select-option>Option 1</div>
    <div data-coral-select-option data-selected>Option 2</div>
  </div>
</div>`,
    props: [
      { name: 'data-open', type: 'boolean', default: 'false', description: 'Open state' },
      { name: 'data-selected', type: 'boolean', default: 'false', description: 'Selected option' },
    ],
    preview: SelectPreview,
  },
  {
    id: 'checkbox',
    name: 'Checkbox',
    description: 'A checkbox input for boolean values or multiple selections.',
    usage: `<div data-coral-checkbox data-checked tabIndex={0} role="checkbox" aria-checked="true" />
<div data-coral-checkbox tabIndex={0} role="checkbox" aria-checked="false" />`,
    props: [
      { name: 'data-checked', type: 'boolean', default: 'false', description: 'Checked state' },
      { name: 'data-indeterminate', type: 'boolean', default: 'false', description: 'Indeterminate state' },
    ],
    preview: CheckboxPreview,
  },
  {
    id: 'radio',
    name: 'Radio',
    description: 'Radio buttons for single selection from multiple options.',
    usage: `<div data-coral-radio-group>
  <div data-coral-radio data-checked role="radio" aria-checked="true" />
  <div data-coral-radio role="radio" aria-checked="false" />
</div>`,
    props: [
      { name: 'data-checked', type: 'boolean', default: 'false', description: 'Selected state' },
    ],
    preview: RadioPreview,
  },
  {
    id: 'switch',
    name: 'Switch',
    description: 'A toggle switch for on/off states.',
    usage: `<button data-coral-switch data-checked role="switch" aria-checked="true">
  <span data-coral-switch-thumb />
</button>`,
    props: [
      { name: 'data-checked', type: 'boolean', default: 'false', description: 'On/off state' },
      { name: 'data-size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Switch size' },
    ],
    preview: SwitchPreview,
  },
  {
    id: 'slider',
    name: 'Slider',
    description: 'A slider for selecting values within a range.',
    usage: `<div data-coral-slider>
  <div data-coral-slider-track>
    <div data-coral-slider-range style={{ width: '50%' }} />
  </div>
  <div data-coral-slider-thumb style={{ left: '50%' }} />
</div>`,
    props: [
      { name: 'data-orientation', type: '"horizontal" | "vertical"', default: '"horizontal"', description: 'Slider direction' },
    ],
    preview: SliderPreview,
  },
  {
    id: 'color-picker',
    name: 'ColorPicker',
    description: 'A color picker with preset swatches.',
    usage: `<div data-coral-color-picker>
  <div data-coral-color-picker-preview style={{ backgroundColor: '#ff7f50' }} />
  <input data-coral-color-picker-input value="#ff7f50" />
</div>`,
    props: [
      { name: 'data-value', type: 'string', default: '"#000000"', description: 'Selected color' },
    ],
    preview: ColorPickerPreview,
  },
  {
    id: 'file-upload',
    name: 'FileUpload',
    description: 'A file upload component with drag and drop.',
    usage: `<div data-coral-file-upload data-dragging>
  <svg data-coral-file-upload-icon>...</svg>
  <div data-coral-file-upload-text>Drag files here</div>
  <input data-coral-file-upload-input type="file" />
</div>`,
    props: [
      { name: 'data-dragging', type: 'boolean', default: 'false', description: 'Drag over state' },
      { name: 'data-multiple', type: 'boolean', default: 'false', description: 'Allow multiple files' },
    ],
    preview: FileUploadPreview,
  },
  {
    id: 'pin-input',
    name: 'PinInput',
    description: 'An OTP/PIN code input field.',
    usage: `<div data-coral-pin-input>
  <input data-coral-pin-input-field data-filled />
  <input data-coral-pin-input-field />
  <input data-coral-pin-input-field />
  <input data-coral-pin-input-field />
</div>`,
    props: [
      { name: 'data-filled', type: 'boolean', default: 'false', description: 'Has value' },
    ],
    preview: PinInputPreview,
  },
  {
    id: 'number-input',
    name: 'NumberInput',
    description: 'A number input with increment/decrement buttons.',
    usage: `<div data-coral-number-input>
  <button data-coral-number-input-decrement>-</button>
  <input data-coral-number-input-field type="number" value="5" />
  <button data-coral-number-input-increment>+</button>
</div>`,
    props: [
      { name: 'min', type: 'number', default: '-Infinity', description: 'Minimum value' },
      { name: 'max', type: 'number', default: 'Infinity', description: 'Maximum value' },
    ],
    preview: NumberInputPreview,
  },
  {
    id: 'rating',
    name: 'Rating',
    description: 'A star rating input component.',
    usage: `<div data-coral-rating>
  <svg data-coral-rating-star data-filled>...</svg>
  <svg data-coral-rating-star data-filled>...</svg>
  <svg data-coral-rating-star>...</svg>
</div>`,
    props: [
      { name: 'data-filled', type: 'boolean', default: 'false', description: 'Star is filled' },
      { name: 'data-readonly', type: 'boolean', default: 'false', description: 'Disable interaction' },
    ],
    preview: RatingPreview,
  },
]

function FormsPage() {
  return (
    <ComponentPageLayout
      categoryName="Forms"
      categoryId="forms"
      components={formComponents}
      accessibilityFeatures={[
        'Full keyboard navigation',
        'Label associations',
        'Error announcements',
        'Required field indicators',
        'Focus management',
        'ARIA attributes',
      ]}
    />
  )
}

// Preview Components with data-coral-* attributes

function InputPreview() {
  return (
    <div className="space-y-4 w-full max-w-sm">
      <div>
        <label data-coral-label>Default Input</label>
        <input data-coral-input type="text" placeholder="Enter your name" />
      </div>
      <div>
        <label data-coral-label>With Error</label>
        <input data-coral-input data-invalid type="email" placeholder="Email" defaultValue="invalid" />
      </div>
      <div>
        <label data-coral-label>Disabled</label>
        <input data-coral-input type="text" placeholder="Disabled" disabled />
      </div>
    </div>
  )
}

function TextareaPreview() {
  return (
    <div className="w-full max-w-sm">
      <label data-coral-label>Message</label>
      <textarea data-coral-textarea placeholder="Write your message..." rows={4} />
    </div>
  )
}

function SelectPreview() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState('')
  const options = ['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany']

  return (
    <div className="w-full max-w-sm">
      <label data-coral-label>Country</label>
      <div data-coral-select data-open={open || undefined}>
        <button data-coral-select-trigger onClick={() => setOpen(!open)} className="w-full">
          <span>{selected || 'Select a country'}</span>
          <svg data-coral-select-icon className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div data-coral-select-content>
          {options.map((option) => (
            <div
              key={option}
              data-coral-select-option
              data-selected={selected === option || undefined}
              onClick={() => { setSelected(option); setOpen(false) }}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function CheckboxPreview() {
  const [checked, setChecked] = useState([false, true, false])
  const labels = ['Accept terms and conditions', 'Subscribe to newsletter', 'Enable notifications']

  return (
    <div className="space-y-3">
      {labels.map((label, i) => (
        <label key={i} className="flex items-center gap-3 cursor-pointer">
          <div
            data-coral-checkbox
            data-checked={checked[i] || undefined}
            tabIndex={0}
            role="checkbox"
            aria-checked={checked[i]}
            onClick={() => {
              const newChecked = [...checked]
              newChecked[i] = !newChecked[i]
              setChecked(newChecked)
            }}
          />
          <span className="text-sm text-foreground">{label}</span>
        </label>
      ))}
    </div>
  )
}

function RadioPreview() {
  const [selected, setSelected] = useState('pro')
  const options = [
    { value: 'free', label: 'Free Plan' },
    { value: 'pro', label: 'Pro Plan' },
    { value: 'team', label: 'Team Plan' },
  ]

  return (
    <div data-coral-radio-group className="space-y-3">
      {options.map((option) => (
        <label key={option.value} className="flex items-center gap-3 cursor-pointer">
          <div
            data-coral-radio
            data-checked={selected === option.value || undefined}
            tabIndex={0}
            role="radio"
            aria-checked={selected === option.value}
            onClick={() => setSelected(option.value)}
          />
          <span className="text-sm text-foreground">{option.label}</span>
        </label>
      ))}
    </div>
  )
}

function SwitchPreview() {
  const [darkMode, setDarkMode] = useState(true)
  const [notifications, setNotifications] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-foreground">Dark Mode</span>
        <button
          data-coral-switch
          data-checked={darkMode || undefined}
          onClick={() => setDarkMode(!darkMode)}
          role="switch"
          aria-checked={darkMode}
        >
          <span data-coral-switch-thumb />
        </button>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-foreground">Notifications</span>
        <button
          data-coral-switch
          data-checked={notifications || undefined}
          onClick={() => setNotifications(!notifications)}
          role="switch"
          aria-checked={notifications}
        >
          <span data-coral-switch-thumb />
        </button>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Disabled</span>
        <button data-coral-switch data-disabled disabled>
          <span data-coral-switch-thumb />
        </button>
      </div>
    </div>
  )
}

function SliderPreview() {
  const [value, setValue] = useState(65)

  return (
    <div className="w-full max-w-sm space-y-6">
      <div>
        <div className="flex justify-between mb-2">
          <span className="text-sm text-muted-foreground">Volume</span>
          <span className="text-sm font-medium">{value}%</span>
        </div>
        <div data-coral-slider>
          <div data-coral-slider-track>
            <div data-coral-slider-range style={{ width: `${value}%` }} />
          </div>
          <div
            data-coral-slider-thumb
            style={{ left: `${value}%` }}
            tabIndex={0}
            role="slider"
            aria-valuenow={value}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') setValue(Math.min(100, value + 5))
              if (e.key === 'ArrowLeft') setValue(Math.max(0, value - 5))
            }}
          />
        </div>
      </div>
    </div>
  )
}

function ColorPickerPreview() {
  const [color, setColor] = useState('#ff7f50')
  const swatches = ['#ff7f50', '#4ecdc4', '#45b7d1', '#96c93d', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd']

  return (
    <div data-coral-color-picker className="flex items-center gap-4">
      <div data-coral-color-picker-preview style={{ backgroundColor: color }} />
      <input
        data-coral-color-picker-input
        type="text"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <div className="flex gap-1">
        {swatches.slice(0, 4).map((swatch) => (
          <button
            key={swatch}
            onClick={() => setColor(swatch)}
            className="w-6 h-6 rounded border-2 transition-transform hover:scale-110"
            style={{
              backgroundColor: swatch,
              borderColor: color === swatch ? 'hsl(var(--foreground))' : 'transparent'
            }}
          />
        ))}
      </div>
    </div>
  )
}

function FileUploadPreview() {
  const [dragging, setDragging] = useState(false)

  return (
    <div className="w-full max-w-sm">
      <div
        data-coral-file-upload
        data-dragging={dragging || undefined}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={() => setDragging(false)}
      >
        <svg data-coral-file-upload-icon viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <div data-coral-file-upload-text>Drag files here or click to browse</div>
        <div data-coral-file-upload-subtext>PNG, JPG up to 10MB</div>
        <input data-coral-file-upload-input type="file" />
      </div>
    </div>
  )
}

function PinInputPreview() {
  const [values, setValues] = useState(['', '', '', ''])

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newValues = [...values]
      newValues[index] = value
      setValues(newValues)
      if (value && index < 3) {
        const next = document.querySelector(`[data-pin-index="${index + 1}"]`) as HTMLInputElement
        next?.focus()
      }
    }
  }

  return (
    <div data-coral-pin-input>
      {values.map((val, i) => (
        <input
          key={i}
          data-coral-pin-input-field
          data-pin-index={i}
          data-filled={val ? true : undefined}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={val}
          onChange={(e) => handleChange(i, e.target.value)}
        />
      ))}
    </div>
  )
}

function NumberInputPreview() {
  const [value, setValue] = useState(5)

  return (
    <div data-coral-number-input>
      <button data-coral-number-input-decrement onClick={() => setValue(Math.max(0, value - 1))}>
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      </button>
      <input
        data-coral-number-input-field
        type="number"
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value) || 0)}
      />
      <button data-coral-number-input-increment onClick={() => setValue(value + 1)}>
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  )
}

function RatingPreview() {
  const [rating, setRating] = useState(4)
  const [hovered, setHovered] = useState(0)

  return (
    <div data-coral-rating>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          data-coral-rating-star
          data-filled={(hovered || rating) >= star || undefined}
          className="w-6 h-6 cursor-pointer"
          fill={(hovered || rating) >= star ? 'currentColor' : 'none'}
          stroke="currentColor"
          viewBox="0 0 24 24"
          onClick={() => setRating(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ))}
    </div>
  )
}

export default FormsPage
