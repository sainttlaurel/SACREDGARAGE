import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LogOut, Menu, X, Package, MessageSquare, Settings, Wrench, ShoppingCart, RefreshCw } from 'lucide-react'
import AdminInquiries from '../components/admin/AdminInquiries'
import AdminInventory from '../components/admin/AdminInventory'
import AdminParts from '../components/admin/AdminParts'
import AdminPartOrders from '../components/admin/AdminPartOrders'
import AdminSettings from '../components/admin/AdminSettings'
import { loadFromSupabaseToLocalStorage, syncLocalStorageToSupabase } from '../lib/syncToSupabase'

interface AdminPortalProps {
  onNavigateHome: () => void
}

const AdminPortal = ({ onNavigateHome }: AdminPortalProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [activeTab, setActiveTab] = useState<'inquiries' | 'inventory' | 'parts' | 'orders' | 'settings'>('inquiries')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [syncing, setSyncing] = useState(false)

  useEffect(() => {
    // Check if already authenticated
    const auth = localStorage.getItem('adminAuth')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple password check (in production, use proper authentication)
    if (password === 'admin123') {
      setIsAuthenticated(true)
      localStorage.setItem('adminAuth', 'true')
      setPassword('')
    } else {
      alert('Invalid password')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('adminAuth')
    setPassword('')
    onNavigateHome()
  }

  const handleSync = async () => {
    setSyncing(true)
    try {
      await loadFromSupabaseToLocalStorage()
      await syncLocalStorageToSupabase()
      alert('✅ Sync complete! Data is now up to date.')
    } catch (error) {
      alert('❌ Sync failed. Check console for details.')
      console.error('Sync error:', error)
    } finally {
      setSyncing(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="grain" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md card-luxury p-8 relative z-10"
        >
          <h1 className="font-serif text-4xl mb-2">Admin Portal</h1>
          <p className="text-foreground-muted mb-8">Enter your password to access</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="label-small block mb-3">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-background border border-border px-4 py-3 focus:outline-none focus:border-foreground transition-colors"
                placeholder="Enter admin password"
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full text-center"
            >
              Login
            </button>
          </form>

          <p className="text-xs text-foreground-muted mt-6 text-center">
            Demo password: admin123
          </p>

          <button
            onClick={onNavigateHome}
            className="w-full mt-4 text-xs opacity-60 hover:opacity-100 transition-opacity"
          >
            ← Back to Website
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="grain" />

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border"
      >
        <div className="container-luxury flex items-center justify-between h-20">
          <h1 className="font-serif text-2xl">HRVD Admin</h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={handleSync}
              disabled={syncing}
              className="flex items-center gap-2 label-small opacity-60 hover:opacity-100 transition-opacity disabled:opacity-30"
              title="Sync data with Supabase"
            >
              <RefreshCw size={18} className={syncing ? 'animate-spin' : ''} />
              {syncing ? 'Syncing...' : 'Sync'}
            </button>

            <button
              onClick={() => setActiveTab('inquiries')}
              className={`flex items-center gap-2 label-small transition-opacity ${
                activeTab === 'inquiries' ? 'opacity-100' : 'opacity-60 hover:opacity-100'
              }`}
            >
              <MessageSquare size={18} />
              Inquiries
            </button>
            <button
              onClick={() => setActiveTab('inventory')}
              className={`flex items-center gap-2 label-small transition-opacity ${
                activeTab === 'inventory' ? 'opacity-100' : 'opacity-60 hover:opacity-100'
              }`}
            >
              <Package size={18} />
              Vehicles
            </button>
            <button
              onClick={() => setActiveTab('parts')}
              className={`flex items-center gap-2 label-small transition-opacity ${
                activeTab === 'parts' ? 'opacity-100' : 'opacity-60 hover:opacity-100'
              }`}
            >
              <Wrench size={18} />
              Parts
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-2 label-small transition-opacity ${
                activeTab === 'orders' ? 'opacity-100' : 'opacity-60 hover:opacity-100'
              }`}
            >
              <ShoppingCart size={18} />
              Orders
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2 label-small transition-opacity ${
                activeTab === 'settings' ? 'opacity-100' : 'opacity-60 hover:opacity-100'
              }`}
            >
              <Settings size={18} />
              Settings
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 label-small opacity-60 hover:opacity-100 transition-opacity"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden border-t border-border bg-background/95 backdrop-blur-sm"
          >
            <div className="container-luxury py-4 space-y-4">
              <button
                onClick={handleSync}
                disabled={syncing}
                className="block w-full text-left label-small opacity-60 hover:opacity-100 disabled:opacity-30"
              >
                {syncing ? '🔄 Syncing...' : '🔄 Sync Data'}
              </button>
              <button
                onClick={() => {
                  setActiveTab('inquiries')
                  setMobileMenuOpen(false)
                }}
                className="block w-full text-left label-small opacity-60 hover:opacity-100"
              >
                Inquiries
              </button>
              <button
                onClick={() => {
                  setActiveTab('inventory')
                  setMobileMenuOpen(false)
                }}
                className="block w-full text-left label-small opacity-60 hover:opacity-100"
              >
                Vehicles
              </button>
              <button
                onClick={() => {
                  setActiveTab('parts')
                  setMobileMenuOpen(false)
                }}
                className="block w-full text-left label-small opacity-60 hover:opacity-100"
              >
                Parts
              </button>
              <button
                onClick={() => {
                  setActiveTab('orders')
                  setMobileMenuOpen(false)
                }}
                className="block w-full text-left label-small opacity-60 hover:opacity-100"
              >
                Orders
              </button>
              <button
                onClick={() => {
                  setActiveTab('settings')
                  setMobileMenuOpen(false)
                }}
                className="block w-full text-left label-small opacity-60 hover:opacity-100"
              >
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left label-small opacity-60 hover:opacity-100"
              >
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </motion.header>

      {/* Main Content */}
      <main className="pt-24 pb-12 relative z-10">
        <div className="container-luxury">
          {activeTab === 'inquiries' && <AdminInquiries />}
          {activeTab === 'inventory' && <AdminInventory />}
          {activeTab === 'parts' && <AdminParts />}
          {activeTab === 'orders' && <AdminPartOrders />}
          {activeTab === 'settings' && <AdminSettings />}
        </div>
      </main>
    </div>
  )
}

export default AdminPortal
