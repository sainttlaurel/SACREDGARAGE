import { useState, useEffect } from 'react'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Inventory from './components/Inventory'
import Parts from './components/Parts'
import GalleryWall from './components/GalleryWall'
import Showreel from './components/Showreel'
import CTA from './components/CTA'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ThemeToggle from './components/ThemeToggle'
import AdminPortal from './pages/AdminPortal'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isAdminPage, setIsAdminPage] = useState(window.location.pathname === '/admin')

  useEffect(() => {
    const handlePopState = () => {
      setIsAdminPage(window.location.pathname === '/admin')
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  const navigateToAdmin = () => {
    window.history.pushState({}, '', '/admin')
    setIsAdminPage(true)
  }

  const navigateHome = () => {
    window.history.pushState({}, '', '/')
    setIsAdminPage(false)
  }

  if (isAdminPage) {
    return <AdminPortal onNavigateHome={navigateHome} />
  }

  return (
    <>
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}

      {/* Main Website */}
      <div className="relative">
        {/* Grain Texture Overlay */}
        <div className="grain" />
        
        {/* Main Content */}
        <Navbar />
        <Hero />
        <Features />
        <Inventory />
        <Parts />
        <GalleryWall />
        <Showreel />
        <CTA />
        <Contact />
        <Footer />

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Admin Link (hidden, accessible via /admin) */}
        <button
          onClick={navigateToAdmin}
          className="fixed bottom-24 right-8 z-40 text-xs opacity-20 hover:opacity-60 transition-opacity"
          title="Admin Portal"
        >
          Admin
        </button>
      </div>
    </>
  )
}

export default App
