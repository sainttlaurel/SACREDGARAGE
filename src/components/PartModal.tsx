import { motion, AnimatePresence } from 'framer-motion'
import { X, Phone, Mail, Package, Tag, CheckCircle } from 'lucide-react'
import ImageZoom from './ImageZoom'

interface PartModalProps {
  isOpen: boolean
  onClose: () => void
  onPurchase?: () => void
  part: {
    image: string
    category: string
    name: string
    brand: string
    price: string
    condition: string
    description: string
  }
}

const PartModal = ({ isOpen, onClose, part, onPurchase }: PartModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/95 backdrop-blur-sm z-[60]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-4 md:inset-8 lg:inset-20 z-[70] overflow-hidden"
          >
            <div className="w-full h-full max-w-4xl mx-auto bg-card border border-border rounded-sm overflow-hidden flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div>
                  <p className="label-small">{part.brand} • {part.category}</p>
                  <h2 className="font-serif text-3xl md:text-4xl mt-2">
                    {part.name}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-background-soft rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
                  {/* Left Column - Image */}
                  <div className="space-y-6">
                    <div className="aspect-square overflow-hidden rounded-sm border border-border bg-background-soft relative">
                      {/* Placeholder Icon */}
                      <div className="absolute inset-0 flex items-center justify-center z-0">
                        <Package size={120} className="text-foreground-faint" />
                      </div>
                      
                      {/* Actual Image with Zoom */}
                      <div className="relative z-10 w-full h-full">
                        <ImageZoom
                          src={part.image}
                          alt={`${part.brand} ${part.name}`}
                          className="w-full h-full"
                        />
                      </div>
                    </div>

                    {/* Price & Condition Card */}
                    <div className="card-luxury p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="label-small mb-2">Price</p>
                          <p className="text-4xl font-serif text-motorsport-red">
                            {part.price}
                          </p>
                        </div>
                        <Tag size={48} className="text-foreground-faint" />
                      </div>
                      
                      <div className="pt-4 border-t border-border">
                        <div className="flex items-center gap-2">
                          <CheckCircle size={20} className="text-motorsport-red" />
                          <div>
                            <p className="label-small">Condition</p>
                            <p className="font-medium">{part.condition}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Details */}
                  <div className="space-y-6">
                    {/* Description */}
                    <div>
                      <h3 className="font-serif text-2xl mb-4">Description</h3>
                      <p className="text-foreground-muted leading-relaxed">
                        {part.description}
                      </p>
                    </div>

                    {/* Details */}
                    <div>
                      <h3 className="font-serif text-2xl mb-4">Details</h3>
                      <div className="space-y-3">
                        <div className="card-luxury p-4">
                          <p className="label-small mb-2">Brand</p>
                          <p className="font-medium">{part.brand}</p>
                        </div>
                        <div className="card-luxury p-4">
                          <p className="label-small mb-2">Category</p>
                          <p className="font-medium">{part.category}</p>
                        </div>
                        <div className="card-luxury p-4">
                          <p className="label-small mb-2">Condition</p>
                          <p className="font-medium">{part.condition}</p>
                        </div>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="card-luxury p-6 space-y-4">
                      <h3 className="font-serif text-xl mb-4">Inquire About This Part</h3>
                      
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center flex-shrink-0">
                          <Phone size={18} />
                        </div>
                        <div>
                          <p className="text-xs text-foreground-muted">Call/Viber</p>
                          <a href="tel:+639123456789" className="hover:text-motorsport-red transition-colors">
                            +63 912 345 6789
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center flex-shrink-0">
                          <Mail size={18} />
                        </div>
                        <div>
                          <p className="text-xs text-foreground-muted">Email</p>
                          <a href="mailto:hrvdcartrading@gmail.com" className="hover:text-motorsport-red transition-colors">
                            hrvdcartrading@gmail.com
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a
                        href="tel:+639123456789"
                        className="btn-secondary flex-1 text-center"
                      >
                        Call Now
                      </a>
                      <button
                        onClick={() => {
                          onClose()
                          onPurchase?.()
                        }}
                        className="btn-primary flex-1 text-center"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default PartModal
