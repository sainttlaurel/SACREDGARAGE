# Vercel Deployment & Supabase Setup Guide

## Problem: Black Screen After Deployment

Your website shows a black screen after deployment because **environment variables are not set in Vercel**. The app builds successfully, but fails to initialize at runtime.

## Solution: Add Environment Variables to Vercel

### Step 1: Go to Vercel Dashboard
1. Visit https://vercel.com/dashboard
2. Select your project: **sacredgarage**
3. Click on **Settings** tab

### Step 2: Add Environment Variables
1. In Settings, find **Environment Variables** section
2. Click **Add New** and add these two variables:

```
VITE_SUPABASE_URL = https://opfhikdkqfveoweqxqia.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY = sb_publishable_FSzEO1IMn-hTeK8m4TX1Eg_9ljySKS-
```

**Important**: Make sure to select **Production** environment (or all environments)

### Step 3: Redeploy
1. Go to **Deployments** tab
2. Find your latest deployment
3. Click the **...** menu and select **Redeploy**
4. Wait for deployment to complete

### Step 4: Verify
- Visit your site: https://sacredgarage.vercel.app
- You should see the loading screen and then the website
- No more black screen!

---

## How It Works Now

### Supabase Integration (with Fallback)
The app now uses **Supabase with automatic localStorage fallback**:

- **When Supabase is available**: All data syncs to Supabase database
- **When Supabase is unavailable**: Data automatically saves to localStorage
- **No errors**: The app works either way

### What's Integrated
✅ **Contact Form** - Saves inquiries to Supabase (or localStorage)
✅ **Admin Portal - Inquiries** - Loads from Supabase (or localStorage)
✅ **Admin Portal - Inventory** - Loads from Supabase (or localStorage)
✅ **Website Inventory** - Shows only available vehicles from Supabase (or localStorage)

### Data Flow
1. User submits contact form → Saved to Supabase + localStorage
2. Admin marks vehicle as "sold" → Updated in Supabase + localStorage
3. Website refreshes → Shows only available vehicles
4. Admin views inquiries → Loads from Supabase + localStorage

---

## Optional: Set Up Supabase Database Tables

If you want to use Supabase database (instead of just localStorage), create these tables:

### Table 1: inquiries
```sql
CREATE TABLE inquiries (
  id TEXT PRIMARY KEY,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);
```

### Table 2: vehicles
```sql
CREATE TABLE vehicles (
  id TEXT PRIMARY KEY,
  image TEXT NOT NULL,
  images TEXT[] NOT NULL,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  price TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  specs JSONB NOT NULL,
  available BOOLEAN DEFAULT true,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);
```

### Table 3: business_settings
```sql
CREATE TABLE business_settings (
  id TEXT PRIMARY KEY,
  businessName TEXT,
  email TEXT,
  phone TEXT,
  location TEXT,
  businessHours TEXT,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);
```

---

## Troubleshooting

### Still seeing black screen?
1. **Clear browser cache**: Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)
2. **Hard refresh**: Ctrl+F5 (or Cmd+Shift+R on Mac)
3. **Check Vercel logs**: Go to Deployments → Click deployment → View logs
4. **Verify env vars**: Settings → Environment Variables → Make sure both variables are there

### Contact form not saving?
- Check browser console (F12) for errors
- Data should save to localStorage as fallback
- Check Admin Portal → Inquiries to see if it appears

### Admin portal not loading vehicles?
- Make sure you've marked vehicles as "available" in admin
- Check localStorage in browser DevTools → Application → Local Storage
- Look for "vehicles" key

### Need to reset data?
Open browser DevTools (F12) → Application → Local Storage → Delete:
- `vehicles`
- `inquiries`
- `business_settings`

Then refresh the page to reload defaults.

---

## Next Steps

1. ✅ Add environment variables to Vercel (THIS IS CRITICAL)
2. ✅ Redeploy your site
3. ✅ Test the website - should work now!
4. (Optional) Create Supabase tables for persistent database storage
5. (Optional) Set up real-time listeners for live updates

---

## Questions?

- **Vercel Docs**: https://vercel.com/docs/environment-variables
- **Supabase Docs**: https://supabase.com/docs
- **Check your GitHub**: https://github.com/sainttlaurel/sacredgarage
