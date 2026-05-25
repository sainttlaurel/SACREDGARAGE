# Quick Fix: Black Screen on Vercel

## The Problem
Your site shows a black screen after deployment because environment variables aren't set in Vercel.

## The Fix (2 minutes)

### 1. Go to Vercel
https://vercel.com/dashboard → Select **sacredgarage** → **Settings**

### 2. Add Environment Variables
Click **Environment Variables** → **Add New**

Add these two:
```
VITE_SUPABASE_URL = https://opfhikdkqfveoweqxqia.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY = sb_publishable_FSzEO1IMn-hTeK8m4TX1Eg_9ljySKS-
```

### 3. Redeploy
Go to **Deployments** → Click latest → **...** menu → **Redeploy**

### 4. Wait & Refresh
Wait 2-3 minutes, then refresh your site. Done! ✅

---

## What Changed

Your code now has **automatic fallback**:
- ✅ Works with Supabase (when env vars are set)
- ✅ Works with localStorage (when Supabase unavailable)
- ✅ No more crashes or black screens

All your features work the same:
- Contact form saves inquiries
- Admin portal manages inventory
- Website shows only available vehicles
- Everything syncs automatically

---

## Still Not Working?

1. **Hard refresh**: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
2. **Clear cache**: Ctrl+Shift+Delete
3. **Check Vercel logs**: Deployments → View logs
4. **Verify env vars are set**: Settings → Environment Variables

That's it! 🚀
