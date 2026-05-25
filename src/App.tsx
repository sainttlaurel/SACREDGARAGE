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
import ToastContainer from './components/ToastContainer'
import AdminPortal from './pages/AdminPortal'
import ErrorBoundary from './components/ErrorBoundary'
import { loadFromSupabaseToLocalStorage, syncLocalStorageToSupabase } from './lib/syncToSupabase'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isAdminPage, setIsAdminPage] = useState(window.location.pathname === '/admin')

  useEffect(() => {
    // Sync data on app load
    const initializeData = async () => {
      // First, load from Supabase to get latest data
      await loadFromSupabaseToLocalStorage()
      // Then, sync any local changes back to Supabase
      await syncLocalStorageToSupabase()
    }
    
    initializeData()
  }, [])

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

  const navigateHome = () => {
    window.history.pushState({}, '', '/')
    setIsAdminPage(false)
  }

  if (isAdminPage) {
    return (
      <ErrorBoundary>
        <>
          <ToastContainer />
          <AdminPortal onNavigateHome={navigateHome} />
        </>
      </ErrorBoundary>
    )
  }

  return (
    <ErrorBoundary>
      <>
        <ToastContainer />
        
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
        </div>
      </>
    </ErrorBoundary>
  )
}

export default App
