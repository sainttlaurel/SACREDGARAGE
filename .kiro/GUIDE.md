# HRVD Car Trading - Complete Guide

**Last Updated:** May 25, 2026

---

## 📖 DOCUMENTATION

- **STATUS.md** - Current status and immediate next steps (READ FIRST!)
- **SUPABASE_MIGRATION.sql** - Database table creation script
- **ISSUES.md** - Known issues and roadmap
- **PROJECT_STRUCTURE.md** - Project architecture

---

## 🚀 QUICK START

### 1. Setup (First Time Only)
```bash
git clone https://github.com/sainttlaurel/sacredgarage.git
cd sacredgarage
npm install
cp .env.example .env.local
npm run dev
```

### 2. Create Supabase Tables (IMPORTANT!)
1. Go to Supabase Dashboard → SQL Editor
2. Copy contents of `.kiro/SUPABASE_MIGRATION.sql`
3. Paste and run
4. Verify all 6 tables in Table Editor

### 3. Development
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Check code quality
```

---

## 📊 WHAT'S WORKING

✅ All components and features  
✅ Admin portal  
✅ Image gallery with zoom  
✅ Dark/light mode  
✅ Error boundaries (NEW)  
✅ Toast notifications (NEW)  

---

## ⚠️ WHAT NEEDS FIXING

| Issue | Time | Priority |
|-------|------|----------|
| Create Supabase tables | 20 min | 🔴 CRITICAL |
| Fix admin password | 1-6 hrs | 🔴 CRITICAL |
| Real-time sync | 3-4 hrs | 🔴 CRITICAL |
| Input validation | 2-3 hrs | 🟠 HIGH |
| Bundle size | 4-6 hrs | 🟠 HIGH |

---

## 🔧 ENVIRONMENT VARIABLES

### Required (.env.local)
```env
VITE_SUPABASE_URL=https://opfhikdkqfveoweqxqia.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_FSzEO1IMn-hTeK8m4TX1Eg_9ljySKS-
```

### Optional
```env
VITE_ADMIN_PASSWORD=your_password_here
```

---

## 📁 PROJECT STRUCTURE

```
src/
├── components/
│   ├── admin/              # Admin portal components
│   ├── ErrorBoundary.tsx   # Error handling (NEW)
│   ├── ToastContainer.tsx  # Notifications (NEW)
│   └── ... (other components)
├── lib/
│   ├── supabase.ts         # Database services
│   └── notifications.ts    # Notification API (NEW)
├── pages/
│   └── AdminPortal.tsx     # Admin dashboard
└── App.tsx                 # Main app

.kiro/
├── STATUS.md               # Current status (READ FIRST!)
├── GUIDE.md                # This file
├── SUPABASE_MIGRATION.sql  # Database setup
├── ISSUES.md               # Known issues
└── PROJECT_STRUCTURE.md    # Architecture details
```

---

## 🗄️ DATABASE SETUP

### Tables Created by SUPABASE_MIGRATION.sql
1. **inquiries** - Contact form submissions
2. **vehicles** - Vehicle inventory
3. **parts** - Performance parts
4. **part_orders** - Customer part orders
5. **vehicle_inquiries** - Vehicle inquiries
6. **business_settings** - Business info

### How to Create Tables
1. Go to Supabase Dashboard
2. SQL Editor → New Query
3. Copy `.kiro/SUPABASE_MIGRATION.sql`
4. Paste and run
5. Done!

---

## 🔐 SECURITY

### Current Issues
- ⚠️ Admin password is hardcoded ("admin123")
- ⚠️ No input validation on forms
- ⚠️ No CSRF protection

### Fix Admin Password (Choose One)

**Option A: Environment Variable (1 hour)**
```env
VITE_ADMIN_PASSWORD=your_secure_password
```

**Option B: Supabase Auth (4-6 hours - Recommended)**
- Use Supabase authentication system
- More secure and professional

**Option C: Hashed Passwords (3-4 hours)**
- Hash passwords with bcryptjs
- Store in database

---

## 🚀 DEPLOYMENT

### Deploy to Vercel (Recommended)
1. Push code to GitHub
2. Go to vercel.com
3. Import repository
4. Add environment variables
5. Deploy!

### Deploy to Other Platforms
1. Run: `npm run build`
2. Upload `dist/` folder
3. Configure SPA routing

---

## 🐛 TROUBLESHOOTING

### "Supabase environment variables not set"
- Check `.env.local` exists
- Verify credentials are correct
- Restart dev server

### "Tables don't exist"
- Run `.kiro/SUPABASE_MIGRATION.sql` in Supabase
- Verify tables in Table Editor

### "Admin portal won't load"
- Check browser console for errors
- Verify admin password is correct
- Clear browser cache

### "Images not loading"
- Verify image files exist in `public/`
- Check image paths in components
- Verify Vercel deployment includes `public/`

---

## 📞 SUPPORT

### Documentation
- [Supabase Docs](https://supabase.com/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)

### Community
- [Supabase Discord](https://discord.supabase.com)
- [React Discord](https://discord.gg/react)

### Issues
- [GitHub Issues](https://github.com/sainttlaurel/sacredgarage/issues)

---

## ✅ NEXT STEPS

1. **Read STATUS.md** - Understand current status
2. **Create Supabase tables** - Use SUPABASE_MIGRATION.sql
3. **Test features** - Make sure everything works
4. **Fix critical issues** - Follow ISSUES.md
5. **Deploy** - Push to production

---

**Questions?** Check STATUS.md or ISSUES.md

