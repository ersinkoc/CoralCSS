/**
 * Blog Page Showcase
 *
 * A modern blog page demonstrating CoralCSS utilities.
 * Features hero section, featured posts, article grid, categories,
 * and newsletter signup.
 */

export function BlogPageShowcase() {
  const categories = [
    { name: 'All Posts', count: 42, active: true },
    { name: 'Development', count: 18, active: false },
    { name: 'Design', count: 12, active: false },
    { name: 'Tutorial', count: 8, active: false },
    { name: 'News', count: 4, active: false },
  ]

  const featuredPosts = [
    {
      title: 'Introducing CoralCSS: The Future of Utility-First CSS',
      excerpt: 'Discover how CoralCSS is revolutionizing the way we write CSS with zero dependencies, lightning-fast performance, and modern features.',
      category: 'Development',
      date: 'Dec 15, 2024',
      readTime: '8 min read',
      image: '🚀',
      gradient: 'from-primary/20 to-accent/20',
      badge: 'Featured',
    },
    {
      title: 'Mastering Modern CSS Features in 2024',
      excerpt: 'A comprehensive guide to anchor positioning, scroll-driven animations, container queries, and other cutting-edge CSS features.',
      category: 'Tutorial',
      date: 'Dec 12, 2024',
      readTime: '12 min read',
      image: '🎨',
      gradient: 'from-accent/20 to-info/20',
      badge: 'Popular',
    },
  ]

  const recentPosts = [
    {
      title: 'Building Accessible Components with CoralCSS',
      excerpt: 'Learn how to create WCAG-compliant UI components using our headless component library.',
      category: 'Development',
      date: 'Dec 10, 2024',
      readTime: '6 min read',
      image: '♿',
    },
    {
      title: 'Design Systems: From Theory to Practice',
      excerpt: 'Practical tips for creating and maintaining a scalable design system for your organization.',
      category: 'Design',
      date: 'Dec 8, 2024',
      readTime: '10 min read',
      image: '🎯',
    },
    {
      title: 'Performance Optimization Techniques',
      excerpt: 'Deep dive into the performance optimizations that make CoralCSS 600K+ ops/sec fast.',
      category: 'Development',
      date: 'Dec 5, 2024',
      readTime: '7 min read',
      image: '⚡',
    },
    {
      title: 'The Evolution of CSS Frameworks',
      excerpt: 'A historical look at how CSS frameworks have evolved and where CoralCSS fits in.',
      category: 'News',
      date: 'Dec 3, 2024',
      readTime: '5 min read',
      image: '📜',
    },
    {
      title: 'Getting Started with Dark Mode',
      excerpt: 'Everything you need to know about implementing dark mode in your applications.',
      category: 'Tutorial',
      date: 'Nov 30, 2024',
      readTime: '9 min read',
      image: '🌙',
    },
    {
      title: 'CoralCSS vs Tailwind CSS: A Comparison',
      excerpt: 'An in-depth comparison of features, performance, and developer experience.',
      category: 'Development',
      date: 'Nov 28, 2024',
      readTime: '11 min read',
      image: '⚔️',
    },
  ]

  const tags = [
    'CSS', 'JavaScript', 'TypeScript', 'React', 'Vue',
    'Design Systems', 'Accessibility', 'Performance',
    'Web Development', 'UI/UX', 'Frontend', 'Tutorial'
  ]

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <a href="#" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white font-bold">
                C
              </div>
              <span className="text-xl font-bold text-foreground">Blog</span>
            </a>
            <div className="hidden md:flex items-center gap-6">
              <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Home
              </a>
              <a href="#posts" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Articles
              </a>
              <a href="#categories" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Categories
              </a>
              <a href="#newsletter" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Newsletter
              </a>
            </div>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-1/4 w-80 h-80 bg-primary/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 left-1/4 w-64 h-64 bg-accent/30 rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Latest articles and tutorials
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Insights on{' '}
              <span className="gradient-text">Modern Web Development</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Stay updated with the latest trends, tutorials, and insights on CSS,
              design systems, and frontend development.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <button className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Start Reading
              </button>
              <button className="inline-flex items-center justify-center px-6 py-3 bg-card border border-border rounded-lg font-medium hover:bg-accent hover:text-accent-foreground transition-colors">
                Browse Categories
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section id="posts" className="py-16 section-muted">
        <div className="container">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Featured Posts
            </h2>
            <p className="text-muted-foreground">
              Handpicked articles you don't want to miss
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {featuredPosts.map((post, index) => (
              <article
                key={index}
                className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all"
              >
                <div className={`aspect-video bg-gradient-to-br ${post.gradient} flex items-center justify-center relative`}>
                  <span className="text-7xl">{post.image}</span>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                      {post.badge}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">
                      {post.category}
                    </span>
                    <span className="text-sm text-muted-foreground">{post.date}</span>
                    <span className="text-sm text-muted-foreground">·</span>
                    <span className="text-sm text-muted-foreground">{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <a href="#" className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1">
                    Read More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section id="categories" className="py-8 border-b border-border">
        <div className="container">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground">Filter by:</span>
            {categories.map((cat) => (
              <button
                key={cat.name}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  cat.active
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground border border-border'
                }`}
              >
                {cat.name}
                <span className="ml-2 opacity-60">({cat.count})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts Grid */}
      <section className="py-16">
        <div className="container">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Recent Articles
            </h2>
            <p className="text-muted-foreground">
              Fresh content to help you level up
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post, index) => (
              <article
                key={index}
                className="group bg-card rounded-xl border border-border p-6 hover:shadow-lg hover:border-primary/30 transition-all"
              >
                <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-5xl">{post.image}</span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{post.readTime}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                  <a href="#" className="text-sm font-medium text-primary hover:underline">
                    Read →
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-card border border-border rounded-lg font-medium hover:bg-accent hover:text-accent-foreground transition-colors">
              Load More Articles
            </button>
          </div>
        </div>
      </section>

      {/* Tags Cloud */}
      <section className="py-16 section-muted">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Popular Tags
              </h2>
              <p className="text-muted-foreground">
                Explore articles by topic
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {tags.map((tag) => (
                <a
                  key={tag}
                  href="#"
                  className="px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                >
                  #{tag}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section id="newsletter" className="py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl border border-border p-8 md:p-12 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Get the latest articles, tutorials, and insights delivered straight
                to your inbox. No spam, unsubscribe anytime.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-xs text-muted-foreground mt-4">
                Join 5,000+ developers. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white font-bold">
                  C
                </div>
                <span className="text-xl font-bold text-foreground">Blog</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Insights and tutorials on modern web development with CoralCSS.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Categories</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Development</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Design</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Tutorial</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">News</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Documentation</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Showcase</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">GitHub</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Discord</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Connect</h3>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-card border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-card border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-card border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                © 2024 CoralCSS Blog. All rights reserved.
              </p>
              <div className="flex gap-6">
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">RSS</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default BlogPageShowcase
