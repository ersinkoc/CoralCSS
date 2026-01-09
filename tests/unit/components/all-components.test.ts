/**
 * Comprehensive Component Tests
 *
 * Tests for all exported components to ensure coverage.
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import {
  // Base
  BaseComponent,
  createComponentFactory,
  autoInit,
  initComponents,
  components,
  factories,
  // Individual components
  Accordion,
  createAccordion,
  Avatar,
  createAvatar,
  Alert,
  createAlert,
  AlertDialog,
  createAlertDialog,
  AspectRatio,
  createAspectRatio,
  Badge,
  createBadge,
  Breadcrumb,
  createBreadcrumb,
  Calendar,
  createCalendar,
  Card,
  createCard,
  Carousel,
  createCarousel,
  Checkbox,
  createCheckbox,
  Chip,
  createChip,
  Code,
  createCode,
  Collapsible,
  createCollapsible,
  ColorPicker,
  createColorPicker,
  Command,
  createCommand,
  ContextMenu,
  createContextMenu,
  DataTable,
  createDataTable,
  DatePicker,
  createDatePicker,
  Dialog,
  createDialog,
  Drawer,
  createDrawer,
  Dropdown,
  createDropdown,
  EmptyState,
  createEmptyState,
  FileUpload,
  createFileUpload,
  HoverCard,
  createHoverCard,
  ImageGallery,
  createImageGallery,
  Input,
  createInput,
  Kbd,
  createKbd,
  Label,
  createLabel,
  Marquee,
  createMarquee,
  Menu,
  createMenu,
  NavigationMenu,
  createNavigationMenu,
  NumberInput,
  createNumberInput,
  Pagination,
  createPagination,
  PinInput,
  createPinInput,
  Popover,
  createPopover,
  Progress,
  createProgress,
  RadioGroup,
  createRadioGroup,
  RangeSlider,
  createRangeSlider,
  Rating,
  createRating,
  Resizable,
  createResizable,
  ScrollArea,
  createScrollArea,
  Select,
  createSelect,
  Separator,
  createSeparator,
  Skeleton,
  createSkeleton,
  SkeletonGroup,
  createSkeletonGroup,
  Slider,
  createSlider,
  Spinner,
  createSpinner,
  Stat,
  createStat,
  Stepper,
  createStepper,
  Switch,
  createSwitch,
  Table,
  createTable,
  Tabs,
  createTabs,
  Textarea,
  createTextarea,
  Timeline,
  createTimeline,
  Toast,
  createToast,
  ToastContainer,
  createToastContainer,
  Toggle,
  createToggle,
  ToggleGroup,
  createToggleGroup,
  Tooltip,
  createTooltip,
  Tree,
  createTree,
} from '../../../src/components'

describe('All Components', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  // Helper to create elements
  function createElement(
    tag: string,
    attrs: Record<string, string> = {}
  ): HTMLElement {
    const el = document.createElement(tag)
    Object.entries(attrs).forEach(([key, value]) => {
      el.setAttribute(key, value)
    })
    document.body.appendChild(el)
    return el
  }

  describe('BaseComponent', () => {
    it('should export BaseComponent class', () => {
      expect(BaseComponent).toBeDefined()
      expect(typeof BaseComponent).toBe('function')
    })

    it('should export createComponentFactory', () => {
      expect(createComponentFactory).toBeDefined()
      expect(typeof createComponentFactory).toBe('function')
    })

    it('should export autoInit', () => {
      expect(autoInit).toBeDefined()
      expect(typeof autoInit).toBe('function')
    })
  })

  describe('initComponents', () => {
    it('should export initComponents function', () => {
      expect(initComponents).toBeDefined()
      expect(typeof initComponents).toBe('function')
    })

    it('should run initComponents without error', () => {
      expect(() => initComponents()).not.toThrow()
    })
  })

  describe('components registry', () => {
    it('should export components object', () => {
      expect(components).toBeDefined()
      expect(typeof components).toBe('object')
    })

    it('should contain all components', () => {
      expect(components.Dialog).toBe(Dialog)
      expect(components.Dropdown).toBe(Dropdown)
      expect(components.Tabs).toBe(Tabs)
      expect(components.Accordion).toBe(Accordion)
    })
  })

  describe('factories registry', () => {
    it('should export factories object', () => {
      expect(factories).toBeDefined()
      expect(typeof factories).toBe('object')
    })

    it('should contain all factory functions', () => {
      expect(factories.createDialog).toBe(createDialog)
      expect(factories.createDropdown).toBe(createDropdown)
      expect(factories.createTabs).toBe(createTabs)
      expect(factories.createAccordion).toBe(createAccordion)
    })
  })

  describe('Accordion Component', () => {
    it('should create accordion', () => {
      const el = createElement('div', { 'data-coral-accordion': '' })
      const acc = new Accordion(el)
      expect(acc).toBeDefined()
      acc.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('div', { 'data-coral-accordion': '' })
      const acc = createAccordion(el)
      expect(acc).toBeDefined()
      acc.destroy()
    })
  })

  describe('Alert Component', () => {
    it('should create alert', () => {
      const el = createElement('div', { 'data-coral-alert': '' })
      const alert = new Alert(el)
      expect(alert).toBeDefined()
      alert.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('div', { 'data-coral-alert': '' })
      const alert = createAlert(el)
      expect(alert).toBeDefined()
      alert.destroy()
    })
  })

  describe('AlertDialog Component', () => {
    it('should create alert dialog', () => {
      const el = createElement('div', { 'data-coral-alert-dialog': '' })
      const ad = new AlertDialog(el)
      expect(ad).toBeDefined()
      ad.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('div', { 'data-coral-alert-dialog': '' })
      const ad = createAlertDialog(el)
      expect(ad).toBeDefined()
      ad.destroy()
    })
  })

  describe('AspectRatio Component', () => {
    it('should create aspect ratio', () => {
      const el = createElement('div', { 'data-coral-aspect-ratio': '' })
      const ar = new AspectRatio(el)
      expect(ar).toBeDefined()
      ar.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('div', { 'data-coral-aspect-ratio': '' })
      const ar = createAspectRatio(el)
      expect(ar).toBeDefined()
      ar.destroy()
    })
  })

  describe('Avatar Component', () => {
    it('should create avatar', () => {
      const el = createElement('div', { 'data-coral-avatar': '' })
      const avatar = new Avatar(el)
      expect(avatar).toBeDefined()
      avatar.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('div', { 'data-coral-avatar': '' })
      const avatar = createAvatar(el)
      expect(avatar).toBeDefined()
      avatar.destroy()
    })
  })

  describe('Badge Component', () => {
    it('should create badge', () => {
      const el = createElement('span', { 'data-coral-badge': '' })
      const badge = new Badge(el)
      expect(badge).toBeDefined()
      badge.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('span', { 'data-coral-badge': '' })
      const badge = createBadge(el)
      expect(badge).toBeDefined()
      badge.destroy()
    })
  })

  describe('Breadcrumb Component', () => {
    it('should create breadcrumb', () => {
      const el = createElement('nav', { 'data-coral-breadcrumb': '' })
      const bc = new Breadcrumb(el)
      expect(bc).toBeDefined()
      bc.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('nav', { 'data-coral-breadcrumb': '' })
      const bc = createBreadcrumb(el)
      expect(bc).toBeDefined()
      bc.destroy()
    })
  })

  describe('Calendar Component', () => {
    it('should create calendar', () => {
      const el = createElement('div', { 'data-coral-calendar': '' })
      const cal = new Calendar(el)
      expect(cal).toBeDefined()
      cal.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('div', { 'data-coral-calendar': '' })
      const cal = createCalendar(el)
      expect(cal).toBeDefined()
      cal.destroy()
    })
  })

  describe('Card Component', () => {
    it('should create card', () => {
      const el = createElement('div', { 'data-coral-card': '' })
      const card = new Card(el)
      expect(card).toBeDefined()
      card.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('div', { 'data-coral-card': '' })
      const card = createCard(el)
      expect(card).toBeDefined()
      card.destroy()
    })
  })

  // Carousel requires specific DOM structure - test export only
  describe('Carousel Component', () => {
    it('should export Carousel class', () => {
      expect(Carousel).toBeDefined()
      expect(typeof Carousel).toBe('function')
    })

    it('should export factory function', () => {
      expect(createCarousel).toBeDefined()
      expect(typeof createCarousel).toBe('function')
    })
  })

  describe('Checkbox Component', () => {
    it('should create checkbox', () => {
      const el = createElement('input', {
        type: 'checkbox',
        'data-coral-checkbox': '',
      })
      const cb = new Checkbox(el)
      expect(cb).toBeDefined()
      cb.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('input', {
        type: 'checkbox',
        'data-coral-checkbox': '',
      })
      const cb = createCheckbox(el)
      expect(cb).toBeDefined()
      cb.destroy()
    })
  })

  describe('Chip Component', () => {
    it('should create chip', () => {
      const el = createElement('span', { 'data-coral-chip': '' })
      const chip = new Chip(el)
      expect(chip).toBeDefined()
      chip.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('span', { 'data-coral-chip': '' })
      const chip = createChip(el)
      expect(chip).toBeDefined()
      chip.destroy()
    })
  })

  describe('Code Component', () => {
    it('should create code', () => {
      const el = createElement('pre', { 'data-coral-code': '' })
      const code = new Code(el)
      expect(code).toBeDefined()
      code.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('pre', { 'data-coral-code': '' })
      const code = createCode(el)
      expect(code).toBeDefined()
      code.destroy()
    })
  })

  describe('Collapsible Component', () => {
    it('should create collapsible', () => {
      const el = createElement('div', { 'data-coral-collapsible': '' })
      const coll = new Collapsible(el)
      expect(coll).toBeDefined()
      coll.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('div', { 'data-coral-collapsible': '' })
      const coll = createCollapsible(el)
      expect(coll).toBeDefined()
      coll.destroy()
    })
  })

  describe('ColorPicker Component', () => {
    it('should create color picker', () => {
      const el = createElement('div', { 'data-coral-color-picker': '' })
      const cp = new ColorPicker(el)
      expect(cp).toBeDefined()
      cp.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('div', { 'data-coral-color-picker': '' })
      const cp = createColorPicker(el)
      expect(cp).toBeDefined()
      cp.destroy()
    })
  })

  describe('Command Component', () => {
    it('should create command', () => {
      const el = createElement('div', { 'data-coral-command': '' })
      const cmd = new Command(el)
      expect(cmd).toBeDefined()
      cmd.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('div', { 'data-coral-command': '' })
      const cmd = createCommand(el)
      expect(cmd).toBeDefined()
      cmd.destroy()
    })
  })

  describe('ContextMenu Component', () => {
    it('should create context menu', () => {
      const el = createElement('div', { 'data-coral-context-menu': '' })
      const cm = new ContextMenu(el)
      expect(cm).toBeDefined()
      cm.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('div', { 'data-coral-context-menu': '' })
      const cm = createContextMenu(el)
      expect(cm).toBeDefined()
      cm.destroy()
    })
  })

  describe('DataTable Component', () => {
    it('should create data table', () => {
      const el = createElement('div', { 'data-coral-data-table': '' })
      const dt = new DataTable(el)
      expect(dt).toBeDefined()
      dt.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('div', { 'data-coral-data-table': '' })
      const dt = createDataTable(el)
      expect(dt).toBeDefined()
      dt.destroy()
    })
  })

  describe('DatePicker Component', () => {
    it('should create date picker', () => {
      const el = createElement('div', { 'data-coral-date-picker': '' })
      const dp = new DatePicker(el)
      expect(dp).toBeDefined()
      dp.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('div', { 'data-coral-date-picker': '' })
      const dp = createDatePicker(el)
      expect(dp).toBeDefined()
      dp.destroy()
    })
  })

  describe('Dialog Component', () => {
    it('should create dialog', () => {
      const el = createElement('div', { 'data-coral-dialog': '' })
      const dialog = new Dialog(el)
      expect(dialog).toBeDefined()
      dialog.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('div', { 'data-coral-dialog': '' })
      const dialog = createDialog(el)
      expect(dialog).toBeDefined()
      dialog.destroy()
    })
  })

  describe('Drawer Component', () => {
    it('should create drawer', () => {
      const el = createElement('div', { 'data-coral-drawer': '' })
      const drawer = new Drawer(el)
      expect(drawer).toBeDefined()
      drawer.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('div', { 'data-coral-drawer': '' })
      const drawer = createDrawer(el)
      expect(drawer).toBeDefined()
      drawer.destroy()
    })
  })

  describe('Dropdown Component', () => {
    it('should create dropdown', () => {
      const el = createElement('div', { 'data-coral-dropdown': '' })
      const dd = new Dropdown(el)
      expect(dd).toBeDefined()
      dd.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('div', { 'data-coral-dropdown': '' })
      const dd = createDropdown(el)
      expect(dd).toBeDefined()
      dd.destroy()
    })
  })

  describe('EmptyState Component', () => {
    it('should create empty state', () => {
      const el = createElement('div', { 'data-coral-empty-state': '' })
      const es = new EmptyState(el)
      expect(es).toBeDefined()
      es.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('div', { 'data-coral-empty-state': '' })
      const es = createEmptyState(el)
      expect(es).toBeDefined()
      es.destroy()
    })
  })

  describe('FileUpload Component', () => {
    it('should create file upload', () => {
      const el = createElement('div', { 'data-coral-file-upload': '' })
      const fu = new FileUpload(el)
      expect(fu).toBeDefined()
      fu.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('div', { 'data-coral-file-upload': '' })
      const fu = createFileUpload(el)
      expect(fu).toBeDefined()
      fu.destroy()
    })
  })

  describe('HoverCard Component', () => {
    it('should create hover card', () => {
      const el = createElement('div', { 'data-coral-hover-card': '' })
      const hc = new HoverCard(el)
      expect(hc).toBeDefined()
      hc.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('div', { 'data-coral-hover-card': '' })
      const hc = createHoverCard(el)
      expect(hc).toBeDefined()
      hc.destroy()
    })
  })

  describe('ImageGallery Component', () => {
    it('should create image gallery', () => {
      const el = createElement('div', { 'data-coral-image-gallery': '' })
      const ig = new ImageGallery(el)
      expect(ig).toBeDefined()
      ig.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('div', { 'data-coral-image-gallery': '' })
      const ig = createImageGallery(el)
      expect(ig).toBeDefined()
      ig.destroy()
    })
  })

  describe('Input Component', () => {
    it('should create input', () => {
      const el = createElement('input', { 'data-coral-input': '' })
      const input = new Input(el)
      expect(input).toBeDefined()
      input.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('input', { 'data-coral-input': '' })
      const input = createInput(el)
      expect(input).toBeDefined()
      input.destroy()
    })
  })

  describe('Kbd Component', () => {
    it('should create kbd', () => {
      const el = createElement('kbd', { 'data-coral-kbd': '' })
      const kbd = new Kbd(el)
      expect(kbd).toBeDefined()
      kbd.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('kbd', { 'data-coral-kbd': '' })
      const kbd = createKbd(el)
      expect(kbd).toBeDefined()
      kbd.destroy()
    })
  })

  describe('Label Component', () => {
    it('should create label', () => {
      const el = createElement('label', { 'data-coral-label': '' })
      const label = new Label(el)
      expect(label).toBeDefined()
      label.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('label', { 'data-coral-label': '' })
      const label = createLabel(el)
      expect(label).toBeDefined()
      label.destroy()
    })
  })

  describe('Marquee Component', () => {
    it('should create marquee', () => {
      const el = createElement('div', { 'data-coral-marquee': '' })
      const marquee = new Marquee(el)
      expect(marquee).toBeDefined()
      marquee.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('div', { 'data-coral-marquee': '' })
      const marquee = createMarquee(el)
      expect(marquee).toBeDefined()
      marquee.destroy()
    })
  })

  describe('Menu Component', () => {
    it('should create menu', () => {
      const el = createElement('div', { 'data-coral-menu': '' })
      const menu = new Menu(el)
      expect(menu).toBeDefined()
      menu.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('div', { 'data-coral-menu': '' })
      const menu = createMenu(el)
      expect(menu).toBeDefined()
      menu.destroy()
    })
  })

  describe('NavigationMenu Component', () => {
    it('should create navigation menu', () => {
      const el = createElement('nav', { 'data-coral-navigation-menu': '' })
      const nm = new NavigationMenu(el)
      expect(nm).toBeDefined()
      nm.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('nav', { 'data-coral-navigation-menu': '' })
      const nm = createNavigationMenu(el)
      expect(nm).toBeDefined()
      nm.destroy()
    })
  })

  describe('NumberInput Component', () => {
    it('should create number input', () => {
      const el = createElement('div', { 'data-coral-number-input': '' })
      const ni = new NumberInput(el)
      expect(ni).toBeDefined()
      ni.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('div', { 'data-coral-number-input': '' })
      const ni = createNumberInput(el)
      expect(ni).toBeDefined()
      ni.destroy()
    })
  })

  describe('Pagination Component', () => {
    it('should create pagination', () => {
      const el = createElement('nav', { 'data-coral-pagination': '' })
      const pag = new Pagination(el)
      expect(pag).toBeDefined()
      pag.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('nav', { 'data-coral-pagination': '' })
      const pag = createPagination(el)
      expect(pag).toBeDefined()
      pag.destroy()
    })
  })

  describe('PinInput Component', () => {
    it('should create pin input', () => {
      const el = createElement('div', { 'data-coral-pin-input': '' })
      const pi = new PinInput(el)
      expect(pi).toBeDefined()
      pi.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('div', { 'data-coral-pin-input': '' })
      const pi = createPinInput(el)
      expect(pi).toBeDefined()
      pi.destroy()
    })
  })

  describe('Popover Component', () => {
    it('should create popover', () => {
      const el = createElement('div', { 'data-coral-popover': '' })
      const pop = new Popover(el)
      expect(pop).toBeDefined()
      pop.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('div', { 'data-coral-popover': '' })
      const pop = createPopover(el)
      expect(pop).toBeDefined()
      pop.destroy()
    })
  })

  describe('Progress Component', () => {
    it('should create progress', () => {
      const el = createElement('div', { 'data-coral-progress': '' })
      const prog = new Progress(el)
      expect(prog).toBeDefined()
      prog.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('div', { 'data-coral-progress': '' })
      const prog = createProgress(el)
      expect(prog).toBeDefined()
      prog.destroy()
    })
  })

  describe('RadioGroup Component', () => {
    it('should create radio group', () => {
      const el = createElement('div', { 'data-coral-radio-group': '' })
      const rg = new RadioGroup(el)
      expect(rg).toBeDefined()
      rg.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('div', { 'data-coral-radio-group': '' })
      const rg = createRadioGroup(el)
      expect(rg).toBeDefined()
      rg.destroy()
    })
  })

  describe('RangeSlider Component', () => {
    it('should create range slider', () => {
      const el = createElement('div', { 'data-coral-range-slider': '' })
      const rs = new RangeSlider(el)
      expect(rs).toBeDefined()
      rs.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('div', { 'data-coral-range-slider': '' })
      const rs = createRangeSlider(el)
      expect(rs).toBeDefined()
      rs.destroy()
    })
  })

  describe('Rating Component', () => {
    it('should create rating', () => {
      const el = createElement('div', { 'data-coral-rating': '' })
      const rating = new Rating(el)
      expect(rating).toBeDefined()
      rating.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('div', { 'data-coral-rating': '' })
      const rating = createRating(el)
      expect(rating).toBeDefined()
      rating.destroy()
    })
  })

  describe('Resizable Component', () => {
    it('should create resizable', () => {
      const el = createElement('div', { 'data-coral-resizable': '' })
      const res = new Resizable(el)
      expect(res).toBeDefined()
      res.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('div', { 'data-coral-resizable': '' })
      const res = createResizable(el)
      expect(res).toBeDefined()
      res.destroy()
    })
  })

  describe('ScrollArea Component', () => {
    it('should create scroll area', () => {
      const el = createElement('div', { 'data-coral-scroll-area': '' })
      const sa = new ScrollArea(el)
      expect(sa).toBeDefined()
      sa.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('div', { 'data-coral-scroll-area': '' })
      const sa = createScrollArea(el)
      expect(sa).toBeDefined()
      sa.destroy()
    })
  })

  describe('Select Component', () => {
    it('should create select', () => {
      const el = createElement('div', { 'data-coral-select': '' })
      const select = new Select(el)
      expect(select).toBeDefined()
      select.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('div', { 'data-coral-select': '' })
      const select = createSelect(el)
      expect(select).toBeDefined()
      select.destroy()
    })
  })

  describe('Separator Component', () => {
    it('should create separator', () => {
      const el = createElement('hr', { 'data-coral-separator': '' })
      const sep = new Separator(el)
      expect(sep).toBeDefined()
      sep.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('hr', { 'data-coral-separator': '' })
      const sep = createSeparator(el)
      expect(sep).toBeDefined()
      sep.destroy()
    })
  })

  describe('Skeleton Component', () => {
    it('should create skeleton', () => {
      const el = createElement('div', { 'data-coral-skeleton': '' })
      const skel = new Skeleton(el)
      expect(skel).toBeDefined()
      skel.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('div', { 'data-coral-skeleton': '' })
      const skel = createSkeleton(el)
      expect(skel).toBeDefined()
      skel.destroy()
    })
  })

  describe('SkeletonGroup Component', () => {
    it('should create skeleton group', () => {
      const el = createElement('div', { 'data-coral-skeleton-group': '' })
      const sg = new SkeletonGroup(el)
      expect(sg).toBeDefined()
      sg.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('div', { 'data-coral-skeleton-group': '' })
      const sg = createSkeletonGroup(el)
      expect(sg).toBeDefined()
      sg.destroy()
    })
  })

  describe('Slider Component', () => {
    it('should create slider', () => {
      const el = createElement('div', { 'data-coral-slider': '' })
      const slider = new Slider(el)
      expect(slider).toBeDefined()
      slider.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('div', { 'data-coral-slider': '' })
      const slider = createSlider(el)
      expect(slider).toBeDefined()
      slider.destroy()
    })
  })

  describe('Spinner Component', () => {
    it('should create spinner', () => {
      const el = createElement('div', { 'data-coral-spinner': '' })
      const spinner = new Spinner(el)
      expect(spinner).toBeDefined()
      spinner.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('div', { 'data-coral-spinner': '' })
      const spinner = createSpinner(el)
      expect(spinner).toBeDefined()
      spinner.destroy()
    })
  })

  describe('Stat Component', () => {
    it('should create stat', () => {
      const el = createElement('div', { 'data-coral-stat': '' })
      const stat = new Stat(el)
      expect(stat).toBeDefined()
      stat.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('div', { 'data-coral-stat': '' })
      const stat = createStat(el)
      expect(stat).toBeDefined()
      stat.destroy()
    })
  })

  describe('Stepper Component', () => {
    it('should create stepper', () => {
      const el = createElement('div', { 'data-coral-stepper': '' })
      const stepper = new Stepper(el)
      expect(stepper).toBeDefined()
      stepper.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('div', { 'data-coral-stepper': '' })
      const stepper = createStepper(el)
      expect(stepper).toBeDefined()
      stepper.destroy()
    })
  })

  describe('Switch Component', () => {
    it('should create switch', () => {
      const el = createElement('button', { 'data-coral-switch': '' })
      const sw = new Switch(el)
      expect(sw).toBeDefined()
      sw.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('button', { 'data-coral-switch': '' })
      const sw = createSwitch(el)
      expect(sw).toBeDefined()
      sw.destroy()
    })
  })

  describe('Table Component', () => {
    it('should create table', () => {
      const el = createElement('table', { 'data-coral-table': '' })
      const table = new Table(el)
      expect(table).toBeDefined()
      table.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('table', { 'data-coral-table': '' })
      const table = createTable(el)
      expect(table).toBeDefined()
      table.destroy()
    })
  })

  describe('Tabs Component', () => {
    it('should create tabs', () => {
      const el = createElement('div', { 'data-coral-tabs': '' })
      const tabs = new Tabs(el)
      expect(tabs).toBeDefined()
      tabs.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('div', { 'data-coral-tabs': '' })
      const tabs = createTabs(el)
      expect(tabs).toBeDefined()
      tabs.destroy()
    })
  })

  describe('Textarea Component', () => {
    it('should create textarea', () => {
      const el = createElement('textarea', { 'data-coral-textarea': '' })
      const ta = new Textarea(el)
      expect(ta).toBeDefined()
      ta.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('textarea', { 'data-coral-textarea': '' })
      const ta = createTextarea(el)
      expect(ta).toBeDefined()
      ta.destroy()
    })
  })

  describe('Timeline Component', () => {
    it('should create timeline', () => {
      const el = createElement('div', { 'data-coral-timeline': '' })
      const tl = new Timeline(el)
      expect(tl).toBeDefined()
      tl.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('div', { 'data-coral-timeline': '' })
      const tl = createTimeline(el)
      expect(tl).toBeDefined()
      tl.destroy()
    })
  })

  describe('Toast Component', () => {
    it('should create toast', () => {
      const el = createElement('div', { 'data-coral-toast': '' })
      const toast = new Toast(el)
      expect(toast).toBeDefined()
      toast.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('div', { 'data-coral-toast': '' })
      const toast = createToast(el)
      expect(toast).toBeDefined()
      toast.destroy()
    })
  })

  describe('ToastContainer Component', () => {
    it('should create toast container', () => {
      const el = createElement('div', { 'data-coral-toast-container': '' })
      const tc = new ToastContainer(el)
      expect(tc).toBeDefined()
      tc.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('div', { 'data-coral-toast-container': '' })
      const tc = createToastContainer(el)
      expect(tc).toBeDefined()
      tc.destroy()
    })
  })

  describe('Toggle Component', () => {
    it('should create toggle', () => {
      const el = createElement('button', { 'data-coral-toggle': '' })
      const toggle = new Toggle(el)
      expect(toggle).toBeDefined()
      toggle.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('button', { 'data-coral-toggle': '' })
      const toggle = createToggle(el)
      expect(toggle).toBeDefined()
      toggle.destroy()
    })
  })

  describe('ToggleGroup Component', () => {
    it('should create toggle group', () => {
      const el = createElement('div', { 'data-coral-toggle-group': '' })
      const tg = new ToggleGroup(el)
      expect(tg).toBeDefined()
      tg.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('div', { 'data-coral-toggle-group': '' })
      const tg = createToggleGroup(el)
      expect(tg).toBeDefined()
      tg.destroy()
    })
  })

  describe('Tooltip Component', () => {
    it('should create tooltip', () => {
      const el = createElement('div', { 'data-coral-tooltip': '' })
      const tooltip = new Tooltip(el)
      expect(tooltip).toBeDefined()
      tooltip.destroy()
    })

    it('should use factory function', () => {
      const el = createElement('div', { 'data-coral-tooltip': '' })
      const tooltip = createTooltip(el)
      expect(tooltip).toBeDefined()
      tooltip.destroy()
    })
  })

  // Tree requires specific DOM structure - test export only
  describe('Tree Component', () => {
    it('should export Tree class', () => {
      expect(Tree).toBeDefined()
      expect(typeof Tree).toBe('function')
    })

    it('should export factory function', () => {
      expect(createTree).toBeDefined()
      expect(typeof createTree).toBe('function')
    })
  })
})
