/**
 * Landing Page Templates
 *
 * Complete landing page sections and layouts.
 * @module templates/landing
 */

/**
 * Hero Section - Main landing section with headline and CTA
 */
export const landingHero = `
<section class="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
  <!-- Background Pattern -->
  <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.05\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>

  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
    <div class="text-center max-w-4xl mx-auto">
      <!-- Badge -->
      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-coral-500/10 border border-coral-500/20 mb-8">
        <span class="w-2 h-2 bg-coral-500 rounded-full animate-pulse"></span>
        <span class="text-sm font-medium text-coral-400">New: CoralCSS v2.0 is here</span>
      </div>

      <!-- Headline -->
      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
        Build beautiful interfaces
        <span class="block mt-2 bg-gradient-to-r from-coral-400 to-pink-500 bg-clip-text text-transparent">at lightning speed</span>
      </h1>

      <!-- Subheadline -->
      <p class="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
        A modern, utility-first CSS framework with 65+ headless components.
        Zero-dependency. TypeScript-first. Ready for production.
      </p>

      <!-- CTA Buttons -->
      <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="#" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium text-white bg-coral-500 rounded-xl hover:bg-coral-600 transition-all hover:scale-105 shadow-lg shadow-coral-500/25">
          Get Started Free
          <span class="i-arrow-right icon-sm"></span>
        </a>
        <a href="#" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium text-white bg-white/10 rounded-xl hover:bg-white/20 transition-all backdrop-blur-sm">
          <span class="i-play icon-sm"></span>
          Watch Demo
        </a>
      </div>

      <!-- Social Proof -->
      <div class="mt-16 flex flex-col items-center">
        <p class="text-sm text-slate-500 mb-4">Trusted by developers at</p>
        <div class="flex flex-wrap items-center justify-center gap-8 opacity-60">
          <span class="text-2xl font-bold text-white">Vercel</span>
          <span class="text-2xl font-bold text-white">Stripe</span>
          <span class="text-2xl font-bold text-white">GitHub</span>
          <span class="text-2xl font-bold text-white">Netflix</span>
          <span class="text-2xl font-bold text-white">Airbnb</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Gradient Blur -->
  <div class="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-coral-500/30 rounded-full blur-3xl"></div>
</section>
`

/**
 * Features Section - Grid of feature cards
 */
export const landingFeatures = `
<section class="py-24 bg-white dark:bg-slate-900">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Section Header -->
    <div class="text-center max-w-3xl mx-auto mb-16">
      <h2 class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
        Everything you need to build modern UIs
      </h2>
      <p class="mt-4 text-lg text-slate-600 dark:text-slate-400">
        Powerful features that help you ship faster without sacrificing quality.
      </p>
    </div>

    <!-- Features Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <!-- Feature 1 -->
      <div class="group relative p-8 bg-slate-50 dark:bg-slate-800 rounded-2xl hover:bg-white dark:hover:bg-slate-700 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-600 hover:shadow-xl">
        <div class="w-14 h-14 bg-coral-100 dark:bg-coral-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <span class="i-settings icon-xl text-coral-600 dark:text-coral-400"></span>
        </div>
        <h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-3">Zero Configuration</h3>
        <p class="text-slate-600 dark:text-slate-400">
          Works out of the box with sensible defaults. No complex setup required.
        </p>
      </div>

      <!-- Feature 2 -->
      <div class="group relative p-8 bg-slate-50 dark:bg-slate-800 rounded-2xl hover:bg-white dark:hover:bg-slate-700 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-600 hover:shadow-xl">
        <div class="w-14 h-14 bg-blue-100 dark:bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <span class="i-document icon-xl text-blue-600 dark:text-blue-400"></span>
        </div>
        <h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-3">TypeScript First</h3>
        <p class="text-slate-600 dark:text-slate-400">
          Full TypeScript support with accurate types for every utility and component.
        </p>
      </div>

      <!-- Feature 3 -->
      <div class="group relative p-8 bg-slate-50 dark:bg-slate-800 rounded-2xl hover:bg-white dark:hover:bg-slate-700 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-600 hover:shadow-xl">
        <div class="w-14 h-14 bg-purple-100 dark:bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <span class="i-refresh icon-xl text-purple-600 dark:text-purple-400"></span>
        </div>
        <h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-3">JIT Generation</h3>
        <p class="text-slate-600 dark:text-slate-400">
          Only generate the CSS you use. Lightning fast builds with tiny bundles.
        </p>
      </div>

      <!-- Feature 4 -->
      <div class="group relative p-8 bg-slate-50 dark:bg-slate-800 rounded-2xl hover:bg-white dark:hover:bg-slate-700 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-600 hover:shadow-xl">
        <div class="w-14 h-14 bg-green-100 dark:bg-green-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <span class="i-check-circle icon-xl text-green-600 dark:text-green-400"></span>
        </div>
        <h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-3">65+ Components</h3>
        <p class="text-slate-600 dark:text-slate-400">
          Pre-built accessible headless components for every common UI pattern.
        </p>
      </div>

      <!-- Feature 5 -->
      <div class="group relative p-8 bg-slate-50 dark:bg-slate-800 rounded-2xl hover:bg-white dark:hover:bg-slate-700 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-600 hover:shadow-xl">
        <div class="w-14 h-14 bg-yellow-100 dark:bg-yellow-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <span class="i-star icon-xl text-yellow-600 dark:text-yellow-400"></span>
        </div>
        <h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-3">Dark Mode</h3>
        <p class="text-slate-600 dark:text-slate-400">
          Built-in dark mode support with multiple strategies. Toggle with a class.
        </p>
      </div>

      <!-- Feature 6 -->
      <div class="group relative p-8 bg-slate-50 dark:bg-slate-800 rounded-2xl hover:bg-white dark:hover:bg-slate-700 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-600 hover:shadow-xl">
        <div class="w-14 h-14 bg-pink-100 dark:bg-pink-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <span class="i-heart icon-xl text-pink-600 dark:text-pink-400"></span>
        </div>
        <h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-3">Modern CSS</h3>
        <p class="text-slate-600 dark:text-slate-400">
          Container queries, :has(), @starting-style, and more cutting-edge features.
        </p>
      </div>
    </div>
  </div>
</section>
`

/**
 * Pricing Section - Pricing table with plan comparison
 */
export const landingPricing = `
<section class="py-24 bg-slate-50 dark:bg-slate-800">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Section Header -->
    <div class="text-center max-w-3xl mx-auto mb-16">
      <h2 class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
        Simple, transparent pricing
      </h2>
      <p class="mt-4 text-lg text-slate-600 dark:text-slate-400">
        Choose the plan that's right for you. All plans include all features.
      </p>
    </div>

    <!-- Pricing Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      <!-- Starter -->
      <div class="relative p-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700">
        <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Starter</h3>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">Perfect for side projects</p>
        <p class="mt-6">
          <span class="text-4xl font-bold text-slate-900 dark:text-white">Free</span>
        </p>
        <ul class="mt-8 space-y-4">
          <li class="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
            <span class="i-check icon-sm text-green-500"></span>
            All utility classes
          </li>
          <li class="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
            <span class="i-check icon-sm text-green-500"></span>
            Basic components
          </li>
          <li class="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
            <span class="i-check icon-sm text-green-500"></span>
            Community support
          </li>
        </ul>
        <button class="mt-8 w-full py-3 px-4 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
          Get Started
        </button>
      </div>

      <!-- Pro (Featured) -->
      <div class="relative p-8 bg-coral-500 rounded-2xl shadow-xl shadow-coral-500/25 scale-105">
        <div class="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-white dark:bg-slate-900 rounded-full text-xs font-semibold text-coral-600 shadow-lg">
          Most Popular
        </div>
        <h3 class="text-lg font-semibold text-white">Pro</h3>
        <p class="mt-2 text-sm text-coral-100">For professional developers</p>
        <p class="mt-6">
          <span class="text-4xl font-bold text-white">$29</span>
          <span class="text-coral-100">/month</span>
        </p>
        <ul class="mt-8 space-y-4">
          <li class="flex items-center gap-3 text-sm text-white">
            <span class="i-check icon-sm"></span>
            Everything in Starter
          </li>
          <li class="flex items-center gap-3 text-sm text-white">
            <span class="i-check icon-sm"></span>
            All 65+ components
          </li>
          <li class="flex items-center gap-3 text-sm text-white">
            <span class="i-check icon-sm"></span>
            Premium templates
          </li>
          <li class="flex items-center gap-3 text-sm text-white">
            <span class="i-check icon-sm"></span>
            Priority support
          </li>
        </ul>
        <button class="mt-8 w-full py-3 px-4 text-sm font-medium text-coral-600 bg-white rounded-xl hover:bg-coral-50 transition-colors">
          Start Free Trial
        </button>
      </div>

      <!-- Enterprise -->
      <div class="relative p-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700">
        <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Enterprise</h3>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">For large teams</p>
        <p class="mt-6">
          <span class="text-4xl font-bold text-slate-900 dark:text-white">$99</span>
          <span class="text-slate-500">/month</span>
        </p>
        <ul class="mt-8 space-y-4">
          <li class="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
            <span class="i-check icon-sm text-green-500"></span>
            Everything in Pro
          </li>
          <li class="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
            <span class="i-check icon-sm text-green-500"></span>
            Custom theming
          </li>
          <li class="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
            <span class="i-check icon-sm text-green-500"></span>
            Dedicated support
          </li>
          <li class="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
            <span class="i-check icon-sm text-green-500"></span>
            SLA guarantee
          </li>
        </ul>
        <button class="mt-8 w-full py-3 px-4 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
          Contact Sales
        </button>
      </div>
    </div>
  </div>
</section>
`

/**
 * Testimonials Section
 */
export const landingTestimonials = `
<section class="py-24 bg-white dark:bg-slate-900">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Section Header -->
    <div class="text-center max-w-3xl mx-auto mb-16">
      <h2 class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
        Loved by developers worldwide
      </h2>
      <p class="mt-4 text-lg text-slate-600 dark:text-slate-400">
        See what our users have to say about CoralCSS.
      </p>
    </div>

    <!-- Testimonials Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <!-- Testimonial 1 -->
      <div class="p-8 bg-slate-50 dark:bg-slate-800 rounded-2xl">
        <div class="flex items-center gap-1 mb-4">
          <span class="i-star icon-sm text-yellow-500"></span>
          <span class="i-star icon-sm text-yellow-500"></span>
          <span class="i-star icon-sm text-yellow-500"></span>
          <span class="i-star icon-sm text-yellow-500"></span>
          <span class="i-star icon-sm text-yellow-500"></span>
        </div>
        <p class="text-slate-600 dark:text-slate-300 mb-6">
          "CoralCSS has completely transformed our development workflow. The component library is incredibly well-designed and saves us hours every week."
        </p>
        <div class="flex items-center gap-4">
          <img src="https://i.pravatar.cc/48?u=10" alt="" class="w-12 h-12 rounded-full" />
          <div>
            <p class="font-semibold text-slate-900 dark:text-white">Sarah Chen</p>
            <p class="text-sm text-slate-500 dark:text-slate-400">Frontend Lead at Vercel</p>
          </div>
        </div>
      </div>

      <!-- Testimonial 2 -->
      <div class="p-8 bg-slate-50 dark:bg-slate-800 rounded-2xl">
        <div class="flex items-center gap-1 mb-4">
          <span class="i-star icon-sm text-yellow-500"></span>
          <span class="i-star icon-sm text-yellow-500"></span>
          <span class="i-star icon-sm text-yellow-500"></span>
          <span class="i-star icon-sm text-yellow-500"></span>
          <span class="i-star icon-sm text-yellow-500"></span>
        </div>
        <p class="text-slate-600 dark:text-slate-300 mb-6">
          "The best CSS framework I've ever used. The JIT compilation is blazing fast and the dark mode support is flawless."
        </p>
        <div class="flex items-center gap-4">
          <img src="https://i.pravatar.cc/48?u=11" alt="" class="w-12 h-12 rounded-full" />
          <div>
            <p class="font-semibold text-slate-900 dark:text-white">Mike Johnson</p>
            <p class="text-sm text-slate-500 dark:text-slate-400">CTO at TechStartup</p>
          </div>
        </div>
      </div>

      <!-- Testimonial 3 -->
      <div class="p-8 bg-slate-50 dark:bg-slate-800 rounded-2xl">
        <div class="flex items-center gap-1 mb-4">
          <span class="i-star icon-sm text-yellow-500"></span>
          <span class="i-star icon-sm text-yellow-500"></span>
          <span class="i-star icon-sm text-yellow-500"></span>
          <span class="i-star icon-sm text-yellow-500"></span>
          <span class="i-star icon-sm text-yellow-500"></span>
        </div>
        <p class="text-slate-600 dark:text-slate-300 mb-6">
          "Finally, a framework that thinks about accessibility from the start. The headless components are a game-changer."
        </p>
        <div class="flex items-center gap-4">
          <img src="https://i.pravatar.cc/48?u=12" alt="" class="w-12 h-12 rounded-full" />
          <div>
            <p class="font-semibold text-slate-900 dark:text-white">Emily Davis</p>
            <p class="text-sm text-slate-500 dark:text-slate-400">Design Engineer at GitHub</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
`

/**
 * CTA Section
 */
export const landingCTA = `
<section class="py-24 bg-coral-500">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 class="text-3xl sm:text-4xl font-bold text-white">
      Ready to build something amazing?
    </h2>
    <p class="mt-4 text-lg text-coral-100">
      Join thousands of developers building beautiful interfaces with CoralCSS.
    </p>
    <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
      <a href="#" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium text-coral-600 bg-white rounded-xl hover:bg-coral-50 transition-all shadow-lg">
        Get Started Free
        <span class="i-arrow-right icon-sm"></span>
      </a>
      <a href="#" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium text-white bg-coral-600 rounded-xl hover:bg-coral-700 transition-all">
        View Documentation
      </a>
    </div>
  </div>
</section>
`

/**
 * Footer
 */
export const landingFooter = `
<footer class="bg-slate-900 text-slate-400">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
      <!-- Brand -->
      <div class="col-span-2 lg:col-span-1">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 bg-coral-500 rounded-xl flex items-center justify-center">
            <span class="text-white font-bold">C</span>
          </div>
          <span class="font-semibold text-white text-lg">CoralCSS</span>
        </div>
        <p class="text-sm">
          A modern CSS framework for building beautiful interfaces.
        </p>
        <div class="flex items-center gap-4 mt-6">
          <a href="#" class="hover:text-white transition-colors">
            <span class="i-globe icon-lg"></span>
          </a>
          <a href="#" class="hover:text-white transition-colors">
            <span class="i-link icon-lg"></span>
          </a>
        </div>
      </div>

      <!-- Product -->
      <div>
        <h4 class="font-semibold text-white mb-4">Product</h4>
        <ul class="space-y-3 text-sm">
          <li><a href="#" class="hover:text-white transition-colors">Features</a></li>
          <li><a href="#" class="hover:text-white transition-colors">Pricing</a></li>
          <li><a href="#" class="hover:text-white transition-colors">Templates</a></li>
          <li><a href="#" class="hover:text-white transition-colors">Components</a></li>
        </ul>
      </div>

      <!-- Resources -->
      <div>
        <h4 class="font-semibold text-white mb-4">Resources</h4>
        <ul class="space-y-3 text-sm">
          <li><a href="#" class="hover:text-white transition-colors">Documentation</a></li>
          <li><a href="#" class="hover:text-white transition-colors">Guides</a></li>
          <li><a href="#" class="hover:text-white transition-colors">Examples</a></li>
          <li><a href="#" class="hover:text-white transition-colors">Blog</a></li>
        </ul>
      </div>

      <!-- Company -->
      <div>
        <h4 class="font-semibold text-white mb-4">Company</h4>
        <ul class="space-y-3 text-sm">
          <li><a href="#" class="hover:text-white transition-colors">About</a></li>
          <li><a href="#" class="hover:text-white transition-colors">Careers</a></li>
          <li><a href="#" class="hover:text-white transition-colors">Contact</a></li>
          <li><a href="#" class="hover:text-white transition-colors">Press</a></li>
        </ul>
      </div>

      <!-- Legal -->
      <div>
        <h4 class="font-semibold text-white mb-4">Legal</h4>
        <ul class="space-y-3 text-sm">
          <li><a href="#" class="hover:text-white transition-colors">Privacy</a></li>
          <li><a href="#" class="hover:text-white transition-colors">Terms</a></li>
          <li><a href="#" class="hover:text-white transition-colors">License</a></li>
        </ul>
      </div>
    </div>

    <!-- Bottom -->
    <div class="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p class="text-sm">&copy; 2025 CoralCSS. All rights reserved.</p>
      <div class="flex items-center gap-4 text-sm">
        <a href="#" class="hover:text-white transition-colors">Privacy Policy</a>
        <a href="#" class="hover:text-white transition-colors">Terms of Service</a>
      </div>
    </div>
  </div>
</footer>
`
