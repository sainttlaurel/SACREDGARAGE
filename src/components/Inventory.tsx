import { motion } from 'framer-motion'
import { useState } from 'react'
import VehicleCard from './VehicleCard'
import VehicleModal from './VehicleModal'

const vehicles = [
  {
    image: '/image/HONDA CIVIC.jpg',
    brand: 'Honda',
    model: 'Civic VTi VTEC',
    year: 1997,
    price: '₱210,000',
    location: 'Quezon City',
    description: 'All stock engine, 1st owner. Fresh repaint – gas & go. Cold AC, power windows/mirrors. Type R seats, MOMO steering wheel. JBL + Pioneer sound setup. Registered until 2026, complete papers. Fresh & reliable – perfect pang-daily/tambay!',
    specs: {
      mileage: '1st Owner',
      condition: 'Fresh Repaint',
      registration: 'Until 2026'
    }
  },
  {
    image: '/image/TOYOTA LC200.jpg',
    brand: 'Toyota',
    model: 'Land Cruiser LC200',
    year: 2016,
    price: '₱3,815,000',
    location: 'Quezon City',
    description: '4.5L V8 Turbo Diesel, 4x4 AT. 128k kms, Toyota Commonwealth maintained. 100% orig paint, fresh in & out. Beige leather interior, 2 headrest monitors. 20" OEM rims + Dunlop Grandtrek (almost new). Ice-cold AC, no underchassis issues. 2 orig keys, updated reg, free transfer. Luxury + durability – built to last! Open for trade (with cash top-up).',
    specs: {
      mileage: '128k kms',
      engine: '4.5L V8 Turbo Diesel',
      drivetrain: '4x4 AT'
    }
  },
  {
    image: '/image/TOYOTA FJ CRUISER.jpg',
    brand: 'Toyota',
    model: 'FJ Cruiser 4x4',
    year: 2016,
    price: '₱1,780,000',
    location: 'Quezon City',
    description: '47k kms only, fresh PMS done. Brand new Amaron battery. 100% orig paint, complete papers. Old Man Emu BP-51 suspension + UCAs. SCS wheels + BFGoodrich KM3 set of 5. Borla headers + full Borla exhaust. AFE Momentum GT intake. Stage 4 projector retrofit headlights. ₱200K sound setup – Pioneer Z5050, Focal, Crescendo. Solid, built, and loaded – ready to roll! Open to trade + cash offers.',
    specs: {
      mileage: '47k kms',
      suspension: 'OME BP-51',
      sound: '₱200K Setup'
    }
  },
  {
    image: '/image/FORD RANGER WILDTRACK.jpg',
    brand: 'Ford',
    model: 'Ranger Wildtrak',
    year: 2018,
    price: '₱995,000',
    location: 'Quezon City',
    description: '3.2L Turbo Diesel, 6AT. 42k kms only, all original & excellent condition. Complete papers, 2 orig keys, manuals. Upgrades: TJM front/rear bumpers + rocksliders, TJM Pace suspension + ARB OME leafs + UCAs, 2" body lift + Bushwacker flares, Mastercraft MXT 35x12.5x20 tires, Safari snorkel + BRC exhaust, Roller lid w/ lock, All-LED headlights & fogs. Off-road ready, no issues – just gas & go! Open for swap/trade + cash offers.',
    specs: {
      mileage: '42k kms',
      engine: '3.2L Turbo Diesel',
      modifications: 'Full Off-Road Build'
    }
  }
]

const Inventory = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<typeof vehicles[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleViewDetails = (vehicle: typeof vehicles[0]) => {
    setSelectedVehicle(vehicle)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedVehicle(null), 300) // Wait for animation
  }

  return (
    <>
      <section id="inventory" className="py-32 bg-background-soft">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <p className="label-small mb-4">Current Collection</p>
          <h2 className="heading-section mb-6">
            Premium Modified Vehicles
          </h2>
          <p className="text-lg text-foreground-muted">
            Each vehicle has been carefully selected and verified. From JDM classics to modern off-roaders, 
            all with complete papers and ready for transfer.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {vehicles.map((vehicle, index) => (
            <VehicleCard 
              key={index} 
              {...vehicle} 
              index={index}
              onViewDetails={() => handleViewDetails(vehicle)}
            />
          ))}
        </div>

        {/* Trade Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16 p-8 card-luxury"
        >
          <p className="text-lg text-foreground-muted">
            💬 Open for trade-ins and cash offers • All vehicles located in Quezon City
          </p>
        </motion.div>
      </div>
    </section>

    {/* Vehicle Detail Modal */}
    {selectedVehicle && (
      <VehicleModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        vehicle={selectedVehicle}
      />
    )}
  </>
  )
}

export default Inventory
