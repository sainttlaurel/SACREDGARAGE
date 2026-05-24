# HRVD Car Trading — Premium Luxury Automotive Website

A cinematic, luxury editorial-style website for premium motorsport vehicles, combining Red Bull Racing energy with high-end automotive presentation.

## 🎨 Design Philosophy

- **Luxury Monochrome Editorial** — Pure black backgrounds with white typography
- **Cinematic Automotive Photography** — Full-width immersive imagery
- **Motorsport-Inspired Identity** — Red Bull Racing energy meets premium dealership
- **Premium UI/UX** — Minimal chrome, maximum impact

## 🚀 Tech Stack

- **React 18** — Modern UI library
- **Vite** — Lightning-fast build tool
- **TypeScript** — Type-safe development
- **Tailwind CSS** — Utility-first styling
- **Framer Motion** — Advanced animations
- **Lucide React** — Premium iconography
- **Supabase** — Backend integration ready

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎯 Features

- 🎬 Cinematic video loading screen with logo
- ✨ Smooth entrance animations
- 🏎️ Premium vehicle inventory showcase
- 🔧 Performance parts marketplace
- 🎥 Showreel section with social media integration
- 📱 Fully responsive mobile-first design
- 🎭 Film grain texture overlay
- 🌊 Smooth scroll-triggered animations
- 💎 Luxury editorial typography system
- 🎨 Monochrome + motorsport color palette
- 🖼️ Logo integration in header and footer

## 🎨 Design System

### Colors
- Pure black backgrounds (`#000000`)
- White typography (`#FFFFFF`)
- Motorsport red accent (`#c1121f`)
- Metallic highlights (`#c0c0c0`)

### Typography
- **Display:** Instrument Serif — Elegant editorial headings
- **Body/UI:** Inter — Clean modern interface

### Layout
- Max width: `1120px`
- Consistent padding: `px-6 lg:px-8`
- Premium white space throughout

## 📁 Project Structure

```
src/
├── components/
│   ├── LoadingScreen.tsx # Video loading screen
│   ├── Navbar.tsx       # Fixed navigation with logo
│   ├── Hero.tsx         # Cinematic hero section
│   ├── Features.tsx     # Why choose HRVD
│   ├── Inventory.tsx    # Vehicle showcase
│   ├── VehicleCard.tsx  # Individual vehicle cards
│   ├── Parts.tsx        # Performance parts section
│   ├── PartCard.tsx     # Individual part cards
│   ├── Showreel.tsx     # Video/social media section
│   ├── CTA.tsx          # Call-to-action section
│   ├── Contact.tsx      # Contact form & info
│   └── Footer.tsx       # Site footer with logo
├── App.tsx              # Main app component
├── main.tsx             # App entry point
└── index.css            # Global styles & design system
```

## 🎬 Animation System

All animations use Framer Motion with:
- Elegant slow easing curves
- Scroll-triggered reveals
- Stagger effects for lists
- Smooth hover transitions
- Cinematic entrance animations

## 📱 Responsive Design

- **Mobile:** Single-column, fullscreen menu, touch-optimized
- **Tablet:** Adaptive grid layouts
- **Desktop:** Multi-column editorial layouts, spacious composition

## 🔧 Customization

### Update Vehicle Inventory
Edit `src/components/Inventory.tsx` to add/modify vehicles in the `vehicles` array.

### Update Parts Inventory
Edit `src/components/Parts.tsx` to add/modify parts in the `parts` array.
See `PARTS_INVENTORY.md` for detailed instructions.

### Customize Loading Screen
Edit `src/components/LoadingScreen.tsx` to change timing or behavior.
See `LOADING_SCREEN.md` for detailed instructions.

### Change Colors
Modify color variables in `tailwind.config.js` and `src/index.css`.

### Add Sections
Create new components in `src/components/` and import them in `App.tsx`.

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy dist folder to Vercel
```

### Other Platforms
Build the project and deploy the `dist` folder to any static hosting service.

## 📄 License

© 2024 HRVD Car Trading. All rights reserved.

## 🤝 Support

For questions or support, contact: info@hrvd.com

---

**Built with precision. Designed for performance.**
