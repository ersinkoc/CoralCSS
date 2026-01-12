import { ComponentPageLayout } from './ComponentPageLayout'

// E-commerce component data
const ecommerceComponents = [
  {
    id: 'product-card',
    name: 'ProductCard',
    description: 'A card component for displaying product information with image, price, and actions.',
    usage: `<div class="bg-card rounded-xl shadow-md overflow-hidden group hover:shadow-lg transition-shadow">
  <div class="relative overflow-hidden">
    <img src="product.jpg" alt="Product" class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
    <span class="absolute top-2 right-2 bg-coral-500/100 text-white text-xs px-2 py-1 rounded-full">Sale</span>
    <button class="absolute top-2 left-2 p-2 bg-card/80 rounded-full hover:bg-card transition-colors">
      <svg class="w-5 h-5"><!-- heart icon --></svg>
    </button>
  </div>
  <div class="p-4">
    <h3 class="font-semibold text-foreground truncate">Product Name</h3>
    <p class="text-sm text-muted-foreground mt-1">Category</p>
    <div class="flex items-center justify-between mt-3">
      <div class="flex items-center gap-2">
        <span class="font-bold text-lg">$99.00</span>
        <span class="text-sm text-muted-foreground/70 line-through">$129.00</span>
      </div>
      <button class="p-2 bg-coral-500/100 text-white rounded-lg hover:bg-coral-600 transition-colors">
        <svg class="w-5 h-5"><!-- cart icon --></svg>
      </button>
    </div>
  </div>
</div>`,
    props: [
      { name: 'data-sale', type: 'boolean', default: 'false', description: 'Show sale badge' },
      { name: 'data-wishlist', type: 'boolean', default: 'false', description: 'Show wishlist button' },
      { name: 'data-quickview', type: 'boolean', default: 'false', description: 'Enable quick view on hover' },
    ],
    preview: ProductCardPreview,
  },
  {
    id: 'shopping-cart',
    name: 'ShoppingCart',
    description: 'A shopping cart component with item list, quantity controls, and totals.',
    usage: `<div class="bg-card rounded-xl shadow-lg p-6 max-w-md">
  <div class="flex items-center justify-between mb-4">
    <h2 class="text-lg font-semibold">Shopping Cart</h2>
    <span class="bg-coral-500/20 text-coral-600 text-sm px-2 py-0.5 rounded-full">3 items</span>
  </div>

  <div class="divide-y divide-border">
    <div class="flex gap-4 py-4">
      <img src="item.jpg" class="w-16 h-16 object-cover rounded-lg" />
      <div class="flex-1">
        <h3 class="font-medium text-foreground">Item Name</h3>
        <p class="text-sm text-muted-foreground">Size: M</p>
        <div class="flex items-center justify-between mt-2">
          <div class="flex items-center gap-2 bg-muted rounded-lg">
            <button class="p-1 hover:bg-muted rounded">-</button>
            <span class="px-2">1</span>
            <button class="p-1 hover:bg-muted rounded">+</button>
          </div>
          <span class="font-semibold">$49.00</span>
        </div>
      </div>
    </div>
  </div>

  <div class="border-t border-border pt-4 mt-4 space-y-2">
    <div class="flex justify-between text-sm">
      <span class="text-muted-foreground">Subtotal</span>
      <span>$147.00</span>
    </div>
    <div class="flex justify-between text-sm">
      <span class="text-muted-foreground">Shipping</span>
      <span>$9.99</span>
    </div>
    <div class="flex justify-between font-semibold text-lg pt-2 border-t">
      <span>Total</span>
      <span>$156.99</span>
    </div>
  </div>

  <button class="w-full mt-4 bg-coral-500/100 text-white py-3 rounded-lg font-semibold hover:bg-coral-600 transition-colors">
    Checkout
  </button>
</div>`,
    props: [
      { name: 'data-show-shipping', type: 'boolean', default: 'true', description: 'Show shipping cost' },
      { name: 'data-editable', type: 'boolean', default: 'true', description: 'Allow quantity editing' },
    ],
    preview: ShoppingCartPreview,
  },
  {
    id: 'price-tag',
    name: 'PriceTag',
    description: 'Display prices with currency, discounts, and formatting options.',
    usage: `<!-- Regular price -->
<span class="text-2xl font-bold text-foreground">$99.00</span>

<!-- Sale price -->
<div class="flex items-center gap-2">
  <span class="text-2xl font-bold text-coral-600">$79.00</span>
  <span class="text-lg text-muted-foreground/70 line-through">$99.00</span>
  <span class="bg-coral-500/20 text-coral-600 text-xs px-2 py-0.5 rounded-full">-20%</span>
</div>

<!-- Per unit price -->
<div class="flex flex-col">
  <span class="text-2xl font-bold">$29.99</span>
  <span class="text-sm text-muted-foreground">per month</span>
</div>`,
    props: [
      { name: 'data-currency', type: 'string', default: '"$"', description: 'Currency symbol' },
      { name: 'data-sale', type: 'boolean', default: 'false', description: 'Show sale styling' },
    ],
    preview: PriceTagPreview,
  },
  {
    id: 'quantity-selector',
    name: 'QuantitySelector',
    description: 'A number input with increment/decrement buttons for quantity selection.',
    usage: `<div class="inline-flex items-center border border-border rounded-lg">
  <button class="p-2 hover:bg-muted transition-colors disabled:opacity-50" disabled>
    <svg class="w-4 h-4"><!-- minus icon --></svg>
  </button>
  <input type="number" value="1" min="1" max="99" class="w-12 text-center border-x border-border py-2 focus:outline-none" />
  <button class="p-2 hover:bg-muted transition-colors">
    <svg class="w-4 h-4"><!-- plus icon --></svg>
  </button>
</div>`,
    props: [
      { name: 'min', type: 'number', default: '1', description: 'Minimum quantity' },
      { name: 'max', type: 'number', default: '99', description: 'Maximum quantity' },
      { name: 'step', type: 'number', default: '1', description: 'Increment step' },
    ],
    preview: QuantitySelectorPreview,
  },
  {
    id: 'cart-icon',
    name: 'CartIcon',
    description: 'A cart icon with item count badge.',
    usage: `<button class="relative p-2 hover:bg-muted rounded-full transition-colors">
  <svg class="w-6 h-6"><!-- cart icon --></svg>
  <span class="absolute -top-1 -right-1 bg-coral-500/100 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
    3
  </span>
</button>`,
    props: [
      { name: 'data-count', type: 'number', default: '0', description: 'Number of items in cart' },
      { name: 'data-animate', type: 'boolean', default: 'true', description: 'Animate on count change' },
    ],
    preview: CartIconPreview,
  },
  {
    id: 'product-gallery',
    name: 'ProductGallery',
    description: 'An image gallery for product detail pages with thumbnails.',
    usage: `<div class="flex flex-col gap-4">
  <div class="relative aspect-square rounded-xl overflow-hidden bg-muted">
    <img src="main.jpg" alt="Product" class="w-full h-full object-cover" />
    <button class="absolute top-4 right-4 p-2 bg-card/80 rounded-full hover:bg-card">
      <svg><!-- zoom icon --></svg>
    </button>
  </div>
  <div class="flex gap-2 overflow-x-auto pb-2">
    <button class="w-16 h-16 rounded-lg overflow-hidden ring-2 ring-coral-500 ring-offset-2">
      <img src="thumb1.jpg" class="w-full h-full object-cover" />
    </button>
    <button class="w-16 h-16 rounded-lg overflow-hidden hover:ring-2 hover:ring-border">
      <img src="thumb2.jpg" class="w-full h-full object-cover" />
    </button>
  </div>
</div>`,
    props: [
      { name: 'data-zoom', type: 'boolean', default: 'true', description: 'Enable image zoom' },
      { name: 'data-lightbox', type: 'boolean', default: 'true', description: 'Open in lightbox on click' },
    ],
    preview: ProductGalleryPreview,
  },
  {
    id: 'checkout-steps',
    name: 'CheckoutSteps',
    description: 'A step indicator for multi-step checkout process.',
    usage: `<div class="flex items-center justify-between">
  <div class="flex items-center gap-2">
    <div class="w-8 h-8 bg-coral-500/100 text-white rounded-full flex items-center justify-center">
      <svg class="w-4 h-4"><!-- check icon --></svg>
    </div>
    <span class="font-medium text-coral-600">Cart</span>
  </div>
  <div class="flex-1 h-0.5 bg-coral-500/100 mx-4"></div>
  <div class="flex items-center gap-2">
    <div class="w-8 h-8 bg-coral-500/100 text-white rounded-full flex items-center justify-center">2</div>
    <span class="font-medium text-coral-600">Shipping</span>
  </div>
  <div class="flex-1 h-0.5 bg-muted mx-4"></div>
  <div class="flex items-center gap-2">
    <div class="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center">3</div>
    <span class="text-muted-foreground">Payment</span>
  </div>
</div>`,
    props: [
      { name: 'data-current', type: 'number', default: '1', description: 'Current step (1-indexed)' },
      { name: 'data-orientation', type: '"horizontal" | "vertical"', default: '"horizontal"', description: 'Steps layout' },
    ],
    preview: CheckoutStepsPreview,
  },
  {
    id: 'payment-method',
    name: 'PaymentMethod',
    description: 'Payment method selection with card icons.',
    usage: `<div class="space-y-3">
  <label class="flex items-center gap-4 p-4 border border-border rounded-xl cursor-pointer hover:border-coral-500 has-[:checked]:border-coral-500 has-[:checked]:bg-coral-500/10">
    <input type="radio" name="payment" class="accent-coral-500" checked />
    <svg class="w-10 h-6"><!-- visa icon --></svg>
    <div class="flex-1">
      <span class="font-medium">Credit Card</span>
      <span class="text-sm text-muted-foreground ml-2">**** 4242</span>
    </div>
  </label>
  <label class="flex items-center gap-4 p-4 border border-border rounded-xl cursor-pointer hover:border-coral-500">
    <input type="radio" name="payment" class="accent-coral-500" />
    <svg class="w-10 h-6"><!-- paypal icon --></svg>
    <span class="font-medium">PayPal</span>
  </label>
</div>`,
    props: [
      { name: 'data-saved-cards', type: 'boolean', default: 'true', description: 'Show saved cards' },
    ],
    preview: PaymentMethodPreview,
  },
  {
    id: 'order-summary',
    name: 'OrderSummary',
    description: 'A summary card showing order details and totals.',
    usage: `<div class="bg-muted/50 rounded-xl p-6">
  <h3 class="font-semibold text-lg mb-4">Order Summary</h3>

  <div class="space-y-3 text-sm">
    <div class="flex justify-between">
      <span class="text-muted-foreground">Subtotal (3 items)</span>
      <span>$147.00</span>
    </div>
    <div class="flex justify-between">
      <span class="text-muted-foreground">Shipping</span>
      <span>$9.99</span>
    </div>
    <div class="flex justify-between">
      <span class="text-muted-foreground">Tax</span>
      <span>$14.70</span>
    </div>
    <div class="flex justify-between text-coral-600">
      <span>Discount (SAVE10)</span>
      <span>-$14.70</span>
    </div>
  </div>

  <div class="border-t mt-4 pt-4 flex justify-between font-semibold text-lg">
    <span>Total</span>
    <span>$156.99</span>
  </div>
</div>`,
    props: [
      { name: 'data-show-tax', type: 'boolean', default: 'true', description: 'Show tax breakdown' },
      { name: 'data-show-discount', type: 'boolean', default: 'true', description: 'Show discount if applied' },
    ],
    preview: OrderSummaryPreview,
  },
  {
    id: 'coupon-input',
    name: 'CouponInput',
    description: 'An input field for applying discount codes.',
    usage: `<div class="flex gap-2">
  <input type="text" placeholder="Enter coupon code" class="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500" />
  <button class="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-800 transition-colors">
    Apply
  </button>
</div>

<!-- Applied state -->
<div class="flex items-center justify-between p-3 bg-success/10 border border-success/30 rounded-lg">
  <div class="flex items-center gap-2">
    <svg class="w-5 h-5 text-success"><!-- check icon --></svg>
    <span class="font-medium text-success">SAVE10</span>
    <span class="text-success">- $14.70</span>
  </div>
  <button class="text-success hover:text-success/80">
    <svg class="w-5 h-5"><!-- x icon --></svg>
  </button>
</div>`,
    props: [
      { name: 'data-validate', type: 'boolean', default: 'true', description: 'Validate on apply' },
    ],
    preview: CouponInputPreview,
  },
  {
    id: 'wishlist-button',
    name: 'WishlistButton',
    description: 'A heart button for adding items to wishlist.',
    usage: `<!-- Not in wishlist -->
<button class="p-2 rounded-full hover:bg-muted transition-colors group">
  <svg class="w-6 h-6 text-muted-foreground/70 group-hover:text-coral-500 transition-colors">
    <!-- heart outline icon -->
  </svg>
</button>

<!-- In wishlist -->
<button class="p-2 rounded-full hover:bg-coral-500/10 transition-colors">
  <svg class="w-6 h-6 text-coral-500 fill-current">
    <!-- heart filled icon -->
  </svg>
</button>`,
    props: [
      { name: 'data-active', type: 'boolean', default: 'false', description: 'Is in wishlist' },
      { name: 'data-animate', type: 'boolean', default: 'true', description: 'Animate on toggle' },
    ],
    preview: WishlistButtonPreview,
  },
  {
    id: 'product-badge',
    name: 'ProductBadge',
    description: 'Badges for product status like New, Sale, Out of Stock.',
    usage: `<!-- Sale badge -->
<span class="bg-coral-500/100 text-white text-xs font-semibold px-2 py-1 rounded-full">-20% OFF</span>

<!-- New badge -->
<span class="bg-success text-white text-xs font-semibold px-2 py-1 rounded-full">NEW</span>

<!-- Out of stock badge -->
<span class="bg-muted/500 text-white text-xs font-semibold px-2 py-1 rounded-full">OUT OF STOCK</span>

<!-- Limited badge -->
<span class="bg-warning text-white text-xs font-semibold px-2 py-1 rounded-full">LIMITED</span>

<!-- Bestseller badge -->
<span class="bg-info text-white text-xs font-semibold px-2 py-1 rounded-full">BESTSELLER</span>`,
    props: [
      { name: 'data-type', type: '"sale" | "new" | "soldout" | "limited" | "bestseller"', default: '"sale"', description: 'Badge type' },
    ],
    preview: ProductBadgePreview,
  },
  {
    id: 'size-selector',
    name: 'SizeSelector',
    description: 'A size selection component for apparel products.',
    usage: `<div class="space-y-2">
  <label class="text-sm font-medium text-foreground">Size</label>
  <div class="flex flex-wrap gap-2">
    <button class="w-10 h-10 border border-border rounded-lg hover:border-border transition-colors">XS</button>
    <button class="w-10 h-10 border-2 border-coral-500 bg-coral-500/10 rounded-lg font-medium">S</button>
    <button class="w-10 h-10 border border-border rounded-lg hover:border-border transition-colors">M</button>
    <button class="w-10 h-10 border border-border rounded-lg hover:border-border transition-colors">L</button>
    <button class="w-10 h-10 border border-border rounded-lg text-muted-foreground/50 cursor-not-allowed" disabled>XL</button>
  </div>
</div>`,
    props: [
      { name: 'data-sizes', type: 'string[]', default: '["XS", "S", "M", "L", "XL"]', description: 'Available sizes' },
      { name: 'data-unavailable', type: 'string[]', default: '[]', description: 'Unavailable sizes' },
    ],
    preview: SizeSelectorPreview,
  },
  {
    id: 'color-swatch',
    name: 'ColorSwatch',
    description: 'Color selection swatches for product variants.',
    usage: `<div class="space-y-2">
  <label class="text-sm font-medium text-foreground">Color: <span class="text-muted-foreground">Navy</span></label>
  <div class="flex gap-2">
    <button class="w-8 h-8 bg-gray-900 rounded-full ring-2 ring-offset-2 ring-coral-500" aria-label="Black"></button>
    <button class="w-8 h-8 bg-blue-900 rounded-full hover:ring-2 hover:ring-offset-2 hover:ring-border" aria-label="Navy"></button>
    <button class="w-8 h-8 bg-card border-2 rounded-full hover:ring-2 hover:ring-offset-2 hover:ring-border" aria-label="White"></button>
    <button class="w-8 h-8 bg-destructive rounded-full hover:ring-2 hover:ring-offset-2 hover:ring-border" aria-label="Red"></button>
  </div>
</div>`,
    props: [
      { name: 'data-colors', type: 'string[]', default: '[]', description: 'Color options' },
      { name: 'data-show-label', type: 'boolean', default: 'true', description: 'Show selected color name' },
    ],
    preview: ColorSwatchPreview,
  },
  {
    id: 'review-stars',
    name: 'ReviewStars',
    description: 'Star rating display for product reviews.',
    usage: `<!-- Read-only stars -->
<div class="flex items-center gap-1">
  <svg class="w-5 h-5 text-warning fill-current"><!-- star --></svg>
  <svg class="w-5 h-5 text-warning fill-current"><!-- star --></svg>
  <svg class="w-5 h-5 text-warning fill-current"><!-- star --></svg>
  <svg class="w-5 h-5 text-warning fill-current"><!-- star --></svg>
  <svg class="w-5 h-5 text-muted-foreground/50"><!-- star outline --></svg>
  <span class="ml-2 text-sm text-muted-foreground">(127 reviews)</span>
</div>

<!-- Interactive rating -->
<div class="flex items-center gap-1" role="radiogroup">
  <button class="text-warning hover:scale-110 transition-transform">
    <svg class="w-6 h-6 fill-current"><!-- star --></svg>
  </button>
</div>`,
    props: [
      { name: 'data-rating', type: 'number', default: '0', description: 'Current rating (0-5)' },
      { name: 'data-readonly', type: 'boolean', default: 'true', description: 'Read-only display' },
      { name: 'data-count', type: 'number', default: '0', description: 'Number of reviews' },
    ],
    preview: ReviewStarsPreview,
  },
  {
    id: 'stock-indicator',
    name: 'StockIndicator',
    description: 'Shows product availability and stock level.',
    usage: `<!-- In stock -->
<div class="flex items-center gap-2 text-success">
  <span class="w-2 h-2 bg-success rounded-full"></span>
  <span class="text-sm font-medium">In Stock</span>
</div>

<!-- Low stock -->
<div class="flex items-center gap-2 text-warning">
  <span class="w-2 h-2 bg-warning rounded-full animate-pulse"></span>
  <span class="text-sm font-medium">Only 3 left</span>
</div>

<!-- Out of stock -->
<div class="flex items-center gap-2 text-muted-foreground">
  <span class="w-2 h-2 bg-muted-foreground/50 rounded-full"></span>
  <span class="text-sm font-medium">Out of Stock</span>
</div>`,
    props: [
      { name: 'data-stock', type: 'number', default: '0', description: 'Stock quantity' },
      { name: 'data-low-threshold', type: 'number', default: '5', description: 'Low stock threshold' },
    ],
    preview: StockIndicatorPreview,
  },
  {
    id: 'shipping-estimate',
    name: 'ShippingEstimate',
    description: 'Displays estimated shipping date and delivery options.',
    usage: `<div class="p-4 bg-muted/50 rounded-lg">
  <div class="flex items-center gap-3 mb-3">
    <svg class="w-5 h-5 text-muted-foreground"><!-- truck icon --></svg>
    <span class="font-medium">Free shipping</span>
  </div>
  <div class="space-y-2 text-sm">
    <div class="flex justify-between">
      <span class="text-muted-foreground">Standard (5-7 days)</span>
      <span class="font-medium text-success">FREE</span>
    </div>
    <div class="flex justify-between">
      <span class="text-muted-foreground">Express (2-3 days)</span>
      <span class="font-medium">$9.99</span>
    </div>
    <div class="flex justify-between">
      <span class="text-muted-foreground">Next Day</span>
      <span class="font-medium">$19.99</span>
    </div>
  </div>
  <p class="text-xs text-muted-foreground mt-3">Order within 2h 34m for next day delivery</p>
</div>`,
    props: [
      { name: 'data-free-threshold', type: 'number', default: '50', description: 'Free shipping threshold' },
    ],
    preview: ShippingEstimatePreview,
  },
  {
    id: 'product-filters',
    name: 'ProductFilters',
    description: 'Sidebar filters for product listing pages.',
    usage: `<div class="space-y-6">
  <div>
    <h3 class="font-semibold mb-3">Category</h3>
    <div class="space-y-2">
      <label class="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" class="rounded accent-coral-500" />
        <span>Electronics</span>
        <span class="text-muted-foreground/70 ml-auto">(234)</span>
      </label>
      <label class="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" class="rounded accent-coral-500" checked />
        <span>Clothing</span>
        <span class="text-muted-foreground/70 ml-auto">(156)</span>
      </label>
    </div>
  </div>

  <div>
    <h3 class="font-semibold mb-3">Price Range</h3>
    <div class="flex items-center gap-2">
      <input type="number" placeholder="Min" class="w-20 px-2 py-1 border border-border rounded" />
      <span>-</span>
      <input type="number" placeholder="Max" class="w-20 px-2 py-1 border border-border rounded" />
    </div>
  </div>

  <div>
    <h3 class="font-semibold mb-3">Color</h3>
    <div class="flex flex-wrap gap-2">
      <button class="w-6 h-6 bg-destructive rounded-full ring-2 ring-offset-2 ring-coral-500"></button>
      <button class="w-6 h-6 bg-blue-500 rounded-full"></button>
      <button class="w-6 h-6 bg-success rounded-full"></button>
    </div>
  </div>
</div>`,
    props: [
      { name: 'data-collapsible', type: 'boolean', default: 'true', description: 'Collapsible sections' },
    ],
    preview: ProductFiltersPreview,
  },
]

// Preview components
function ProductCardPreview() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-card rounded-xl shadow-md overflow-hidden group hover:shadow-lg transition-shadow">
          <div className="relative overflow-hidden">
            <div className="w-full h-48 bg-gradient-to-br from-muted to-muted/80 flex items-center justify-center">
              <svg className="w-16 h-16 text-muted-foreground/50" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
              </svg>
            </div>
            {i === 1 && <span className="absolute top-2 right-2 bg-coral-500/100 text-white text-xs px-2 py-1 rounded-full">Sale</span>}
            <button className="absolute top-2 left-2 p-2 bg-card/80 rounded-full hover:bg-card transition-colors">
              <svg className="w-5 h-5 text-muted-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-foreground truncate">Product Name {i}</h3>
            <p className="text-sm text-muted-foreground mt-1">Category</p>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg">${(99 - i * 10).toFixed(2)}</span>
                {i === 1 && <span className="text-sm text-muted-foreground/70 line-through">$129.00</span>}
              </div>
              <button className="p-2 bg-coral-500/100 text-white rounded-lg hover:bg-coral-600 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function ShoppingCartPreview() {
  return (
    <div className="bg-card rounded-xl shadow-lg p-6 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Shopping Cart</h2>
        <span className="bg-coral-500/20 text-coral-600 text-sm px-2 py-0.5 rounded-full">2 items</span>
      </div>

      <div className="divide-y divide-border">
        {[1, 2].map((i) => (
          <div key={i} className="flex gap-4 py-4">
            <div className="w-16 h-16 bg-gradient-to-br from-muted to-muted/80 rounded-lg flex items-center justify-center">
              <svg className="w-8 h-8 text-muted-foreground/50" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2z"/>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-foreground">Item {i}</h3>
              <p className="text-sm text-muted-foreground">Size: M</p>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2 bg-muted rounded-lg">
                  <button className="p-1 hover:bg-muted/80 rounded text-sm">−</button>
                  <span className="px-2 text-sm">{i}</span>
                  <button className="p-1 hover:bg-muted/80 rounded text-sm">+</button>
                </div>
                <span className="font-semibold">${(49 * i).toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-border pt-4 mt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span>$147.00</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span>$9.99</span>
        </div>
        <div className="flex justify-between font-semibold text-lg pt-2 border-t">
          <span>Total</span>
          <span>$156.99</span>
        </div>
      </div>

      <button className="w-full mt-4 bg-coral-500/100 text-white py-3 rounded-lg font-semibold hover:bg-coral-600 transition-colors">
        Checkout
      </button>
    </div>
  )
}

function PriceTagPreview() {
  return (
    <div className="flex flex-wrap gap-8 items-end">
      <div>
        <span className="text-sm text-muted-foreground block mb-1">Regular</span>
        <span className="text-2xl font-bold text-foreground">$99.00</span>
      </div>
      <div>
        <span className="text-sm text-muted-foreground block mb-1">Sale</span>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-coral-600">$79.00</span>
          <span className="text-lg text-muted-foreground/70 line-through">$99.00</span>
          <span className="bg-coral-500/20 text-coral-600 text-xs px-2 py-0.5 rounded-full">-20%</span>
        </div>
      </div>
      <div>
        <span className="text-sm text-muted-foreground block mb-1">Subscription</span>
        <div className="flex flex-col">
          <span className="text-2xl font-bold">$29.99</span>
          <span className="text-sm text-muted-foreground">per month</span>
        </div>
      </div>
    </div>
  )
}

function QuantitySelectorPreview() {
  return (
    <div className="flex gap-6 items-center">
      <div className="inline-flex items-center border border-border rounded-lg">
        <button className="p-2 hover:bg-muted transition-colors text-muted-foreground">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        <span className="w-12 text-center py-2 border-x">1</span>
        <button className="p-2 hover:bg-muted transition-colors text-muted-foreground">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
      <div className="inline-flex items-center bg-muted rounded-full">
        <button className="w-8 h-8 flex items-center justify-center hover:bg-muted rounded-full">−</button>
        <span className="w-8 text-center">3</span>
        <button className="w-8 h-8 flex items-center justify-center hover:bg-muted rounded-full">+</button>
      </div>
    </div>
  )
}

function CartIconPreview() {
  return (
    <div className="flex gap-8 items-center">
      <button className="relative p-2 hover:bg-muted rounded-full transition-colors">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <span className="absolute -top-1 -right-1 bg-coral-500/100 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          3
        </span>
      </button>
      <button className="relative p-2 hover:bg-muted rounded-full transition-colors">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <span className="absolute -top-1 -right-1 bg-coral-500/100 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          12
        </span>
      </button>
    </div>
  )
}

function ProductGalleryPreview() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
      <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-muted to-muted/80 flex items-center justify-center">
        <svg className="w-24 h-24 text-muted-foreground/50" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
        </svg>
        <button className="absolute top-4 right-4 p-2 bg-card/80 rounded-full hover:bg-card">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </button>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[1, 2, 3, 4].map((i) => (
          <button key={i} className={`w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-muted to-muted/80 flex items-center justify-center ${i === 1 ? 'ring-2 ring-coral-500 ring-offset-2' : 'hover:ring-2 hover:ring-border'}`}>
            <svg className="w-6 h-6 text-muted-foreground/50" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2z"/>
            </svg>
          </button>
        ))}
      </div>
    </div>
  )
}

function CheckoutStepsPreview() {
  return (
    <div className="flex items-center justify-between max-w-xl mx-auto">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-coral-500/100 text-white rounded-full flex items-center justify-center">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span className="font-medium text-coral-600 hidden sm:inline">Cart</span>
      </div>
      <div className="flex-1 h-0.5 bg-coral-500/100 mx-2 sm:mx-4"></div>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-coral-500/100 text-white rounded-full flex items-center justify-center text-sm font-medium">2</div>
        <span className="font-medium text-coral-600 hidden sm:inline">Shipping</span>
      </div>
      <div className="flex-1 h-0.5 bg-muted mx-2 sm:mx-4"></div>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-sm font-medium">3</div>
        <span className="text-muted-foreground hidden sm:inline">Payment</span>
      </div>
    </div>
  )
}

function PaymentMethodPreview() {
  return (
    <div className="space-y-3 max-w-md">
      <label className="flex items-center gap-4 p-4 border-2 border-coral-500 bg-coral-500/10 rounded-xl cursor-pointer">
        <input type="radio" name="payment" className="accent-coral-500" defaultChecked />
        <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">VISA</div>
        <div className="flex-1">
          <span className="font-medium">Credit Card</span>
          <span className="text-sm text-muted-foreground ml-2">**** 4242</span>
        </div>
      </label>
      <label className="flex items-center gap-4 p-4 border border-border rounded-xl cursor-pointer hover:border-coral-500">
        <input type="radio" name="payment" className="accent-coral-500" />
        <div className="w-10 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">PP</div>
        <span className="font-medium">PayPal</span>
      </label>
    </div>
  )
}

function OrderSummaryPreview() {
  return (
    <div className="bg-muted/50 rounded-xl p-6 max-w-sm">
      <h3 className="font-semibold text-lg mb-4">Order Summary</h3>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal (3 items)</span>
          <span>$147.00</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span>$9.99</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Tax</span>
          <span>$14.70</span>
        </div>
        <div className="flex justify-between text-coral-600">
          <span>Discount (SAVE10)</span>
          <span>-$14.70</span>
        </div>
      </div>

      <div className="border-t mt-4 pt-4 flex justify-between font-semibold text-lg">
        <span>Total</span>
        <span>$156.99</span>
      </div>
    </div>
  )
}

function CouponInputPreview() {
  return (
    <div className="space-y-4 max-w-sm">
      <div className="flex gap-2">
        <input type="text" placeholder="Enter coupon code" className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500" />
        <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-800 transition-colors">
          Apply
        </button>
      </div>
      <div className="flex items-center justify-between p-3 bg-success/10 border border-success/30 rounded-lg">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-medium text-success">SAVE10</span>
          <span className="text-success">- $14.70</span>
        </div>
        <button className="text-success hover:text-success/80">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}

function WishlistButtonPreview() {
  return (
    <div className="flex gap-6 items-center">
      <button className="p-2 rounded-full hover:bg-muted transition-colors group">
        <svg className="w-6 h-6 text-muted-foreground/70 group-hover:text-coral-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
      <button className="p-2 rounded-full hover:bg-coral-500/10 transition-colors">
        <svg className="w-6 h-6 text-coral-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </button>
    </div>
  )
}

function ProductBadgePreview() {
  return (
    <div className="flex flex-wrap gap-3">
      <span className="bg-coral-500/100 text-white text-xs font-semibold px-2 py-1 rounded-full">-20% OFF</span>
      <span className="bg-success text-white text-xs font-semibold px-2 py-1 rounded-full">NEW</span>
      <span className="bg-muted/500 text-white text-xs font-semibold px-2 py-1 rounded-full">OUT OF STOCK</span>
      <span className="bg-warning text-white text-xs font-semibold px-2 py-1 rounded-full">LIMITED</span>
      <span className="bg-info text-white text-xs font-semibold px-2 py-1 rounded-full">BESTSELLER</span>
    </div>
  )
}

function SizeSelectorPreview() {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">Size</label>
      <div className="flex flex-wrap gap-2">
        <button className="w-10 h-10 border border-border rounded-lg hover:border-border transition-colors text-sm">XS</button>
        <button className="w-10 h-10 border-2 border-coral-500 bg-coral-500/10 rounded-lg font-medium text-sm">S</button>
        <button className="w-10 h-10 border border-border rounded-lg hover:border-border transition-colors text-sm">M</button>
        <button className="w-10 h-10 border border-border rounded-lg hover:border-border transition-colors text-sm">L</button>
        <button className="w-10 h-10 border border-border rounded-lg text-muted-foreground/50 cursor-not-allowed text-sm" disabled>XL</button>
      </div>
    </div>
  )
}

function ColorSwatchPreview() {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">Color: <span className="text-muted-foreground">Navy</span></label>
      <div className="flex gap-2">
        <button className="w-8 h-8 bg-gray-900 rounded-full ring-2 ring-offset-2 ring-coral-500" aria-label="Black"></button>
        <button className="w-8 h-8 bg-blue-900 rounded-full hover:ring-2 hover:ring-offset-2 hover:ring-border" aria-label="Navy"></button>
        <button className="w-8 h-8 bg-card border-2 rounded-full hover:ring-2 hover:ring-offset-2 hover:ring-border" aria-label="White"></button>
        <button className="w-8 h-8 bg-destructive rounded-full hover:ring-2 hover:ring-offset-2 hover:ring-border" aria-label="Red"></button>
        <button className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full hover:ring-2 hover:ring-offset-2 hover:ring-border" aria-label="Gradient"></button>
      </div>
    </div>
  )
}

function ReviewStarsPreview() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4].map((i) => (
          <svg key={i} className="w-5 h-5 text-warning" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
          </svg>
        ))}
        <svg className="w-5 h-5 text-muted-foreground/50" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
        <span className="ml-2 text-sm text-muted-foreground">(127 reviews)</span>
      </div>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <svg key={i} className={`w-5 h-5 ${i <= 3 ? 'text-warning' : 'text-muted-foreground/50'}`} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
          </svg>
        ))}
        <span className="ml-2 text-sm text-muted-foreground">3.0 / 5</span>
      </div>
    </div>
  )
}

function StockIndicatorPreview() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-success">
        <span className="w-2 h-2 bg-success rounded-full"></span>
        <span className="text-sm font-medium">In Stock</span>
      </div>
      <div className="flex items-center gap-2 text-warning">
        <span className="w-2 h-2 bg-warning rounded-full animate-pulse"></span>
        <span className="text-sm font-medium">Only 3 left</span>
      </div>
      <div className="flex items-center gap-2 text-muted-foreground">
        <span className="w-2 h-2 bg-muted-foreground/50 rounded-full"></span>
        <span className="text-sm font-medium">Out of Stock</span>
      </div>
    </div>
  )
}

function ShippingEstimatePreview() {
  return (
    <div className="p-4 bg-muted/50 rounded-lg max-w-sm">
      <div className="flex items-center gap-3 mb-3">
        <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
        </svg>
        <span className="font-medium">Free shipping</span>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Standard (5-7 days)</span>
          <span className="font-medium text-success">FREE</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Express (2-3 days)</span>
          <span className="font-medium">$9.99</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Next Day</span>
          <span className="font-medium">$19.99</span>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-3">Order within 2h 34m for next day delivery</p>
    </div>
  )
}

function ProductFiltersPreview() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      <div>
        <h3 className="font-semibold mb-3">Category</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded accent-coral-500" />
            <span>Electronics</span>
            <span className="text-muted-foreground/70 ml-auto text-sm">(234)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded accent-coral-500" defaultChecked />
            <span>Clothing</span>
            <span className="text-muted-foreground/70 ml-auto text-sm">(156)</span>
          </label>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="flex items-center gap-2">
          <input type="number" placeholder="Min" className="w-20 px-2 py-1 border border-border rounded text-sm" />
          <span>-</span>
          <input type="number" placeholder="Max" className="w-20 px-2 py-1 border border-border rounded text-sm" />
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Color</h3>
        <div className="flex flex-wrap gap-2">
          <button className="w-6 h-6 bg-destructive rounded-full ring-2 ring-offset-2 ring-coral-500"></button>
          <button className="w-6 h-6 bg-blue-500 rounded-full hover:ring-2 hover:ring-offset-2 hover:ring-border"></button>
          <button className="w-6 h-6 bg-success rounded-full hover:ring-2 hover:ring-offset-2 hover:ring-border"></button>
          <button className="w-6 h-6 bg-gray-900 rounded-full hover:ring-2 hover:ring-offset-2 hover:ring-border"></button>
        </div>
      </div>
    </div>
  )
}

export default function EcommercePage() {
  return (
    <ComponentPageLayout
      categoryName="E-commerce"
      categoryId="ecommerce"
      components={ecommerceComponents}
    />
  )
}
