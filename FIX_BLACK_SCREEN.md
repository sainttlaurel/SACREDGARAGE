# Fix Black Screen - Action Plan

## ⚠️ IMPORTANT: Black Screen Fix Required

Your website is showing a black screen because **environment variables are not set in Vercel**.

## 🚀 Quick Fix (5 minutes)

### Step 1: Add Environment Variables to Vercel

1. Go to: https://vercel.com/sainttlaurels-projects/sacredgarage
2. Click **Settings** tab
3. Click **Environment Variables** (left sidebar)
4. Click **Add New**

**Add Variable 1:**
- Name: `VITE_SUPABASE_URL`
- Value: `https://opfhikdkqfveoweqxqia.supabase.co`
- Environments: Check all three (Production, Preview, Development)
- Click **Add**

**Add Variable 2:**
- Name: `VITE_SUPABASE_PUBLISHABLE_KEY`
- Value: `sb_publishable_FSzEO1IMn-hTeK8m4TX1Eg_9ljySKS-`
- Environments: Check all three (Production, Preview, Development)
- Click **Add**

### Step 2: Redeploy

1. Go to **Deployments** tab
2. Find the latest deployment
3. Click **...** (three dots)
4. Click **Redeploy**
5. Wait for deployment to complete (~2-3 minutes)

### Step 3: Verify

1. Visit your site
2. Press F12 to open DevTools
3. Check Console tab for errors
4. If no errors, black screen should be fixed!

## ✅ Success Indicators

After following the steps above, you should see:
- ✅ Website loads normally (not black screen)
- ✅ All sections visible
- ✅ Contact form visible
- ✅ No errors in browser console

## 🧪 Test It

1. Scroll to contact form
2. Fill in test data
3. Click "Send Inquiry"
4. You should see success message
5. Check Supabase dashboard to verify inquiry was saved

## 📚 Detailed Guides

If you need more help:

- **Vercel Setup:** See `VERCEL_ENV_SETUP.md`
- **Supabase Setup:** See `SUPABASE_SETUP.md`
- **Troubleshooting:** See `TROUBLESHOOTING.md`

## 🔍 If Still Black Screen

1. Hard refresh: `Ctrl+Shift+R`
2. Clear cache: `Ctrl+Shift+Delete`
3. Try incognito window
4. Check browser console (F12) for errors
5. Verify environment variables in Vercel
6. Wait 5 minutes and try again

## 📋 Checklist

- [ ] Added `VITE_SUPABASE_URL` to Vercel
- [ ] Added `VITE_SUPABASE_PUBLISHABLE_KEY` to Vercel
- [ ] Both variables set for all environments
- [ ] Redeployed project
- [ ] Website loads without black screen
- [ ] No errors in browser console
- [ ] Contact form works

## 🎯 Next Steps

After fixing the black screen:

1. ✅ Test contact form
2. ✅ Check Supabase dashboard for inquiries
3. ✅ Test admin portal (/admin)
4. ✅ Verify all features work

## 💡 Why This Happened

The website uses Supabase for database storage. Vercel needs to know the Supabase credentials to connect. Without environment variables, the app can't initialize and shows a black screen.

**Solution:** Add environment variables to Vercel so the app can connect to Supabase.

---

**Status:** Ready to fix - Follow the 5-minute quick fix above!
