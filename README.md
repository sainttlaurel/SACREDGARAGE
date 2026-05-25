# HRVD Car Trading — Premium Luxury Automotive Website

A cinematic, luxury editorial-style website for premium motorsport vehicles, combining Red Bull Racing-inspired energy with premium automotive presentation.

## Design Philosophy

- Luxury monochrome editorial aesthetic
- Cinematic automotive photography
- Motorsport-inspired identity
- Minimal and premium UI/UX experience

## Tech Stack

- React 18
- Vite
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- Supabase

## Installation

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

## Features

- Cinematic video loading screen
- Smooth motion animations
- Premium vehicle showcase
- Performance parts marketplace
- Responsive mobile-first design
- Scroll-triggered transitions
- Editorial typography system
- Motorsport-inspired monochrome theme
- Social media and showreel integration

## Design System

### Colors

- Pure black backgrounds (`#000000`)
- White typography (`#FFFFFF`)
- Motorsport red accent (`#c1121f`)
- Metallic highlights (`#c0c0c0`)

### Typography

- Instrument Serif — Editorial display headings
- Inter — Modern interface typography

### Layout

- Max width: `1120px`
- Consistent spacing system
- Minimal luxury composition

## Project Structure

```plaintext
src/
├── components/
│   ├── LoadingScreen.tsx
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── Inventory.tsx
│   ├── VehicleCard.tsx
│   ├── Parts.tsx
│   ├── PartCard.tsx
│   ├── Showreel.tsx
│   ├── CTA.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── App.tsx
├── main.tsx
└── index.css
```

## Animation System

Built with Framer Motion featuring:

- Smooth easing transitions
- Scroll-triggered reveals
- Stagger animations
- Hover interactions
- Cinematic entrance effects

## Responsive Design

- Mobile-first optimized layout
- Adaptive tablet grids
- Spacious desktop editorial layouts

## Customization

### Vehicle Inventory

Edit `src/components/Inventory.tsx` to update the vehicle showcase.

### Parts Inventory

Edit `src/components/Parts.tsx` to modify the parts collection.

### Loading Screen

Edit `src/components/LoadingScreen.tsx` to customize loading behavior.

### Theme Colors

Modify color variables in `tailwind.config.js` and `src/index.css`.

### Add New Sections

Create additional components inside `src/components/` and import them into `App.tsx`.

## Deployment

### Vercel

```bash
npm run build
```

Deploy the generated `dist` folder to Vercel or any static hosting platform.

## License

© 2024 HRVD Car Trading. All rights reserved.

## Support

For inquiries or support:

`miguelpilapil30@gmail.com`

---

Built with precision. Designed for performance.
