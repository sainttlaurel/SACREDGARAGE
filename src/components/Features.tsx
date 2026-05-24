import { motion } from 'framer-motion'
import { Shield, Star, Crosshair, Check } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Verified Listings',
    description: 'All vehicles and parts thoroughly inspected with complete documentation and legal papers.',
    image: '/cars/10.jpg'
  },
  {
    icon: Star,
    title: 'Quality Selection',
    description: 'Handpicked vehicles and performance parts – from daily drivers to off-road builds.',
    image: '/cars/22.jpg'
  },
  {
    icon: Crosshair,
    title: 'Trade-In Welcome',
    description: 'Open to trade-ins with cash top-up. Flexible payment terms available.',
    image: '/cars/14.jpg'
  },
  {
    icon: Check,
    title: 'Hassle-Free Transfer',
    description: 'Complete papers, updated registration, and smooth ownership transfer process.',
    image: '/cars/7.jpg'
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
                className="group relative overflow-hidden rounded-sm border border-border"
              >
                {/* Background Image */}
                <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/60" />
                </div>

                {/* Content */}
                <div className="relative p-8 text-center space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 mx-auto rounded-full border border-border bg-background flex items-center justify-center"
                  >
                    <Icon size={28} />
                  </motion.div>
                  <h3 className="font-serif text-xl">{feature.title}</h3>
                  <p className="text-sm text-foreground-muted leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Features
