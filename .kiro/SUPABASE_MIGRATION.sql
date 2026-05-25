-- HRVD Car Trading - Supabase Database Migration
-- Run this SQL in your Supabase SQL Editor to create all required tables
-- Date: May 25, 2026

-- ============================================================================
-- TABLE: inquiries
-- Description: General contact form inquiries
-- ============================================================================
CREATE TABLE IF NOT EXISTS inquiries (
  id TEXT PRIMARY KEY,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'responded')),
  createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updatedAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_createdAt ON inquiries(createdAt DESC);

-- Enable RLS (Row Level Security)
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert inquiries
CREATE POLICY "Allow public to insert inquiries" ON inquiries
  FOR INSERT WITH CHECK (true);

-- Allow anyone to read inquiries (for admin portal)
CREATE POLICY "Allow public to read inquiries" ON inquiries
  FOR SELECT USING (true);

-- Allow anyone to update inquiries
CREATE POLICY "Allow public to update inquiries" ON inquiries
  FOR UPDATE USING (true);

-- Allow anyone to delete inquiries
CREATE POLICY "Allow public to delete inquiries" ON inquiries
  FOR DELETE USING (true);

-- ============================================================================
-- TABLE: vehicles
-- Description: Vehicle inventory
-- ============================================================================
CREATE TABLE IF NOT EXISTS vehicles (
  id TEXT PRIMARY KEY,
  image TEXT NOT NULL,
  images TEXT[] DEFAULT ARRAY[]::TEXT[],
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  price TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  specs JSONB DEFAULT '{}'::JSONB,
  available BOOLEAN NOT NULL DEFAULT true,
  createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updatedAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_vehicles_available ON vehicles(available);
CREATE INDEX IF NOT EXISTS idx_vehicles_brand ON vehicles(brand);
CREATE INDEX IF NOT EXISTS idx_vehicles_createdAt ON vehicles(createdAt DESC);

-- Enable RLS
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read vehicles
CREATE POLICY "Allow public to read vehicles" ON vehicles
  FOR SELECT USING (true);

-- Allow anyone to insert vehicles
CREATE POLICY "Allow public to insert vehicles" ON vehicles
  FOR INSERT WITH CHECK (true);

-- Allow anyone to update vehicles
CREATE POLICY "Allow public to update vehicles" ON vehicles
  FOR UPDATE USING (true);

-- Allow anyone to delete vehicles
CREATE POLICY "Allow public to delete vehicles" ON vehicles
  FOR DELETE USING (true);

-- ============================================================================
-- TABLE: parts
-- Description: Performance parts inventory
-- ============================================================================
CREATE TABLE IF NOT EXISTS parts (
  id TEXT PRIMARY KEY,
  image TEXT NOT NULL,
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  price TEXT NOT NULL,
  condition TEXT NOT NULL,
  description TEXT NOT NULL,
  available BOOLEAN NOT NULL DEFAULT true,
  createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updatedAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_parts_available ON parts(available);
CREATE INDEX IF NOT EXISTS idx_parts_category ON parts(category);
CREATE INDEX IF NOT EXISTS idx_parts_createdAt ON parts(createdAt DESC);

-- Enable RLS
ALTER TABLE parts ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read parts
CREATE POLICY "Allow public to read parts" ON parts
  FOR SELECT USING (true);

-- Allow anyone to insert parts
CREATE POLICY "Allow public to insert parts" ON parts
  FOR INSERT WITH CHECK (true);

-- Allow anyone to update parts
CREATE POLICY "Allow public to update parts" ON parts
  FOR UPDATE USING (true);

-- Allow anyone to delete parts
CREATE POLICY "Allow public to delete parts" ON parts
  FOR DELETE USING (true);

-- ============================================================================
-- TABLE: part_orders
-- Description: Customer part purchase orders
-- ============================================================================
CREATE TABLE IF NOT EXISTS part_orders (
  id TEXT PRIMARY KEY,
  partId TEXT NOT NULL,
  partName TEXT NOT NULL,
  partBrand TEXT NOT NULL,
  partPrice TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  customerName TEXT NOT NULL,
  customerEmail TEXT NOT NULL,
  customerPhone TEXT NOT NULL,
  customerCar TEXT NOT NULL,
  address TEXT NOT NULL,
  paymentMethod TEXT NOT NULL,
  deliveryOption TEXT NOT NULL,
  facebookProfile TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'confirmed', 'completed')),
  createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updatedAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_part_orders_status ON part_orders(status);
CREATE INDEX IF NOT EXISTS idx_part_orders_partId ON part_orders(partId);
CREATE INDEX IF NOT EXISTS idx_part_orders_createdAt ON part_orders(createdAt DESC);

-- Enable RLS
ALTER TABLE part_orders ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert orders
CREATE POLICY "Allow public to insert part orders" ON part_orders
  FOR INSERT WITH CHECK (true);

-- Allow anyone to read orders
CREATE POLICY "Allow public to read part orders" ON part_orders
  FOR SELECT USING (true);

-- Allow anyone to update orders
CREATE POLICY "Allow public to update part orders" ON part_orders
  FOR UPDATE USING (true);

-- Allow anyone to delete orders
CREATE POLICY "Allow public to delete part orders" ON part_orders
  FOR DELETE USING (true);

-- ============================================================================
-- TABLE: vehicle_inquiries
-- Description: Customer inquiries about specific vehicles
-- ============================================================================
CREATE TABLE IF NOT EXISTS vehicle_inquiries (
  id TEXT PRIMARY KEY,
  vehicleId TEXT NOT NULL,
  vehicleBrand TEXT NOT NULL,
  vehicleModel TEXT NOT NULL,
  vehicleYear INTEGER NOT NULL,
  vehiclePrice TEXT NOT NULL,
  customerName TEXT NOT NULL,
  customerEmail TEXT NOT NULL,
  customerPhone TEXT NOT NULL,
  inquiryType TEXT NOT NULL CHECK (inquiryType IN ('purchase', 'trade-in', 'financing', 'other')),
  message TEXT NOT NULL,
  facebookProfile TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'confirmed', 'completed')),
  createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updatedAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_vehicle_inquiries_status ON vehicle_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_vehicle_inquiries_vehicleId ON vehicle_inquiries(vehicleId);
CREATE INDEX IF NOT EXISTS idx_vehicle_inquiries_createdAt ON vehicle_inquiries(createdAt DESC);

-- Enable RLS
ALTER TABLE vehicle_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert inquiries
CREATE POLICY "Allow public to insert vehicle inquiries" ON vehicle_inquiries
  FOR INSERT WITH CHECK (true);

-- Allow anyone to read inquiries
CREATE POLICY "Allow public to read vehicle inquiries" ON vehicle_inquiries
  FOR SELECT USING (true);

-- Allow anyone to update inquiries
CREATE POLICY "Allow public to update vehicle inquiries" ON vehicle_inquiries
  FOR UPDATE USING (true);

-- Allow anyone to delete inquiries
CREATE POLICY "Allow public to delete vehicle inquiries" ON vehicle_inquiries
  FOR DELETE USING (true);

-- ============================================================================
-- TABLE: business_settings
-- Description: Business information and settings
-- ============================================================================
CREATE TABLE IF NOT EXISTS business_settings (
  id TEXT PRIMARY KEY,
  businessName TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  location TEXT NOT NULL,
  businessHours TEXT NOT NULL,
  createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updatedAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE business_settings ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read settings
CREATE POLICY "Allow public to read business settings" ON business_settings
  FOR SELECT USING (true);

-- Allow anyone to insert settings
CREATE POLICY "Allow public to insert business settings" ON business_settings
  FOR INSERT WITH CHECK (true);

-- Allow anyone to update settings
CREATE POLICY "Allow public to update business settings" ON business_settings
  FOR UPDATE USING (true);

-- ============================================================================
-- SUMMARY
-- ============================================================================
-- Tables created:
-- 1. inquiries - General contact inquiries
-- 2. vehicles - Vehicle inventory
-- 3. parts - Performance parts inventory
-- 4. part_orders - Customer part purchase orders
-- 5. vehicle_inquiries - Customer vehicle inquiries
-- 6. business_settings - Business information
--
-- All tables have:
-- - RLS (Row Level Security) enabled
-- - Proper indexes for performance
-- - Timestamps (createdAt, updatedAt)
-- - Status tracking
-- - Public read/write access (for demo purposes)
--
-- NOTE: For production, implement proper authentication and RLS policies
-- to restrict access based on user roles (admin, customer, etc.)
-- ============================================================================
