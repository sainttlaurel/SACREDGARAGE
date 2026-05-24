import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { useState } from 'react'

const Showreel = () => {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section className="py-32">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="label-small mb-4">Follow Our Journey</p>
          <h2 className="heading-section">
            More Than Just Cars
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative aspect-[21/9] rounded-sm overflow-hidden group cursor-pointer"
          onClick={() => setIsPlaying(true)}
        >
          {/* Poster Image */}
          <img
            src="/image/bg1.jpg"
            alt="Showreel"
            className="w-full h-full object-cover"
          />
          
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

          {/* Play Button */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="w-24 h-24 rounded-full border-2 border-foreground flex items-center justify-center backdrop-blur-sm bg-background/20"
              whileHover={{ borderColor: 'var(--motorsport-red)' }}
              transition={{ duration: 0.3 }}
            >
              <Play size={32} fill="currentColor" />
            </motion.div>
          </motion.div>

          {/* Social Media Links */}
          <div className="absolute bottom-8 left-8 right-8 flex flex-wrap gap-4 z-10">
            <a
              href="https://www.facebook.com/hrvdcartrading"
              target="_blank"
              rel="noopener noreferrer"
              className="label-small hover:text-motorsport-red transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/hrvdcartrading"
              target="_blank"
              rel="noopener noreferrer"
              className="label-small hover:text-motorsport-red transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              Instagram
            </a>
            <a
              href="https://www.tiktok.com/@hrvdcartrading"
              target="_blank"
              rel="noopener noreferrer"
              className="label-small hover:text-motorsport-red transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              TikTok
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Showreel
