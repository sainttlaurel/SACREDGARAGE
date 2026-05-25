# Supabase Setup Guide

## Overview
This guide will help you set up the Supabase database for the HRVD Car Trading website.

## Prerequisites
- Supabase account (https://supabase.com)
- Project created in Supabase
- Environment variables configured

## Environment Variables
Already configured in `.env.local`:
```
VITE_SUPABASE_URL=https://opfhikdkqfveoweqxqia.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_FSzEO1IMn-hTeK8m4TX1Eg_9ljySKS-
```

## Database Tables Setup

### 1. Create `inquiries` Table

Go to Supabase Dashboard → SQL Editor and run:

```sql
CREATE TABLE inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'responded')),
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_inquiries_status ON inquiries(status);
CREATE INDEX idx_inquiries_createdAt ON inquiries(createdAt DESC);

-- Enable RLS (Row Level Security)
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Create policy for public read/write (for demo - use proper auth in production)
CREATE POLICY "Enable read access for all users" ON inquiries
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON inquiries
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON inquiries
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for all users" ON inquiries
  FOR DELETE USING (true);
```

### 2. Create `vehicles` Table

```sql
CREATE TABLE vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image TEXT NOT NULL,
  images TEXT[] NOT NULL DEFAULT '{}',
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  price TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  specs JSONB NOT NULL DEFAULT '{}',
  available BOOLEAN NOT NULL DEFAULT true,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_vehicles_available ON vehicles(available);
CREATE INDEX idx_vehicles_brand ON vehicles(brand);
CREATE INDEX idx_vehicles_createdAt ON vehicles(createdAt DESC);

-- Enable RLS
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for all users" ON vehicles
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON vehicles
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON vehicles
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for all users" ON vehicles
  FOR DELETE USING (true);
```

### 3. Create `business_settings` Table

```sql
CREATE TABLE business_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  businessName TEXT NOT NULL DEFAULT 'HRVD Car Trading',
  email TEXT NOT NULL DEFAULT 'hrvdcartrading@gmail.com',
  phone TEXT NOT NULL DEFAULT '+63 912 345 6789',
  location TEXT NOT NULL DEFAULT 'Quezon City, Metro Manila, Philippines',
  businessHours TEXT NOT NULL DEFAULT 'Mon - Sun: 9:00 AM - 6:00 PM',
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE business_settings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for all users" ON business_settings
  FOR SELECT USING (true);

CREATE POLICY "Enable update for all users" ON business_settings
  FOR UPDATE USING (true);
```

## Steps to Set Up

1. **Go to Supabase Dashboard**
   - Navigate to https://app.supabase.com
   - Select your project

2. **Open SQL Editor**
   - Click "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Run Each SQL Script**
   - Copy and paste each SQL script above
   - Click "Run" to execute
   - Verify the table was created

4. **Verify Tables**
   - Go to "Table Editor" in the left sidebar
   - You should see:
     - `inquiries`
     - `vehicles`
     - `business_settings`

5. **Test Connection**
   - The app will automatically connect using the environment variables
   - Check browser console for any errors

## Data Migration (Optional)

If you want to migrate existing localStorage data to Supabase:

```javascript
// Run this in browser console after setting up tables
const inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
const vehicles = JSON.parse(localStorage.getItem('vehicles') || '[]');

// Use the supabase client to insert data
import { inquiryService, vehicleService } from './lib/supabase';

// Migrate inquiries
for (const inquiry of inquiries) {
  await inquiryService.create(inquiry);
}

// Migrate vehicles
for (const vehicle of vehicles) {
  await vehicleService.create(vehicle);
}
```

## API Reference

### Inquiries

```typescript
// Get all inquiries
const inquiries = await inquiryService.getAll();

// Get single inquiry
const inquiry = await inquiryService.getById(id);

// Create inquiry
const newInquiry = await inquiryService.create({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  phone: '+1234567890',
  message: 'Interested in the Honda Civic',
  status: 'new'
});

// Update inquiry
const updated = await inquiryService.update(id, {
  status: 'read'
});

// Delete inquiry
await inquiryService.delete(id);
```

### Vehicles

```typescript
// Get all vehicles
const vehicles = await vehicleService.getAll();

// Get single vehicle
const vehicle = await vehicleService.getById(id);

// Create vehicle
const newVehicle = await vehicleService.create({
  image: '/image/HONDA CIVIC.jpg',
  images: ['/image/HONDA CIVIC.jpg', '/cars/1.jpg'],
  brand: 'Honda',
  model: 'Civic',
  year: 1997,
  price: '₱210,000',
  location: 'Quezon City',
  description: 'Great condition',
  specs: { mileage: '1st Owner' },
  available: true
});

// Update vehicle
const updated = await vehicleService.update(id, {
  available: false
});

// Delete vehicle
await vehicleService.delete(id);
```

### Settings

```typescript
// Get settings
const settings = await settingsService.get();

// Update settings
const updated = await settingsService.update({
  businessName: 'HRVD Car Trading',
  email: 'newemail@example.com'
});
```

## Troubleshooting

### Connection Error
- Check environment variables in `.env.local`
- Verify Supabase project is active
- Check browser console for error messages

### RLS Policy Error
- Ensure RLS policies are created correctly
- Check that policies allow public access (for demo)
- In production, implement proper authentication

### Table Not Found
- Verify table names match exactly (case-sensitive)
- Check that SQL scripts ran without errors
- Refresh the page and try again

## Security Notes

⚠️ **Important for Production:**
- Current setup uses public access (RLS policies allow all)
- Implement proper authentication before going live
- Use Supabase Auth for user management
- Restrict RLS policies to authenticated users only
- Never expose sensitive data in public policies

## Next Steps

1. ✅ Set up Supabase tables (this guide)
2. Update Contact component to use Supabase
3. Update Admin Portal to use Supabase
4. Implement proper authentication
5. Add user roles and permissions

---

**Need Help?**
- Supabase Docs: https://supabase.com/docs
- Supabase Community: https://discord.supabase.io
