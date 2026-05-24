import { motion } from 'framer-motion'
import { Instagram, Facebook, Youtube, Twitter } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-background border-t border-border">
      <div className="container-luxury py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <img
              src="/image/LOGO.webp"
              alt="HRVD Logo"
              className="h-16 w-auto object-contain"
            />
            <p className="text-sm text-foreground-muted">
              Premium pre-owned vehicles and performance parts in Metro Manila.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="label-small mb-4">Navigation</h4>
            <ul className="space-y-3">
              <li><a href="#inventory" className="text-sm hover:text-motorsport-red transition-colors">Inventory</a></li>
              <li><a href="#parts" className="text-sm hover:text-motorsport-red transition-colors">Parts</a></li>
              <li><a href="#about" className="text-sm hover:text-motorsport-red transition-colors">About</a></li>
              <li><a href="#contact" className="text-sm hover:text-motorsport-red transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="label-small mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-foreground-muted">
              <li>+63 912 345 6789</li>
              <li>hrvdcartrading@gmail.com</li>
              <li>Quezon City<br />Metro Manila, PH</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="label-small mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-foreground transition-colors"
              >
                <Instagram size={18} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-foreground transition-colors"
              >
                <Facebook size={18} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-foreground transition-colors"
              >
                <Youtube size={18} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-foreground transition-colors"
              >
                <Twitter size={18} />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-foreground-muted">
            © {currentYear} HRVD Car Trading. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-foreground-muted">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
