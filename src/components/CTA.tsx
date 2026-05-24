import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const CTA = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Image - Using car 20.jpg */}
      <div className="absolute inset-0">
        <img
          src="/cars/20.jpg"
          alt="Premium Modified Vehicle"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/80" />
      </div>

      {/* Content */}
      <div className="container-luxury relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center space-y-8"
        >
          <h2 className="heading-section">
            Ready to Own Your Dream Ride?
          </h2>
          <p className="text-xl text-foreground-muted">
            Get in touch to schedule a viewing or discuss trade-in options. 
            All vehicles come with complete papers and ready for transfer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <motion.a
              href="#contact"
              className="btn-primary group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Inquiry
              <ArrowUpRight className="inline-block ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={18} />
            </motion.a>
            <motion.a
              href="tel:+639123456789"
              className="btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Call Now
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTA
