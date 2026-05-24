import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

interface VehicleCardProps {
  image: string
  brand: string
  model: string
  year: number
  price: string
  location: string
  description: string
  specs: {
    [key: string]: string
  }
  index: number
  onViewDetails: () => void
}

const VehicleCard = ({ image, brand, model, year, price, location, description, specs, index, onViewDetails }: VehicleCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group card-luxury overflow-hidden"
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <motion.img
          src={image}
          alt={`${brand} ${model}`}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
        
        {/* Hover Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center"
        >
          <motion.button
            onClick={onViewDetails}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary"
          >
            View Details
            <ArrowUpRight className="inline-block ml-2" size={18} />
          </motion.button>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="label-small">{year} • {location}</p>
            <h3 className="font-serif text-2xl md:text-3xl mt-2">
              {brand} {model}
            </h3>
          </div>
          <div className="text-right">
            <p className="label-small">Price</p>
            <p className="text-xl font-medium mt-2">{price}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-foreground-muted leading-relaxed line-clamp-3">
          {description}
        </p>

        {/* Specs */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
          {Object.entries(specs).map(([key, value]) => (
            <div key={key}>
              <p className="label-small">{key}</p>
              <p className="text-sm font-medium mt-1">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default VehicleCard
