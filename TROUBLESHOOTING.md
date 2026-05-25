# Troubleshooting Guide - Black Screen Issue

## Problem
After deploying with Supabase integration, the website shows a black screen.

## Root Cause
The black screen typically occurs when:
1. Environment variables are not set in Vercel
2. Supabase client fails to initialize
3. JavaScript errors prevent the app from rendering

## Solution

### Step 1: Add Environment Variables to Vercel

**IMPORTANT:** Environment variables must be added to Vercel for the app to work!

1. Go to https://vercel.com/sainttlaurels-projects/sacredgarage
2. Click **Settings** tab
3. Click **Environment Variables** in left sidebar
4. Add these two variables:

**Variable 1:**
```
Name: VITE_SUPABASE_URL
Value: https://opfhikdkqfveoweqxqia.supabase.co
Environments: Production, Preview, Development (select all)
```

**Variable 2:**
```
Name: VITE_SUPABASE_PUBLISHABLE_KEY
Value: sb_publishable_FSzEO1IMn-hTeK8m4TX1Eg_9ljySKS-
Environments: Production, Preview, Development (select all)
```

5. Click "Add" for each variable
6. Wait for confirmation

### Step 2: Redeploy

After adding environment variables:

1. Go to **Deployments** tab
2. Find the latest deployment (should show as failed or with warning)
3. Click the **three dots** menu (...)
4. Select **Redeploy**
5. Confirm the redeploy

**OR** use command line:
```bash
vercel redeploy
```

### Step 3: Verify

After redeployment completes:

1. Visit your site: https://sacredgarage.vercel.app
2. Open browser DevTools: Press **F12**
3. Go to **Console** tab
4. Look for any red error messages
5. If you see errors, note them and check troubleshooting below

### Step 4: Test Functionality

1. Scroll to contact form
2. Fill in the form with test data
3. Click "Send Inquiry"
4. You should see a success message
5. Check Supabase dashboard to verify inquiry was saved

## Verification Checklist

- [ ] Environment variables added to Vercel
- [ ] Both variables set for all environments (Production, Preview, Development)
- [ ] Project redeployed after adding variables
- [ ] No errors in browser console
- [ ] Contact form submits successfully
- [ ] Inquiry appears in Supabase dashboard

## Common Issues & Fixes

### Issue 1: Still Seeing Black Screen

**Check:**
1. Hard refresh browser: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. Clear browser cache: `Ctrl+Shift+Delete`
3. Try in incognito/private window
4. Check browser console for errors

**If still black:**
1. Verify environment variables are set in Vercel
2. Check that variable names are EXACTLY correct (case-sensitive)
3. Wait 5 minutes and refresh (Vercel needs time to propagate)
4. Redeploy again

### Issue 2: "Supabase not initialized" Error

**Cause:** Environment variables not set in Vercel

**Fix:**
1. Go to Vercel Settings → Environment Variables
2. Verify both variables are present
3. Verify values are correct (copy-paste to avoid typos)
4. Redeploy

### Issue 3: Contact Form Not Submitting

**Check:**
1. Open browser console (F12)
2. Try submitting form
3. Look for error messages
4. If error mentions Supabase, check environment variables

**If Supabase error:**
- Verify Supabase tables are created (see SUPABASE_SETUP.md)
- Verify Supabase URL is correct
- Verify Supabase key is correct

### Issue 4: Supabase Connection Timeout

**Cause:** Supabase tables not created or RLS policies not set

**Fix:**
1. Go to Supabase dashboard
2. Check that these tables exist:
   - `inquiries`
   - `vehicles`
   - `business_settings`
3. If missing, run SQL scripts from SUPABASE_SETUP.md
4. Verify RLS policies are enabled
5. Redeploy website

## Debug Steps

### Check Environment Variables in Vercel

1. Go to Vercel project settings
2. Click Environment Variables
3. Verify you see:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
4. Click each to verify the value is correct

### Check Browser Console

1. Press F12 to open DevTools
2. Click Console tab
3. Look for any red error messages
4. Common errors:
   - "Supabase not initialized" → Environment variables not set
   - "Cannot read property 'from'" → Supabase client failed
   - "Network error" → Supabase URL incorrect

### Check Supabase Dashboard

1. Go to https://app.supabase.com
2. Select your project
3. Click "Table Editor" in left sidebar
4. Verify these tables exist:
   - `inquiries`
   - `vehicles`
   - `business_settings`
5. If missing, run SQL scripts from SUPABASE_SETUP.md

## Quick Fix Checklist

If you're seeing a black screen:

1. ✅ Add environment variables to Vercel
2. ✅ Redeploy the project
3. ✅ Hard refresh browser (Ctrl+Shift+R)
4. ✅ Clear browser cache
5. ✅ Check browser console for errors
6. ✅ Verify Supabase tables exist
7. ✅ Wait 5 minutes and try again

## Still Having Issues?

### Check These Files

- `.env.local` - Local environment variables (should have Supabase credentials)
- `src/lib/supabase.ts` - Supabase client initialization
- `src/components/Contact.tsx` - Contact form with Supabase integration
- `SUPABASE_SETUP.md` - Database setup instructions
- `VERCEL_ENV_SETUP.md` - Vercel environment variable setup

### Verify Deployment

1. Go to Vercel Deployments
2. Click on the latest deployment
3. Check the build logs for errors
4. Look for "npm run build" output
5. Verify it says "✓ built successfully"

### Test Locally

1. Make sure `.env.local` has correct values
2. Run `npm run build` locally
3. Run `npm run preview` to test production build
4. Check if it works locally
5. If it works locally but not on Vercel, it's an environment variable issue

## Support

If you're still stuck:

1. Check all the guides:
   - `SUPABASE_SETUP.md` - Database setup
   - `VERCEL_ENV_SETUP.md` - Environment variables
   - `TROUBLESHOOTING.md` - This file

2. Verify:
   - Environment variables in Vercel
   - Supabase tables created
   - Supabase credentials correct
   - Browser console for errors

3. Try:
   - Hard refresh browser
   - Clear cache
   - Incognito window
   - Different browser

## Success Indicators

✅ **Website is working when:**
- No black screen
- All sections visible
- Contact form visible
- No errors in console
- Contact form submits successfully
- Inquiry appears in Supabase dashboard

---

**Last Updated:** May 25, 2026
**Status:** Ready for production after environment variables are set
