import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: 'Inventory', href: '#inventory' },
    { name: 'Parts', href: '#parts' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border"
      >
        <div className="container-luxury">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.a
              href="#"
              className="flex items-center"
              whileHover={{ opacity: 0.7 }}
            >
              <img
                src="/image/LOGO.webp"
                alt="HRVD Logo"
                className="h-12 w-auto object-contain"
              />
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-12">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="nav-link"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <a href="#contact" className="btn-primary">
                Inquire Now
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:opacity-60 transition-opacity"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background md:hidden"
          >
            <div className="container-luxury h-full flex flex-col">
              {/* Mobile Header */}
              <div className="flex items-center justify-between h-20">
                <img
                  src="/image/LOGO.webp"
                  alt="HRVD Logo"
                  className="h-12 w-auto object-contain"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:opacity-60 transition-opacity"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Mobile Links */}
              <div className="flex-1 flex flex-col justify-center gap-8">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="font-serif text-4xl tracking-tight hover:opacity-60 transition-opacity"
                  >
                    {link.name}
                  </motion.a>
                ))}
                <motion.a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                  className="btn-primary inline-block text-center mt-8"
                >
                  Inquire Now
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
