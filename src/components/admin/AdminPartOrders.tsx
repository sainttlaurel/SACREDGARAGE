import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Trash2, Phone, Mail, MapPin, CreditCard, Truck, MessageSquare, ExternalLink } from 'lucide-react'
import { partOrdersService, PartOrder } from '../../lib/supabase'

const AdminPartOrders = () => {
  const [orders, setOrders] = useState<PartOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'new' | 'contacted' | 'confirmed' | 'completed'>('all')
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  useEffect(() => {
    loadOrders()

    // Listen for storage changes (real-time sync)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'part_orders' && e.newValue) {
        try {
          const updatedOrders = JSON.parse(e.newValue)
          setOrders(updatedOrders)
          console.log('✅ Part orders updated from changes')
        } catch (error) {
          console.error('Error parsing updated orders:', error)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  const loadOrders = async () => {
    try {
      const data = await partOrdersService.getAll()
      setOrders(data)
    } catch (error) {
      console.error('Error loading orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (orderId: string, newStatus: PartOrder['status']) => {
    try {
      await partOrdersService.update(orderId, { status: newStatus })
      loadOrders()
    } catch (error) {
      console.error('Error updating order status:', error)
    }
  }

  const handleDelete = async (orderId: string) => {
    if (confirm('Are you sure you want to delete this order?')) {
      try {
        await partOrdersService.delete(orderId)
        loadOrders()
      } catch (error) {
        console.error('Error deleting order:', error)
      }
    }
  }

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(o => o.status === filter)

  const getStatusColor = (status: PartOrder['status']) => {
    switch (status) {
      case 'new':
        return 'bg-blue-500/20 text-blue-400'
      case 'contacted':
        return 'bg-yellow-500/20 text-yellow-400'
      case 'confirmed':
        return 'bg-purple-500/20 text-purple-400'
      case 'completed':
        return 'bg-green-500/20 text-green-400'
      default:
        return 'bg-foreground-faint/20 text-foreground-muted'
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-foreground-muted">Loading orders...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="font-serif text-3xl mb-2">Part Orders</h2>
        <p className="text-foreground-muted">
          {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''} {filter !== 'all' && `(${filter})`}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {(['all', 'new', 'contacted', 'confirmed', 'completed'] as const).map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-sm text-sm font-medium transition-all ${
              filter === status
                ? 'bg-foreground text-background'
                : 'bg-foreground-faint/20 text-foreground-muted hover:bg-foreground-faint/40'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-12 card-luxury">
          <p className="text-foreground-muted">No orders found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="card-luxury p-6 space-y-4"
            >
              {/* Order Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-serif text-xl">
                      {order.partBrand} {order.partName}
                    </h3>
                    <span className={`px-3 py-1 rounded-sm text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-foreground-muted">
                    Order ID: {order.id} • {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(order.id)}
                  className="p-2 hover:bg-motorsport-red/20 text-motorsport-red rounded transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-border">
                <div>
                  <p className="text-xs text-foreground-muted mb-1">Quantity</p>
                  <p className="font-medium">{order.quantity}x</p>
                </div>
                <div>
                  <p className="text-xs text-foreground-muted mb-1">Price</p>
                  <p className="font-medium">{order.partPrice}</p>
                </div>
                <div>
                  <p className="text-xs text-foreground-muted mb-1">Payment</p>
                  <p className="font-medium text-sm capitalize">{order.paymentMethod.replace('_', ' ')}</p>
                </div>
                <div>
                  <p className="text-xs text-foreground-muted mb-1">Delivery</p>
                  <p className="font-medium text-sm capitalize">{order.deliveryOption}</p>
                </div>
              </div>

              {/* Expandable Details */}
              <button
                onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                className="w-full text-left py-2 text-sm text-foreground-muted hover:text-foreground transition-colors"
              >
                {expandedOrder === order.id ? '▼ Hide Details' : '▶ Show Details'}
              </button>

              {expandedOrder === order.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-6 pt-4 border-t border-border"
                >
                  {/* Customer Information */}
                  <div>
                    <h4 className="font-medium mb-3 text-sm">Customer Information</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center flex-shrink-0">
                          <MessageSquare size={16} />
                        </div>
                        <div>
                          <p className="text-xs text-foreground-muted">Name</p>
                          <p className="font-medium">{order.customerName}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center flex-shrink-0">
                          <Phone size={16} />
                        </div>
                        <div>
                          <p className="text-xs text-foreground-muted">Phone</p>
                          <a href={`tel:${order.customerPhone}`} className="font-medium hover:text-motorsport-red transition-colors">
                            {order.customerPhone}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center flex-shrink-0">
                          <Mail size={16} />
                        </div>
                        <div>
                          <p className="text-xs text-foreground-muted">Email</p>
                          <a href={`mailto:${order.customerEmail}`} className="font-medium hover:text-motorsport-red transition-colors">
                            {order.customerEmail}
                          </a>
                        </div>
                      </div>

                      {order.facebookProfile && (
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center flex-shrink-0">
                            <ExternalLink size={16} />
                          </div>
                          <div>
                            <p className="text-xs text-foreground-muted">Facebook</p>
                            <a 
                              href={order.facebookProfile.startsWith('http') ? order.facebookProfile : `https://${order.facebookProfile}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium hover:text-motorsport-red transition-colors break-all"
                            >
                              {order.facebookProfile}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Delivery Information */}
                  <div>
                    <h4 className="font-medium mb-3 text-sm">Delivery Information</h4>
                    <div className="space-y-2">
                      {order.customerCar && (
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center flex-shrink-0 mt-1">
                            <MessageSquare size={16} />
                          </div>
                          <div>
                            <p className="text-xs text-foreground-muted">Vehicle</p>
                            <p className="font-medium">{order.customerCar}</p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center flex-shrink-0 mt-1">
                          <MapPin size={16} />
                        </div>
                        <div>
                          <p className="text-xs text-foreground-muted">Address</p>
                          <p className="font-medium whitespace-pre-wrap">{order.address}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center flex-shrink-0 mt-1">
                          <CreditCard size={16} />
                        </div>
                        <div>
                          <p className="text-xs text-foreground-muted">Payment Method</p>
                          <p className="font-medium capitalize">{order.paymentMethod.replace('_', ' ')}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center flex-shrink-0 mt-1">
                          <Truck size={16} />
                        </div>
                        <div>
                          <p className="text-xs text-foreground-muted">Delivery Option</p>
                          <p className="font-medium capitalize">{order.deliveryOption}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  {order.notes && (
                    <div>
                      <h4 className="font-medium mb-3 text-sm">Additional Notes</h4>
                      <p className="text-sm text-foreground-muted whitespace-pre-wrap">{order.notes}</p>
                    </div>
                  )}

                  {/* Status Update */}
                  <div>
                    <h4 className="font-medium mb-3 text-sm">Update Status</h4>
                    <div className="flex flex-wrap gap-2">
                      {(['new', 'contacted', 'confirmed', 'completed'] as const).map(status => (
                        <button
                          key={status}
                          onClick={() => handleStatusChange(order.id, status)}
                          className={`px-3 py-2 rounded-sm text-xs font-medium transition-all ${
                            order.status === status
                              ? 'bg-foreground text-background'
                              : 'bg-foreground-faint/20 text-foreground-muted hover:bg-foreground-faint/40'
                          }`}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminPartOrders
