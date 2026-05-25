import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

let supabase: any = null
let supabaseError: Error | null = null

try {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables')
  }
  supabase = createClient(supabaseUrl, supabaseKey)
} catch (error) {
  supabaseError = error as Error
  console.error('Supabase initialization error:', supabaseError)
}

export { supabase, supabaseError }

// Types for database tables
export interface Inquiry {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
  status: 'new' | 'read' | 'responded'
  createdAt: string
  updatedAt: string
}

export interface Vehicle {
  id: string
  image: string
  images: string[]
  brand: string
  model: string
  year: number
  price: string
  location: string
  description: string
  specs: Record<string, string>
  available: boolean
  createdAt: string
  updatedAt: string
}

export interface BusinessSettings {
  id: string
  businessName: string
  email: string
  phone: string
  location: string
  businessHours: string
  createdAt: string
  updatedAt: string
}

// Inquiry functions
export const inquiryService = {
  async getAll() {
    if (!supabase) throw new Error('Supabase not initialized')
    
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('createdAt', { ascending: false })
    
    if (error) throw error
    return data as Inquiry[]
  },

  async getById(id: string) {
    if (!supabase) throw new Error('Supabase not initialized')
    
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data as Inquiry
  },

  async create(inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'updatedAt'>) {
    if (!supabase) throw new Error('Supabase not initialized')
    
    const { data, error } = await supabase
      .from('inquiries')
      .insert([{
        ...inquiry,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }])
      .select()
      .single()
    
    if (error) throw error
    return data as Inquiry
  },

  async update(id: string, updates: Partial<Inquiry>) {
    if (!supabase) throw new Error('Supabase not initialized')
    
    const { data, error } = await supabase
      .from('inquiries')
      .update({
        ...updates,
        updatedAt: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as Inquiry
  },

  async delete(id: string) {
    if (!supabase) throw new Error('Supabase not initialized')
    
    const { error } = await supabase
      .from('inquiries')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Vehicle functions
export const vehicleService = {
  async getAll() {
    if (!supabase) throw new Error('Supabase not initialized')
    
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .order('createdAt', { ascending: false })
    
    if (error) throw error
    return data as Vehicle[]
  },

  async getById(id: string) {
    if (!supabase) throw new Error('Supabase not initialized')
    
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data as Vehicle
  },

  async create(vehicle: Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'>) {
    if (!supabase) throw new Error('Supabase not initialized')
    
    const { data, error } = await supabase
      .from('vehicles')
      .insert([{
        ...vehicle,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }])
      .select()
      .single()
    
    if (error) throw error
    return data as Vehicle
  },

  async update(id: string, updates: Partial<Vehicle>) {
    if (!supabase) throw new Error('Supabase not initialized')
    
    const { data, error } = await supabase
      .from('vehicles')
      .update({
        ...updates,
        updatedAt: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as Vehicle
  },

  async delete(id: string) {
    if (!supabase) throw new Error('Supabase not initialized')
    
    const { error } = await supabase
      .from('vehicles')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Business Settings functions
export const settingsService = {
  async get() {
    if (!supabase) throw new Error('Supabase not initialized')
    
    const { data, error } = await supabase
      .from('business_settings')
      .select('*')
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data as BusinessSettings | null
  },

  async update(updates: Partial<BusinessSettings>) {
    if (!supabase) throw new Error('Supabase not initialized')
    
    const existing = await this.get()
    
    if (!existing) {
      const { data, error } = await supabase
        .from('business_settings')
        .insert([{
          ...updates,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }])
        .select()
        .single()
      
      if (error) throw error
      return data as BusinessSettings
    }

    const { data, error } = await supabase
      .from('business_settings')
      .update({
        ...updates,
        updatedAt: new Date().toISOString()
      })
      .eq('id', existing.id)
      .select()
      .single()
    
    if (error) throw error
    return data as BusinessSettings
  }
}
