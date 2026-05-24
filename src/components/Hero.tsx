import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-10" />
        <img
          src="/image/bg1.jpg"
          alt="Luxury Sports Car"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Content */}
      <div className="container-luxury relative z-20 pt-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="space-y-6"
          >
            <p className="label-small">Premium Pre-Owned Vehicles & Performance Parts</p>
            
            <h1 className="heading-display text-balance">
              Built Different, Driven Better
            </h1>
            
            <p className="text-xl md:text-2xl text-foreground-muted max-w-2xl">
              Curated collection of modified vehicles and performance parts. 
              From daily drivers to off-road beasts – all verified, all exceptional.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <a href="#inventory" className="btn-primary group">
                Explore Inventory
                <ArrowUpRight className="inline-block ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={18} />
              </a>
              <a href="#parts" className="btn-secondary">
                Browse Parts
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-px h-16 bg-gradient-to-b from-transparent via-foreground to-transparent"
          />
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
