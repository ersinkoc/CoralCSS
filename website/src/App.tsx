import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Header from './components/Header'
import Footer from './components/Footer'
import ThemeCustomizer from './components/ThemeCustomizer'
import Home from './pages/Home'
import Docs from './pages/Docs'
import Examples from './pages/Examples'
import Themes from './pages/Themes'
import Showcase from './pages/Showcase'

// Component sub-pages
import ComponentsIndex from './pages/components/index'
import ButtonsPage from './pages/components/ButtonsPage'
import FormsPage from './pages/components/FormsPage'
import OverlaysPage from './pages/components/OverlaysPage'
import NavigationPage from './pages/components/NavigationPage'
import DataDisplayPage from './pages/components/DataDisplayPage'
import FeedbackPage from './pages/components/FeedbackPage'
import LayoutPage from './pages/components/LayoutPage'
import TypographyPage from './pages/components/TypographyPage'
import MediaPage from './pages/components/MediaPage'
import AdvancedPage from './pages/components/AdvancedPage'
import ModernCSSPage from './pages/components/ModernCSSPage'
import ChartsPage from './pages/components/ChartsPage'
import DashboardPage from './pages/components/DashboardPage'
import EcommercePage from './pages/components/EcommercePage'
import ChatPage from './pages/components/ChatPage'
import AIPage from './pages/components/AIPage'
import FilesPage from './pages/components/FilesPage'
import LandingPage from './pages/components/LandingPage'
import PortfolioPage from './pages/components/PortfolioPage'
import BlogPage from './pages/components/BlogPage'
import DocsPage from './pages/components/DocsPage'

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1 pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/components" element={<ComponentsIndex />} />
            <Route path="/components/buttons" element={<ButtonsPage />} />
            <Route path="/components/forms" element={<FormsPage />} />
            <Route path="/components/overlays" element={<OverlaysPage />} />
            <Route path="/components/navigation" element={<NavigationPage />} />
            <Route path="/components/data-display" element={<DataDisplayPage />} />
            <Route path="/components/feedback" element={<FeedbackPage />} />
            <Route path="/components/layout" element={<LayoutPage />} />
            <Route path="/components/typography" element={<TypographyPage />} />
            <Route path="/components/media" element={<MediaPage />} />
            <Route path="/components/advanced" element={<AdvancedPage />} />
            <Route path="/components/modern-css" element={<ModernCSSPage />} />
            <Route path="/components/charts" element={<ChartsPage />} />
            <Route path="/components/dashboard" element={<DashboardPage />} />
            <Route path="/components/ecommerce" element={<EcommercePage />} />
            <Route path="/components/chat" element={<ChatPage />} />
            <Route path="/components/ai" element={<AIPage />} />
            <Route path="/components/files" element={<FilesPage />} />
            <Route path="/components/landing" element={<LandingPage />} />
            <Route path="/components/portfolio" element={<PortfolioPage />} />
            <Route path="/components/blog" element={<BlogPage />} />
            <Route path="/components/docs" element={<DocsPage />} />
            <Route path="/themes" element={<Themes />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/examples" element={<Examples />} />
            <Route path="/showcase" element={<Showcase />} />
          </Routes>
        </main>
        <Footer />
        <ThemeCustomizer />
      </div>
    </ThemeProvider>
  )
}

export default App
