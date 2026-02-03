import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ErrorBoundary from './components/ErrorBoundary'
import ParticlesBackground from './components/ParticlesBackground'

// Contexts
import { NavbarProvider } from './contexts/NavbarContext'

// Utils
import { usePlatformDetection, getViewportClasses } from './utils/platformDetection'
import './utils/mobileErrorHandler'

// Hooks
import { useParticlesSettings } from './hooks/useParticlesSettings'

// Pages
import Home from './pages/Home'
import Committees from './pages/Committees'
import Agendas from './pages/Agendas'
import Team from './pages/Team'
import Registration from './pages/Registration'
import Contact from './pages/Contact'
import TermsOfService from './pages/TermsOfService'

function AppContent() {
  const platform = usePlatformDetection()
  const platformClasses = getViewportClasses(platform)
  const { intensity, interactive } = useParticlesSettings()

  return (
    <>
      <ParticlesBackground
        intensity={intensity}
        interactive={interactive}
      />

      <div className={`min-h-screen text-aegis-white relative overflow-x-hidden ${platformClasses}`}>
        <ErrorBoundary>
          <NavbarProvider>
            <Navbar />

            <main className="relative z-10">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/committees" element={<Committees />} />
                <Route path="/agendas" element={<Agendas />} />
                <Route path="/team" element={<Team />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
              </Routes>
            </main>

            <Footer />
          </NavbarProvider>
        </ErrorBoundary>

        <ErrorBoundary>
          <ScrollToTop />
        </ErrorBoundary>
      </div>
    </>
  )
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <AppContent />
      </Router>
    </HelmetProvider>
  )
}

export default App 
