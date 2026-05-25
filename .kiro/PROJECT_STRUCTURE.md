# HRVD Car Trading - Project Structure

## 📁 Directory Organization

```
SACREDGARAGE/
├── .kiro/                          # Kiro documentation
│   ├── ISSUES.md                   # Known issues and roadmap
│   └── PROJECT_STRUCTURE.md        # This file
│
├── .vscode/                        # VS Code settings
│   └── settings.json
│
├── public/                         # Static assets
│   ├── cars/                       # Vehicle gallery images (1-35.jpg)
│   ├── image/                      # Main images
│   │   ├── LOGO.webp              # Site logo
│   │   ├── bg.png                 # Background
│   │   ├── bg1.jpg                # Background variant
│   │   ├── FORD RANGER WILDTRACK.jpg
│   │   ├── HONDA CIVIC.jpg
│   │   ├── TOYOTA FJ CRUISER.jpg
│   │   └── TOYOTA LC200.jpg
│   └── video/
│       └── LOADING SCREEN.mp4     # 8-second loading video
│
├── src/                            # Source code
│   ├── components/                 # React components
│   │   ├── admin/                 # Admin panel components
│   │   │   ├── AdminInquiries.tsx
│   │   │   ├── AdminInventory.tsx
│   │   │   ├── AdminParts.tsx
│   │   │   ├── AdminPartOrders.tsx
│   │   │   └── AdminSettings.tsx
│   │   ├── CTA.tsx                # Call-to-action section
│   │   ├── Contact.tsx            # Contact form
│   │   ├── Features.tsx           # Features section
│   │   ├── Footer.tsx             # Footer
│   │   ├── GalleryWall.tsx        # Image gallery
│   │   ├── Hero.tsx               # Hero section with carousel
│   │   ├── ImageGallery.tsx       # Vehicle image gallery
│   │   ├── ImageZoom.tsx          # Amazon-style zoom
│   │   ├── Inventory.tsx          # Vehicle inventory
│   │   ├── LoadingScreen.tsx      # Loading screen
│   │   ├── Navbar.tsx             # Navigation bar
│   │   ├── PartCard.tsx           # Part card component
│   │   ├── PartModal.tsx          # Part details modal
│   │   ├── Parts.tsx              # Parts section
│   │   ├── PartsPurchaseModal.tsx # Part purchase form
│   │   ├── Showreel.tsx           # Video showreel
│   │   ├── ThemeToggle.tsx        # Dark/light mode toggle
│   │   ├── Toast.tsx              # Toast notifications
│   │   ├── VehicleCard.tsx        # Vehicle card component
│   │   └── VehicleModal.tsx       # Vehicle details modal
│   │
│   ├── lib/                        # Utility functions
│   │   ├── supabase.ts            # Supabase client & services
│   │   └── syncToSupabase.ts      # Data sync functions
│   │
│   ├── pages/                      # Page components
│   │   └── AdminPortal.tsx        # Admin dashboard
│   │
│   ├── App.tsx                     # Main app component
│   ├── main.tsx                    # Entry point
│   └── index.css                   # Global styles
│
├── .env.example                    # Environment variables template
├── .env.local                      # Environment variables (local)
├── .eslintrc.cjs                   # ESLint configuration
├── .gitignore                      # Git ignore rules
├── index.html                      # HTML entry point
├── package.json                    # Dependencies
├── package-lock.json               # Dependency lock file
├── postcss.config.js               # PostCSS configuration
├── README.md                       # Project README
├── tailwind.config.js              # Tailwind CSS configuration
├── tsconfig.json                   # TypeScript configuration
├── tsconfig.node.json              # TypeScript Node configuration
├── vercel.json                     # Vercel deployment config
└── vite.config.ts                  # Vite configuration
```

---

## 🔧 Configuration Files

### `vite.config.ts`
- Vite build configuration
- React plugin setup
- Build optimization settings

### `tailwind.config.js`
- Tailwind CSS theme configuration
- Custom colors (black, white, motorsport red)
- Dark mode configuration
- Custom utilities

### `tsconfig.json`
- TypeScript compiler options
- Path aliases
- Module resolution

### `.env.local`
- Supabase URL
- Supabase publishable key
- **⚠️ Never commit this file**

### `.env.example`
- Template for environment variables
- Safe to commit

### `vercel.json`
- Vercel deployment configuration
- SPA routing setup

---

## 📦 Key Dependencies

### Core
- `react` - UI library
- `react-dom` - React DOM rendering
- `typescript` - Type safety

### Build Tools
- `vite` - Build tool
- `@vitejs/plugin-react` - React plugin for Vite

### Styling
- `tailwindcss` - Utility-first CSS
- `postcss` - CSS processing
- `autoprefixer` - CSS vendor prefixes

### Animations
- `framer-motion` - Animation library

### Icons
- `lucide-react` - Icon library

### Database
- `@supabase/supabase-js` - Supabase client

### Development
- `eslint` - Code linting
- `@typescript-eslint/eslint-plugin` - TypeScript linting

---

## 🎯 Component Hierarchy

```
App
├── LoadingScreen (on initial load)
├── Navbar
├── Hero (with carousel)
├── Features
├── Inventory
│   └── VehicleCard
│       └── VehicleModal
│           └── ImageGallery
│               └── ImageZoom
├── Parts
│   └── PartCard
│       └── PartModal
│           └── ImageZoom
│       └── PartsPurchaseModal
├── GalleryWall
├── Showreel
├── CTA
├── Contact
├── Footer
├── ThemeToggle
├── Toast (notifications)
└── AdminPortal (when /admin route)
    ├── AdminInquiries
    ├── AdminInventory
    ├── AdminParts
    ├── AdminPartOrders
    └── AdminSettings
```

---

## 🗄️ Data Flow

### Inquiries
```
Contact Form → inquiryService.create() → localStorage → Supabase
                                      ↓
                            AdminInquiries (display)
```

### Vehicles
```
Admin Add → vehicleService.create() → localStorage → Supabase
                                   ↓
                        Inventory (display)
```

### Parts
```
Admin Add → partsService.create() → localStorage → Supabase
                               ↓
                        Parts (display)
```

### Part Orders
```
Purchase Form → partOrdersService.create() → localStorage → Supabase
                                          ↓
                            AdminPartOrders (display)
```

### Vehicle Inquiries
```
Vehicle Modal → vehicleInquiryService.create() → localStorage → Supabase
                                             ↓
                            AdminPortal (display)
```

---

## 🔄 Service Architecture

### `supabase.ts`
Exports:
- `supabase` - Supabase client instance
- `isSupabaseAvailable` - Connection status
- `inquiryService` - CRUD for inquiries
- `vehicleService` - CRUD for vehicles
- `partsService` - CRUD for parts
- `partOrdersService` - CRUD for part orders
- `vehicleInquiryService` - CRUD for vehicle inquiries
- `settingsService` - Business settings
- TypeScript interfaces for all data types

### `syncToSupabase.ts`
Exports:
- `loadFromSupabaseToLocalStorage()` - Pull data from cloud
- `syncLocalStorageToSupabase()` - Push data to cloud

---

## 📊 Database Schema

### Tables (to be created in Supabase)

#### `inquiries`
```sql
- id (text, primary key)
- firstName (text)
- lastName (text)
- email (text)
- phone (text)
- message (text)
- status (text: 'new' | 'read' | 'responded')
- createdAt (timestamp)
- updatedAt (timestamp)
```

#### `vehicles`
```sql
- id (text, primary key)
- image (text)
- images (text[])
- brand (text)
- model (text)
- year (integer)
- price (text)
- location (text)
- description (text)
- specs (jsonb)
- available (boolean)
- createdAt (timestamp)
- updatedAt (timestamp)
```

#### `parts`
```sql
- id (text, primary key)
- image (text)
- category (text)
- name (text)
- brand (text)
- price (text)
- condition (text)
- description (text)
- available (boolean)
- createdAt (timestamp)
- updatedAt (timestamp)
```

#### `part_orders`
```sql
- id (text, primary key)
- partId (text)
- partName (text)
- partBrand (text)
- partPrice (text)
- quantity (integer)
- customerName (text)
- customerEmail (text)
- customerPhone (text)
- customerCar (text)
- address (text)
- paymentMethod (text)
- deliveryOption (text)
- facebookProfile (text, nullable)
- notes (text, nullable)
- status (text: 'new' | 'contacted' | 'confirmed' | 'completed')
- createdAt (timestamp)
- updatedAt (timestamp)
```

#### `vehicle_inquiries`
```sql
- id (text, primary key)
- vehicleId (text)
- vehicleBrand (text)
- vehicleModel (text)
- vehicleYear (integer)
- vehiclePrice (text)
- customerName (text)
- customerEmail (text)
- customerPhone (text)
- inquiryType (text: 'purchase' | 'trade-in' | 'financing' | 'other')
- message (text)
- facebookProfile (text, nullable)
- status (text: 'new' | 'contacted' | 'confirmed' | 'completed')
- createdAt (timestamp)
- updatedAt (timestamp)
```

#### `business_settings`
```sql
- id (text, primary key)
- businessName (text)
- email (text)
- phone (text)
- location (text)
- businessHours (text)
- createdAt (timestamp)
- updatedAt (timestamp)
```

---

## 🚀 Build & Deployment

### Development
```bash
npm run dev
# Runs on http://localhost:5173
```

### Production Build
```bash
npm run build
# Creates optimized dist/ folder
```

### Preview Build
```bash
npm run preview
# Preview production build locally
```

### Deployment
- **Vercel:** Automatic deployment on push to main
- **Other:** Deploy `dist/` folder to any static host

---

## 🔐 Environment Variables

### Required
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
```

### Optional
```
VITE_API_URL=https://api.example.com
VITE_ANALYTICS_ID=your_analytics_id
```

---

## 📝 File Naming Conventions

- **Components:** PascalCase (e.g., `VehicleCard.tsx`)
- **Services:** camelCase (e.g., `vehicleService`)
- **Utilities:** camelCase (e.g., `syncToSupabase.ts`)
- **Styles:** Global in `index.css`, component-scoped with Tailwind
- **Types:** Defined in component files or `supabase.ts`

---

## 🎨 Styling Approach

- **Tailwind CSS** for utility classes
- **CSS-in-JS** via Tailwind for dynamic styles
- **Global styles** in `src/index.css`
- **Dark mode** via `dark:` prefix
- **Custom utilities** defined in `tailwind.config.js`

---

## 🔗 Important Links

- **GitHub:** https://github.com/sainttlaurel/sacredgarage
- **Vercel:** Auto-deployed on push
- **Supabase:** https://supabase.com
- **Tailwind:** https://tailwindcss.com
- **Framer Motion:** https://www.framer.com/motion/

---

## 📚 Documentation Files

- `README.md` - Project overview
- `.kiro/ISSUES.md` - Known issues and roadmap
- `.kiro/PROJECT_STRUCTURE.md` - This file

---

**Last Updated:** May 25, 2026
