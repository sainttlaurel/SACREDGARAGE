# Vehicle Photo Management Guide

## Overview

Your admin portal now includes a complete **Photo Management System** for vehicle inventory. You can add, remove, reorder, and manage all photos before posting vehicles on the website.

---

## Features

### ✅ What You Can Do

1. **Add Photos**
   - Add unlimited photos to each vehicle
   - Paste photo URLs directly
   - Photos appear in gallery on website

2. **Remove Photos**
   - Delete unwanted photos
   - One-click removal
   - No impact on other photos

3. **Reorder Photos**
   - Move photos up/down
   - Arrange in desired order
   - First photo is main display photo

4. **Set Main Photo**
   - Choose which photo displays on vehicle card
   - Main photo appears first in gallery
   - Easy one-click selection

5. **Preview Before Posting**
   - Manage all photos before vehicle goes live
   - See photo count on vehicle card
   - Verify gallery order

---

## How to Use

### Step 1: Access Admin Portal
1. Go to your website
2. Click "Admin Portal" in footer
3. Enter password: `admin123`
4. Click "Vehicles" tab

### Step 2: Edit a Vehicle

1. Find the vehicle in the grid
2. Click **"Edit"** button
3. Vehicle enters edit mode

### Step 3: Manage Photos

1. Click **"Manage Photos"** button (shows photo count)
2. Photo manager section expands

### Step 4: Add a Photo

1. Paste photo URL in the input field
   - Example: `https://example.com/car-photo.jpg`
   - Or: `/cars/1.jpg` (for local images)
2. Click **"Add"** button or press Enter
3. Photo appears in the list below

### Step 5: Reorder Photos

1. Find the photo in the list
2. Use **up/down arrows** to move it
3. First photo becomes main display photo
4. Reorder until satisfied

### Step 6: Set Main Photo

1. Find the photo you want as main
2. Click **"Main"** button
3. Photo moves to first position
4. Becomes display photo on website

### Step 7: Remove Photos

1. Find the photo to remove
2. Click **"X"** button
3. Photo is deleted from vehicle
4. Other photos remain unchanged

### Step 8: Save Changes

1. Click **"Save"** button
2. All changes saved
3. Photos appear on website
4. Vehicle exits edit mode

---

## Photo Management Interface

### Photo List Display

Each photo shows:
- **Photo URL** - The image link (truncated)
- **Status** - "Main Photo" label if first
- **Controls** - Move, set main, delete buttons

### Photo Controls

| Control | Action | When Available |
|---------|--------|-----------------|
| **↑ Up** | Move photo up | Not on first photo |
| **↓ Down** | Move photo down | Not on last photo |
| **Main** | Set as main photo | Not already main |
| **X** | Delete photo | Always available |

### Photo Count Badge

- Shows on vehicle card in view mode
- Example: "6 photos"
- Updates when you add/remove photos

---

## Photo URL Examples

### Local Images (Your Server)
```
/image/HONDA CIVIC.jpg
/cars/1.jpg
/cars/2.jpg
```

### External URLs
```
https://example.com/photo.jpg
https://imgur.com/xxxxx.jpg
https://res.cloudinary.com/...
```

### Supported Formats
- JPG / JPEG
- PNG
- WebP
- GIF

---

## Best Practices

### ✅ Do's

- ✅ Add high-quality photos
- ✅ Use clear, well-lit images
- ✅ Show different angles of vehicle
- ✅ Include interior and exterior shots
- ✅ Put best photo first (main photo)
- ✅ Verify URLs work before adding
- ✅ Test on website before posting

### ❌ Don'ts

- ❌ Don't use broken image links
- ❌ Don't add duplicate photos
- ❌ Don't use low-quality images
- ❌ Don't forget to save changes
- ❌ Don't post without reviewing photos

---

## Photo Organization Tips

### Recommended Photo Order

1. **Main Photo** - Best overall view of vehicle
2. **Front View** - Front angle
3. **Side View** - Side profile
4. **Rear View** - Rear angle
5. **Interior** - Dashboard and seats
6. **Details** - Engine, wheels, modifications
7. **Additional** - Any other angles

### Example for Honda Civic

1. Front 3/4 view (main)
2. Front view
3. Side view
4. Rear view
5. Interior dashboard
6. Interior seats
7. Engine bay
8. Wheels close-up

---

## Workflow

### Before Posting Vehicle

1. ✅ Edit vehicle details
2. ✅ Add all photos
3. ✅ Arrange photos in order
4. ✅ Set best photo as main
5. ✅ Review photo count
6. ✅ Save changes
7. ✅ Check website preview
8. ✅ Mark as available

### After Posting

- Photos appear in gallery on website
- Customers can view all photos
- Gallery shows photos in order you set
- Main photo displays on vehicle card

---

## Troubleshooting

### Photo Not Appearing

1. Check if URL is correct
2. Verify image file exists
3. Try different image URL
4. Check browser console (F12) for errors

### Photo URL Not Accepted

1. Make sure URL is complete (starts with http:// or /)
2. Verify image format is supported
3. Check for typos in URL
4. Try copying URL again

### Photos Not Saving

1. Click "Save" button (not just "Add")
2. Wait for save to complete
3. Check for error messages
4. Refresh admin page

### Photos Not Showing on Website

1. Refresh website (Ctrl+F5)
2. Clear browser cache (Ctrl+Shift+Delete)
3. Verify vehicle is marked as "Available"
4. Check photo URLs are accessible

### Can't Reorder Photos

1. Make sure you're in edit mode
2. Use up/down arrows (not drag)
3. First photo can't move up
4. Last photo can't move down

---

## Photo Gallery on Website

### How Customers See Photos

**Vehicle Card**
- Shows main photo (first photo)
- Shows photo count badge
- Click to view details

**Vehicle Modal**
- Shows full photo gallery
- Thumbnail strip at bottom
- Left/right arrows to navigate
- Zoom feature on each photo
- Photo counter (e.g., "3/8")

### Gallery Features

- ✅ Smooth transitions between photos
- ✅ Thumbnail navigation
- ✅ Zoom on hover
- ✅ Photo counter
- ✅ Fullscreen mode
- ✅ Keyboard navigation

---

## Data Storage

### Where Photos Are Stored

- **URLs**: Stored in vehicle data
- **Images**: Hosted on your server or external URLs
- **Order**: Saved in vehicle record
- **Main Photo**: First photo in array

### How It Works

```
Admin adds photo URL
    ↓
URL saved to vehicle record
    ↓
Saved to localStorage/Supabase
    ↓
Website loads vehicle data
    ↓
Displays photos in order
```

---

## Advanced Tips

### Batch Photo Management

1. Edit vehicle
2. Add multiple photos at once
3. Arrange all photos
4. Save once
5. All changes sync together

### Photo URL Formats

**Relative URLs** (local images)
```
/image/HONDA CIVIC.jpg
/cars/1.jpg
```

**Absolute URLs** (external)
```
https://example.com/photo.jpg
https://cdn.example.com/image.jpg
```

### Testing Photos

1. Add photo URL
2. Check if it appears in list
3. Verify it shows on website
4. Test zoom feature
5. Test on mobile

---

## Common Issues & Solutions

### Issue: Photo URL shows but image doesn't load

**Solution:**
- Verify URL is accessible
- Check image file exists
- Try different image
- Check browser console for CORS errors

### Issue: Can't add more than X photos

**Solution:**
- No limit on photos
- Add as many as needed
- Check for error messages
- Refresh page if stuck

### Issue: Photos appear in wrong order on website

**Solution:**
- Reorder in admin
- Make sure to save
- Refresh website
- Clear browser cache

### Issue: Main photo not changing

**Solution:**
- Click "Main" button on desired photo
- Photo should move to top
- Save changes
- Refresh website

---

## Summary

Your photo management system allows you to:

✅ Add unlimited photos to vehicles
✅ Remove unwanted photos
✅ Reorder photos easily
✅ Set main display photo
✅ Manage all before posting
✅ Preview on website
✅ Update anytime

**All changes sync to website instantly!**

---

## Next Steps

1. ✅ Edit a vehicle
2. ✅ Click "Manage Photos"
3. ✅ Add some photo URLs
4. ✅ Reorder photos
5. ✅ Set main photo
6. ✅ Save changes
7. ✅ Check website gallery

---

## Questions?

- Check browser console (F12) for errors
- Verify photo URLs are correct
- Make sure to click "Save" button
- Refresh website to see changes

Enjoy managing your vehicle photos! 📸
