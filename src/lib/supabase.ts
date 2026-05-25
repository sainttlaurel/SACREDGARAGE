import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

let supabase: any = null
let supabaseError: Error | null = null
let isSupabaseAvailable = false

try {
  if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase environment variables not set. Using localStorage fallback.')
    supabaseError = new Error('Missing Supabase environment variables')
  } else {
    supabase = createClient(supabaseUrl, supabaseKey)
    isSupabaseAvailable = true
    console.log('Supabase initialized successfully')
  }
} catch (error) {
  supabaseError = error as Error
  console.error('Supabase initialization error:', supabaseError)
  isSupabaseAvailable = false
}

export { supabase, supabaseError, isSupabaseAvailable }

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
    if (!isSupabaseAvailable || !supabase) {
      // Fallback to localStorage
      const saved = localStorage.getItem('inquiries')
      return saved ? JSON.parse(saved) : []
    }
    
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('createdAt', { ascending: false })
      
      if (error) throw error
      return data as Inquiry[]
    } catch (error) {
      console.warn('Error fetching from Supabase, using localStorage:', error)
      const saved = localStorage.getItem('inquiries')
      return saved ? JSON.parse(saved) : []
    }
  },

  async getById(id: string) {
    if (!isSupabaseAvailable || !supabase) {
      const saved = localStorage.getItem('inquiries')
      const inquiries = saved ? JSON.parse(saved) : []
      return inquiries.find((i: Inquiry) => i.id === id)
    }
    
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .eq('id', id)
        .single()
      
      if (error) throw error
      return data as Inquiry
    } catch (error) {
      console.warn('Error fetching from Supabase, using localStorage:', error)
      const saved = localStorage.getItem('inquiries')
      const inquiries = saved ? JSON.parse(saved) : []
      return inquiries.find((i: Inquiry) => i.id === id)
    }
  },

  async create(inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'updatedAt'>) {
    const newInquiry = {
      id: Date.now().toString(),
      ...inquiry,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    if (!isSupabaseAvailable || !supabase) {
      // Fallback to localStorage
      const saved = localStorage.getItem('inquiries')
      const inquiries = saved ? JSON.parse(saved) : []
      inquiries.push(newInquiry)
      localStorage.setItem('inquiries', JSON.stringify(inquiries))
      return newInquiry as Inquiry
    }
    
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .insert([newInquiry])
        .select()
        .single()
      
      if (error) throw error
      return data as Inquiry
    } catch (error) {
      console.warn('Error saving to Supabase, using localStorage:', error)
      const saved = localStorage.getItem('inquiries')
      const inquiries = saved ? JSON.parse(saved) : []
      inquiries.push(newInquiry)
      localStorage.setItem('inquiries', JSON.stringify(inquiries))
      return newInquiry as Inquiry
    }
  },

  async update(id: string, updates: Partial<Inquiry>) {
    const updatedData = {
      ...updates,
      updatedAt: new Date().toISOString()
    }

    if (!isSupabaseAvailable || !supabase) {
      // Fallback to localStorage
      const saved = localStorage.getItem('inquiries')
      const inquiries = saved ? JSON.parse(saved) : []
      const index = inquiries.findIndex((i: Inquiry) => i.id === id)
      if (index !== -1) {
        inquiries[index] = { ...inquiries[index], ...updatedData }
        localStorage.setItem('inquiries', JSON.stringify(inquiries))
        return inquiries[index]
      }
      throw new Error('Inquiry not found')
    }
    
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .update(updatedData)
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      return data as Inquiry
    } catch (error) {
      console.warn('Error updating in Supabase, using localStorage:', error)
      const saved = localStorage.getItem('inquiries')
      const inquiries = saved ? JSON.parse(saved) : []
      const index = inquiries.findIndex((i: Inquiry) => i.id === id)
      if (index !== -1) {
        inquiries[index] = { ...inquiries[index], ...updatedData }
        localStorage.setItem('inquiries', JSON.stringify(inquiries))
        return inquiries[index]
      }
      throw new Error('Inquiry not found')
    }
  },

  async delete(id: string) {
    if (!isSupabaseAvailable || !supabase) {
      // Fallback to localStorage
      const saved = localStorage.getItem('inquiries')
      const inquiries = saved ? JSON.parse(saved) : []
      const filtered = inquiries.filter((i: Inquiry) => i.id !== id)
      localStorage.setItem('inquiries', JSON.stringify(filtered))
      return
    }
    
    try {
      const { error } = await supabase
        .from('inquiries')
        .delete()
        .eq('id', id)
      
      if (error) throw error
    } catch (error) {
      console.warn('Error deleting from Supabase, using localStorage:', error)
      const saved = localStorage.getItem('inquiries')
      const inquiries = saved ? JSON.parse(saved) : []
      const filtered = inquiries.filter((i: Inquiry) => i.id !== id)
      localStorage.setItem('inquiries', JSON.stringify(filtered))
    }
  }
}

// Vehicle functions
export const vehicleService = {
  async getAll() {
    if (!isSupabaseAvailable || !supabase) {
      const saved = localStorage.getItem('vehicles')
      return saved ? JSON.parse(saved) : []
    }
    
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .order('createdAt', { ascending: false })
      
      if (error) throw error
      return data as Vehicle[]
    } catch (error) {
      console.warn('Error fetching from Supabase, using localStorage:', error)
      const saved = localStorage.getItem('vehicles')
      return saved ? JSON.parse(saved) : []
    }
  },

  async getById(id: string) {
    if (!isSupabaseAvailable || !supabase) {
      const saved = localStorage.getItem('vehicles')
      const vehicles = saved ? JSON.parse(saved) : []
      return vehicles.find((v: Vehicle) => v.id === id)
    }
    
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('id', id)
        .single()
      
      if (error) throw error
      return data as Vehicle
    } catch (error) {
      console.warn('Error fetching from Supabase, using localStorage:', error)
      const saved = localStorage.getItem('vehicles')
      const vehicles = saved ? JSON.parse(saved) : []
      return vehicles.find((v: Vehicle) => v.id === id)
    }
  },

  async create(vehicle: Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'>) {
    const newVehicle = {
      id: Date.now().toString(),
      ...vehicle,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    if (!isSupabaseAvailable || !supabase) {
      const saved = localStorage.getItem('vehicles')
      const vehicles = saved ? JSON.parse(saved) : []
      vehicles.push(newVehicle)
      localStorage.setItem('vehicles', JSON.stringify(vehicles))
      return newVehicle as Vehicle
    }
    
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .insert([newVehicle])
        .select()
        .single()
      
      if (error) throw error
      return data as Vehicle
    } catch (error) {
      console.warn('Error saving to Supabase, using localStorage:', error)
      const saved = localStorage.getItem('vehicles')
      const vehicles = saved ? JSON.parse(saved) : []
      vehicles.push(newVehicle)
      localStorage.setItem('vehicles', JSON.stringify(vehicles))
      return newVehicle as Vehicle
    }
  },

  async update(id: string, updates: Partial<Vehicle>) {
    const updatedData = {
      ...updates,
      updatedAt: new Date().toISOString()
    }

    if (!isSupabaseAvailable || !supabase) {
      const saved = localStorage.getItem('vehicles')
      const vehicles = saved ? JSON.parse(saved) : []
      const index = vehicles.findIndex((v: Vehicle) => v.id === id)
      if (index !== -1) {
        vehicles[index] = { ...vehicles[index], ...updatedData }
        localStorage.setItem('vehicles', JSON.stringify(vehicles))
        return vehicles[index]
      }
      throw new Error('Vehicle not found')
    }
    
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .update(updatedData)
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      return data as Vehicle
    } catch (error) {
      console.warn('Error updating in Supabase, using localStorage:', error)
      const saved = localStorage.getItem('vehicles')
      const vehicles = saved ? JSON.parse(saved) : []
      const index = vehicles.findIndex((v: Vehicle) => v.id === id)
      if (index !== -1) {
        vehicles[index] = { ...vehicles[index], ...updatedData }
        localStorage.setItem('vehicles', JSON.stringify(vehicles))
        return vehicles[index]
      }
      throw new Error('Vehicle not found')
    }
  },

  async delete(id: string) {
    if (!isSupabaseAvailable || !supabase) {
      const saved = localStorage.getItem('vehicles')
      const vehicles = saved ? JSON.parse(saved) : []
      const filtered = vehicles.filter((v: Vehicle) => v.id !== id)
      localStorage.setItem('vehicles', JSON.stringify(filtered))
      return
    }
    
    try {
      const { error } = await supabase
        .from('vehicles')
        .delete()
        .eq('id', id)
      
      if (error) throw error
    } catch (error) {
      console.warn('Error deleting from Supabase, using localStorage:', error)
      const saved = localStorage.getItem('vehicles')
      const vehicles = saved ? JSON.parse(saved) : []
      const filtered = vehicles.filter((v: Vehicle) => v.id !== id)
      localStorage.setItem('vehicles', JSON.stringify(filtered))
    }
  }
}

// Business Settings functions
export const settingsService = {
  async get() {
    if (!isSupabaseAvailable || !supabase) {
      const saved = localStorage.getItem('business_settings')
      return saved ? JSON.parse(saved) : null
    }
    
    try {
      const { data, error } = await supabase
        .from('business_settings')
        .select('*')
        .single()
      
      if (error && error.code !== 'PGRST116') throw error
      return data as BusinessSettings | null
    } catch (error) {
      console.warn('Error fetching from Supabase, using localStorage:', error)
      const saved = localStorage.getItem('business_settings')
      return saved ? JSON.parse(saved) : null
    }
  },

  async update(updates: Partial<BusinessSettings>) {
    const updatedData = {
      ...updates,
      updatedAt: new Date().toISOString()
    }

    if (!isSupabaseAvailable || !supabase) {
      const existing = localStorage.getItem('business_settings')
      const data = existing ? JSON.parse(existing) : null
      
      if (!data) {
        const newSettings = {
          id: Date.now().toString(),
          ...updates,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        localStorage.setItem('business_settings', JSON.stringify(newSettings))
        return newSettings as BusinessSettings
      }

      const updated = { ...data, ...updatedData }
      localStorage.setItem('business_settings', JSON.stringify(updated))
      return updated as BusinessSettings
    }
    
    try {
      const existing = await this.get()
      
      if (!existing) {
        const newSettings = {
          id: Date.now().toString(),
          ...updates,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        const { data, error } = await supabase
          .from('business_settings')
          .insert([newSettings])
          .select()
          .single()
        
        if (error) throw error
        return data as BusinessSettings
      }

      const { data, error } = await supabase
        .from('business_settings')
        .update(updatedData)
        .eq('id', existing.id)
        .select()
        .single()
      
      if (error) throw error
      return data as BusinessSettings
    } catch (error) {
      console.warn('Error updating in Supabase, using localStorage:', error)
      const existing = localStorage.getItem('business_settings')
      const data = existing ? JSON.parse(existing) : null
      
      if (!data) {
        const newSettings = {
          id: Date.now().toString(),
          ...updates,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        localStorage.setItem('business_settings', JSON.stringify(newSettings))
        return newSettings as BusinessSettings
      }

      const updated = { ...data, ...updatedData }
      localStorage.setItem('business_settings', JSON.stringify(updated))
      return updated as BusinessSettings
    }
  }
}
