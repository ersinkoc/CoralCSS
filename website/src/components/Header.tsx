import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location])

  const isActive = (path: string) => location.pathname === path

  const cycleTheme = () => {
    const themes: Array<'light' | 'dark' | 'system'> = ['light', 'dark', 'system']
    const currentIndex = themes.indexOf(theme)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass shadow-sm py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="transform group-hover:scale-105 transition-transform">
              <defs>
                <linearGradient id="coral-logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--primary) / 0.7)" />
                </linearGradient>
                <filter id="logo-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              <circle cx="18" cy="18" r="16" fill="url(#coral-logo-gradient)" filter="url(#logo-glow)" />
              <path
                d="M18 8C12.477 8 8 12.477 8 18s4.477 10 10 10c2.5 0 4.8-.9 6.5-2.5"
                stroke="hsl(var(--primary-foreground))"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="18" cy="18" r="4" fill="hsl(var(--primary-foreground))" />
            </svg>
          </div>
          <span className="text-xl font-bold text-foreground">CoralCSS</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/components" active={isActive('/components')}>
            Components
          </NavLink>
          <NavLink to="/themes" active={isActive('/themes')}>
            Themes
          </NavLink>
          <NavLink to="/docs" active={isActive('/docs')}>
            Documentation
          </NavLink>
          <NavLink to="/examples" active={isActive('/examples')}>
            Examples
          </NavLink>
          <NavLink to="/showcase" active={isActive('/showcase')}>
            Showcase
          </NavLink>
          <a
            href="https://github.com/ersinkoc/CoralCSS"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-accent flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            GitHub
          </a>
        </nav>

        {/* Desktop CTA & Theme Toggle */}
        <div className="hidden md:flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            onClick={cycleTheme}
            className="btn btn-ghost btn-icon"
            title={`Theme: ${theme}`}
          >
            {theme === 'system' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            ) : resolvedTheme === 'dark' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </button>

          <a href="/docs" className="btn btn-primary text-sm">
            Get Started
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={cycleTheme}
            className="btn btn-ghost btn-icon"
            title={`Theme: ${theme}`}
          >
            {resolvedTheme === 'dark' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </button>

          <button
            className="btn btn-ghost btn-icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass mt-2 mx-4 rounded-xl p-4 animate-fade-in">
          <nav className="flex flex-col gap-2">
            <MobileNavLink to="/components" active={isActive('/components')}>
              Components
            </MobileNavLink>
            <MobileNavLink to="/themes" active={isActive('/themes')}>
              Themes
            </MobileNavLink>
            <MobileNavLink to="/docs" active={isActive('/docs')}>
              Documentation
            </MobileNavLink>
            <MobileNavLink to="/examples" active={isActive('/examples')}>
              Examples
            </MobileNavLink>
            <MobileNavLink to="/showcase" active={isActive('/showcase')}>
              Showcase
            </MobileNavLink>
            <a
              href="https://github.com/ersinkoc/CoralCSS"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-3 text-muted-foreground hover:text-primary rounded-lg hover:bg-accent transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              GitHub
            </a>
            <div className="pt-2 mt-2 border-t border-border">
              <a href="/docs" className="btn btn-primary w-full justify-center">
                Get Started
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

function NavLink({ to, active, children }: { to: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className={`px-4 py-2 rounded-lg transition-colors ${
        active
          ? 'text-primary bg-primary/10 font-medium'
          : 'text-muted-foreground hover:text-primary hover:bg-accent'
      }`}
    >
      {children}
    </Link>
  )
}

function MobileNavLink({ to, active, children }: { to: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className={`px-4 py-3 rounded-lg transition-colors ${
        active
          ? 'text-primary bg-primary/10 font-medium'
          : 'text-muted-foreground hover:text-primary hover:bg-accent'
      }`}
    >
      {children}
    </Link>
  )
}

export default Header
