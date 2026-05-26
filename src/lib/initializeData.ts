/**
 * Initialize localStorage with default data if empty
 * This ensures admin portal has data to work with even if Supabase is unavailable
 */

export const initializeDefaultData = () => {
  // Initialize vehicles if not present
  if (!localStorage.getItem('vehicles')) {
    const defaultVehicles = [
      {
        id: '1',
        image: '/image/HONDA CIVIC.jpg',
        images: ['/image/HONDA CIVIC.jpg', '/cars/1.jpg', '/cars/2.jpg', '/cars/3.jpg', '/cars/4.jpg', '/cars/5.jpg'],
        brand: 'Honda',
        model: 'Civic VTi VTEC',
        year: 1997,
        price: '₱210,000',
        location: 'Quezon City',
        description: 'All stock engine, 1st owner. Fresh repaint – gas & go. Cold AC, power windows/mirrors. Type R seats, MOMO steering wheel. JBL + Pioneer sound setup. Registered until 2026, complete papers. Fresh & reliable – perfect pang-daily/tambay!',
        specs: { mileage: '1st Owner', condition: 'Fresh Repaint', registration: 'Until 2026' },
        available: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2',
        image: '/image/TOYOTA LC200.jpg',
        images: ['/image/TOYOTA LC200.jpg', '/cars/6.jpg', '/cars/7.jpg', '/cars/8.jpg', '/cars/9.jpg', '/cars/10.jpg', '/cars/11.jpg', '/cars/12.jpg'],
        brand: 'Toyota',
        model: 'Land Cruiser LC200',
        year: 2016,
        price: '₱3,815,000',
        location: 'Quezon City',
        description: '4.5L V8 Turbo Diesel, 4x4 AT. 128k kms, Toyota Commonwealth maintained. 100% orig paint, fresh in & out. Beige leather interior, 2 headrest monitors. 20" OEM rims + Dunlop Grandtrek (almost new). Ice-cold AC, no underchassis issues. 2 orig keys, updated reg, free transfer. Luxury + durability – built to last! Open for trade (with cash top-up).',
        specs: { mileage: '128k kms', engine: '4.5L V8 Turbo Diesel', drivetrain: '4x4 AT' },
        available: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '3',
        image: '/image/TOYOTA FJ CRUISER.jpg',
        images: ['/image/TOYOTA FJ CRUISER.jpg', '/cars/13.jpg', '/cars/14.jpg', '/cars/15.jpg', '/cars/16.jpg', '/cars/17.jpg', '/cars/18.jpg', '/cars/19.jpg', '/cars/20.jpg'],
        brand: 'Toyota',
        model: 'FJ Cruiser 4x4',
        year: 2016,
        price: '₱1,780,000',
        location: 'Quezon City',
        description: '47k kms only, fresh PMS done. Brand new Amaron battery. 100% orig paint, complete papers. Old Man Emu BP-51 suspension + UCAs. SCS wheels + BFGoodrich KM3 set of 5. Borla headers + full Borla exhaust. AFE Momentum GT intake. Stage 4 projector retrofit headlights. ₱200K sound setup – Pioneer Z5050, Focal, Crescendo. Solid, built, and loaded – ready to roll! Open to trade + cash offers.',
        specs: { mileage: '47k kms', suspension: 'OME BP-51', sound: '₱200K Setup' },
        available: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]
    localStorage.setItem('vehicles', JSON.stringify(defaultVehicles))
    console.log('✅ Initialized default vehicles in localStorage')
  }

  // Initialize parts if not present
  if (!localStorage.getItem('parts')) {
    const defaultParts = [
      {
        id: 'p1',
        image: '/image/LOGO.webp',
        category: 'Suspension',
        name: 'Coilover Kit',
        brand: 'BC Racing',
        price: '₱45,000',
        condition: 'Brand New',
        description: 'High-quality adjustable coilover suspension kit for improved handling and lowered stance.',
        available: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'p2',
        image: '/image/LOGO.webp',
        category: 'Exhaust',
        name: 'Full Exhaust System',
        brand: 'Borla',
        price: '₱65,000',
        condition: 'Brand New',
        description: 'Complete stainless steel exhaust system with performance headers and muffler.',
        available: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]
    localStorage.setItem('parts', JSON.stringify(defaultParts))
    console.log('✅ Initialized default parts in localStorage')
  }

  // Initialize inquiries if not present
  if (!localStorage.getItem('inquiries')) {
    localStorage.setItem('inquiries', JSON.stringify([]))
    console.log('✅ Initialized empty inquiries in localStorage')
  }

  // Initialize part orders if not present
  if (!localStorage.getItem('part_orders')) {
    localStorage.setItem('part_orders', JSON.stringify([]))
    console.log('✅ Initialized empty part_orders in localStorage')
  }

  // Initialize vehicle inquiries if not present
  if (!localStorage.getItem('vehicle_inquiries')) {
    localStorage.setItem('vehicle_inquiries', JSON.stringify([]))
    console.log('✅ Initialized empty vehicle_inquiries in localStorage')
  }
}
