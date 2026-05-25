import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, AlertCircle, Info, X } from 'lucide-react'
import { setNotificationCallback } from '../lib/notifications'

interface ToastItem {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}

const ToastContainer = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  useEffect(() => {
    // Register the notification callback
    setNotificationCallback((message, type) => {
      const id = Date.now().toString()
      const newToast: ToastItem = { id, message, type }
      
      setToasts(prev => [...prev, newToast])
      
      // Auto-remove after 3 seconds
      setTimeout(() => {
        removeToast(id)
      }, 3000)
    })
  }, [])

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <Check size={20} className="text-green-400" />
      case 'error':
        return <AlertCircle size={20} className="text-motorsport-red" />
      case 'info':
        return <Info size={20} className="text-blue-400" />
      default:
        return null
    }
  }

  const getBgColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-500/20 border-green-500/50'
      case 'error':
        return 'bg-motorsport-red/20 border-motorsport-red/50'
      case 'info':
        return 'bg-blue-500/20 border-blue-500/50'
      default:
        return 'bg-gray-500/20 border-gray-500/50'
    }
  }

  const getTextColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-400'
      case 'error':
        return 'text-motorsport-red'
      case 'info':
        return 'text-blue-400'
      default:
        return 'text-gray-400'
    }
  }

  return (
    <div className="fixed top-8 right-8 z-[100] pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast, index) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, x: 100 }}
            animate={{ opacity: 1, y: index * 80, x: 0 }}
            exit={{ opacity: 0, y: -20, x: 100 }}
            transition={{ duration: 0.3 }}
            className={`${getBgColor(toast.type)} border rounded-sm p-4 flex items-center gap-3 mb-3 max-w-md pointer-events-auto`}
          >
            {getIcon(toast.type)}
            <p className={`${getTextColor(toast.type)} text-sm font-medium flex-1`}>
              {toast.message}
            </p>
            <button
              onClick={() => removeToast(toast.id)}
              className={`${getTextColor(toast.type)} hover:opacity-70 transition-opacity`}
            >
              <X size={18} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default ToastContainer
