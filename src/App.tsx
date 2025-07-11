import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ErrorBoundary from './components/ErrorBoundary'

// Contexts
import { NavbarProvider } from './contexts/NavbarContext'

// Utils
import { usePlatformDetection, getViewportClasses } from './utils/platformDetection'
import './utils/responsiveTest' // Auto-run responsive tests in development
import './utils/mobileErrorHandler' // Auto-initialize mobile error handling

// Pages
import Home from './pages/Home'
import Committees from './pages/Committees'
import Agendas from './pages/Agendas'
import Team from './pages/Team'
import Registration from './pages/Registration'

function App() {
  const platform = usePlatformDetection()
  const platformClasses = getViewportClasses(platform)
  
  return (
    <HelmetProvider>
      <Router>
        {/* Main App Content */}
        <div className={`min-h-screen bg-aegis-black text-aegis-white relative overflow-x-hidden ${platformClasses}`}>
          <ErrorBoundary>
            <NavbarProvider>
              {/* Header with Logo and Navigation */}
              <Navbar />
              
              <main className="relative z-10">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/committees" element={<Committees />} />
                  <Route path="/agendas" element={<Agendas />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/registration" element={<Registration />} />
                </Routes>
              </main>
              
              <Footer />
            </NavbarProvider>
          </ErrorBoundary>
          
          {/* ScrollToTop outside NavbarProvider to prevent AnimatePresence conflicts */}
          <ErrorBoundary>
            <ScrollToTop />
          </ErrorBoundary>
          

        </div>
      </Router>
    </HelmetProvider>
  )
}

export default App 
