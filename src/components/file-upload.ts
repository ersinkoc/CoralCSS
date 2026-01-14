/**
 * FileUpload Component
 *
 * File upload with drag and drop support.
 * @module components/file-upload
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

export interface FileUploadConfig extends ComponentConfig {
  /** Accept file types */
  accept?: string
  /** Allow multiple files */
  multiple?: boolean
  /** Maximum file size (bytes) */
  maxSize?: number
  /** Maximum number of files */
  maxFiles?: number
  /** Disabled state */
  disabled?: boolean
  /** Show preview */
  showPreview?: boolean
}

export interface FileUploadState extends ComponentState {
  files: File[]
  isDragging: boolean
  isUploading: boolean
  disabled: boolean
  errors: string[]
}

/**
 * FileUpload component for file uploads
 */
export class FileUpload extends BaseComponent {
  private input: HTMLInputElement | null = null
  private dropzone: HTMLElement | null = null

  protected getDefaultConfig(): FileUploadConfig {
    return {
      multiple: false,
      maxSize: 10 * 1024 * 1024, // 10MB
      maxFiles: 10,
      disabled: false,
      showPreview: true,
    }
  }

  protected getInitialState(): FileUploadState {
    const config = this.config as FileUploadConfig
    return {
      files: [],
      isDragging: false,
      isUploading: false,
      disabled: config.disabled ?? false,
      errors: [],
    }
  }

  protected setupAria(): void {
    this.element.setAttribute('role', 'region')
    this.element.setAttribute('aria-label', 'File upload')
  }

  protected bindEvents(): void {
    const config = this.config as FileUploadConfig

    this.input = this.query('input[type="file"]')
    this.dropzone = this.query('[data-coral-file-upload-dropzone]') || this.element

    // Create hidden input if not exists
    if (!this.input) {
      this.input = document.createElement('input')
      this.input.type = 'file'
      this.input.hidden = true
      if (config.accept) {this.input.accept = config.accept}
      if (config.multiple) {this.input.multiple = true}
      this.element.appendChild(this.input)
    }

    // Input change
    const handleChange = () => {
      if (this.input?.files) {
        this.addFiles(Array.from(this.input.files))
        this.input.value = ''
      }
    }
    this.addEventListener(this.input, 'change', handleChange)

    // Dropzone click
    const handleClick = () => {
      if (!(this.state as FileUploadState).disabled) {
        this.input?.click()
      }
    }
    this.addEventListener(this.dropzone, 'click', handleClick)

    // Drag events
    const handleDragEnter = (e: Event) => {
      e.preventDefault()
      e.stopPropagation()
      if (!(this.state as FileUploadState).disabled) {
        this.setState({ isDragging: true })
      }
    }
    this.addEventListener(this.dropzone, 'dragenter', handleDragEnter)

    const handleDragOver = (e: Event) => {
      e.preventDefault()
      e.stopPropagation()
    }
    this.addEventListener(this.dropzone, 'dragover', handleDragOver)

    const handleDragLeave = (e: Event) => {
      e.preventDefault()
      e.stopPropagation()
      this.setState({ isDragging: false })
    }
    this.addEventListener(this.dropzone, 'dragleave', handleDragLeave)

    const handleDrop = (e: Event) => {
      e.preventDefault()
      e.stopPropagation()
      this.setState({ isDragging: false })

      if ((this.state as FileUploadState).disabled) {return}

      const de = e as DragEvent
      const files = de.dataTransfer?.files
      if (files) {
        this.addFiles(Array.from(files))
      }
    }
    this.addEventListener(this.dropzone, 'drop', handleDrop)

    // Remove buttons
    const removeButtons = this.queryAll('[data-coral-file-upload-remove]')
    removeButtons.forEach((btn) => {
      const handleRemove = (e: Event) => {
        e.stopPropagation()
        const index = parseInt((btn as HTMLElement).dataset.index || '0')
        this.removeFile(index)
      }
      this.addEventListener(btn, 'click', handleRemove)
    })
  }

  private addFiles(newFiles: File[]): void {
    const config = this.config as FileUploadConfig
    const state = this.state as FileUploadState
    const errors: string[] = []
    const validFiles: File[] = []

    newFiles.forEach((file) => {
      // Check file type
      if (config.accept) {
        const acceptedTypes = config.accept.split(',').map(t => t.trim())
        const isAccepted = acceptedTypes.some(type => {
          if (type.startsWith('.')) {
            return file.name.toLowerCase().endsWith(type.toLowerCase())
          }
          if (type.endsWith('/*')) {
            return file.type.startsWith(type.replace('/*', '/'))
          }
          return file.type === type
        })

        if (!isAccepted) {
          errors.push(`${file.name}: File type not accepted`)
          return
        }
      }

      // Check file size
      if (config.maxSize && file.size > config.maxSize) {
        errors.push(`${file.name}: File too large (max ${this.formatSize(config.maxSize)})`)
        return
      }

      validFiles.push(file)
    })

    // Check max files
    const totalFiles = config.multiple ? state.files.length + validFiles.length : validFiles.length
    if (config.maxFiles && totalFiles > config.maxFiles) {
      errors.push(`Maximum ${config.maxFiles} files allowed`)
      validFiles.splice(config.maxFiles - state.files.length)
    }

    const files = config.multiple ? [...state.files, ...validFiles] : validFiles.slice(0, 1)

    this.setState({ files, errors })
    this.dispatch('change', { files })

    if (errors.length > 0) {
      this.dispatch('error', { errors })
    }

    if (config.showPreview) {
      this.renderPreviews()
    }
  }

  private formatSize(bytes: number): string {
    const units = ['B', 'KB', 'MB', 'GB']
    let size = bytes
    let unitIndex = 0

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024
      unitIndex++
    }

    return `${size.toFixed(1)} ${units[unitIndex]}`
  }

  private renderPreviews(): void {
    const state = this.state as FileUploadState
    const previewContainer = this.query('[data-coral-file-upload-previews]')
    if (!previewContainer) {return}

    previewContainer.innerHTML = ''

    state.files.forEach((file, index) => {
      const preview = document.createElement('div')
      preview.className = 'file-upload-preview'
      preview.dataset.index = String(index)

      // File icon or image preview
      if (file.type.startsWith('image/')) {
        const img = document.createElement('img')
        img.className = 'file-upload-preview-image'
        img.src = URL.createObjectURL(file)
        img.onload = () => URL.revokeObjectURL(img.src)
        preview.appendChild(img)
      } else {
        const icon = document.createElement('span')
        icon.className = 'file-upload-preview-icon'
        icon.textContent = this.getFileIcon(file.type)
        preview.appendChild(icon)
      }

      // File info - use safe DOM methods to prevent XSS from file names
      const info = document.createElement('div')
      info.className = 'file-upload-preview-info'

      const nameSpan = document.createElement('span')
      nameSpan.className = 'file-upload-preview-name'
      nameSpan.textContent = file.name // textContent is safe

      const sizeSpan = document.createElement('span')
      sizeSpan.className = 'file-upload-preview-size'
      sizeSpan.textContent = this.formatSize(file.size)

      info.appendChild(nameSpan)
      info.appendChild(sizeSpan)
      preview.appendChild(info)

      // Remove button
      const removeBtn = document.createElement('button')
      removeBtn.className = 'file-upload-preview-remove'
      removeBtn.type = 'button'
      removeBtn.textContent = '×'
      removeBtn.onclick = (e) => {
        e.stopPropagation()
        this.removeFile(index)
      }
      preview.appendChild(removeBtn)

      previewContainer.appendChild(preview)
    })
  }

  private getFileIcon(mimeType: string): string {
    if (mimeType.startsWith('image/')) {return '🖼️'}
    if (mimeType.startsWith('video/')) {return '🎬'}
    if (mimeType.startsWith('audio/')) {return '🎵'}
    if (mimeType.includes('pdf')) {return '📄'}
    if (mimeType.includes('word')) {return '📝'}
    if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) {return '📊'}
    if (mimeType.includes('zip') || mimeType.includes('compressed')) {return '📦'}
    return '📁'
  }

  protected override render(): void {
    const state = this.state as FileUploadState

    this.element.dataset.dragging = String(state.isDragging)
    this.element.dataset.uploading = String(state.isUploading)
    this.element.dataset.disabled = String(state.disabled)
    this.element.dataset.hasFiles = String(state.files.length > 0)
  }

  removeFile(index: number): void {
    const state = this.state as FileUploadState
    const files = state.files.filter((_, i) => i !== index)
    this.setState({ files })
    this.dispatch('change', { files })

    if ((this.config as FileUploadConfig).showPreview) {
      this.renderPreviews()
    }
  }

  getFiles(): File[] {
    return [...(this.state as FileUploadState).files]
  }

  clear(): void {
    this.setState({ files: [], errors: [] })
    if ((this.config as FileUploadConfig).showPreview) {
      this.renderPreviews()
    }
    this.dispatch('clear')
  }

  setDisabled(disabled: boolean): void {
    this.setState({ disabled })
  }
}

export const createFileUpload = createComponentFactory(FileUpload)
export default FileUpload
