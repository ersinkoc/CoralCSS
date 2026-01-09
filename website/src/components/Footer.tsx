import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer-bg text-foreground">
      <div className="container py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
                <defs>
                  <linearGradient id="coral-logo-footer" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="100%" stopColor="hsl(var(--primary) / 0.7)" />
                  </linearGradient>
                </defs>
                <circle cx="18" cy="18" r="16" fill="url(#coral-logo-footer)" />
                <path
                  d="M18 8C12.477 8 8 12.477 8 18s4.477 10 10 10c2.5 0 4.8-.9 6.5-2.5"
                  stroke="hsl(var(--primary-foreground))"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx="18" cy="18" r="4" fill="hsl(var(--primary-foreground))" />
              </svg>
              <span className="text-xl font-bold">CoralCSS</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              A modern, zero-dependency CSS framework with utility-first classes,
              headless components, and first-class modern CSS features.
            </p>
          </div>

          {/* Documentation */}
          <div>
            <h3 className="font-semibold mb-4 text-primary">Documentation</h3>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li>
                <Link to="/docs" className="hover:text-primary transition">
                  Getting Started
                </Link>
              </li>
              <li>
                <Link to="/docs#utilities" className="hover:text-primary transition">
                  Utility Classes
                </Link>
              </li>
              <li>
                <Link to="/docs#components" className="hover:text-primary transition">
                  Components
                </Link>
              </li>
              <li>
                <Link to="/docs#themes" className="hover:text-primary transition">
                  Theming
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4 text-primary">Resources</h3>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li>
                <Link to="/examples" className="hover:text-primary transition">
                  Examples
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/ersinkoc/CoralCSS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.npmjs.com/package/@coral-css/core"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition"
                >
                  npm
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/ersinkoc/CoralCSS/blob/main/CHANGELOG.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition"
                >
                  Changelog
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold mb-4 text-primary">Community</h3>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://github.com/ersinkoc/CoralCSS/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition"
                >
                  Discussions
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/ersinkoc/CoralCSS/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition"
                >
                  Issues
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/coralcss"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            MIT License. Made with love for the modern web.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/ersinkoc/CoralCSS"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
            
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
