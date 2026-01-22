/**
 * ImageCrop Component
 *
 * An accessible image cropping component for selecting and cropping
 * regions of an image with support for aspect ratios, zoom, and rotation.
 *
 * @module components/image-crop
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

/**
 * Crop area coordinates and dimensions
 */
export interface CropArea {
  x: number
  y: number
  width: number
  height: number
}

/**
 * Crop result with all transformation data
 */
export interface CropResult {
  /**
   * Crop area in pixels (relative to original image)
   */
  crop: CropArea

  /**
   * Zoom level (1 = 100%)
   */
  zoom: number

  /**
   * Rotation in degrees
   */
  rotation: number

  /**
   * Flip horizontal
   */
  flipX: boolean

  /**
   * Flip vertical
   */
  flipY: boolean
}

/**
 * ImageCrop configuration
 */
export interface ImageCropConfig extends ComponentConfig {
  /**
   * Image source URL or File/Blob
   */
  src?: string | File | Blob

  /**
   * Aspect ratio (width/height). null for free aspect ratio
   * @default null
   */
  aspectRatio?: number | null

  /**
   * Minimum crop width in pixels
   * @default 10
   */
  minWidth?: number

  /**
   * Minimum crop height in pixels
   * @default 10
   */
  minHeight?: number

  /**
   * Maximum crop width in pixels
   */
  maxWidth?: number

  /**
   * Maximum crop height in pixels
   */
  maxHeight?: number

  /**
   * Initial crop area
   */
  initialCrop?: Partial<CropArea>

  /**
   * Allow zoom
   * @default true
   */
  zoomable?: boolean

  /**
   * Minimum zoom level
   * @default 0.1
   */
  minZoom?: number

  /**
   * Maximum zoom level
   * @default 3
   */
  maxZoom?: number

  /**
   * Zoom step per wheel event
   * @default 0.1
   */
  zoomStep?: number

  /**
   * Allow rotation
   * @default true
   */
  rotatable?: boolean

  /**
   * Rotation step in degrees
   * @default 90
   */
  rotationStep?: number

  /**
   * Allow flip
   * @default true
   */
  flippable?: boolean

  /**
   * Show grid overlay
   * @default true
   */
  showGrid?: boolean

  /**
   * Grid type
   * @default 'rule-of-thirds'
   */
  gridType?: 'rule-of-thirds' | 'grid' | 'none'

  /**
   * Shape of the crop area
   * @default 'rect'
   */
  cropShape?: 'rect' | 'round'

  /**
   * Whether crop area is draggable
   * @default true
   */
  draggable?: boolean

  /**
   * Whether crop area is resizable
   * @default true
   */
  resizable?: boolean

  /**
   * Resize handle positions
   * @default ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w']
   */
  resizeHandles?: ('nw' | 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w')[]

  /**
   * Output format for cropped image
   * @default 'image/png'
   */
  outputFormat?: 'image/png' | 'image/jpeg' | 'image/webp'

  /**
   * Output quality (0-1) for jpeg/webp
   * @default 0.92
   */
  outputQuality?: number

  /**
   * Background color for rotated images
   * @default 'transparent'
   */
  backgroundColor?: string
}

/**
 * ImageCrop state
 */
export interface ImageCropState extends ComponentState {
  imageLoaded: boolean
  imageSrc: string | null
  imageWidth: number
  imageHeight: number
  crop: CropArea
  zoom: number
  rotation: number
  flipX: boolean
  flipY: boolean
  isDragging: boolean
  isResizing: boolean
  resizeHandle: string | null
}

/**
 * ImageCrop component
 *
 * @example
 * ```html
 * <div data-coral-image-crop>
 *   <div data-coral-image-crop-container>
 *     <img data-coral-image-crop-image src="photo.jpg" alt="Crop preview">
 *     <div data-coral-image-crop-overlay></div>
 *   </div>
 *   <div data-coral-image-crop-controls>
 *     <button data-coral-image-crop-zoom-in>+</button>
 *     <button data-coral-image-crop-zoom-out>-</button>
 *     <button data-coral-image-crop-rotate-left>↺</button>
 *     <button data-coral-image-crop-rotate-right>↻</button>
 *   </div>
 * </div>
 * ```
 *
 * @example
 * ```typescript
 * const cropper = createImageCrop(element, {
 *   aspectRatio: 16 / 9,
 *   zoomable: true,
 *   rotatable: true,
 * })
 *
 * cropper.on('change', ({ crop }) => {
 *   console.log('Crop changed:', crop)
 * })
 *
 * // Get cropped image
 * const blob = await cropper.getCroppedImage()
 * ```
 */
export class ImageCrop extends BaseComponent {
  protected declare config: ImageCropConfig
  protected declare state: ImageCropState

  private containerEl: HTMLElement | null = null
  private imageEl: HTMLImageElement | null = null
  private overlayEl: HTMLElement | null = null
  private cropAreaEl: HTMLElement | null = null

  private dragStart: { x: number; y: number } | null = null
  private cropStart: CropArea | null = null

  // Bound event handlers for proper cleanup
  private boundHandleMove: (e: MouseEvent | TouchEvent) => void
  private boundHandleEnd: () => void
  private boundHandleDragStart: (e: MouseEvent | TouchEvent) => void
  private boundHandleResizeStart: (e: MouseEvent | TouchEvent) => void
  private boundHandleWheel: (e: WheelEvent) => void

  constructor(element: HTMLElement, config?: ImageCropConfig) {
    super(element, config)

    // Initialize bound handlers
    this.boundHandleMove = this.handleMove.bind(this)
    this.boundHandleEnd = this.handleEnd.bind(this)
    this.boundHandleDragStart = this.handleDragStart.bind(this)
    this.boundHandleResizeStart = this.handleResizeStart.bind(this)
    this.boundHandleWheel = this.handleWheel.bind(this)
  }

  protected override getDefaultConfig(): ImageCropConfig {
    return {
      aspectRatio: null,
      minWidth: 10,
      minHeight: 10,
      zoomable: true,
      minZoom: 0.1,
      maxZoom: 3,
      zoomStep: 0.1,
      rotatable: true,
      rotationStep: 90,
      flippable: true,
      showGrid: true,
      gridType: 'rule-of-thirds',
      cropShape: 'rect',
      draggable: true,
      resizable: true,
      resizeHandles: ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'],
      outputFormat: 'image/png',
      outputQuality: 0.92,
      backgroundColor: 'transparent',
    }
  }

  protected override getInitialState(): ImageCropState {
    return {
      imageLoaded: false,
      imageSrc: null,
      imageWidth: 0,
      imageHeight: 0,
      crop: { x: 0, y: 0, width: 100, height: 100 },
      zoom: 1,
      rotation: 0,
      flipX: false,
      flipY: false,
      isDragging: false,
      isResizing: false,
      resizeHandle: null,
    }
  }

  protected setupAria(): void {
    this.element.setAttribute('role', 'application')
    this.element.setAttribute('aria-label', 'Image cropper')
  }

  protected bindEvents(): void {
    this.containerEl = this.element.querySelector('[data-coral-image-crop-container]')
    this.imageEl = this.element.querySelector('[data-coral-image-crop-image]')
    this.overlayEl = this.element.querySelector('[data-coral-image-crop-overlay]')

    if (!this.containerEl) {
      this.containerEl = this.element
    }

    // Load image if provided
    if (this.config.src) {
      this.loadImage(this.config.src)
    } else if (this.imageEl?.src) {
      this.loadImage(this.imageEl.src)
    }

    this.setupControls()
    this.setupKeyboard()
  }

  private async loadImage(src: string | File | Blob): Promise<void> {
    let imageSrc: string

    if (src instanceof File || src instanceof Blob) {
      imageSrc = URL.createObjectURL(src)
    } else {
      imageSrc = src
    }

    // Create temp image to get dimensions
    const img = document.createElement('img')
    img.crossOrigin = 'anonymous'

    return new Promise((resolve, reject) => {
      img.onload = () => {
        this.setState({
          imageLoaded: true,
          imageSrc,
          imageWidth: img.naturalWidth,
          imageHeight: img.naturalHeight,
        })

        // Set initial crop if not provided
        if (!this.config.initialCrop) {
          this.initializeCrop(img.naturalWidth, img.naturalHeight)
        } else {
          this.setState({
            crop: {
              x: this.config.initialCrop.x ?? 0,
              y: this.config.initialCrop.y ?? 0,
              width: this.config.initialCrop.width ?? img.naturalWidth,
              height: this.config.initialCrop.height ?? img.naturalHeight,
            },
          })
        }

        this.renderCropArea()
        this.dispatch('load', { width: img.naturalWidth, height: img.naturalHeight })
        resolve()
      }

      img.onerror = () => {
        this.dispatch('error', { error: new Error('Failed to load image') })
        reject(new Error('Failed to load image'))
      }

      img.src = imageSrc
    })
  }

  private initializeCrop(imageWidth: number, imageHeight: number): void {
    const { aspectRatio } = this.config

    let cropWidth = imageWidth
    let cropHeight = imageHeight

    if (aspectRatio) {
      const imageAspectRatio = imageWidth / imageHeight

      if (imageAspectRatio > aspectRatio) {
        // Image is wider than desired aspect ratio
        cropHeight = imageHeight
        cropWidth = cropHeight * aspectRatio
      } else {
        // Image is taller than desired aspect ratio
        cropWidth = imageWidth
        cropHeight = cropWidth / aspectRatio
      }
    }

    const x = (imageWidth - cropWidth) / 2
    const y = (imageHeight - cropHeight) / 2

    this.setState({
      crop: { x, y, width: cropWidth, height: cropHeight },
    })
  }

  private renderCropArea(): void {
    if (!this.containerEl) {return}

    // Remove existing crop area if any
    this.cropAreaEl?.remove()

    // Create crop area element
    this.cropAreaEl = document.createElement('div')
    this.cropAreaEl.setAttribute('data-coral-image-crop-area', '')
    this.cropAreaEl.setAttribute('tabindex', '0')
    this.cropAreaEl.setAttribute('role', 'slider')
    this.cropAreaEl.setAttribute('aria-label', 'Crop area. Use arrow keys to move, Shift+arrows to resize.')

    if (this.config.cropShape === 'round') {
      this.cropAreaEl.setAttribute('data-crop-shape', 'round')
    }

    // Add grid overlay
    if (this.config.showGrid && this.config.gridType !== 'none') {
      const grid = document.createElement('div')
      grid.setAttribute('data-coral-image-crop-grid', '')
      grid.setAttribute('data-grid-type', this.config.gridType || 'rule-of-thirds')
      this.cropAreaEl.appendChild(grid)
    }

    // Add resize handles
    if (this.config.resizable) {
      for (const handle of this.config.resizeHandles || []) {
        const handleEl = document.createElement('div')
        handleEl.setAttribute('data-coral-image-crop-handle', handle)
        this.cropAreaEl.appendChild(handleEl)
      }
    }

    this.containerEl.appendChild(this.cropAreaEl)

    this.updateCropAreaPosition()
    this.setupCropAreaEvents()
  }

  private updateCropAreaPosition(): void {
    if (!this.cropAreaEl || !this.containerEl) {return}

    const { crop, zoom, rotation, flipX, flipY, imageWidth, imageHeight } = this.state
    const containerRect = this.containerEl.getBoundingClientRect()

    // Calculate scale factor to fit image in container
    const scaleX = containerRect.width / imageWidth
    const scaleY = containerRect.height / imageHeight
    const scale = Math.min(scaleX, scaleY) * zoom

    // Calculate crop area position in container coordinates
    const left = crop.x * scale
    const top = crop.y * scale
    const width = crop.width * scale
    const height = crop.height * scale

    this.cropAreaEl.style.left = `${left}px`
    this.cropAreaEl.style.top = `${top}px`
    this.cropAreaEl.style.width = `${width}px`
    this.cropAreaEl.style.height = `${height}px`

    // Apply transforms
    const transforms: string[] = []
    if (rotation !== 0) {
      transforms.push(`rotate(${rotation}deg)`)
    }
    if (flipX) {
      transforms.push('scaleX(-1)')
    }
    if (flipY) {
      transforms.push('scaleY(-1)')
    }

    if (transforms.length > 0) {
      this.cropAreaEl.style.transform = transforms.join(' ')
    } else {
      this.cropAreaEl.style.transform = ''
    }

    // Update overlay mask
    this.updateOverlayMask()
  }

  private updateOverlayMask(): void {
    if (!this.overlayEl || !this.containerEl) {return}

    const { crop, imageWidth, imageHeight } = this.state
    const containerRect = this.containerEl.getBoundingClientRect()

    const scaleX = containerRect.width / imageWidth
    const scaleY = containerRect.height / imageHeight
    const scale = Math.min(scaleX, scaleY) * this.state.zoom

    const left = crop.x * scale
    const top = crop.y * scale
    const width = crop.width * scale
    const height = crop.height * scale

    if (this.config.cropShape === 'round') {
      const rx = width / 2
      const ry = height / 2
      const cx = left + rx
      const cy = top + ry
      this.overlayEl.style.clipPath = `ellipse(${rx}px ${ry}px at ${cx}px ${cy}px)`
    } else {
      this.overlayEl.style.clipPath = `polygon(
        0 0, 100% 0, 100% 100%, 0 100%, 0 0,
        ${left}px ${top}px,
        ${left}px ${top + height}px,
        ${left + width}px ${top + height}px,
        ${left + width}px ${top}px,
        ${left}px ${top}px
      )`
    }
  }

  private setupCropAreaEvents(): void {
    if (!this.cropAreaEl) {return}

    // Drag events
    if (this.config.draggable) {
      this.cropAreaEl.addEventListener('mousedown', this.boundHandleDragStart)
      this.cropAreaEl.addEventListener('touchstart', this.boundHandleDragStart, { passive: false })
    }

    // Resize handle events
    if (this.config.resizable) {
      this.cropAreaEl.querySelectorAll('[data-coral-image-crop-handle]').forEach((handle) => {
        (handle as HTMLElement).addEventListener('mousedown', this.boundHandleResizeStart as EventListener)
        ;(handle as HTMLElement).addEventListener('touchstart', this.boundHandleResizeStart as EventListener, { passive: false })
      })
    }

    // Global move and up events
    document.addEventListener('mousemove', this.boundHandleMove)
    document.addEventListener('mouseup', this.boundHandleEnd)
    document.addEventListener('touchmove', this.boundHandleMove, { passive: false })
    document.addEventListener('touchend', this.boundHandleEnd)

    // Wheel zoom
    if (this.config.zoomable) {
      this.containerEl?.addEventListener('wheel', this.boundHandleWheel, { passive: false })
    }
  }

  private handleDragStart(e: MouseEvent | TouchEvent): void {
    if ((e.target as HTMLElement).hasAttribute('data-coral-image-crop-handle')) {
      return
    }

    e.preventDefault()
    const point = this.getEventPoint(e)

    this.setState({ isDragging: true })
    this.dragStart = point
    this.cropStart = { ...this.state.crop }

    this.dispatch('dragstart', { crop: this.state.crop })
  }

  private handleResizeStart(e: MouseEvent | TouchEvent): void {
    e.preventDefault()
    e.stopPropagation()

    const handle = (e.target as HTMLElement).getAttribute('data-coral-image-crop-handle')
    if (!handle) {return}

    const point = this.getEventPoint(e)

    this.setState({
      isResizing: true,
      resizeHandle: handle,
    })
    this.dragStart = point
    this.cropStart = { ...this.state.crop }

    this.dispatch('resizestart', { crop: this.state.crop, handle })
  }

  private handleMove(e: MouseEvent | TouchEvent): void {
    if (!this.state.isDragging && !this.state.isResizing) {return}
    if (!this.dragStart || !this.cropStart || !this.containerEl) {return}

    e.preventDefault()
    const point = this.getEventPoint(e)

    const containerRect = this.containerEl.getBoundingClientRect()
    const { imageWidth, imageHeight, zoom } = this.state

    const scaleX = containerRect.width / imageWidth
    const scaleY = containerRect.height / imageHeight
    const scale = Math.min(scaleX, scaleY) * zoom

    const deltaX = (point.x - this.dragStart.x) / scale
    const deltaY = (point.y - this.dragStart.y) / scale

    if (this.state.isDragging) {
      this.handleDrag(deltaX, deltaY)
    } else if (this.state.isResizing) {
      this.handleResize(deltaX, deltaY)
    }
  }

  private handleDrag(deltaX: number, deltaY: number): void {
    if (!this.cropStart) {return}

    const { imageWidth, imageHeight } = this.state
    let newX = this.cropStart.x + deltaX
    let newY = this.cropStart.y + deltaY

    // Constrain to image bounds
    newX = Math.max(0, Math.min(newX, imageWidth - this.cropStart.width))
    newY = Math.max(0, Math.min(newY, imageHeight - this.cropStart.height))

    this.setState({
      crop: {
        ...this.state.crop,
        x: newX,
        y: newY,
      },
    })

    this.updateCropAreaPosition()
    this.dispatch('change', { crop: this.state.crop })
  }

  private handleResize(deltaX: number, deltaY: number): void {
    if (!this.cropStart || !this.state.resizeHandle) {return}

    const { imageWidth, imageHeight } = this.state
    const { minWidth, minHeight, maxWidth, maxHeight, aspectRatio } = this.config
    const handle = this.state.resizeHandle

    let { x, y, width, height } = this.cropStart

    // Apply deltas based on handle position
    if (handle.includes('e')) {
      width += deltaX
    }
    if (handle.includes('w')) {
      x += deltaX
      width -= deltaX
    }
    if (handle.includes('s')) {
      height += deltaY
    }
    if (handle.includes('n')) {
      y += deltaY
      height -= deltaY
    }

    // Enforce minimum size
    if (width < (minWidth || 10)) {
      if (handle.includes('w')) {
        x = this.cropStart.x + this.cropStart.width - (minWidth || 10)
      }
      width = minWidth || 10
    }
    if (height < (minHeight || 10)) {
      if (handle.includes('n')) {
        y = this.cropStart.y + this.cropStart.height - (minHeight || 10)
      }
      height = minHeight || 10
    }

    // Enforce maximum size
    if (maxWidth && width > maxWidth) {
      width = maxWidth
    }
    if (maxHeight && height > maxHeight) {
      height = maxHeight
    }

    // Enforce aspect ratio
    if (aspectRatio) {
      if (handle.includes('e') || handle.includes('w')) {
        height = width / aspectRatio
        if (handle.includes('n')) {
          y = this.cropStart.y + this.cropStart.height - height
        }
      } else {
        width = height * aspectRatio
        if (handle.includes('w')) {
          x = this.cropStart.x + this.cropStart.width - width
        }
      }
    }

    // Constrain to image bounds
    x = Math.max(0, Math.min(x, imageWidth - width))
    y = Math.max(0, Math.min(y, imageHeight - height))
    width = Math.min(width, imageWidth - x)
    height = Math.min(height, imageHeight - y)

    this.setState({
      crop: { x, y, width, height },
    })

    this.updateCropAreaPosition()
    this.dispatch('change', { crop: this.state.crop })
  }

  private handleEnd(): void {
    if (this.state.isDragging) {
      this.dispatch('dragend', { crop: this.state.crop })
    }
    if (this.state.isResizing) {
      this.dispatch('resizeend', { crop: this.state.crop })
    }

    this.setState({
      isDragging: false,
      isResizing: false,
      resizeHandle: null,
    })
    this.dragStart = null
    this.cropStart = null
  }

  private handleWheel(e: WheelEvent): void {
    e.preventDefault()

    const { zoom } = this.state
    const { minZoom, maxZoom, zoomStep } = this.config

    const delta = e.deltaY > 0 ? -(zoomStep || 0.1) : (zoomStep || 0.1)
    let newZoom = zoom + delta

    newZoom = Math.max(minZoom || 0.1, Math.min(newZoom, maxZoom || 3))

    if (newZoom !== zoom) {
      this.setState({ zoom: newZoom })
      this.updateCropAreaPosition()
      this.dispatch('zoom', { zoom: newZoom })
    }
  }

  private getEventPoint(e: MouseEvent | TouchEvent): { x: number; y: number } {
    if ('touches' in e) {
      const touch = e.touches[0]
      return { x: touch?.clientX || 0, y: touch?.clientY || 0 }
    }
    return { x: e.clientX, y: e.clientY }
  }

  private setupControls(): void {
    // Zoom controls
    this.element.querySelector('[data-coral-image-crop-zoom-in]')?.addEventListener('click', () => {
      this.zoomIn()
    })

    this.element.querySelector('[data-coral-image-crop-zoom-out]')?.addEventListener('click', () => {
      this.zoomOut()
    })

    // Rotation controls
    this.element.querySelector('[data-coral-image-crop-rotate-left]')?.addEventListener('click', () => {
      this.rotateLeft()
    })

    this.element.querySelector('[data-coral-image-crop-rotate-right]')?.addEventListener('click', () => {
      this.rotateRight()
    })

    // Flip controls
    this.element.querySelector('[data-coral-image-crop-flip-x]')?.addEventListener('click', () => {
      this.flipHorizontal()
    })

    this.element.querySelector('[data-coral-image-crop-flip-y]')?.addEventListener('click', () => {
      this.flipVertical()
    })

    // Reset control
    this.element.querySelector('[data-coral-image-crop-reset]')?.addEventListener('click', () => {
      this.reset()
    })
  }

  private setupKeyboard(): void {
    this.cropAreaEl?.addEventListener('keydown', (e) => {
      const step = e.shiftKey ? 10 : 1
      const { crop, imageWidth, imageHeight } = this.state

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          if (e.ctrlKey || e.metaKey) {
            // Resize width
            this.setState({
              crop: { ...crop, width: Math.max((this.config.minWidth || 10), crop.width - step) },
            })
          } else {
            // Move
            this.setState({
              crop: { ...crop, x: Math.max(0, crop.x - step) },
            })
          }
          break

        case 'ArrowRight':
          e.preventDefault()
          if (e.ctrlKey || e.metaKey) {
            // Resize width
            this.setState({
              crop: { ...crop, width: Math.min(imageWidth - crop.x, crop.width + step) },
            })
          } else {
            // Move
            this.setState({
              crop: { ...crop, x: Math.min(imageWidth - crop.width, crop.x + step) },
            })
          }
          break

        case 'ArrowUp':
          e.preventDefault()
          if (e.ctrlKey || e.metaKey) {
            // Resize height
            this.setState({
              crop: { ...crop, height: Math.max((this.config.minHeight || 10), crop.height - step) },
            })
          } else {
            // Move
            this.setState({
              crop: { ...crop, y: Math.max(0, crop.y - step) },
            })
          }
          break

        case 'ArrowDown':
          e.preventDefault()
          if (e.ctrlKey || e.metaKey) {
            // Resize height
            this.setState({
              crop: { ...crop, height: Math.min(imageHeight - crop.y, crop.height + step) },
            })
          } else {
            // Move
            this.setState({
              crop: { ...crop, y: Math.min(imageHeight - crop.height, crop.y + step) },
            })
          }
          break

        case '+':
        case '=':
          e.preventDefault()
          this.zoomIn()
          break

        case '-':
        case '_':
          e.preventDefault()
          this.zoomOut()
          break

        case 'r':
        case 'R':
          e.preventDefault()
          if (e.shiftKey) {
            this.rotateLeft()
          } else {
            this.rotateRight()
          }
          break

        case '0':
          e.preventDefault()
          this.reset()
          break
      }

      this.updateCropAreaPosition()
      this.dispatch('change', { crop: this.state.crop })
    })
  }

  // Public API

  /**
   * Load a new image
   */
  async setImage(src: string | File | Blob): Promise<void> {
    await this.loadImage(src)
  }

  /**
   * Get the current crop result
   */
  getCrop(): CropResult {
    return {
      crop: { ...this.state.crop },
      zoom: this.state.zoom,
      rotation: this.state.rotation,
      flipX: this.state.flipX,
      flipY: this.state.flipY,
    }
  }

  /**
   * Set the crop area
   */
  setCrop(crop: Partial<CropArea>): void {
    this.setState({
      crop: {
        x: crop.x ?? this.state.crop.x,
        y: crop.y ?? this.state.crop.y,
        width: crop.width ?? this.state.crop.width,
        height: crop.height ?? this.state.crop.height,
      },
    })
    this.updateCropAreaPosition()
    this.dispatch('change', { crop: this.state.crop })
  }

  /**
   * Zoom in
   */
  zoomIn(): void {
    const { zoom } = this.state
    const { maxZoom, zoomStep } = this.config
    const newZoom = Math.min((maxZoom || 3), zoom + (zoomStep || 0.1))

    this.setState({ zoom: newZoom })
    this.updateCropAreaPosition()
    this.dispatch('zoom', { zoom: newZoom })
  }

  /**
   * Zoom out
   */
  zoomOut(): void {
    const { zoom } = this.state
    const { minZoom, zoomStep } = this.config
    const newZoom = Math.max((minZoom || 0.1), zoom - (zoomStep || 0.1))

    this.setState({ zoom: newZoom })
    this.updateCropAreaPosition()
    this.dispatch('zoom', { zoom: newZoom })
  }

  /**
   * Set zoom level
   */
  setZoom(zoom: number): void {
    const { minZoom, maxZoom } = this.config
    const newZoom = Math.max((minZoom || 0.1), Math.min(zoom, (maxZoom || 3)))

    this.setState({ zoom: newZoom })
    this.updateCropAreaPosition()
    this.dispatch('zoom', { zoom: newZoom })
  }

  /**
   * Rotate left (counter-clockwise)
   */
  rotateLeft(): void {
    const { rotation } = this.state
    const step = this.config.rotationStep || 90
    const newRotation = (rotation - step + 360) % 360

    this.setState({ rotation: newRotation })
    this.updateCropAreaPosition()
    this.dispatch('rotate', { rotation: newRotation })
  }

  /**
   * Rotate right (clockwise)
   */
  rotateRight(): void {
    const { rotation } = this.state
    const step = this.config.rotationStep || 90
    const newRotation = (rotation + step) % 360

    this.setState({ rotation: newRotation })
    this.updateCropAreaPosition()
    this.dispatch('rotate', { rotation: newRotation })
  }

  /**
   * Set rotation in degrees
   */
  setRotation(degrees: number): void {
    const newRotation = ((degrees % 360) + 360) % 360

    this.setState({ rotation: newRotation })
    this.updateCropAreaPosition()
    this.dispatch('rotate', { rotation: newRotation })
  }

  /**
   * Flip horizontally
   */
  flipHorizontal(): void {
    this.setState({ flipX: !this.state.flipX })
    this.updateCropAreaPosition()
    this.dispatch('flip', { flipX: this.state.flipX, flipY: this.state.flipY })
  }

  /**
   * Flip vertically
   */
  flipVertical(): void {
    this.setState({ flipY: !this.state.flipY })
    this.updateCropAreaPosition()
    this.dispatch('flip', { flipX: this.state.flipX, flipY: this.state.flipY })
  }

  /**
   * Reset all transformations
   */
  reset(): void {
    const { imageWidth, imageHeight } = this.state

    this.setState({
      zoom: 1,
      rotation: 0,
      flipX: false,
      flipY: false,
    })

    this.initializeCrop(imageWidth, imageHeight)
    this.updateCropAreaPosition()
    this.dispatch('reset', {})
  }

  /**
   * Get the cropped image as a Blob
   */
  async getCroppedImage(): Promise<Blob | null> {
    if (!this.state.imageLoaded || !this.state.imageSrc) {
      return null
    }

    const { crop, rotation, flipX, flipY } = this.state
    const { outputFormat, outputQuality, backgroundColor } = this.config

    // Create canvas
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) {return null}

    // Load image
    const img = document.createElement('img')
    img.crossOrigin = 'anonymous'

    return new Promise((resolve) => {
      img.onload = () => {
        // Set canvas size to crop dimensions
        canvas.width = crop.width
        canvas.height = crop.height

        // Apply background
        if (backgroundColor && backgroundColor !== 'transparent') {
          ctx.fillStyle = backgroundColor
          ctx.fillRect(0, 0, canvas.width, canvas.height)
        }

        // Save context state
        ctx.save()

        // Move to center for rotation/flip
        ctx.translate(canvas.width / 2, canvas.height / 2)

        // Apply rotation
        if (rotation !== 0) {
          ctx.rotate((rotation * Math.PI) / 180)
        }

        // Apply flip
        ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1)

        // Move back
        ctx.translate(-canvas.width / 2, -canvas.height / 2)

        // Draw cropped image
        ctx.drawImage(
          img,
          crop.x,
          crop.y,
          crop.width,
          crop.height,
          0,
          0,
          crop.width,
          crop.height
        )

        // Restore context
        ctx.restore()

        // Convert to blob
        canvas.toBlob(
          (blob) => {
            resolve(blob)
          },
          outputFormat || 'image/png',
          outputQuality || 0.92
        )
      }

      img.onerror = () => {
        resolve(null)
      }

      img.src = this.state.imageSrc!
    })
  }

  /**
   * Get the cropped image as a Data URL
   */
  async getCroppedImageDataURL(): Promise<string | null> {
    const blob = await this.getCroppedImage()
    if (!blob) {return null}

    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = () => resolve(null)
      reader.readAsDataURL(blob)
    })
  }

  /**
   * Check if image is loaded
   */
  isImageLoaded(): boolean {
    return this.state.imageLoaded
  }

  override destroy(): void {
    // Clean up document event listeners using bound handlers
    document.removeEventListener('mousemove', this.boundHandleMove)
    document.removeEventListener('mouseup', this.boundHandleEnd)
    document.removeEventListener('touchmove', this.boundHandleMove)
    document.removeEventListener('touchend', this.boundHandleEnd)

    // Clean up crop area event listeners
    if (this.cropAreaEl) {
      this.cropAreaEl.removeEventListener('mousedown', this.boundHandleDragStart)
      this.cropAreaEl.removeEventListener('touchstart', this.boundHandleDragStart)

      // Clean up resize handle listeners
      this.cropAreaEl.querySelectorAll('[data-coral-image-crop-handle]').forEach((handle) => {
        (handle as HTMLElement).removeEventListener('mousedown', this.boundHandleResizeStart as EventListener)
        ;(handle as HTMLElement).removeEventListener('touchstart', this.boundHandleResizeStart as EventListener)
      })
    }

    // Clean up wheel listener
    this.containerEl?.removeEventListener('wheel', this.boundHandleWheel)

    // Clean up blob URL if created
    if (this.state.imageSrc?.startsWith('blob:')) {
      URL.revokeObjectURL(this.state.imageSrc)
    }

    // Remove crop area
    this.cropAreaEl?.remove()

    super.destroy()
  }
}

/**
 * Create ImageCrop component factory
 */
export const createImageCrop = createComponentFactory(ImageCrop)

export default ImageCrop
