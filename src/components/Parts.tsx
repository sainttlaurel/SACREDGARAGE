import { motion } from 'framer-motion'
import { useState } from 'react'
import PartCard from './PartCard'
import PartModal from './PartModal'

const parts = [
  {
    image: '/image/parts/sample-part.jpg', // You can add actual part images later
    category: 'Suspension',
    name: 'Coilover Kit',
    brand: 'BC Racing',
    price: '₱45,000',
    condition: 'Brand New',
    description: 'Adjustable coilover suspension kit. Height and damping adjustable. Fits various applications.'
  },
  {
    image: '/image/parts/sample-part.jpg',
    category: 'Exhaust',
    name: 'Cat-Back Exhaust',
    brand: 'HKS',
    price: '₱35,000',
    condition: 'Used - Excellent',
    description: 'Stainless steel cat-back exhaust system. Deep tone, minimal drone. Complete with hardware.'
  },
  {
    image: '/image/parts/sample-part.jpg',
    category: 'Wheels',
    name: 'Forged Wheels 18"',
    brand: 'Rays Volk Racing',
    price: '₱120,000',
    condition: 'Used - Good',
    description: 'Set of 4 genuine Rays Volk Racing TE37. 18x9.5 +22 offset. Minor curb rash, structurally perfect.'
  },
  {
    image: '/image/parts/sample-part.jpg',
    category: 'Engine',
    name: 'Turbo Kit',
    brand: 'Garrett',
    price: '₱85,000',
    condition: 'Brand New',
    description: 'Complete turbo kit with manifold, downpipe, and oil lines. Supports up to 400hp.'
  },
  {
    image: '/image/parts/sample-part.jpg',
    category: 'Interior',
    name: 'Racing Seats (Pair)',
    brand: 'Bride',
    price: '₱55,000',
    condition: 'Used - Excellent',
    description: 'Pair of Bride Low Max racing seats. FRP shell, excellent condition. Side mounts included.'
  },
  {
    image: '/image/parts/sample-part.jpg',
    category: 'Electronics',
    name: 'ECU Tuner',
    brand: 'Hondata',
    price: '₱28,000',
    condition: 'Used - Good',
    description: 'Hondata FlashPro for Honda/Acura. Includes cable and software license. Fully functional.'
  }
]

const Parts = () => {
  const [selectedPart, setSelectedPart] = useState<typeof parts[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleInquire = (part: typeof parts[0]) => {
    setSelectedPart(part)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedPart(null), 300) // Wait for animation
  }

  return (
    <>
      <section id="parts" className="py-32 bg-background">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <p className="label-small mb-4">Performance Parts</p>
          <h2 className="heading-section mb-6">
            Upgrade Your Build
          </h2>
          <p className="text-lg text-foreground-muted">
            Quality aftermarket and OEM parts for your project. 
            From suspension to engine upgrades – all verified and ready to ship.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {parts.map((part, index) => (
            <PartCard 
              key={index} 
              {...part} 
              index={index}
              onInquire={() => handleInquire(part)}
            />
          ))}
        </div>

        {/* Parts Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16 p-8 card-luxury"
        >
          <p className="text-lg text-foreground-muted mb-4">
            🔧 Looking for specific parts? Send us your requirements!
          </p>
          <a href="#contact" className="btn-primary inline-block">
            Request Parts
          </a>
        </motion.div>
      </div>
    </section>

    {/* Part Detail Modal */}
    {selectedPart && (
      <PartModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        part={selectedPart}
      />
    )}
  </>
  )
}

export default Parts
