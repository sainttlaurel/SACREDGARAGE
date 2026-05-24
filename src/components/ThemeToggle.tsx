import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check localStorage for saved theme
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    const shouldBeDark = savedTheme ? savedTheme === 'dark' : prefersDark
    
    setIsDark(shouldBeDark)
    applyTheme(shouldBeDark)
  }, [])

  const applyTheme = (dark: boolean) => {
    const html = document.documentElement
    if (dark) {
      html.classList.add('dark')
      html.classList.remove('light')
      document.body.classList.add('dark')
      document.body.classList.remove('light')
    } else {
      html.classList.remove('dark')
      html.classList.add('light')
      document.body.classList.remove('dark')
      document.body.classList.add('light')
    }
  }

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    applyTheme(newTheme)
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
  }

  if (!mounted) return null

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-card border border-border backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform shadow-2xl"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? (
          <Sun size={24} className="text-foreground" />
        ) : (
          <Moon size={24} className="text-foreground" />
        )}
      </motion.div>
    </motion.button>
  )
}

export default ThemeToggle
