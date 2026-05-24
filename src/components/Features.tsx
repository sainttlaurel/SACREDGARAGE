import { motion } from 'framer-motion'
import { Shield, Star, Crosshair, Check } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Verified Listings',
    description: 'All vehicles and parts thoroughly inspected with complete documentation and legal papers.'
  },
  {
    icon: Star,
    title: 'Quality Selection',
    description: 'Handpicked vehicles and performance parts – from daily drivers to off-road builds.'
  },
  {
    icon: Crosshair,
    title: 'Trade-In Welcome',
    description: 'Open to trade-ins with cash top-up. Flexible payment terms available.'
  },
  {
    icon: Check,
    title: 'Hassle-Free Transfer',
    description: 'Complete papers, updated registration, and smooth ownership transfer process.'
  }
]

const Features = () => {
  return (
    <section id="about" className="py-32 bg-background-soft">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <p className="label-small mb-4">Why Choose Us</p>
          <h2 className="heading-section mb-6">
            Trusted. Verified. Reliable.
          </h2>
          <p className="text-lg text-foreground-muted">
            We connect enthusiasts with quality vehicles and performance parts. Every listing is verified, every deal is transparent.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center space-y-4"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 mx-auto rounded-full border border-border flex items-center justify-center"
                >
                  <Icon size={28} />
                </motion.div>
                <h3 className="font-serif text-xl">{feature.title}</h3>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Features
