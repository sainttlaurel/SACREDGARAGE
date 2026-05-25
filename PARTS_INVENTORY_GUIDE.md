# Parts Inventory Management Guide

## Overview

Your admin portal now includes a complete **Parts Inventory Management System**. You can add, edit, delete, and manage parts for sale directly from the admin dashboard.

---

## Features

### ✅ What You Can Do

1. **Add New Parts**
   - Click "Add Part" button
   - Fill in part details (name, brand, category, price, condition)
   - Add description and image URL
   - Part automatically appears on website

2. **Edit Parts**
   - Click "Edit" on any part
   - Modify all details
   - Save changes
   - Updates instantly on website

3. **Mark as Sold**
   - Click "Mark Sold" to hide from website
   - Click "Mark Available" to show again
   - Sold parts don't appear on website

4. **Delete Parts**
   - Click trash icon to remove permanently
   - Confirmation required

5. **View All Parts**
   - See all parts in grid layout
   - Shows availability status
   - Shows price and condition

---

## How to Use

### Step 1: Access Admin Portal
1. Go to your website
2. Click "Admin Portal" in footer
3. Enter password: `admin123`
4. Click "Parts" tab

### Step 2: Add a New Part

1. Click **"Add Part"** button
2. Fill in the form:
   - **Part Name** (required): e.g., "Coilover Kit"
   - **Brand**: e.g., "BC Racing"
   - **Category** (required): Select from dropdown
     - Suspension
     - Exhaust
     - Wheels
     - Engine
     - Interior
     - Electronics
     - Other
   - **Price** (required): e.g., "₱45,000"
   - **Condition**: Select from dropdown
     - Brand New
     - Used - Excellent
     - Used - Good
     - Used - Fair
   - **Image URL**: Link to part image (optional)
   - **Description**: Detailed description of the part

3. Click **"Add Part"** to save
4. Part appears on website immediately

### Step 3: Edit a Part

1. Find the part in the grid
2. Click **"Edit"** button
3. Modify any fields
4. Click **"Save"** to update
5. Changes appear on website instantly

### Step 4: Mark as Sold

1. Find the part in the grid
2. Click **"Mark Sold"** button
3. Part disappears from website
4. Status changes to "Sold" in admin

### Step 5: Delete a Part

1. Find the part in the grid
2. Click **"Delete"** (trash icon)
3. Confirm deletion
4. Part is permanently removed

---

## Data Storage

### Where Data is Stored

- **Primary**: Supabase database (when environment variables are set)
- **Fallback**: Browser localStorage (automatic)

### How It Works

```
Admin adds part
    ↓
Saved to Supabase (if available)
    ↓
Also saved to localStorage (backup)
    ↓
Website loads parts from storage
    ↓
Shows only available parts
```

### Syncing

- Changes in admin portal sync to website instantly
- Website refreshes to show updated inventory
- Sold parts automatically hidden

---

## Part Categories

### Available Categories

| Category | Use For |
|----------|---------|
| **Suspension** | Coilovers, springs, shocks, sway bars |
| **Exhaust** | Mufflers, headers, cat-back systems |
| **Wheels** | Rims, tires, wheel sets |
| **Engine** | Turbos, superchargers, ECU tuners |
| **Interior** | Seats, steering wheels, shift knobs |
| **Electronics** | Gauges, displays, controllers |
| **Other** | Anything else |

---

## Part Conditions

### Available Conditions

| Condition | Description |
|-----------|-------------|
| **Brand New** | Never used, factory sealed |
| **Used - Excellent** | Minimal wear, like new |
| **Used - Good** | Normal wear, fully functional |
| **Used - Fair** | Visible wear, still works well |

---

## Image URLs

### Where to Host Images

You can use:
- **Local images**: `/image/parts/sample-part.jpg`
- **External URLs**: `https://example.com/image.jpg`
- **Imgur**: `https://imgur.com/xxxxx.jpg`
- **Cloudinary**: `https://res.cloudinary.com/...`

### Default Image

If image URL is invalid or missing, the system uses:
```
/image/parts/sample-part.jpg
```

---

## Website Display

### How Parts Appear on Website

1. **Parts Section**
   - Shows only available parts
   - Grid layout (3 columns on desktop)
   - Shows image, name, brand, price, condition

2. **Part Card**
   - Click to view details
   - Shows full description
   - "Inquire" button to contact

3. **Sold Parts**
   - Hidden from website
   - Don't appear in grid
   - Can be marked available again

### Example

```
Website shows:
- Coilover Kit (BC Racing) - ₱45,000 - Brand New
- Cat-Back Exhaust (HKS) - ₱35,000 - Used - Excellent
- Forged Wheels 18" (Rays) - ₱120,000 - Used - Good

Admin marks Coilover as sold:
- Cat-Back Exhaust (HKS) - ₱35,000 - Used - Excellent
- Forged Wheels 18" (Rays) - ₱120,000 - Used - Good
```

---

## Admin Portal Tabs

### Available Tabs

| Tab | Purpose |
|-----|---------|
| **Inquiries** | View customer inquiries from contact form |
| **Vehicles** | Manage vehicle inventory |
| **Parts** | Manage parts inventory (NEW) |
| **Settings** | Business information and settings |

---

## Tips & Best Practices

### ✅ Do's

- ✅ Use clear, descriptive part names
- ✅ Include all relevant specifications in description
- ✅ Use consistent pricing format (₱XX,XXX)
- ✅ Add high-quality images
- ✅ Update condition accurately
- ✅ Mark sold parts immediately
- ✅ Regularly review inventory

### ❌ Don'ts

- ❌ Don't use vague names like "Part" or "Item"
- ❌ Don't forget to add descriptions
- ❌ Don't use broken image links
- ❌ Don't leave sold parts as available
- ❌ Don't duplicate part entries

---

## Troubleshooting

### Parts Not Appearing on Website

1. Check if part is marked as "Available"
2. Refresh website (Ctrl+F5)
3. Check browser console for errors (F12)
4. Verify part data was saved in admin

### Image Not Loading

1. Check image URL is correct
2. Verify image file exists
3. Try using a different image URL
4. Use default image as fallback

### Changes Not Syncing

1. Refresh website page
2. Clear browser cache (Ctrl+Shift+Delete)
3. Check localStorage in DevTools (F12 → Application)
4. Verify Supabase connection (if using database)

### Can't Add Part

1. Fill all required fields (marked with *)
2. Check for error messages
3. Try refreshing admin page
4. Check browser console (F12) for errors

---

## Data Backup

### How to Backup Parts

1. Open browser DevTools (F12)
2. Go to Application → Local Storage
3. Find "parts" key
4. Copy the JSON data
5. Save to a text file

### How to Restore Parts

1. Open browser DevTools (F12)
2. Go to Application → Local Storage
3. Click "parts" key
4. Paste the JSON data
5. Refresh page

---

## Optional: Supabase Database

### Create Parts Table (Optional)

If you want persistent database storage:

```sql
CREATE TABLE parts (
  id TEXT PRIMARY KEY,
  image TEXT NOT NULL,
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  price TEXT NOT NULL,
  condition TEXT NOT NULL,
  description TEXT NOT NULL,
  available BOOLEAN DEFAULT true,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);
```

---

## Summary

Your parts inventory system is now fully functional:

✅ Add unlimited parts
✅ Edit anytime
✅ Mark as sold
✅ Delete if needed
✅ Website shows only available parts
✅ Automatic localStorage backup
✅ Optional Supabase database

**Everything works automatically with localStorage. No additional setup needed!**

---

## Questions?

- Check the admin portal for any error messages
- Review browser console (F12) for technical details
- Verify all required fields are filled
- Make sure images are accessible

Enjoy managing your parts inventory! 🔧
