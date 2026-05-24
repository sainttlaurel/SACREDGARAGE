import { useState } from 'react'
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

function App() {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = () => {
    setIsLoading(false)
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
      </div>
    </>
  )
}

export default App
