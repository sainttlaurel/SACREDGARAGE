import { motion } from 'framer-motion'
import { Wrench, Gauge, Shield } from 'lucide-react'

const builds = [
  {
    title: 'FJ Cruiser Off-Road Beast',
    subtitle: 'Full Suspension & Sound Build',
    description: 'Complete transformation with OME BP-51 suspension, SCS wheels, BFGoodrich KM3 tires, and ₱200K sound system. Built for adventure.',
    images: ['/cars/13.jpg', '/cars/17.jpg', '/cars/19.jpg'],
    specs: ['OME BP-51', 'BFG KM3', 'Borla Exhaust'],
    icon: Wrench
  },
  {
    title: 'Ranger Wildtrak Expedition',
    subtitle: 'TJM Full Off-Road Package',
    description: 'Professional off-road build with TJM bumpers, rocksliders, 2" body lift, 35" Mastercraft tires, and complete LED lighting.',
    images: ['/cars/21.jpg', '/cars/25.jpg', '/cars/28.jpg'],
    specs: ['TJM Package', '35" Tires', 'Safari Snorkel'],
    icon: Gauge
  },
  {
    title: 'LC200 Luxury Cruiser',
    subtitle: 'Premium Maintained Excellence',
    description: '4.5L V8 Turbo Diesel with 100% original paint, beige leather interior, 20" OEM rims, and Toyota Commonwealth maintenance history.',
    images: ['/cars/6.jpg', '/cars/9.jpg', '/cars/11.jpg'],
    specs: ['V8 Turbo', '128k kms', 'Orig Paint'],
    icon: Shield
  }
]

const FeaturedBuilds = () => {
  return (
    <section className="py-32 bg-background-soft">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <p className="label-small mb-4">Spotlight</p>
          <h2 className="heading-section mb-6">
            Featured Builds
          </h2>
          <p className="text-lg text-foreground-muted">
            Showcasing our most impressive builds and transformations. 
            Each vehicle tells a story of passion, precision, and performance.
          </p>
        </motion.div>

        <div className="space-y-16">
          {builds.map((build, index) => {
            const Icon = build.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-dense' : ''
                }`}
              >
                {/* Images */}
                <div className={`grid grid-cols-3 gap-4 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  {build.images.map((image, imgIndex) => (
                    <motion.div
                      key={imgIndex}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: imgIndex * 0.1, duration: 0.4 }}
                      className={`relative overflow-hidden rounded-sm border border-border ${
                        imgIndex === 0 ? 'col-span-3 aspect-[16/9]' : 'aspect-square'
                      }`}
                    >
                      <motion.img
                        src={image}
                        alt={`${build.title} ${imgIndex + 1}`}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6 }}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Content */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-border">
                    <Icon size={28} />
                  </div>

                  <div>
                    <p className="label-small mb-2">{build.subtitle}</p>
                    <h3 className="font-serif text-3xl md:text-4xl mb-4">
                      {build.title}
                    </h3>
                    <p className="text-lg text-foreground-muted leading-relaxed">
                      {build.description}
                    </p>
                  </div>

                  {/* Specs */}
                  <div className="flex flex-wrap gap-3">
                    {build.specs.map((spec, specIndex) => (
                      <div
                        key={specIndex}
                        className="px-4 py-2 bg-background border border-border rounded-sm"
                      >
                        <p className="text-sm font-medium">{spec}</p>
                      </div>
                    ))}
                  </div>

                  <a href="#inventory" className="btn-secondary inline-block">
                    View Details
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FeaturedBuilds
