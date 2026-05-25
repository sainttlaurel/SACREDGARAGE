import { motion, AnimatePresence } from 'framer-motion'
import { Check, AlertCircle, X } from 'lucide-react'
import { useEffect } from 'react'

interface ToastProps {
  message: string
  type: 'success' | 'error'
  isOpen: boolean
  onClose: () => void
  duration?: number
}

const Toast = ({ message, type, isOpen, onClose, duration = 3000 }: ToastProps) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, duration)
      return () => clearTimeout(timer)
    }
  }, [isOpen, onClose, duration])

  const bgColor = type === 'success' 
    ? 'bg-green-500/20 border-green-500/50' 
    : 'bg-motorsport-red/20 border-motorsport-red/50'
  
  const textColor = type === 'success' 
    ? 'text-green-400' 
    : 'text-motorsport-red'
  
  const Icon = type === 'success' ? Check : AlertCircle

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: 0 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: -20, x: 0 }}
          transition={{ duration: 0.3 }}
          className={`fixed top-8 right-8 z-[100] max-w-md ${bgColor} border rounded-sm p-4 flex items-center gap-3`}
        >
          <Icon size={20} className={textColor} />
          <p className={`${textColor} text-sm font-medium flex-1`}>
            {message}
          </p>
          <button
            onClick={onClose}
            className={`${textColor} hover:opacity-70 transition-opacity`}
          >
            <X size={18} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Toast
