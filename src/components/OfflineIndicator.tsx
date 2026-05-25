import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WifiOff, AlertCircle } from 'lucide-react'
import { subscribeToOfflineState, OfflineState } from '../lib/offline'

const OfflineIndicator = () => {
  const [offlineState, setOfflineState] = useState<OfflineState>({
    isOnline: navigator.onLine,
    isServiceWorkerReady: false,
    cachedDataAvailable: false,
  })

  useEffect(() => {
    const unsubscribe = subscribeToOfflineState(setOfflineState)
    return unsubscribe
  }, [])

  // Show indicator only when offline
  if (offlineState.isOnline) {
    return null
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed top-0 left-0 right-0 z-40 bg-motorsport-red/10 border-b border-motorsport-red/30 backdrop-blur-sm"
      >
        <div className="container-luxury py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <WifiOff size={18} className="text-motorsport-red animate-pulse" />
            <div>
              <p className="text-sm font-medium text-motorsport-red">You're Offline</p>
              <p className="text-xs text-motorsport-red/70">
                {offlineState.cachedDataAvailable
                  ? 'Using cached data - some features may be limited'
                  : 'No cached data available'}
              </p>
            </div>
          </div>

          {!offlineState.cachedDataAvailable && (
            <div className="flex items-center gap-2 text-xs text-motorsport-red">
              <AlertCircle size={14} />
              Limited functionality
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default OfflineIndicator
