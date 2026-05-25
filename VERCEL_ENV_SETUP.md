# Vercel Environment Variables Setup

## How to Add Environment Variables to Vercel

### Step 1: Go to Vercel Dashboard
1. Visit https://vercel.com/sainttlaurels-projects/sacredgarage
2. Click on "Settings" tab
3. Click on "Environment Variables" in the left sidebar

### Step 2: Add Supabase Variables

Add these two environment variables:

**Variable 1:**
- Name: `VITE_SUPABASE_URL`
- Value: `https://opfhikdkqfveoweqxqia.supabase.co`
- Environments: Select all (Production, Preview, Development)
- Click "Add"

**Variable 2:**
- Name: `VITE_SUPABASE_PUBLISHABLE_KEY`
- Value: `sb_publishable_FSzEO1IMn-hTeK8m4TX1Eg_9ljySKS-`
- Environments: Select all (Production, Preview, Development)
- Click "Add"

### Step 3: Redeploy

After adding the environment variables:

1. Go to "Deployments" tab
2. Find the latest deployment
3. Click the three dots menu
4. Select "Redeploy"
5. Confirm the redeploy

Or use the command line:
```bash
vercel redeploy
```

### Step 4: Verify

After redeployment:
1. Visit your site
2. Open browser DevTools (F12)
3. Check Console for any errors
4. Try submitting the contact form
5. Check Supabase dashboard to see if inquiry was saved

## Troubleshooting

### Black Screen Issue
If you see a black screen:
1. Check browser console (F12) for errors
2. Verify environment variables are set in Vercel
3. Check that Supabase tables are created
4. Try clearing browser cache (Ctrl+Shift+Delete)

### Environment Variables Not Working
- Make sure you selected "all" environments
- Wait a few minutes after adding variables
- Redeploy the project
- Check that variable names match exactly (case-sensitive)

### Supabase Connection Error
- Verify Supabase URL is correct
- Verify Supabase key is correct
- Check that Supabase project is active
- Ensure tables are created in Supabase

## Environment Variables Reference

```
VITE_SUPABASE_URL=https://opfhikdkqfveoweqxqia.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_FSzEO1IMn-hTeK8m4TX1Eg_9ljySKS-
```

These are used in:
- `src/lib/supabase.ts` - Supabase client initialization
- `src/components/Contact.tsx` - Contact form submission
- Admin Portal (when updated)

## Local Development

For local development, create `.env.local` file:
```
VITE_SUPABASE_URL=https://opfhikdkqfveoweqxqia.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_FSzEO1IMn-hTeK8m4TX1Eg_9ljySKS-
```

This file is in `.gitignore` and won't be committed.
