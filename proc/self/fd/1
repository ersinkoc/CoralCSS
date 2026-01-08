// src/utils/string.ts
function generateId(prefix = "coral") {
  const random = Math.random().toString(36).substring(2, 10);
  return `${prefix}-${random}`;
}

// src/utils/dom.ts
function isBrowser() {
  return typeof window !== "undefined" && typeof document !== "undefined";
}
function getFocusableElements(container) {
  const selector = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    '[tabindex]:not([tabindex="-1"])'
  ].join(",");
  return Array.from(container.querySelectorAll(selector));
}
function trapFocus(container) {
  const focusableElements = getFocusableElements(container);
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];
  const handleKeyDown = (event) => {
    if (event.key !== "Tab") {
      return;
    }
    if (event.shiftKey) {
      if (document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable?.focus();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable?.focus();
      }
    }
  };
  container.addEventListener("keydown", handleKeyDown);
  firstFocusable?.focus();
  return () => {
    container.removeEventListener("keydown", handleKeyDown);
  };
}
function lockScroll() {
  if (!isBrowser()) {
    return () => {
    };
  }
  const scrollY = window.scrollY;
  const body = document.body;
  const originalStyle = body.style.cssText;
  body.style.position = "fixed";
  body.style.top = `-${scrollY}px`;
  body.style.left = "0";
  body.style.right = "0";
  body.style.overflow = "hidden";
  return () => {
    body.style.cssText = originalStyle;
    window.scrollTo(0, scrollY);
  };
}
var focusTrapCleanups = /* @__PURE__ */ new WeakMap();
function releaseFocusTrap(container) {
  const cleanup = focusTrapCleanups.get(container);
  if (cleanup) {
    cleanup();
    focusTrapCleanups.delete(container);
  }
}
var scrollLockCleanup = null;
function unlockScroll() {
  if (scrollLockCleanup) {
    scrollLockCleanup();
    scrollLockCleanup = null;
  }
}

// src/components/base.ts
var BaseComponent = class {
  id;
  name;
  element;
  state;
  config;
  hooks;
  boundHandlers = /* @__PURE__ */ new Map();
  stateListeners = /* @__PURE__ */ new Set();
  constructor(element, config = {}) {
    this.element = element;
    this.name = this.constructor.name.toLowerCase();
    this.id = element.id || generateId(this.name);
    this.config = {
      ...this.getDefaultConfig(),
      ...config
    };
    this.hooks = config.hooks ?? {};
    this.state = this.getInitialState();
    this.init();
  }
  /**
   * Initialize the component
   */
  init() {
    if (!this.element.id) {
      this.element.id = generateId(this.name);
    }
    this.setupAria();
    this.bindEvents();
    this.hooks.onInit?.(this.getContext());
  }
  /**
   * Get component context for hooks
   */
  getContext() {
    return {
      element: this.element,
      state: { ...this.state },
      config: { ...this.config },
      component: this
    };
  }
  /**
   * Update component state
   */
  setState(updates) {
    const prevState = { ...this.state };
    this.state = { ...this.state, ...updates };
    this.hooks.onStateChange?.(prevState, this.state, this.getContext());
    this.notifyStateListeners();
    this.render();
  }
  /**
   * Notify all state listeners
   */
  notifyStateListeners() {
    this.stateListeners.forEach((listener) => listener(this.state));
  }
  /**
   * Subscribe to state changes
   */
  subscribe(listener) {
    this.stateListeners.add(listener);
    return () => {
      this.stateListeners.delete(listener);
    };
  }
  /**
   * Mount component to DOM (no-op for existing element)
   */
  mount(_container) {
    this.hooks.onMount?.();
  }
  /**
   * Unmount component from DOM
   */
  unmount() {
    this.hooks.onUnmount?.();
  }
  /**
   * Update component props
   */
  update(props) {
    this.config = { ...this.config, ...props };
    this.hooks.onUpdate?.(props);
    this.render();
  }
  /**
   * Render/update the component
   */
  render() {
  }
  /**
   * Add event listener with cleanup tracking
   */
  addEventListener(target, event, handler, options) {
    const key = `${event}-${handler.toString().slice(0, 50)}`;
    this.boundHandlers.set(key, handler);
    target.addEventListener(event, handler, options);
  }
  /**
   * Remove event listener
   */
  removeEventListener(target, event, handler, options) {
    target.removeEventListener(event, handler, options);
  }
  /**
   * Query element within component
   */
  query(selector) {
    return this.element.querySelector(selector);
  }
  /**
   * Query all elements within component
   */
  queryAll(selector) {
    return this.element.querySelectorAll(selector);
  }
  /**
   * Dispatch custom event
   */
  dispatch(eventName, detail) {
    const event = new CustomEvent(`coral:${this.name}:${eventName}`, {
      detail,
      bubbles: true,
      cancelable: true
    });
    return this.element.dispatchEvent(event);
  }
  /**
   * Trap focus within element
   */
  trapFocus(element) {
    trapFocus(element ?? this.element);
  }
  /**
   * Release focus trap
   */
  releaseFocusTrap(element) {
    releaseFocusTrap(element ?? this.element);
  }
  /**
   * Lock scroll
   */
  lockScroll() {
    lockScroll();
  }
  /**
   * Unlock scroll
   */
  unlockScroll() {
    unlockScroll();
  }
  /**
   * Check if component is open/active
   */
  isOpen() {
    return this.state.isOpen ?? false;
  }
  /**
   * Get current state
   */
  getState() {
    return { ...this.state };
  }
  /**
   * Open the component (if applicable)
   */
  open() {
    if (!this.state.isOpen) {
      this.setState({ isOpen: true });
      this.hooks.onOpen?.(this.getContext());
      this.dispatch("open");
    }
  }
  /**
   * Close the component (if applicable)
   */
  close() {
    if (this.state.isOpen) {
      this.setState({ isOpen: false });
      this.hooks.onClose?.(this.getContext());
      this.dispatch("close");
    }
  }
  /**
   * Toggle the component (if applicable)
   */
  toggle() {
    if (this.state.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
  /**
   * Destroy the component and clean up
   */
  destroy() {
    this.boundHandlers.forEach((handler, key) => {
      const event = key.split("-")[0];
      if (event) {
        this.element.removeEventListener(event, handler);
        document.removeEventListener(event, handler);
      }
    });
    this.boundHandlers.clear();
    this.stateListeners.clear();
    this.releaseFocusTrap();
    this.unlockScroll();
    this.hooks.onDestroy?.(this.getContext());
    this.dispatch("destroy");
  }
};
function createComponentFactory(ComponentClass) {
  return (element, config) => {
    const el = typeof element === "string" ? document.querySelector(element) : element;
    if (!el) {
      throw new Error(`Element not found: ${element}`);
    }
    return new ComponentClass(el, config);
  };
}

// src/components/accordion.ts
var Accordion = class extends BaseComponent {
  items;
  triggers;
  panels;
  getDefaultConfig() {
    return {
      multiple: false,
      collapsible: true,
      itemSelector: "[data-coral-accordion-item]",
      triggerSelector: "[data-coral-accordion-trigger]",
      panelSelector: "[data-coral-accordion-panel]",
      defaultOpen: []
    };
  }
  getInitialState() {
    return {
      openPanels: new Set(this.config.defaultOpen ?? []),
      focusedIndex: -1
    };
  }
  setupAria() {
    this.triggers = [];
    this.panels = [];
    this.items = Array.from(this.queryAll(this.config.itemSelector));
    this.items.forEach((item, index) => {
      const trigger = item.querySelector(this.config.triggerSelector);
      const panel = item.querySelector(this.config.panelSelector);
      if (trigger && panel) {
        this.triggers.push(trigger);
        this.panels.push(panel);
        if (!trigger.id) {
          trigger.id = `${this.element.id}-trigger-${index}`;
        }
        if (!panel.id) {
          panel.id = `${this.element.id}-panel-${index}`;
        }
        trigger.setAttribute("aria-expanded", String(this.state.openPanels.has(index)));
        trigger.setAttribute("aria-controls", panel.id);
        panel.setAttribute("role", "region");
        panel.setAttribute("aria-labelledby", trigger.id);
        if (!this.state.openPanels.has(index)) {
          panel.setAttribute("hidden", "");
        }
      }
    });
  }
  bindEvents() {
    this.triggers.forEach((trigger, index) => {
      this.addEventListener(trigger, "click", () => this.togglePanel(index));
      this.addEventListener(trigger, "keydown", (e) => this.handleKeydown(e, index));
      this.addEventListener(trigger, "focus", () => {
        this.setState({ focusedIndex: index });
      });
    });
  }
  handleKeydown(e, index) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        this.focusNextTrigger();
        break;
      case "ArrowUp":
        e.preventDefault();
        this.focusPreviousTrigger();
        break;
      case "Home":
        e.preventDefault();
        this.focusTrigger(0);
        break;
      case "End":
        e.preventDefault();
        this.focusTrigger(this.triggers.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        this.togglePanel(index);
        break;
    }
  }
  focusTrigger(index) {
    if (index >= 0 && index < this.triggers.length) {
      this.triggers[index]?.focus();
    }
  }
  focusNextTrigger() {
    const next = (this.state.focusedIndex + 1) % this.triggers.length;
    this.focusTrigger(next);
  }
  focusPreviousTrigger() {
    const prev = this.state.focusedIndex <= 0 ? this.triggers.length - 1 : this.state.focusedIndex - 1;
    this.focusTrigger(prev);
  }
  togglePanel(index) {
    const isOpen = this.state.openPanels.has(index);
    if (isOpen) {
      if (this.config.collapsible || this.state.openPanels.size > 1) {
        this.closePanel(index);
      }
    } else {
      this.openPanel(index);
    }
  }
  /**
   * Open a panel by index
   */
  openPanel(index) {
    if (index < 0 || index >= this.panels.length) return;
    const newOpenPanels = new Set(this.state.openPanels);
    if (!this.config.multiple) {
      newOpenPanels.clear();
    }
    newOpenPanels.add(index);
    this.setState({ openPanels: newOpenPanels });
    this.dispatch("open", { index });
  }
  /**
   * Close a panel by index
   */
  closePanel(index) {
    if (index < 0 || index >= this.panels.length) return;
    if (!this.state.openPanels.has(index)) return;
    const newOpenPanels = new Set(this.state.openPanels);
    newOpenPanels.delete(index);
    this.setState({ openPanels: newOpenPanels });
    this.dispatch("close", { index });
  }
  render() {
    this.triggers.forEach((trigger, index) => {
      const panel = this.panels[index];
      const item = this.items[index];
      const isOpen = this.state.openPanels.has(index);
      trigger.setAttribute("aria-expanded", String(isOpen));
      if (isOpen) {
        trigger.setAttribute("data-open", "");
        panel?.removeAttribute("hidden");
        panel?.setAttribute("data-open", "");
        item?.setAttribute("data-open", "");
      } else {
        trigger.removeAttribute("data-open");
        panel?.setAttribute("hidden", "");
        panel?.removeAttribute("data-open");
        item?.removeAttribute("data-open");
      }
    });
  }
  /**
   * Check if a panel is open
   */
  isPanelOpen(index) {
    return this.state.openPanels.has(index);
  }
  /**
   * Get all open panel indices
   */
  getOpenPanels() {
    return Array.from(this.state.openPanels);
  }
  /**
   * Open all panels (only works when multiple is true)
   */
  openAll() {
    if (!this.config.multiple) return;
    const newOpenPanels = /* @__PURE__ */ new Set();
    this.panels.forEach((_, index) => newOpenPanels.add(index));
    this.setState({ openPanels: newOpenPanels });
    this.dispatch("openAll");
  }
  /**
   * Close all panels
   */
  closeAll() {
    if (!this.config.collapsible) return;
    this.setState({ openPanels: /* @__PURE__ */ new Set() });
    this.dispatch("closeAll");
  }
};
var createAccordion = createComponentFactory(Accordion);
var accordion_default = Accordion;
export {
  Accordion,
  createAccordion,
  accordion_default as default
};
