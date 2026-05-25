/**
 * Offline support utilities
 * Handles service worker registration and offline state management
 */

export interface OfflineState {
  isOnline: boolean
  isServiceWorkerReady: boolean
  cachedDataAvailable: boolean
}

let offlineState: OfflineState = {
  isOnline: navigator.onLine,
  isServiceWorkerReady: false,
  cachedDataAvailable: false,
}

let listeners: ((state: OfflineState) => void)[] = []

/**
 * Register service worker for offline support
 */
export async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    console.warn('Service Workers not supported')
    return
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
    })
    console.log('✅ Service Worker registered:', registration)
    updateOfflineState({ isServiceWorkerReady: true })

    // Listen for updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            console.log('🔄 New service worker available - app update ready')
            // Notify user about update
            window.dispatchEvent(new CustomEvent('sw-update-available'))
          }
        })
      }
    })
  } catch (error) {
    console.error('❌ Service Worker registration failed:', error)
  }
}

/**
 * Listen for online/offline events
 */
export function setupOfflineListener() {
  window.addEventListener('online', () => {
    console.log('🟢 Back online!')
    updateOfflineState({ isOnline: true })
    window.dispatchEvent(new CustomEvent('app-online'))
  })

  window.addEventListener('offline', () => {
    console.log('🔴 Gone offline!')
    updateOfflineState({ isOnline: false })
    window.dispatchEvent(new CustomEvent('app-offline'))
  })
}

/**
 * Check if cached data is available
 */
export async function checkCachedData() {
  try {
    const cache = await caches.open('hrvd-runtime-v1')
    const keys = await cache.keys()
    const hasData = keys.length > 0
    updateOfflineState({ cachedDataAvailable: hasData })
    return hasData
  } catch (error) {
    console.warn('Error checking cached data:', error)
    return false
  }
}

/**
 * Get current offline state
 */
export function getOfflineState(): OfflineState {
  return { ...offlineState }
}

/**
 * Subscribe to offline state changes
 */
export function subscribeToOfflineState(listener: (state: OfflineState) => void) {
  listeners.push(listener)
  // Call immediately with current state
  listener(offlineState)
  // Return unsubscribe function
  return () => {
    listeners = listeners.filter((l) => l !== listener)
  }
}

/**
 * Update offline state and notify listeners
 */
function updateOfflineState(updates: Partial<OfflineState>) {
  offlineState = { ...offlineState, ...updates }
  listeners.forEach((listener) => listener(offlineState))
}

/**
 * Clear all caches (for debugging/testing)
 */
export async function clearAllCaches() {
  try {
    const cacheNames = await caches.keys()
    await Promise.all(cacheNames.map((name) => caches.delete(name)))
    console.log('✅ All caches cleared')
  } catch (error) {
    console.error('Error clearing caches:', error)
  }
}

/**
 * Get cache size (for debugging)
 */
export async function getCacheSize() {
  try {
    const cacheNames = await caches.keys()
    let totalSize = 0

    for (const name of cacheNames) {
      const cache = await caches.open(name)
      const keys = await cache.keys()
      for (const request of keys) {
        const response = await cache.match(request)
        if (response) {
          const blob = await response.blob()
          totalSize += blob.size
        }
      }
    }

    return totalSize
  } catch (error) {
    console.error('Error calculating cache size:', error)
    return 0
  }
}

/**
 * Initialize offline support
 */
export function initializeOfflineSupport() {
  console.log('🔧 Initializing offline support...')
  registerServiceWorker()
  setupOfflineListener()
  checkCachedData()
  console.log('✅ Offline support initialized')
}
