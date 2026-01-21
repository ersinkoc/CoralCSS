/**
 * Carousel Component
 *
 * Accessible carousel/slider component with touch support.
 * @module components/carousel
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

/**
 * Carousel configuration
 */
export interface CarouselConfig extends ComponentConfig {
  /**
   * Starting slide index (0-indexed)
   * @default 0
   */
  startIndex?: number

  /**
   * Number of slides to show at once
   * @default 1
   */
  slidesToShow?: number

  /**
   * Number of slides to scroll at once
   * @default 1
   */
  slidesToScroll?: number

  /**
   * Auto play slides
   * @default false
   */
  autoplay?: boolean

  /**
   * Auto play interval (ms)
   * @default 5000
   */
  autoplayInterval?: number

  /**
   * Pause autoplay on hover
   * @default true
   */
  pauseOnHover?: boolean

  /**
   * Loop/infinite scroll
   * @default false
   */
  loop?: boolean

  /**
   * Enable drag/swipe
   * @default true
   */
  draggable?: boolean

  /**
   * Swipe threshold (px)
   * @default 50
   */
  swipeThreshold?: number

  /**
   * Show navigation arrows
   * @default true
   */
  showArrows?: boolean

  /**
   * Show dot indicators
   * @default true
   */
  showDots?: boolean

  /**
   * Animation duration (ms)
   * @default 300
   */
  animationDuration?: number

  /**
   * Gap between slides (CSS value)
   * @default '0px'
   */
  gap?: string

  /**
   * Slide container selector
   * @default '[data-coral-carousel-track]'
   */
  trackSelector?: string

  /**
   * Slide selector
   * @default '[data-coral-carousel-slide]'
   */
  slideSelector?: string

  /**
   * Previous button selector
   * @default '[data-coral-carousel-prev]'
   */
  prevSelector?: string

  /**
   * Next button selector
   * @default '[data-coral-carousel-next]'
   */
  nextSelector?: string

  /**
   * Dots container selector
   * @default '[data-coral-carousel-dots]'
   */
  dotsSelector?: string
}

/**
 * Carousel state
 */
export interface CarouselState extends ComponentState {
  currentIndex: number
  totalSlides: number
  isAnimating: boolean
  isPaused: boolean
  isDragging: boolean
}

/**
 * Carousel component
 *
 * @example
 * ```html
 * <div data-coral-carousel>
 *   <div data-coral-carousel-viewport>
 *     <div data-coral-carousel-track>
 *       <div data-coral-carousel-slide>Slide 1</div>
 *       <div data-coral-carousel-slide>Slide 2</div>
 *       <div data-coral-carousel-slide>Slide 3</div>
 *     </div>
 *   </div>
 *   <button data-coral-carousel-prev aria-label="Previous">←</button>
 *   <button data-coral-carousel-next aria-label="Next">→</button>
 *   <div data-coral-carousel-dots></div>
 * </div>
 * ```
 */
export class Carousel extends BaseComponent {
  protected declare config: CarouselConfig
  protected declare state: CarouselState

  private track: HTMLElement | null = null
  private slides: HTMLElement[] = []
  private prevBtn: HTMLElement | null = null
  private nextBtn: HTMLElement | null = null
  private dotsContainer: HTMLElement | null = null
  private dots: HTMLElement[] = []

  private autoplayTimer: ReturnType<typeof setInterval> | null = null
  private animationTimeout: ReturnType<typeof setTimeout> | null = null
  private dragStartX = 0
  private dragCurrentX = 0
  private isDragging = false

  protected getDefaultConfig(): CarouselConfig {
    return {
      startIndex: 0,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      autoplayInterval: 5000,
      pauseOnHover: true,
      loop: false,
      draggable: true,
      swipeThreshold: 50,
      showArrows: true,
      showDots: true,
      animationDuration: 300,
      gap: '0px',
      trackSelector: '[data-coral-carousel-track]',
      slideSelector: '[data-coral-carousel-slide]',
      prevSelector: '[data-coral-carousel-prev]',
      nextSelector: '[data-coral-carousel-next]',
      dotsSelector: '[data-coral-carousel-dots]',
    }
  }

  protected getInitialState(): CarouselState {
    return {
      currentIndex: this.config.startIndex ?? 0,
      totalSlides: 0,
      isAnimating: false,
      isPaused: false,
      isDragging: false,
    }
  }

  protected setupAria(): void {
    this.track = this.query(this.config.trackSelector!)
    this.slides = Array.from(this.queryAll(this.config.slideSelector!))
    this.prevBtn = this.query(this.config.prevSelector!)
    this.nextBtn = this.query(this.config.nextSelector!)
    this.dotsContainer = this.query(this.config.dotsSelector!)

    this.state.totalSlides = this.slides.length

    // Set up carousel ARIA
    this.element.setAttribute('role', 'region')
    this.element.setAttribute('aria-roledescription', 'carousel')
    this.element.setAttribute('aria-label', 'Carousel')

    // Set up track
    if (this.track) {
      this.track.setAttribute('aria-live', 'polite')
      this.track.style.display = 'flex'
      this.track.style.gap = this.config.gap ?? '0px'
      this.track.style.transition = `transform ${this.config.animationDuration}ms ease-out`
    }

    // Set up slides
    this.slides.forEach((slide, index) => {
      slide.setAttribute('role', 'group')
      slide.setAttribute('aria-roledescription', 'slide')
      slide.setAttribute('aria-label', `Slide ${index + 1} of ${this.slides.length}`)
      slide.style.flex = `0 0 calc(${100 / (this.config.slidesToShow ?? 1)}% - ${this.config.gap ?? '0px'})`
    })

    // Set up navigation buttons
    if (this.prevBtn) {
      this.prevBtn.setAttribute('aria-label', 'Previous slide')
      this.prevBtn.setAttribute('aria-controls', this.id)
    }
    if (this.nextBtn) {
      this.nextBtn.setAttribute('aria-label', 'Next slide')
      this.nextBtn.setAttribute('aria-controls', this.id)
    }

    // Create dots
    if (this.config.showDots && this.dotsContainer) {
      this.createDots()
    }

    // Initial render
    this.goTo(this.state.currentIndex, false)

    // Start autoplay
    if (this.config.autoplay) {
      this.startAutoplay()
    }
  }

  protected bindEvents(): void {
    // Navigation buttons
    if (this.prevBtn) {
      this.addEventListener(this.prevBtn, 'click', () => this.previous())
    }
    if (this.nextBtn) {
      this.addEventListener(this.nextBtn, 'click', () => this.next())
    }

    // Keyboard navigation
    this.addEventListener(this.element, 'keydown', (e: Event) => {
      const keyEvent = e as KeyboardEvent
      switch (keyEvent.key) {
        case 'ArrowLeft':
          e.preventDefault()
          this.previous()
          break
        case 'ArrowRight':
          e.preventDefault()
          this.next()
          break
        case 'Home':
          e.preventDefault()
          this.goTo(0)
          break
        case 'End':
          e.preventDefault()
          this.goTo(this.state.totalSlides - 1)
          break
      }
    })

    // Pause on hover
    if (this.config.pauseOnHover && this.config.autoplay) {
      this.addEventListener(this.element, 'mouseenter', () => this.pause())
      this.addEventListener(this.element, 'mouseleave', () => this.resume())
    }

    // Touch/drag events
    if (this.config.draggable && this.track) {
      // Mouse events
      this.addEventListener(this.track, 'mousedown', (e: Event) => {
        this.handleDragStart(e as MouseEvent)
      })
      this.addEventListener(document, 'mousemove', (e: Event) => {
        this.handleDragMove(e as MouseEvent)
      })
      this.addEventListener(document, 'mouseup', () => {
        this.handleDragEnd()
      })

      // Touch events
      this.addEventListener(this.track, 'touchstart', (e: Event) => {
        this.handleTouchStart(e as TouchEvent)
      })
      this.addEventListener(this.track, 'touchmove', (e: Event) => {
        this.handleTouchMove(e as TouchEvent)
      })
      this.addEventListener(this.track, 'touchend', () => {
        this.handleDragEnd()
      })
    }

    // Focus management for accessibility
    this.addEventListener(this.element, 'focusin', () => {
      if (this.config.autoplay) {
        this.pause()
      }
    })
    this.addEventListener(this.element, 'focusout', () => {
      if (this.config.autoplay && !this.state.isPaused) {
        this.resume()
      }
    })
  }

  private createDots(): void {
    if (!this.dotsContainer) {return}

    this.dotsContainer.innerHTML = ''
    this.dotsContainer.setAttribute('role', 'tablist')
    this.dotsContainer.setAttribute('aria-label', 'Slide navigation')

    const dotCount = Math.ceil(
      (this.state.totalSlides - (this.config.slidesToShow ?? 1) + 1) /
        (this.config.slidesToScroll ?? 1)
    )

    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement('button')
      dot.setAttribute('role', 'tab')
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`)
      dot.setAttribute('data-coral-carousel-dot', '')
      dot.setAttribute('data-index', String(i))

      this.addEventListener(dot, 'click', () => {
        this.goTo(i * (this.config.slidesToScroll ?? 1))
      })

      this.dotsContainer.appendChild(dot)
      this.dots.push(dot)
    }
  }

  private updateDots(): void {
    const activeIndex = Math.floor(
      this.state.currentIndex / (this.config.slidesToScroll ?? 1)
    )

    this.dots.forEach((dot, index) => {
      const isActive = index === activeIndex
      dot.setAttribute('aria-selected', String(isActive))
      dot.toggleAttribute('data-active', isActive)
    })
  }

  private handleDragStart(e: MouseEvent): void {
    if (this.state.isAnimating) {return}

    this.isDragging = true
    this.dragStartX = e.clientX
    this.dragCurrentX = e.clientX

    if (this.track) {
      this.track.style.transition = 'none'
      this.track.style.cursor = 'grabbing'
    }

    this.setState({ isDragging: true })
  }

  private handleTouchStart(e: TouchEvent): void {
    if (this.state.isAnimating) {return}

    const touch = e.touches[0]
    if (!touch) {return}

    this.isDragging = true
    this.dragStartX = touch.clientX
    this.dragCurrentX = touch.clientX

    if (this.track) {
      this.track.style.transition = 'none'
    }

    this.setState({ isDragging: true })
  }

  private handleDragMove(e: MouseEvent): void {
    if (!this.isDragging) {return}

    e.preventDefault()
    this.dragCurrentX = e.clientX
    this.updateDragPosition()
  }

  private handleTouchMove(e: TouchEvent): void {
    if (!this.isDragging) {return}

    const touch = e.touches[0]
    if (!touch) {return}

    this.dragCurrentX = touch.clientX
    this.updateDragPosition()
  }

  private updateDragPosition(): void {
    if (!this.track) {return}

    const diff = this.dragCurrentX - this.dragStartX
    const slideWidth = this.slides[0]?.offsetWidth ?? 0
    const currentOffset = -this.state.currentIndex * slideWidth
    const newOffset = currentOffset + diff

    this.track.style.transform = `translateX(${newOffset}px)`
  }

  private handleDragEnd(): void {
    if (!this.isDragging) {return}

    this.isDragging = false

    if (this.track) {
      this.track.style.transition = `transform ${this.config.animationDuration}ms ease-out`
      this.track.style.cursor = ''
    }

    const diff = this.dragCurrentX - this.dragStartX
    const threshold = this.config.swipeThreshold ?? 50

    if (Math.abs(diff) >= threshold) {
      if (diff > 0) {
        this.previous()
      } else {
        this.next()
      }
    } else {
      // Snap back to current slide
      this.goTo(this.state.currentIndex, true)
    }

    this.setState({ isDragging: false })
  }

  protected override render(): void {
    const { currentIndex, totalSlides, isAnimating } = this.state
    const { slidesToShow, loop } = this.config

    // Update track position
    if (this.track && !this.isDragging) {
      const slideWidth = this.slides[0]?.offsetWidth ?? 0
      const offset = -currentIndex * slideWidth
      this.track.style.transform = `translateX(${offset}px)`
    }

    // Update slide visibility
    this.slides.forEach((slide, index) => {
      const isVisible =
        index >= currentIndex && index < currentIndex + (slidesToShow ?? 1)
      slide.setAttribute('aria-hidden', String(!isVisible))
      slide.setAttribute('tabindex', isVisible ? '0' : '-1')
    })

    // Update navigation button states
    const canGoPrev = loop || currentIndex > 0
    const canGoNext = loop || currentIndex < totalSlides - (slidesToShow ?? 1)

    if (this.prevBtn) {
      this.prevBtn.toggleAttribute('disabled', !canGoPrev)
      this.prevBtn.setAttribute('aria-disabled', String(!canGoPrev))
    }
    if (this.nextBtn) {
      this.nextBtn.toggleAttribute('disabled', !canGoNext)
      this.nextBtn.setAttribute('aria-disabled', String(!canGoNext))
    }

    // Update dots
    this.updateDots()

    // Update data attributes
    this.element.setAttribute('data-current', String(currentIndex))
    if (isAnimating) {
      this.element.setAttribute('data-animating', '')
    } else {
      this.element.removeAttribute('data-animating')
    }
  }

  /**
   * Go to a specific slide
   */
  goTo(index: number, animate = true): void {
    if (this.state.isAnimating) {return}

    const { totalSlides, currentIndex } = this.state
    const { slidesToShow, loop } = this.config
    const maxIndex = totalSlides - (slidesToShow ?? 1)

    let newIndex = index

    // Handle loop
    if (loop) {
      if (newIndex < 0) {
        newIndex = maxIndex
      } else if (newIndex > maxIndex) {
        newIndex = 0
      }
    } else {
      newIndex = Math.max(0, Math.min(index, maxIndex))
    }

    if (newIndex === currentIndex && animate) {return}

    // Temporarily disable animation if needed
    if (!animate && this.track) {
      this.track.style.transition = 'none'
    }

    this.setState({ currentIndex: newIndex, isAnimating: animate })

    // Re-enable animation
    if (!animate && this.track) {
      requestAnimationFrame(() => {
        if (this.track) {
          this.track.style.transition = `transform ${this.config.animationDuration}ms ease-out`
        }
      })
    }

    // Clear animating state after animation completes
    if (animate) {
      // Clear any existing animation timeout
      if (this.animationTimeout) {
        clearTimeout(this.animationTimeout)
      }
      this.animationTimeout = setTimeout(() => {
        this.animationTimeout = null
        this.setState({ isAnimating: false })
      }, this.config.animationDuration)
    }

    this.dispatch('change', { index: newIndex, previousIndex: currentIndex })
  }

  /**
   * Go to next slide(s)
   */
  next(): void {
    this.goTo(this.state.currentIndex + (this.config.slidesToScroll ?? 1))
    this.dispatch('next')
  }

  /**
   * Go to previous slide(s)
   */
  previous(): void {
    this.goTo(this.state.currentIndex - (this.config.slidesToScroll ?? 1))
    this.dispatch('previous')
  }

  /**
   * Start autoplay
   */
  startAutoplay(): void {
    if (this.autoplayTimer) {return}

    this.autoplayTimer = setInterval(() => {
      if (!this.state.isPaused) {
        this.next()
      }
    }, this.config.autoplayInterval)

    this.dispatch('autoplay:start')
  }

  /**
   * Stop autoplay
   */
  stopAutoplay(): void {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer)
      this.autoplayTimer = null
    }

    this.dispatch('autoplay:stop')
  }

  /**
   * Pause autoplay
   */
  pause(): void {
    this.setState({ isPaused: true })
    this.dispatch('pause')
  }

  /**
   * Resume autoplay
   */
  resume(): void {
    this.setState({ isPaused: false })
    this.dispatch('resume')
  }

  /**
   * Get current slide index
   */
  getCurrentIndex(): number {
    return this.state.currentIndex
  }

  /**
   * Get total slide count
   */
  getTotalSlides(): number {
    return this.state.totalSlides
  }

  /**
   * Check if can go to previous
   */
  canGoPrevious(): boolean {
    return this.config.loop || this.state.currentIndex > 0
  }

  /**
   * Check if can go to next
   */
  canGoNext(): boolean {
    return (
      this.config.loop ||
      this.state.currentIndex <
        this.state.totalSlides - (this.config.slidesToShow ?? 1)
    )
  }

  override destroy(): void {
    this.stopAutoplay()
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout)
      this.animationTimeout = null
    }
    super.destroy()
  }
}

/**
 * Create a carousel instance
 */
export const createCarousel = createComponentFactory(Carousel)

export default Carousel
