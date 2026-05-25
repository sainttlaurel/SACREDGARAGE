import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Trash2, Eye, Check } from 'lucide-react'

interface Inquiry {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
  status: 'new' | 'read' | 'responded'
  createdAt: string
}

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
  const [filter, setFilter] = useState<'all' | 'new' | 'read' | 'responded'>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load inquiries from localStorage (in production, fetch from backend)
    const savedInquiries = localStorage.getItem('inquiries')
    if (savedInquiries) {
      setInquiries(JSON.parse(savedInquiries))
    }
    setLoading(false)
  }, [])

  const saveInquiries = (updated: Inquiry[]) => {
    setInquiries(updated)
    localStorage.setItem('inquiries', JSON.stringify(updated))
  }

  const updateStatus = (id: string, status: 'new' | 'read' | 'responded') => {
    const updated = inquiries.map(inq =>
      inq.id === id ? { ...inq, status } : inq
    )
    saveInquiries(updated)
    if (selectedInquiry?.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status })
    }
  }

  const deleteInquiry = (id: string) => {
    if (confirm('Are you sure you want to delete this inquiry?')) {
      const updated = inquiries.filter(inq => inq.id !== id)
      saveInquiries(updated)
      setSelectedInquiry(null)
    }
  }

  const filteredInquiries = inquiries.filter(inq => {
    if (filter === 'all') return true
    return inq.status === filter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-motorsport-red/20 text-motorsport-red'
      case 'read':
        return 'bg-blue-500/20 text-blue-400'
      case 'responded':
        return 'bg-green-500/20 text-green-400'
      default:
        return 'bg-foreground-faint/20 text-foreground-muted'
    }
  }

  if (loading) {
    return <div className="text-center py-12">Loading inquiries...</div>
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Inquiries List */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="heading-section">Inquiries</h2>
          <div className="flex gap-2">
            {(['all', 'new', 'read', 'responded'] as const).map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-sm text-sm uppercase tracking-luxury transition-all ${
                  filter === status
                    ? 'bg-foreground text-background'
                    : 'bg-card border border-border hover:border-foreground'
                }`}
              >
                {status === 'all' ? 'All' : status}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filteredInquiries.length === 0 ? (
            <div className="text-center py-12 text-foreground-muted">
              No inquiries found
            </div>
          ) : (
            filteredInquiries.map((inquiry, index) => (
              <motion.div
                key={inquiry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedInquiry(inquiry)}
                className={`p-4 card-luxury cursor-pointer hover:border-foreground transition-all ${
                  selectedInquiry?.id === inquiry.id ? 'border-foreground' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium">
                        {inquiry.firstName} {inquiry.lastName}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded-sm ${getStatusColor(inquiry.status)}`}>
                        {inquiry.status}
                      </span>
                    </div>
                    <p className="text-sm text-foreground-muted mb-2">{inquiry.email}</p>
                    <p className="text-sm line-clamp-2">{inquiry.message}</p>
                    <p className="text-xs text-foreground-faint mt-2">
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Eye size={18} className="opacity-60" />
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Inquiry Details */}
      {selectedInquiry && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card-luxury p-6 h-fit sticky top-24"
        >
          <h3 className="font-serif text-2xl mb-4">Details</h3>

          <div className="space-y-4 mb-6">
            <div>
              <p className="label-small mb-2">Name</p>
              <p>{selectedInquiry.firstName} {selectedInquiry.lastName}</p>
            </div>

            <div>
              <p className="label-small mb-2">Email</p>
              <a href={`mailto:${selectedInquiry.email}`} className="text-motorsport-red hover:underline">
                {selectedInquiry.email}
              </a>
            </div>

            <div>
              <p className="label-small mb-2">Phone</p>
              <a href={`tel:${selectedInquiry.phone}`} className="text-motorsport-red hover:underline">
                {selectedInquiry.phone}
              </a>
            </div>

            <div>
              <p className="label-small mb-2">Message</p>
              <p className="text-sm leading-relaxed">{selectedInquiry.message}</p>
            </div>

            <div>
              <p className="label-small mb-2">Status</p>
              <span className={`text-xs px-3 py-1 rounded-sm ${getStatusColor(selectedInquiry.status)}`}>
                {selectedInquiry.status}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2 border-t border-border pt-6">
            <button
              onClick={() => updateStatus(selectedInquiry.id, 'read')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-sm hover:bg-blue-500/30 transition-colors"
            >
              <Check size={18} />
              Mark as Read
            </button>

            <button
              onClick={() => updateStatus(selectedInquiry.id, 'responded')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-sm hover:bg-green-500/30 transition-colors"
            >
              <Check size={18} />
              Mark as Responded
            </button>

            <button
              onClick={() => deleteInquiry(selectedInquiry.id)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-motorsport-red/20 text-motorsport-red rounded-sm hover:bg-motorsport-red/30 transition-colors"
            >
              <Trash2 size={18} />
              Delete
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default AdminInquiries
