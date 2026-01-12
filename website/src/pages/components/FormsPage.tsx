import { useState } from 'react'
import { ComponentPageLayout } from './ComponentPageLayout'

const formComponents = [
  {
    id: 'label',
    name: 'Label',
    description: 'A label element for form fields with optional required indicator.',
    usage: `<label data-coral-label data-required>Email</label>
<input data-coral-input type="email" />`,
    props: [
      { name: 'data-required', type: 'boolean', default: 'false', description: 'Show required asterisk' },
      { name: 'data-disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
    ],
    preview: LabelPreview,
  },
  {
    id: 'fieldset',
    name: 'Fieldset',
    description: 'Group related form fields with a legend.',
    usage: `<fieldset data-coral-fieldset>
  <legend data-coral-legend>Personal Information</legend>
  <input data-coral-input placeholder="Name" />
  <input data-coral-input placeholder="Email" />
</fieldset>`,
    props: [
      { name: 'data-disabled', type: 'boolean', default: 'false', description: 'Disable all fields' },
      { name: 'data-variant', type: '"default" | "card"', default: '"default"', description: 'Visual style' },
    ],
    preview: FieldsetPreview,
  },
  {
    id: 'form-layout',
    name: 'FormLayout',
    description: 'Organize form fields in various layouts.',
    usage: `<form data-coral-form-layout>
  <div data-coral-form-row>
    <input data-coral-input placeholder="First Name" />
    <input data-coral-input placeholder="Last Name" />
  </div>
</form>`,
    props: [
      { name: 'data-columns', type: 'number', default: '1', description: 'Number of columns' },
      { name: 'data-gap', type: 'number', default: '4', description: 'Gap between fields' },
    ],
    preview: FormLayoutPreview,
  },
  {
    id: 'multi-select',
    name: 'MultiSelect',
    description: 'A dropdown that allows multiple selections.',
    usage: `<div data-coral-multi-select data-open>
  <button data-coral-multi-select-trigger>Select options</button>
  <div data-coral-multi-select-content>
    <label data-coral-multi-select-option>
      <input type="checkbox" />
      Option 1
    </label>
  </div>
</div>`,
    props: [
      { name: 'data-max-items', type: 'number', default: 'undefined', description: 'Maximum selections' },
      { name: 'data-searchable', type: 'boolean', default: 'true', description: 'Enable search' },
    ],
    preview: MultiSelectPreview,
  },
  {
    id: 'toggle-button',
    name: 'ToggleButton',
    description: 'A group of toggleable buttons for single or multi-select.',
    usage: `<div data-coral-toggle-button-group>
  <button data-coral-toggle-button data-selected>Option 1</button>
  <button data-coral-toggle-button>Option 2</button>
  <button data-coral-toggle-button>Option 3</button>
</div>`,
    props: [
      { name: 'data-multiple', type: 'boolean', default: 'false', description: 'Allow multiple selections' },
      { name: 'data-variant', type: '"default" | "outline" | "ghost"', default: '"default"', description: 'Button style' },
    ],
    preview: ToggleButtonPreview,
  },
  {
    id: 'form-wizard',
    name: 'FormWizard',
    description: 'Multi-step form with progress indicator.',
    usage: `<div data-coral-form-wizard>
  <div data-coral-form-wizard-steps>
    <div data-coral-form-wizard-step data-active>1</div>
    <div data-coral-form-wizard-step>2</div>
    <div data-coral-form-wizard-step>3</div>
  </div>
  <div data-coral-form-wizard-content>
    <input data-coral-input placeholder="Step 1 field" />
  </div>
</div>`,
    props: [
      { name: 'data-current-step', type: 'number', default: '1', description: 'Current step' },
      { name: 'data-show-progress', type: 'boolean', default: 'true', description: 'Show progress bar' },
    ],
    preview: FormWizardPreview,
  },
  {
    id: 'captcha',
    name: 'Captcha',
    description: 'CAPTCHA verification component for form security.',
    usage: `<div data-coral-captcha>
  <div data-coral-captcha-challenge>
    <canvas data-coral-captcha-canvas></canvas>
    <button data-coral-captcha-refresh>↻</button>
  </div>
  <input data-coral-captcha-input placeholder="Enter the text above" />
</div>`,
    props: [
      { name: 'data-length', type: 'number', default: '6', description: 'Code length' },
      { name: 'data-type', type: '"text" | "math"', default: '"text"', description: 'Challenge type' },
    ],
    preview: CaptchaPreview,
  },
  {
    id: 'toggle-group',
    name: 'ToggleGroup',
    description: 'Radio-like toggle buttons for exclusive selection.',
    usage: `<div data-coral-toggle-group>
  <button data-coral-toggle-group-item data-selected>Small</button>
  <button data-coral-toggle-group-item>Medium</button>
  <button data-coral-toggle-group-item>Large</button>
</div>`,
    props: [
      { name: 'data-variant', type: '"default" | "outline"', default: '"default"', description: 'Visual style' },
      { name: 'data-size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Button size' },
    ],
    preview: ToggleGroupPreview,
  },
  {
    id: 'multi-checkbox',
    name: 'MultiCheckbox',
    description: 'Multiple checkboxes with "select all" functionality.',
    usage: `<div data-coral-multi-checkbox>
  <label data-coral-checkbox data-checked>
    <input type="checkbox" data-coral-checkbox-input checked />
    Option 1
  </label>
  <label data-coral-checkbox>
    <input type="checkbox" data-coral-checkbox-input />
    Option 2
  </label>
</div>`,
    props: [
      { name: 'data-select-all', type: 'boolean', default: 'true', description: 'Show select all' },
      { name: 'data-max-selections', type: 'number', default: 'undefined', description: 'Max selectable' },
    ],
    preview: MultiCheckboxPreview,
  },
  {
    id: 'form-validation',
    name: 'FormValidation',
    description: 'Display form validation errors and messages.',
    usage: `<div data-coral-form-validation>
  <div data-coral-form-field data-invalid>
    <input data-coral-input placeholder="Email" />
    <div data-coral-form-error>Please enter a valid email</div>
  </div>
</div>`,
    props: [
      { name: 'data-variant', type: '"default" | "tooltip" | "popover"', default: '"default"', description: 'Error display style' },
      { name: 'data-show-icon', type: 'boolean', default: 'true', description: 'Show error icon' },
    ],
    preview: FormValidationPreview,
  },
  {
    id: 'image-upload',
    name: 'ImageUpload',
    description: 'Image upload with preview and editing capabilities.',
    usage: `<div data-coral-image-upload>
  <div data-coral-image-upload-preview>
    <img data-coral-image-upload-img src="preview.jpg" />
    <button data-coral-image-upload-remove>×</button>
  </div>
  <input data-coral-image-upload-input type="file" accept="image/*" />
</div>`,
    props: [
      { name: 'data-max-size', type: 'number', default: '5', description: 'Max file size (MB)' },
      { name: 'data-allow-crop', type: 'boolean', default: 'false', description: 'Enable cropping' },
    ],
    preview: ImageUploadPreview,
  },
  {
    id: 'qr-code-input',
    name: 'QRCodeInput',
    description: 'QR code scanner and generator component.',
    usage: `<div data-coral-qr-code-input>
  <button data-coral-qr-code-scan>📱 Scan QR Code</button>
  <div data-coral-qr-code-display></div>
</div>`,
    props: [
      { name: 'data-mode', type: '"scan" | "generate" | "both"', default: '"scan"', description: 'Operation mode' },
      { name: 'data-size', type: 'number', default: '200', description: 'QR code size (px)' },
    ],
    preview: QRCodeInputPreview,
  },
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
  <div data-coral-color-picker-preview style={{ backgroundColor: 'hsl(var(--primary))' }} />
  <input data-coral-color-picker-input value="hsl(var(--primary))" />
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
  {
    id: 'range-slider',
    name: 'RangeSlider',
    description: 'A dual-handle slider for selecting a range of values.',
    usage: `<div data-coral-range-slider>
  <div data-coral-range-slider-track>
    <div data-coral-range-slider-range style={{ left: '25%', right: '25%' }} />
  </div>
  <div data-coral-range-slider-start style={{ left: '25%' }} />
  <div data-coral-range-slider-end style={{ right: '25%' }} />
</div>`,
    props: [
      { name: 'data-min', type: 'number', default: '0', description: 'Minimum value' },
      { name: 'data-max', type: 'number', default: '100', description: 'Maximum value' },
      { name: 'data-step', type: 'number', default: '1', description: 'Increment step' },
    ],
    preview: RangeSliderPreview,
  },
  {
    id: 'date-picker',
    name: 'DatePicker',
    description: 'A date picker with calendar navigation.',
    usage: `<div data-coral-date-picker>
  <input data-coral-date-picker-input placeholder="Select date" />
  <button data-coral-date-picker-trigger>📅</button>
</div>`,
    props: [
      { name: 'data-format', type: 'string', default: '"MM/DD/YYYY"', description: 'Date format' },
      { name: 'data-min-date', type: 'string', default: '""', description: 'Minimum selectable date' },
    ],
    preview: DatePickerPreview,
  },
  {
    id: 'time-picker',
    name: 'TimePicker',
    description: 'A time picker with hour and minute selection.',
    usage: `<div data-coral-time-picker>
  <input data-coral-time-picker-input placeholder="12:00 PM" />
  <button data-coral-time-picker-trigger>🕐</button>
</div>`,
    props: [
      { name: 'data-format', type: '"12h" | "24h"', default: '"12h"', description: 'Time format' },
      { name: 'data-interval', type: 'number', default: '30', description: 'Minute intervals' },
    ],
    preview: TimePickerPreview,
  },
  {
    id: 'search-input',
    name: 'SearchInput',
    description: 'A text input with search icon and clear button.',
    usage: `<div data-coral-search-input>
  <input data-coral-search-input-field placeholder="Search..." />
  <button data-coral-search-input-icon>🔍</button>
  <button data-coral-search-input-clear>✕</button>
</div>`,
    props: [
      { name: 'data-value', type: 'string', default: '""', description: 'Input value' },
      { name: 'data-placeholder', type: 'string', default: '"Search..."', description: 'Placeholder text' },
    ],
    preview: SearchInputPreview,
  },
  {
    id: 'tag-input',
    name: 'TagInput',
    description: 'An input for adding and removing tags.',
    usage: `<div data-coral-tag-input>
  <input data-coral-tag-input-field placeholder="Add tag..." />
  <div data-coral-tag-list>
    <span data-coral-tag>React</span>
    <span data-coral-tag>TypeScript</span>
  </div>
</div>`,
    props: [
      { name: 'data-max-tags', type: 'number', default: '10', description: 'Maximum tags allowed' },
      { name: 'data-placeholder', type: 'string', default: '"Add tag..."', description: 'Placeholder text' },
    ],
    preview: TagInputPreview,
  },
  {
    id: 'combobox',
    name: 'Combobox',
    description: 'An autocomplete input with dropdown suggestions.',
    usage: `<div data-coral-combobox>
  <input data-coral-combobox-input placeholder="Search countries..." />
  <div data-coral-combobox-list>
    <div data-coral-combobox-option>United States</div>
    <div data-coral-combobox-option>United Kingdom</div>
  </div>
</div>`,
    props: [
      { name: 'data-open', type: 'boolean', default: 'false', description: 'Dropdown open state' },
      { name: 'data-value', type: 'string', default: '""', description: 'Selected value' },
    ],
    preview: ComboboxPreview,
  },
  {
    id: 'autocomplete',
    name: 'Autocomplete',
    description: 'An input with inline autocomplete suggestions.',
    usage: `<div data-coral-autocomplete>
  <input data-coral-autocomplete-input placeholder="Type a color..." />
  <div data-coral-autocomplete-list>
    <span data-coral-autocomplete-option>Red</span>
    <span data-coral-autocomplete-option>Blue</span>
  </div>
</div>`,
    props: [
      { name: 'data-min-chars', type: 'number', default: '2', description: 'Minimum characters to show suggestions' },
      { name: 'data-max-suggestions', type: 'number', default: '5', description: 'Maximum suggestions to show' },
    ],
    preview: AutocompletePreview,
  },
  {
    id: 'phone-input',
    name: 'PhoneInput',
    description: 'A phone number input with country code selection.',
    usage: `<div data-coral-phone-input>
  <select data-coral-phone-input-country>
    <option value="US">🇺🇸 +1</option>
    <option value="UK">🇬🇧 +44</option>
  </select>
  <input data-coral-phone-input-field placeholder="123-456-7890" />
</div>`,
    props: [
      { name: 'data-country', type: 'string', default: '"US"', description: 'Selected country code' },
      { name: 'data-format', type: 'string', default: '"auto"', description: 'Phone number format' },
    ],
    preview: PhoneInputPreview,
  },
  {
    id: 'credit-card-input',
    name: 'CreditCardInput',
    description: 'A credit card input with format validation.',
    usage: `<div data-coral-credit-card-input>
  <input data-coral-credit-card-input-field placeholder="1234 5678 9012 3456" />
  <div data-coral-credit-card-icons>
    <span data-coral-credit-card-icon>💳</span>
  </div>
</div>`,
    props: [
      { name: 'data-format', type: 'string', default: '"space-separated"', description: 'Card number format' },
      { name: 'data-type', type: '"visa" | "mastercard" | "amex" | "unknown"', default: '"unknown"', description: 'Card type' },
    ],
    preview: CreditCardInputPreview,
  },
  {
    id: 'signature-pad',
    name: 'SignaturePad',
    description: 'A canvas for drawing digital signatures.',
    usage: `<div data-coral-signature-pad>
  <canvas data-coral-signature-pad-canvas width="400" height="200"></canvas>
  <button data-coral-signature-pad-clear>Clear</button>
</div>`,
    props: [
      { name: 'data-width', type: 'number', default: '400', description: 'Canvas width' },
      { name: 'data-height', type: 'number', default: '200', description: 'Canvas height' },
    ],
    preview: SignaturePadPreview,
  },
  {
    id: 'password-strength',
    name: 'PasswordStrength',
    description: 'Password input with real-time strength indicator.',
    usage: `<div data-coral-password-strength>
  <input data-coral-password-input type="password" />
  <div data-coral-password-meter data-strength="strong">
    <div data-coral-password-bar></div>
  </div>
  <span data-coral-password-label>Strong</span>
</div>`,
    props: [
      { name: 'data-strength', type: '"weak" | "medium" | "strong"', default: '"weak"', description: 'Password strength level' },
      { name: 'data-show-meter', type: 'boolean', default: 'true', description: 'Show strength meter' },
    ],
    preview: PasswordStrengthPreview,
  },
  {
    id: 'masked-input',
    name: 'MaskedInput',
    description: 'Input with customizable mask patterns.',
    usage: `<input data-coral-masked-input
  data-mask="(###) ###-####"
  placeholder="(123) 456-7890" />`,
    props: [
      { name: 'data-mask', type: 'string', default: '""', description: 'Mask pattern (# for digit, A for letter)' },
      { name: 'data-placeholder-char', type: 'string', default: '"_"', description: 'Placeholder character' },
    ],
    preview: MaskedInputPreview,
  },
  {
    id: 'currency-input',
    name: 'CurrencyInput',
    description: 'Number input formatted as currency.',
    usage: `<div data-coral-currency-input>
  <span data-coral-currency-symbol>$</span>
  <input data-coral-currency-field type="text" value="1,234.56" />
</div>`,
    props: [
      { name: 'data-currency', type: 'string', default: '"USD"', description: 'Currency code' },
      { name: 'data-locale', type: 'string', default: '"en-US"', description: 'Locale for formatting' },
    ],
    preview: CurrencyInputPreview,
  },
  {
    id: 'date-range-picker',
    name: 'DateRangePicker',
    description: 'Select a date range with start and end dates.',
    usage: `<div data-coral-date-range-picker>
  <input data-coral-date-range-start placeholder="Start date" />
  <span data-coral-date-range-separator>to</span>
  <input data-coral-date-range-end placeholder="End date" />
</div>`,
    props: [
      { name: 'data-format', type: 'string', default: '"MM/DD/YYYY"', description: 'Date format' },
      { name: 'data-max-range', type: 'number', default: 'undefined', description: 'Maximum days in range' },
    ],
    preview: DateRangePickerPreview,
  },
  {
    id: 'otp-input',
    name: 'OTPInput',
    description: 'One-time password input with auto-focus.',
    usage: `<div data-coral-otp-input data-length="6">
  <input data-coral-otp-field type="text" maxlength="1" />
  <!-- Repeat for each digit -->
</div>`,
    props: [
      { name: 'data-length', type: 'number', default: '6', description: 'Number of OTP digits' },
      { name: 'data-type', type: '"number" | "alphanumeric"', default: '"number"', description: 'Input type' },
    ],
    preview: OTPInputPreview,
  },
  {
    id: 'rich-text-editor',
    name: 'RichTextEditor',
    description: 'Basic rich text editor with formatting toolbar.',
    usage: `<div data-coral-rich-text-editor>
  <div data-coral-editor-toolbar>
    <button data-coral-editor-bold>B</button>
    <button data-coral-editor-italic>I</button>
  </div>
  <div data-coral-editor-content contenteditable></div>
</div>`,
    props: [
      { name: 'data-toolbar', type: 'string[]', default: '["bold", "italic", "underline"]', description: 'Toolbar buttons' },
      { name: 'data-min-height', type: 'string', default: '"200px"', description: 'Minimum editor height' },
    ],
    preview: RichTextEditorPreview,
  },
  {
    id: 'mentions-input',
    name: 'MentionsInput',
    description: 'Text input with @mentions support.',
    usage: `<div data-coral-mentions-input>
  <textarea data-coral-mentions-field placeholder="Type @ to mention..."></textarea>
  <div data-coral-mentions-dropdown>
    <div data-coral-mentions-option>@user1</div>
  </div>
</div>`,
    props: [
      { name: 'data-trigger', type: 'string', default: '"@"', description: 'Trigger character' },
      { name: 'data-suggestions', type: 'array', default: '[]', description: 'List of suggestions' },
    ],
    preview: MentionsInputPreview,
  },
  {
    id: 'address-input',
    name: 'AddressInput',
    description: 'Complete address input with autocomplete.',
    usage: `<div data-coral-address-input>
  <input data-coral-address-street placeholder="Street address" />
  <input data-coral-address-city placeholder="City" />
  <input data-coral-address-state placeholder="State" />
  <input data-coral-address-zip placeholder="ZIP" />
</div>`,
    props: [
      { name: 'data-autocomplete', type: 'boolean', default: 'true', description: 'Enable autocomplete' },
      { name: 'data-country', type: 'string', default: '"US"', description: 'Default country' },
    ],
    preview: AddressInputPreview,
  },
  {
    id: 'email-input',
    name: 'EmailInput',
    description: 'Email input with domain suggestions.',
    usage: `<div data-coral-email-input>
  <input data-coral-email-field type="email" placeholder="name@company.com" />
  <div data-coral-email-suggestions>
    <span>@gmail.com</span>
    <span>@yahoo.com</span>
  </div>
</div>`,
    props: [
      { name: 'data-domains', type: 'string[]', default: '["gmail.com", "yahoo.com", "outlook.com"]', description: 'Suggested domains' },
    ],
    preview: EmailInputPreview,
  },
  {
    id: 'url-input',
    name: 'URLInput',
    description: 'URL input with protocol prefix.',
    usage: `<div data-coral-url-input>
  <span data-coral-url-prefix>https://</span>
  <input data-coral-url-field type="text" placeholder="example.com" />
</div>`,
    props: [
      { name: 'data-prefix', type: 'string', default: '"https://"', description: 'URL prefix' },
      { name: 'data-validate', type: 'boolean', default: 'true', description: 'Validate URL format' },
    ],
    preview: URLInputPreview,
  },
  {
    id: 'inline-edit',
    name: 'InlineEdit',
    description: 'Text that becomes editable on click.',
    usage: `<div data-coral-inline-edit>
  <span data-coral-inline-text>Click to edit</span>
  <input data-coral-inline-input />
  <button data-coral-inline-save>✓</button>
  <button data-coral-inline-cancel>✕</button>
</div>`,
    props: [
      { name: 'data-editing', type: 'boolean', default: 'false', description: 'Edit mode active' },
      { name: 'data-save-on-blur', type: 'boolean', default: 'true', description: 'Save on blur' },
    ],
    preview: InlineEditPreview,
  },
  {
    id: 'tree-select',
    name: 'TreeSelect',
    description: 'Select with hierarchical options.',
    usage: `<div data-coral-tree-select>
  <button data-coral-tree-select-trigger>Select category</button>
  <div data-coral-tree-select-content>
    <div data-coral-tree-node data-has-children>
      Parent Node
      <div data-coral-tree-children>
        <div data-coral-tree-node>Child Node</div>
      </div>
    </div>
  </div>
</div>`,
    props: [
      { name: 'data-expandable', type: 'boolean', default: 'true', description: 'Allow expanding nodes' },
      { name: 'data-multi-select', type: 'boolean', default: 'false', description: 'Multiple selection' },
    ],
    preview: TreeSelectPreview,
  },
  {
    id: 'cascade-select',
    name: 'CascadeSelect',
    description: 'Cascading dropdown selection.',
    usage: `<div data-coral-cascade-select>
  <select data-coral-cascade-level="1">
    <option>Country</option>
  </select>
  <select data-coral-cascade-level="2">
    <option>State</option>
  </select>
  <select data-coral-cascade-level="3">
    <option>City</option>
  </select>
</div>`,
    props: [
      { name: 'data-levels', type: 'number', default: '3', description: 'Number of cascade levels' },
    ],
    preview: CascadeSelectPreview,
  },
  {
    id: 'transfer-list',
    name: 'TransferList',
    description: 'Move items between two lists.',
    usage: `<div data-coral-transfer-list>
  <div data-coral-transfer-source>
    <div data-coral-transfer-item>Item 1</div>
  </div>
  <div data-coral-transfer-controls>
    <button data-coral-transfer-right>→</button>
    <button data-coral-transfer-left>←</button>
  </div>
  <div data-coral-transfer-target>
    <div data-coral-transfer-item>Item 2</div>
  </div>
</div>`,
    props: [
      { name: 'data-searchable', type: 'boolean', default: 'true', description: 'Enable search in lists' },
    ],
    preview: TransferListPreview,
  },
  {
    id: 'password-input',
    name: 'PasswordInput',
    description: 'Password input with show/hide toggle.',
    usage: `<div data-coral-password-input>
  <input data-coral-password-field type="password" />
  <button data-coral-password-toggle>👁</button>
</div>`,
    props: [
      { name: 'data-visible', type: 'boolean', default: 'false', description: 'Show password' },
    ],
    preview: PasswordInputPreview,
  },
  {
    id: 'zip-code-input',
    name: 'ZipCodeInput',
    description: 'ZIP code input with format validation.',
    usage: `<input data-coral-zip-input
  data-format="US"
  placeholder="12345" />`,
    props: [
      { name: 'data-format', type: '"US" | "CA" | "UK"', default: '"US"', description: 'ZIP format' },
      { name: 'data-lookup', type: 'boolean', default: 'false', description: 'Enable city/state lookup' },
    ],
    preview: ZipCodeInputPreview,
  },
  {
    id: 'form-progress',
    name: 'FormProgress',
    description: 'Progress indicator for form completion.',
    usage: `<div data-coral-form-progress data-value="60">
  <div data-coral-form-progress-bar></div>
  <span data-coral-form-progress-label>60% complete</span>
</div>`,
    props: [
      { name: 'data-value', type: 'number', default: '0', description: 'Completion percentage' },
      { name: 'data-show-label', type: 'boolean', default: 'true', description: 'Show percentage label' },
    ],
    preview: FormProgressPreview,
  },
  {
    id: 'quantity-input',
    name: 'QuantityInput',
    description: 'Quantity selector with min/max limits.',
    usage: `<div data-coral-quantity-input data-min="1" data-max="10">
  <button data-coral-quantity-minus>-</button>
  <input data-coral-quantity-field type="number" value="1" />
  <button data-coral-quantity-plus>+</button>
</div>`,
    props: [
      { name: 'data-min', type: 'number', default: '0', description: 'Minimum value' },
      { name: 'data-max', type: 'number', default: '99', description: 'Maximum value' },
    ],
    preview: QuantityInputPreview,
  },
  {
    id: 'percentage-input',
    name: 'PercentageInput',
    description: 'Input for percentage values with slider.',
    usage: `<div data-coral-percentage-input>
  <input data-coral-percentage-field type="number" min="0" max="100" value="50" />
  <span data-coral-percentage-symbol>%</span>
</div>`,
    props: [
      { name: 'data-min', type: 'number', default: '0', description: 'Minimum percentage' },
      { name: 'data-max', type: 'number', default: '100', description: 'Maximum percentage' },
    ],
    preview: PercentageInputPreview,
  },
  {
    id: 'unit-input',
    name: 'UnitInput',
    description: 'Number input with unit selector.',
    usage: `<div data-coral-unit-input>
  <input data-coral-unit-field type="number" value="100" />
  <select data-coral-unit-select>
    <option>px</option>
    <option>%</option>
    <option>rem</option>
  </select>
</div>`,
    props: [
      { name: 'data-units', type: 'string[]', default: '["px", "%", "rem"]', description: 'Available units' },
    ],
    preview: UnitInputPreview,
  },
  {
    id: 'social-input',
    name: 'SocialInput',
    description: 'Social media username input.',
    usage: `<div data-coral-social-input data-platform="twitter">
  <span data-coral-social-prefix>@</span>
  <input data-coral-social-field placeholder="username" />
</div>`,
    props: [
      { name: 'data-platform', type: '"twitter" | "instagram" | "github"', default: '"twitter"', description: 'Social platform' },
    ],
    preview: SocialInputPreview,
  },
  {
    id: 'hex-input',
    name: 'HexInput',
    description: 'Hex color code input with validation.',
    usage: `<div data-coral-hex-input>
  <span data-coral-hex-prefix>#</span>
  <input data-coral-hex-field maxlength="6" placeholder="000000" />
  <div data-coral-hex-preview></div>
</div>`,
    props: [
      { name: 'data-show-preview', type: 'boolean', default: 'true', description: 'Show color preview' },
    ],
    preview: HexInputPreview,
  },
  {
    id: 'char-counter',
    name: 'CharCounter',
    description: 'Textarea with character count.',
    usage: `<div data-coral-char-counter data-max="280">
  <textarea data-coral-char-textarea></textarea>
  <span data-coral-char-count>0/280</span>
</div>`,
    props: [
      { name: 'data-max', type: 'number', default: '280', description: 'Maximum characters' },
      { name: 'data-warn-at', type: 'number', default: '20', description: 'Warn when remaining' },
    ],
    preview: CharCounterPreview,
  },
  {
    id: 'form-array',
    name: 'FormArray',
    description: 'Dynamic form field array with add/remove.',
    usage: `<div data-coral-form-array>
  <div data-coral-form-array-item>
    <input data-coral-input placeholder="Item 1" />
    <button data-coral-form-array-remove>×</button>
  </div>
  <button data-coral-form-array-add>+ Add Item</button>
</div>`,
    props: [
      { name: 'data-min', type: 'number', default: '1', description: 'Minimum items' },
      { name: 'data-max', type: 'number', default: '10', description: 'Maximum items' },
    ],
    preview: FormArrayPreview,
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
  const [color, setColor] = useState('hsl(var(--primary))')
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

function RangeSliderPreview() {
  const [range] = useState({ min: 25, max: 75 })

  return (
    <div className="w-full max-w-sm space-y-6">
      <div>
        <div className="flex justify-between mb-2">
          <span className="text-sm text-muted-foreground">Price Range</span>
          <span className="text-sm font-medium">${range.min} - ${range.max}</span>
        </div>
        <div data-coral-range-slider>
          <div data-coral-range-slider-track>
            <div
              data-coral-range-slider-range
              style={{ left: `${range.min}%`, right: `${100 - range.max}%` }}
            />
          </div>
          <div
            data-coral-range-slider-start
            style={{ left: `${range.min}%` }}
            tabIndex={0}
            role="slider"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={range.min}
          />
          <div
            data-coral-range-slider-end
            style={{ right: `${100 - range.max}%` }}
            tabIndex={0}
            role="slider"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={range.max}
          />
        </div>
      </div>
    </div>
  )
}

function DatePickerPreview() {
  const [date] = useState<Date | null>(null)

  return (
    <div className="w-full max-w-sm">
      <label data-coral-label>Select Date</label>
      <div data-coral-date-picker>
        <input
          data-coral-date-picker-input
          type="text"
          placeholder="MM/DD/YYYY"
          value={date?.toLocaleDateString() || ''}
          readOnly
        />
        <button data-coral-date-picker-trigger aria-label="Open calendar">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

function TimePickerPreview() {
  const [time, setTime] = useState('12:00 PM')

  return (
    <div className="w-full max-w-sm">
      <label data-coral-label>Select Time</label>
      <div data-coral-time-picker>
        <input
          data-coral-time-picker-input
          type="text"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder="HH:MM AM/PM"
        />
        <button data-coral-time-picker-trigger aria-label="Open time picker">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

function SearchInputPreview() {
  const [query, setQuery] = useState('')

  return (
    <div className="w-full max-w-sm">
      <label data-coral-label>Search</label>
      <div data-coral-search-input>
        <input
          data-coral-search-input-field
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button data-coral-search-input-icon aria-label="Search">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        {query && (
          <button data-coral-search-input-clear onClick={() => setQuery('')} aria-label="Clear search">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

function TagInputPreview() {
  const [tags, setTags] = useState(['React', 'TypeScript', 'CSS'])
  const [input, setInput] = useState('')

  const addTag = () => {
    if (input.trim() && !tags.includes(input.trim())) {
      setTags([...tags, input.trim()])
      setInput('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  return (
    <div className="w-full max-w-sm">
      <label data-coral-label>Tags</label>
      <div data-coral-tag-input>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag) => (
            <span
              key={tag}
              data-coral-tag
              className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded text-sm"
            >
              {tag}
              <button onClick={() => removeTag(tag)} aria-label={`Remove ${tag}`}>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          ))}
        </div>
        <input
          data-coral-tag-input-field
          type="text"
          placeholder="Add tag..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTag()}
        />
      </div>
    </div>
  )
}

function ComboboxPreview() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const [input, setInput] = useState('')
  const countries = ['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Japan', 'Brazil']

  const filtered = countries.filter(c => c.toLowerCase().includes(input.toLowerCase()))

  return (
    <div className="w-full max-w-sm">
      <label data-coral-label>Country</label>
      <div data-coral-combobox data-open={open || undefined}>
        <input
          data-coral-combobox-input
          type="text"
          placeholder="Search countries..."
          value={input}
          onChange={(e) => { setInput(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
        />
        {open && (
          <div data-coral-combobox-list>
            {filtered.length > 0 ? (
              filtered.map((country) => (
                <div
                  key={country}
                  data-coral-combobox-option
                  data-selected={value === country || undefined}
                  onClick={() => { setValue(country); setInput(country); setOpen(false) }}
                >
                  {country}
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-sm text-muted-foreground">No results found</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function AutocompletePreview() {
  const [input, setInput] = useState('')
  const colors = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Pink', 'Brown']

  const filtered = colors.filter(c => c.toLowerCase().includes(input.toLowerCase()))

  return (
    <div className="w-full max-w-sm">
      <label data-coral-label>Favorite Color</label>
      <div data-coral-autocomplete>
        <input
          data-coral-autocomplete-input
          type="text"
          placeholder="Type a color..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {input && filtered.length > 0 && (
          <div data-coral-autocomplete-list>
            {filtered.slice(0, 3).map((color) => (
              <span
                key={color}
                data-coral-autocomplete-option
                onClick={() => setInput(color)}
              >
                {color.replace(new RegExp(`(${input})`, 'gi'), '<strong>$1</strong>')}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function PhoneInputPreview() {
  const [country, setCountry] = useState('US')
  const [phone, setPhone] = useState('')

  return (
    <div className="w-full max-w-sm">
      <label data-coral-label>Phone Number</label>
      <div data-coral-phone-input>
        <select
          data-coral-phone-input-country
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="bg-background border border-border rounded-l-lg px-3 py-2 text-sm"
        >
          <option value="US">🇺🇸 +1</option>
          <option value="UK">🇬🇧 +44</option>
          <option value="CA">🇨🇦 +1</option>
          <option value="DE">🇩🇪 +49</option>
        </select>
        <input
          data-coral-phone-input-field
          type="tel"
          placeholder="123-456-7890"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border-l-0 rounded-l-none"
        />
      </div>
    </div>
  )
}

function CreditCardInputPreview() {
  const [cardNumber, setCardNumber] = useState('')
  const [cardType, setCardType] = useState<'visa' | 'mastercard' | 'amex' | 'unknown'>('unknown')

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  return (
    <div className="w-full max-w-sm">
      <label data-coral-label>Credit Card Number</label>
      <div data-coral-credit-card-input>
        <input
          data-coral-credit-card-input-field
          type="text"
          placeholder="1234 5678 9012 3456"
          value={cardNumber}
          onChange={(e) => {
            const formatted = formatCardNumber(e.target.value)
            if (formatted.replace(/\s/g, '').length <= 16) {
              setCardNumber(formatted)
              if (formatted.startsWith('4')) setCardType('visa')
              else if (formatted.startsWith('5') || formatted.startsWith('2')) setCardType('mastercard')
              else if (formatted.startsWith('3')) setCardType('amex')
              else setCardType('unknown')
            }
          }}
        />
        <div data-coral-credit-card-icons>
          <span data-coral-credit-card-icon data-type={cardType}>
            {cardType === 'visa' && '💳'}
            {cardType === 'mastercard' && '💳'}
            {cardType === 'amex' && '💳'}
            {cardType === 'unknown' && '💳'}
          </span>
        </div>
      </div>
    </div>
  )
}

function SignaturePadPreview() {
  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef) return
    setIsDrawing(true)
    const rect = canvasRef.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const ctx = canvasRef.getContext('2d')
    if (ctx) {
      ctx.beginPath()
      ctx.moveTo(x, y)
    }
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef) return
    const rect = canvasRef.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const ctx = canvasRef.getContext('2d')
    if (ctx) {
      ctx.lineTo(x, y)
      ctx.stroke()
    }
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clear = () => {
    if (!canvasRef) return
    const ctx = canvasRef.getContext('2d')
    if (ctx) {
      ctx.clearRect(0, 0, canvasRef.width, canvasRef.height)
    }
  }

  return (
    <div className="w-full max-w-sm">
      <label data-coral-label>Signature</label>
      <div data-coral-signature-pad>
        <canvas
          data-coral-signature-pad-canvas
          ref={setCanvasRef}
          width={400}
          height={200}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="border border-border rounded-lg bg-card"
        />
        <button data-coral-signature-pad-clear onClick={clear} className="mt-2">
          Clear
        </button>
      </div>
    </div>
  )
}

function LabelPreview() {
  return (
    <div className="space-y-4 w-full max-w-sm">
      <div>
        <label data-coral-label>Default Label</label>
        <input data-coral-input type="text" placeholder="Enter text" />
      </div>
      <div>
        <label data-coral-label data-required>Required Field</label>
        <input data-coral-input type="email" placeholder="Email address" />
      </div>
      <div>
        <label data-coral-label data-disabled>Disabled Label</label>
        <input data-coral-input type="text" placeholder="Disabled field" disabled />
      </div>
    </div>
  )
}

function FieldsetPreview() {
  return (
    <div className="space-y-6 w-full max-w-sm">
      <fieldset data-coral-fieldset className="space-y-3">
        <legend data-coral-legend className="text-sm font-medium">Personal Information</legend>
        <input data-coral-input type="text" placeholder="First Name" />
        <input data-coral-input type="text" placeholder="Last Name" />
        <input data-coral-input type="email" placeholder="Email" />
      </fieldset>
      <fieldset data-coral-fieldset data-variant="card" className="space-y-3 p-4 rounded-lg border border-border">
        <legend data-coral-legend className="text-sm font-medium">Account Details</legend>
        <input data-coral-input type="text" placeholder="Username" />
        <input data-coral-input type="password" placeholder="Password" />
      </fieldset>
    </div>
  )
}

function FormLayoutPreview() {
  return (
    <div className="w-full max-w-2xl">
      <form data-coral-form-layout className="space-y-4">
        <div data-coral-form-row className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input data-coral-input type="text" placeholder="First Name" />
          <input data-coral-input type="text" placeholder="Last Name" />
        </div>
        <div data-coral-form-row>
          <input data-coral-input type="email" placeholder="Email Address" />
        </div>
        <div data-coral-form-row className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input data-coral-input type="text" placeholder="City" />
          <input data-coral-input type="text" placeholder="State" />
          <input data-coral-input type="text" placeholder="ZIP" />
        </div>
      </form>
    </div>
  )
}

function MultiSelectPreview() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string[]>(['Option 1', 'Option 3'])
  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5']

  const toggleOption = (option: string) => {
    setSelected(prev =>
      prev.includes(option)
        ? prev.filter(o => o !== option)
        : [...prev, option]
    )
  }

  return (
    <div className="w-full max-w-sm">
      <label data-coral-label>Skills</label>
      <div data-coral-multi-select data-open={open || undefined}>
        <button data-coral-multi-select-trigger onClick={() => setOpen(!open)} className="w-full">
          <span>{selected.length > 0 ? `${selected.length} selected` : 'Select options'}</span>
          <svg data-coral-select-icon className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {open && (
          <div data-coral-multi-select-content className="mt-1 p-2 border border-border rounded-lg bg-card">
            {options.map((option) => (
              <label
                key={option}
                data-coral-multi-select-option
                className="flex items-center gap-2 p-2 hover:bg-muted rounded cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(option)}
                  onChange={() => toggleOption(option)}
                  className="rounded"
                />
                <span className="text-sm">{option}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function ToggleButtonPreview() {
  const [selected, setSelected] = useState<string[]>(['Option 1'])

  const options = ['Option 1', 'Option 2', 'Option 3']

  const toggleOption = (option: string) => {
    setSelected(prev =>
      prev.includes(option)
        ? prev.filter(o => o !== option)
        : [...prev, option]
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm text-muted-foreground mb-2 block">Single Select</label>
        <div data-coral-toggle-button-group className="flex gap-2">
          {options.map((option) => (
            <button
              key={option}
              data-coral-toggle-button
              data-selected={selected.includes(option) || undefined}
              onClick={() => toggleOption(option)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                selected.includes(option)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="text-sm text-muted-foreground mb-2 block">Multi Select</label>
        <div data-coral-toggle-button-group data-multiple className="flex gap-2">
          {['Option A', 'Option B', 'Option C'].map((option) => (
            <button
              key={option}
              data-coral-toggle-button
              data-selected={selected.includes(option) || undefined}
              onClick={() => toggleOption(option)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                selected.includes(option)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function FormWizardPreview() {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 3

  return (
    <div className="w-full max-w-md">
      <div data-coral-form-wizard>
        <div data-coral-form-wizard-steps className="flex items-center justify-between mb-6">
          {Array.from({ length: totalSteps }).map((_, i) => {
            const step = i + 1
            return (
              <div key={step} className="flex items-center flex-1">
                <div
                  data-coral-form-wizard-step
                  data-active={currentStep === step || undefined}
                  data-completed={currentStep > step || undefined}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    currentStep > step
                      ? 'bg-emerald-500 text-white'
                      : currentStep === step
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {step}
                </div>
                {step < totalSteps && (
                  <div
                    className={`h-1 flex-1 mx-2 transition-colors ${
                      currentStep > step ? 'bg-emerald-500' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            )
          })}
        </div>
        <div data-coral-form-wizard-content className="space-y-4">
          {currentStep === 1 && (
            <div className="space-y-3">
              <h3 className="font-semibold">Personal Information</h3>
              <input data-coral-input type="text" placeholder="Full Name" />
              <input data-coral-input type="email" placeholder="Email" />
            </div>
          )}
          {currentStep === 2 && (
            <div className="space-y-3">
              <h3 className="font-semibold">Account Details</h3>
              <input data-coral-input type="text" placeholder="Username" />
              <input data-coral-input type="password" placeholder="Password" />
            </div>
          )}
          {currentStep === 3 && (
            <div className="space-y-3">
              <h3 className="font-semibold">Confirmation</h3>
              <p className="text-sm text-muted-foreground">Review your information and click submit.</p>
            </div>
          )}
          <div className="flex gap-2 pt-4">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="px-4 py-2 bg-muted rounded-lg text-sm disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
              disabled={currentStep === totalSteps}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function CaptchaPreview() {
  const [code, setCode] = useState('A7B3K9')
  const [input, setInput] = useState('')

  const refresh = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let newCode = ''
    for (let i = 0; i < 6; i++) {
      newCode += chars[Math.floor(Math.random() * chars.length)]
    }
    setCode(newCode)
  }

  return (
    <div className="w-full max-w-sm space-y-4">
      <div data-coral-captcha>
        <div data-coral-captcha-challenge className="flex items-center gap-4">
          <div className="w-32 h-16 border border-border rounded-lg bg-card flex items-center justify-center font-mono text-lg tracking-wider">
            {code}
          </div>
          <button
            data-coral-captcha-refresh
            onClick={refresh}
            className="p-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors"
            aria-label="Refresh CAPTCHA"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>
      <div>
        <label data-coral-label>Enter the code above</label>
        <input
          data-coral-captcha-input
          type="text"
          placeholder="Enter CAPTCHA"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full"
        />
      </div>
    </div>
  )
}

function ToggleGroupPreview() {
  const [selected, setSelected] = useState('md')
  const sizes = [
    { value: 'sm', label: 'Small' },
    { value: 'md', label: 'Medium' },
    { value: 'lg', label: 'Large' },
  ]

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm text-muted-foreground mb-2 block">Size</label>
        <div data-coral-toggle-group className="flex gap-2">
          {sizes.map((size) => (
            <button
              key={size.value}
              data-coral-toggle-group-item
              data-selected={selected === size.value || undefined}
              onClick={() => setSelected(size.value)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                selected === size.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {size.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="text-sm text-muted-foreground mb-2 block">View</label>
        <div data-coral-toggle-group data-variant="outline" className="flex gap-2">
          {['List', 'Grid', 'Compact'].map((view) => (
            <button
              key={view}
              data-coral-toggle-group-item
              onClick={() => {}}
              className="px-4 py-2 rounded-lg text-sm transition-colors border border-border hover:bg-muted"
            >
              {view}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function MultiCheckboxPreview() {
  const [checked, setChecked] = useState<boolean[]>([true, false, false])

  const options = ['Option 1', 'Option 2', 'Option 3']

  const toggleAll = () => {
    const allChecked = checked.every(c => c)
    setChecked(checked.map(() => !allChecked))
  }

  const toggleItem = (index: number) => {
    const newChecked = [...checked]
    newChecked[index] = !newChecked[index]
    setChecked(newChecked)
  }

  return (
    <div className="space-y-3 w-full max-w-sm">
      <label className="text-sm text-muted-foreground mb-2 block">Select Options</label>
      <div data-coral-multi-checkbox className="space-y-2">
        <button
          onClick={toggleAll}
          className="text-sm text-primary hover:underline"
        >
          {checked.every(c => c) ? 'Deselect All' : 'Select All'}
        </button>
        {options.map((option, i) => (
          <label key={i} className="flex items-center gap-3 cursor-pointer">
            <div
              data-coral-checkbox
              data-checked={checked[i] || undefined}
              tabIndex={0}
              role="checkbox"
              aria-checked={checked[i]}
              onClick={() => toggleItem(i)}
            />
            <span className="text-sm text-foreground">{option}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

function FormValidationPreview() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="w-full max-w-sm space-y-4">
      <div data-coral-form-validation>
        <div data-coral-form-field data-invalid={!email.includes('@') && email.length > 0 || undefined}>
          <label data-coral-label>Email</label>
          <input
            data-coral-input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {email.length > 0 && !email.includes('@') && (
            <div data-coral-form-error className="flex items-center gap-2 text-xs text-coral-500 mt-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Please enter a valid email address
            </div>
          )}
        </div>
      </div>
      <div data-coral-form-validation>
        <div data-coral-form-field data-invalid={password.length < 8 && password.length > 0 || undefined}>
          <label data-coral-label>Password</label>
          <input
            data-coral-input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {password.length > 0 && password.length < 8 && (
            <div data-coral-form-error className="flex items-center gap-2 text-xs text-coral-500 mt-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Password must be at least 8 characters
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ImageUploadPreview() {
  const [preview, setPreview] = useState<string | null>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setPreview(null)
  }

  return (
    <div className="w-full max-w-sm">
      <label data-coral-label>Upload Image</label>
      <div data-coral-image-upload>
        {preview ? (
          <div data-coral-image-upload-preview className="relative">
            <img data-coral-image-upload-img src={preview} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
            <button
              data-coral-image-upload-remove
              onClick={removeImage}
              className="absolute top-2 right-2 w-8 h-8 bg-background/90 hover:bg-background rounded-full flex items-center justify-center transition-colors"
              aria-label="Remove image"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <label
            data-coral-image-upload-placeholder
            className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
          >
            <svg className="w-12 h-12 text-muted-foreground mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span className="text-sm text-muted-foreground">Click to upload or drag and drop</span>
            <span className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</span>
            <input data-coral-image-upload-input type="file" accept="image/*" onChange={handleFile} className="hidden" />
          </label>
        )}
      </div>
    </div>
  )
}

function QRCodeInputPreview() {
  const [mode, setMode] = useState<'scan' | 'generate'>('scan')

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => setMode('scan')}
          className={`px-4 py-2 rounded-lg text-sm transition-colors ${
            mode === 'scan' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
          }`}
        >
          Scan
        </button>
        <button
          onClick={() => setMode('generate')}
          className={`px-4 py-2 rounded-lg text-sm transition-colors ${
            mode === 'generate' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
          }`}
        >
          Generate
        </button>
      </div>
      {mode === 'scan' ? (
        <div data-coral-qr-code-input data-mode="scan">
          <button data-coral-qr-code-scan className="w-full px-4 py-12 border-2 border-dashed border-border rounded-lg hover:bg-muted/50 transition-colors flex flex-col items-center gap-2">
            <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span className="text-sm text-muted-foreground">Click to scan QR code</span>
          </button>
        </div>
      ) : (
        <div data-coral-qr-code-input data-mode="generate" className="space-y-4">
          <input
            data-coral-qr-code-input
            type="text"
            placeholder="Enter text to generate QR code"
            className="w-full px-3 py-2 border border-border rounded-lg"
          />
          <div className="w-48 h-48 mx-auto border border-border rounded-lg flex items-center justify-center bg-muted/20">
            <svg className="w-32 h-32 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M12 12h-.01M12 12v4.01m0 0h4.01M12 20h4.01M12 20h-.01M12 20v-4.01m0 0h4.01M12 16h.01M12 16v4.01m0 0h4.01M12 16h-.01M8 12h.01M8 12v4.01m0 0h4.01M8 20h.01M8 20v-4.01m0 0h4.01M8 20h-.01M16 12h.01M16 12v4.01m0 0h4.01M16 20h.01M16 20v-4.01m0 0h4.01M16 20h-.01" />
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}

function PasswordStrengthPreview() {
  const [password, setPassword] = useState('')
  const [visible, setVisible] = useState(false)

  const getStrength = (pwd: string) => {
    if (pwd.length < 6) return 'weak'
    if (pwd.length < 10 || !/[A-Z]/.test(pwd) || !/[0-9]/.test(pwd)) return 'medium'
    return 'strong'
  }

  const strength = getStrength(password)
  const strengthColors = {
    weak: 'bg-red-500',
    medium: 'bg-yellow-500',
    strong: 'bg-emerald-500'
  }

  return (
    <div className="w-full max-w-sm">
      <label data-coral-label>Password</label>
      <div data-coral-password-strength>
        <div className="relative">
          <input
            data-coral-password-input
            type={visible ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full pr-10"
          />
          <button
            type="button"
            onClick={() => setVisible(!visible)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {visible ? '🙈' : '👁'}
          </button>
        </div>
        {password && (
          <>
            <div data-coral-password-meter data-strength={strength} className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
              <div
                data-coral-password-bar
                className={`h-full transition-all ${strengthColors[strength]}`}
                style={{ width: strength === 'weak' ? '33%' : strength === 'medium' ? '66%' : '100%' }}
              />
            </div>
            <span data-coral-password-label className="text-xs text-muted-foreground mt-1 capitalize">{strength}</span>
          </>
        )}
      </div>
    </div>
  )
}

function MaskedInputPreview() {
  const [phone, setPhone] = useState('')
  const [ssn, setSsn] = useState('')

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 10)
    if (digits.length >= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
    if (digits.length >= 3) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
    return digits
  }

  const formatSSN = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 9)
    if (digits.length >= 5) return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`
    if (digits.length >= 3) return `${digits.slice(0, 3)}-${digits.slice(3)}`
    return digits
  }

  return (
    <div className="w-full max-w-sm space-y-4">
      <div>
        <label data-coral-label>Phone Number</label>
        <input
          data-coral-masked-input
          data-mask="phone"
          type="text"
          placeholder="(123) 456-7890"
          value={phone}
          onChange={(e) => setPhone(formatPhone(e.target.value))}
        />
      </div>
      <div>
        <label data-coral-label>SSN</label>
        <input
          data-coral-masked-input
          data-mask="ssn"
          type="text"
          placeholder="123-45-6789"
          value={ssn}
          onChange={(e) => setSsn(formatSSN(e.target.value))}
        />
      </div>
    </div>
  )
}

function CurrencyInputPreview() {
  const [value, setValue] = useState('1234.56')

  const formatCurrency = (input: string) => {
    const num = parseFloat(input.replace(/[^0-9.]/g, ''))
    if (isNaN(num)) return ''
    return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  return (
    <div className="w-full max-w-sm space-y-4">
      <div>
        <label data-coral-label>Amount (USD)</label>
        <div data-coral-currency-input className="flex">
          <span data-coral-currency-symbol className="flex items-center px-3 bg-muted border border-r-0 border-border rounded-l-lg text-muted-foreground">$</span>
          <input
            data-coral-currency-field
            type="text"
            value={value}
            onChange={(e) => setValue(formatCurrency(e.target.value))}
            className="rounded-l-none"
          />
        </div>
      </div>
      <div>
        <label data-coral-label>Amount (EUR)</label>
        <div data-coral-currency-input className="flex">
          <span data-coral-currency-symbol className="flex items-center px-3 bg-muted border border-r-0 border-border rounded-l-lg text-muted-foreground">€</span>
          <input
            data-coral-currency-field
            type="text"
            placeholder="0.00"
            className="rounded-l-none"
          />
        </div>
      </div>
    </div>
  )
}

function DateRangePickerPreview() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  return (
    <div className="w-full max-w-md">
      <label data-coral-label>Select Date Range</label>
      <div data-coral-date-range-picker className="flex items-center gap-2">
        <input
          data-coral-date-range-start
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="flex-1"
        />
        <span data-coral-date-range-separator className="text-muted-foreground">to</span>
        <input
          data-coral-date-range-end
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="flex-1"
        />
      </div>
    </div>
  )
}

function OTPInputPreview() {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)
      if (value && index < 5) {
        const nextInput = document.querySelector(`[data-otp-index="${index + 1}"]`) as HTMLInputElement
        nextInput?.focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.querySelector(`[data-otp-index="${index - 1}"]`) as HTMLInputElement
      prevInput?.focus()
    }
  }

  return (
    <div className="w-full max-w-sm">
      <label data-coral-label>Enter OTP Code</label>
      <div data-coral-otp-input data-length="6" className="flex gap-2 mt-2">
        {otp.map((digit, i) => (
          <input
            key={i}
            data-coral-otp-field
            data-otp-index={i}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className="w-12 h-12 text-center text-lg font-semibold border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        ))}
      </div>
    </div>
  )
}

function RichTextEditorPreview() {
  const [content, setContent] = useState('<p>Hello <strong>World</strong>!</p>')

  const execCommand = (command: string) => {
    document.execCommand(command, false)
  }

  return (
    <div className="w-full max-w-lg">
      <label data-coral-label>Content</label>
      <div data-coral-rich-text-editor className="border border-border rounded-lg overflow-hidden">
        <div data-coral-editor-toolbar className="flex gap-1 p-2 bg-muted border-b border-border">
          <button data-coral-editor-bold onClick={() => execCommand('bold')} className="p-2 hover:bg-background rounded font-bold">B</button>
          <button data-coral-editor-italic onClick={() => execCommand('italic')} className="p-2 hover:bg-background rounded italic">I</button>
          <button data-coral-editor-underline onClick={() => execCommand('underline')} className="p-2 hover:bg-background rounded underline">U</button>
          <div className="w-px bg-border mx-1" />
          <button onClick={() => execCommand('insertUnorderedList')} className="p-2 hover:bg-background rounded">• List</button>
          <button onClick={() => execCommand('insertOrderedList')} className="p-2 hover:bg-background rounded">1. List</button>
        </div>
        <div
          data-coral-editor-content
          contentEditable
          dangerouslySetInnerHTML={{ __html: content }}
          onInput={(e) => setContent(e.currentTarget.innerHTML)}
          className="p-4 min-h-[150px] focus:outline-none"
        />
      </div>
    </div>
  )
}

function MentionsInputPreview() {
  const [text, setText] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const users = ['john_doe', 'jane_smith', 'bob_wilson', 'alice_jones']

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setText(value)
    setShowSuggestions(value.includes('@') && value.endsWith('@'))
  }

  const insertMention = (user: string) => {
    setText(text.slice(0, -1) + `@${user} `)
    setShowSuggestions(false)
  }

  return (
    <div className="w-full max-w-md">
      <label data-coral-label>Comment</label>
      <div data-coral-mentions-input className="relative">
        <textarea
          data-coral-mentions-field
          placeholder="Type @ to mention someone..."
          value={text}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-border rounded-lg resize-none"
        />
        {showSuggestions && (
          <div data-coral-mentions-dropdown className="absolute left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-10">
            {users.map(user => (
              <div
                key={user}
                data-coral-mentions-option
                onClick={() => insertMention(user)}
                className="px-3 py-2 hover:bg-muted cursor-pointer"
              >
                @{user}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function AddressInputPreview() {
  return (
    <div className="w-full max-w-md">
      <label data-coral-label>Shipping Address</label>
      <div data-coral-address-input className="space-y-3">
        <input data-coral-address-street placeholder="Street address" className="w-full" />
        <input data-coral-address-street2 placeholder="Apt, suite, etc. (optional)" className="w-full" />
        <div className="grid grid-cols-2 gap-3">
          <input data-coral-address-city placeholder="City" />
          <input data-coral-address-state placeholder="State" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input data-coral-address-zip placeholder="ZIP Code" />
          <select data-coral-address-country className="px-3 py-2 border border-border rounded-lg bg-background">
            <option>United States</option>
            <option>Canada</option>
            <option>United Kingdom</option>
          </select>
        </div>
      </div>
    </div>
  )
}

function EmailInputPreview() {
  const [email, setEmail] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com']

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    setShowSuggestions(value.includes('@') && !value.split('@')[1]?.includes('.'))
  }

  const selectDomain = (domain: string) => {
    const username = email.split('@')[0]
    setEmail(`${username}@${domain}`)
    setShowSuggestions(false)
  }

  return (
    <div className="w-full max-w-sm">
      <label data-coral-label>Email Address</label>
      <div data-coral-email-input className="relative">
        <input
          data-coral-email-field
          type="email"
          placeholder="name@company.com"
          value={email}
          onChange={handleChange}
          className="w-full"
        />
        {showSuggestions && (
          <div data-coral-email-suggestions className="absolute left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-10">
            {domains.map(domain => (
              <div
                key={domain}
                onClick={() => selectDomain(domain)}
                className="px-3 py-2 hover:bg-muted cursor-pointer text-sm"
              >
                {email.split('@')[0]}@{domain}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function URLInputPreview() {
  const [url, setUrl] = useState('')

  return (
    <div className="w-full max-w-sm space-y-4">
      <div>
        <label data-coral-label>Website URL</label>
        <div data-coral-url-input className="flex">
          <span data-coral-url-prefix className="flex items-center px-3 bg-muted border border-r-0 border-border rounded-l-lg text-muted-foreground text-sm">https://</span>
          <input
            data-coral-url-field
            type="text"
            placeholder="example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="rounded-l-none"
          />
        </div>
      </div>
    </div>
  )
}

function InlineEditPreview() {
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState('Click to edit this text')
  const [tempText, setTempText] = useState(text)

  const save = () => {
    setText(tempText)
    setEditing(false)
  }

  const cancel = () => {
    setTempText(text)
    setEditing(false)
  }

  return (
    <div className="w-full max-w-sm">
      <label data-coral-label>Editable Title</label>
      <div data-coral-inline-edit data-editing={editing || undefined} className="mt-2">
        {editing ? (
          <div className="flex items-center gap-2">
            <input
              data-coral-inline-input
              type="text"
              value={tempText}
              onChange={(e) => setTempText(e.target.value)}
              autoFocus
              className="flex-1"
            />
            <button data-coral-inline-save onClick={save} className="p-2 text-emerald-500 hover:bg-emerald-500/10 rounded">✓</button>
            <button data-coral-inline-cancel onClick={cancel} className="p-2 text-red-500 hover:bg-red-500/10 rounded">✕</button>
          </div>
        ) : (
          <span
            data-coral-inline-text
            onClick={() => { setEditing(true); setTempText(text) }}
            className="cursor-pointer hover:bg-muted px-2 py-1 rounded inline-block"
          >
            {text}
          </span>
        )}
      </div>
    </div>
  )
}

function TreeSelectPreview() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState('')
  const [expanded, setExpanded] = useState<string[]>(['electronics'])

  const tree = [
    { id: 'electronics', label: 'Electronics', children: [
      { id: 'phones', label: 'Phones' },
      { id: 'laptops', label: 'Laptops' },
    ]},
    { id: 'clothing', label: 'Clothing', children: [
      { id: 'mens', label: "Men's" },
      { id: 'womens', label: "Women's" },
    ]},
  ]

  const toggleExpand = (id: string) => {
    setExpanded(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  return (
    <div className="w-full max-w-sm">
      <label data-coral-label>Category</label>
      <div data-coral-tree-select data-open={open || undefined}>
        <button data-coral-tree-select-trigger onClick={() => setOpen(!open)} className="w-full flex justify-between items-center">
          <span>{selected || 'Select category'}</span>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {open && (
          <div data-coral-tree-select-content className="mt-1 p-2 border border-border rounded-lg bg-card">
            {tree.map(parent => (
              <div key={parent.id}>
                <div
                  data-coral-tree-node
                  data-has-children
                  onClick={() => toggleExpand(parent.id)}
                  className="flex items-center gap-2 p-2 hover:bg-muted rounded cursor-pointer"
                >
                  <span className="text-xs">{expanded.includes(parent.id) ? '▼' : '▶'}</span>
                  {parent.label}
                </div>
                {expanded.includes(parent.id) && (
                  <div data-coral-tree-children className="ml-4">
                    {parent.children.map(child => (
                      <div
                        key={child.id}
                        data-coral-tree-node
                        onClick={() => { setSelected(child.label); setOpen(false) }}
                        className="p-2 hover:bg-muted rounded cursor-pointer"
                      >
                        {child.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function CascadeSelectPreview() {
  const [country, setCountry] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')

  const data: Record<string, Record<string, string[]>> = {
    'USA': { 'California': ['Los Angeles', 'San Francisco'], 'New York': ['New York City', 'Buffalo'] },
    'Canada': { 'Ontario': ['Toronto', 'Ottawa'], 'Quebec': ['Montreal', 'Quebec City'] },
  }

  return (
    <div className="w-full max-w-md">
      <label data-coral-label>Location</label>
      <div data-coral-cascade-select className="grid grid-cols-3 gap-2 mt-2">
        <select
          data-coral-cascade-level="1"
          value={country}
          onChange={(e) => { setCountry(e.target.value); setState(''); setCity('') }}
          className="px-3 py-2 border border-border rounded-lg bg-background"
        >
          <option value="">Country</option>
          {Object.keys(data).map(c => <option key={c}>{c}</option>)}
        </select>
        <select
          data-coral-cascade-level="2"
          value={state}
          onChange={(e) => { setState(e.target.value); setCity('') }}
          disabled={!country}
          className="px-3 py-2 border border-border rounded-lg bg-background disabled:opacity-50"
        >
          <option value="">State</option>
          {country && Object.keys(data[country] || {}).map(s => <option key={s}>{s}</option>)}
        </select>
        <select
          data-coral-cascade-level="3"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={!state}
          className="px-3 py-2 border border-border rounded-lg bg-background disabled:opacity-50"
        >
          <option value="">City</option>
          {state && (data[country]?.[state] || []).map(c => <option key={c}>{c}</option>)}
        </select>
      </div>
    </div>
  )
}

function TransferListPreview() {
  const [source, setSource] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4'])
  const [target, setTarget] = useState(['Item 5'])
  const [selectedSource, setSelectedSource] = useState<string[]>([])
  const [selectedTarget, setSelectedTarget] = useState<string[]>([])

  const moveRight = () => {
    setTarget([...target, ...selectedSource])
    setSource(source.filter(i => !selectedSource.includes(i)))
    setSelectedSource([])
  }

  const moveLeft = () => {
    setSource([...source, ...selectedTarget])
    setTarget(target.filter(i => !selectedTarget.includes(i)))
    setSelectedTarget([])
  }

  const toggleSource = (item: string) => {
    setSelectedSource(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item])
  }

  const toggleTarget = (item: string) => {
    setSelectedTarget(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item])
  }

  return (
    <div className="w-full max-w-lg">
      <label data-coral-label>Transfer Items</label>
      <div data-coral-transfer-list className="flex gap-4 mt-2">
        <div data-coral-transfer-source className="flex-1 border border-border rounded-lg p-2 min-h-[150px]">
          <div className="text-xs text-muted-foreground mb-2">Available</div>
          {source.map(item => (
            <div
              key={item}
              data-coral-transfer-item
              data-selected={selectedSource.includes(item) || undefined}
              onClick={() => toggleSource(item)}
              className={`p-2 rounded cursor-pointer mb-1 ${selectedSource.includes(item) ? 'bg-primary/20' : 'hover:bg-muted'}`}
            >
              {item}
            </div>
          ))}
        </div>
        <div data-coral-transfer-controls className="flex flex-col justify-center gap-2">
          <button data-coral-transfer-right onClick={moveRight} disabled={!selectedSource.length} className="px-3 py-1 bg-muted hover:bg-muted/80 rounded disabled:opacity-50">→</button>
          <button data-coral-transfer-left onClick={moveLeft} disabled={!selectedTarget.length} className="px-3 py-1 bg-muted hover:bg-muted/80 rounded disabled:opacity-50">←</button>
        </div>
        <div data-coral-transfer-target className="flex-1 border border-border rounded-lg p-2 min-h-[150px]">
          <div className="text-xs text-muted-foreground mb-2">Selected</div>
          {target.map(item => (
            <div
              key={item}
              data-coral-transfer-item
              data-selected={selectedTarget.includes(item) || undefined}
              onClick={() => toggleTarget(item)}
              className={`p-2 rounded cursor-pointer mb-1 ${selectedTarget.includes(item) ? 'bg-primary/20' : 'hover:bg-muted'}`}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PasswordInputPreview() {
  const [password, setPassword] = useState('')
  const [visible, setVisible] = useState(false)

  return (
    <div className="w-full max-w-sm">
      <label data-coral-label>Password</label>
      <div data-coral-password-input className="relative">
        <input
          data-coral-password-field
          type={visible ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="w-full pr-10"
        />
        <button
          data-coral-password-toggle
          type="button"
          onClick={() => setVisible(!visible)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          {visible ? '🙈' : '👁'}
        </button>
      </div>
    </div>
  )
}

function ZipCodeInputPreview() {
  const [zip, setZip] = useState('')
  const [format, setFormat] = useState<'US' | 'CA' | 'UK'>('US')

  const formatZip = (value: string, fmt: string) => {
    if (fmt === 'US') return value.replace(/\D/g, '').slice(0, 5)
    if (fmt === 'CA') {
      const clean = value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6)
      if (clean.length > 3) return `${clean.slice(0, 3)} ${clean.slice(3)}`
      return clean
    }
    if (fmt === 'UK') {
      return value.toUpperCase().replace(/[^A-Z0-9 ]/g, '').slice(0, 8)
    }
    return value
  }

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex gap-2">
        {(['US', 'CA', 'UK'] as const).map(f => (
          <button
            key={f}
            onClick={() => { setFormat(f); setZip('') }}
            className={`px-3 py-1 rounded text-sm ${format === f ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
          >
            {f}
          </button>
        ))}
      </div>
      <div>
        <label data-coral-label>ZIP/Postal Code</label>
        <input
          data-coral-zip-input
          data-format={format}
          type="text"
          placeholder={format === 'US' ? '12345' : format === 'CA' ? 'A1A 1A1' : 'SW1A 1AA'}
          value={zip}
          onChange={(e) => setZip(formatZip(e.target.value, format))}
        />
      </div>
    </div>
  )
}

function FormProgressPreview() {
  const [progress, setProgress] = useState(60)

  return (
    <div className="w-full max-w-sm space-y-4">
      <div data-coral-form-progress data-value={progress}>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Form Progress</span>
          <span data-coral-form-progress-label className="font-medium">{progress}% complete</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            data-coral-form-progress-bar
            className="h-full bg-primary transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={(e) => setProgress(parseInt(e.target.value))}
        className="w-full"
      />
    </div>
  )
}

function QuantityInputPreview() {
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="w-full max-w-sm mx-auto">
      <label data-coral-label>Quantity</label>
      <div data-coral-quantity-input data-min="1" data-max="10" className="flex items-center">
        <button
          data-coral-quantity-minus
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          disabled={quantity <= 1}
          className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-l-lg border border-border disabled:opacity-50"
        >
          −
        </button>
        <input
          data-coral-quantity-field
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Math.min(10, Math.max(1, parseInt(e.target.value) || 1)))}
          className="w-16 text-center border-y border-border py-2"
        />
        <button
          data-coral-quantity-plus
          onClick={() => setQuantity(Math.min(10, quantity + 1))}
          disabled={quantity >= 10}
          className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-r-lg border border-border disabled:opacity-50"
        >
          +
        </button>
      </div>
    </div>
  )
}

function PercentageInputPreview() {
  const [percent, setPercent] = useState(50)

  return (
    <div className="w-full max-w-sm mx-auto">
      <label data-coral-label>Discount</label>
      <div data-coral-percentage-input className="flex items-center">
        <input
          data-coral-percentage-field
          type="number"
          min="0"
          max="100"
          value={percent}
          onChange={(e) => setPercent(Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
          className="w-full rounded-r-none"
        />
        <span data-coral-percentage-symbol className="flex items-center px-3 bg-muted border border-l-0 border-border rounded-r-lg text-muted-foreground">%</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={percent}
        onChange={(e) => setPercent(parseInt(e.target.value))}
        className="w-full mt-2"
      />
    </div>
  )
}

function UnitInputPreview() {
  const [value, setValue] = useState('100')
  const [unit, setUnit] = useState('px')

  return (
    <div className="w-full max-w-sm mx-auto">
      <label data-coral-label>Width</label>
      <div data-coral-unit-input className="flex">
        <input
          data-coral-unit-field
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="flex-1 rounded-r-none"
        />
        <select
          data-coral-unit-select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="px-3 py-2 border border-l-0 border-border rounded-r-lg bg-muted"
        >
          <option>px</option>
          <option>%</option>
          <option>rem</option>
          <option>em</option>
          <option>vw</option>
        </select>
      </div>
    </div>
  )
}

function SocialInputPreview() {
  const [platform, setPlatform] = useState<'twitter' | 'instagram' | 'github'>('twitter')
  const [username, setUsername] = useState('')

  const prefixes = { twitter: '@', instagram: '@', github: '' }
  const placeholders = { twitter: 'username', instagram: 'username', github: 'username' }

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex gap-2">
        {(['twitter', 'instagram', 'github'] as const).map(p => (
          <button
            key={p}
            onClick={() => setPlatform(p)}
            className={`px-3 py-1 rounded text-sm capitalize ${platform === p ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
          >
            {p}
          </button>
        ))}
      </div>
      <div>
        <label data-coral-label className="capitalize">{platform} Username</label>
        <div data-coral-social-input data-platform={platform} className="flex">
          <span data-coral-social-prefix className="flex items-center px-3 bg-muted border border-r-0 border-border rounded-l-lg text-muted-foreground">{prefixes[platform]}</span>
          <input
            data-coral-social-field
            type="text"
            placeholder={placeholders[platform]}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="rounded-l-none"
          />
        </div>
      </div>
    </div>
  )
}

function HexInputPreview() {
  const [hex, setHex] = useState('ff7f50')

  const isValidHex = (h: string) => /^[0-9A-Fa-f]{6}$/.test(h)

  return (
    <div className="w-full max-w-sm mx-auto">
      <label data-coral-label>Color</label>
      <div data-coral-hex-input className="flex items-center gap-2">
        <div className="flex flex-1">
          <span data-coral-hex-prefix className="flex items-center px-3 bg-muted border border-r-0 border-border rounded-l-lg text-muted-foreground">#</span>
          <input
            data-coral-hex-field
            type="text"
            maxLength={6}
            placeholder="000000"
            value={hex}
            onChange={(e) => setHex(e.target.value.replace(/[^0-9A-Fa-f]/g, '').slice(0, 6))}
            className="rounded-l-none"
          />
        </div>
        <div
          data-coral-hex-preview
          className="w-10 h-10 rounded-lg border border-border"
          style={{ backgroundColor: isValidHex(hex) ? `#${hex}` : 'hsl(var(--background))' }}
        />
      </div>
    </div>
  )
}

function CharCounterPreview() {
  const [text, setText] = useState('')
  const maxLength = 280

  const remaining = maxLength - text.length
  const isWarning = remaining <= 20
  const isError = remaining < 0

  return (
    <div className="w-full max-w-md">
      <label data-coral-label>Tweet</label>
      <div data-coral-char-counter data-max={maxLength}>
        <textarea
          data-coral-char-textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's happening?"
          rows={4}
          className="w-full px-3 py-2 border border-border rounded-lg resize-none"
        />
        <div className="flex justify-end mt-1">
          <span
            data-coral-char-count
            className={`text-sm ${isError ? 'text-red-500' : isWarning ? 'text-yellow-500' : 'text-muted-foreground'}`}
          >
            {text.length}/{maxLength}
          </span>
        </div>
      </div>
    </div>
  )
}

function FormArrayPreview() {
  const [items, setItems] = useState(['Item 1', 'Item 2'])

  const addItem = () => {
    if (items.length < 5) {
      setItems([...items, `Item ${items.length + 1}`])
    }
  }

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index))
    }
  }

  const updateItem = (index: number, value: string) => {
    const newItems = [...items]
    newItems[index] = value
    setItems(newItems)
  }

  return (
    <div className="w-full max-w-md">
      <label data-coral-label>Items</label>
      <div data-coral-form-array className="space-y-2 mt-2">
        {items.map((item, i) => (
          <div key={i} data-coral-form-array-item className="flex gap-2">
            <input
              data-coral-input
              value={item}
              onChange={(e) => updateItem(i, e.target.value)}
              placeholder={`Item ${i + 1}`}
              className="flex-1"
            />
            <button
              data-coral-form-array-remove
              onClick={() => removeItem(i)}
              disabled={items.length <= 1}
              className="px-3 py-2 text-red-500 hover:bg-red-500/10 rounded disabled:opacity-50"
            >
              ×
            </button>
          </div>
        ))}
        <button
          data-coral-form-array-add
          onClick={addItem}
          disabled={items.length >= 5}
          className="w-full px-4 py-2 border border-dashed border-border rounded-lg text-muted-foreground hover:bg-muted disabled:opacity-50"
        >
          + Add Item
        </button>
      </div>
    </div>
  )
}

export default FormsPage
