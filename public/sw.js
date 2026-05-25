// Service Worker for offline support
const CACHE_NAME = 'hrvd-car-trading-v1'
const RUNTIME_CACHE = 'hrvd-runtime-v1'
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...')
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching static assets')
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('[SW] Some assets failed to cache:', err)
        // Don't fail installation if some assets can't be cached
        return Promise.resolve()
      })
    })
  )
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...')
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
            console.log('[SW] Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  self.clients.claim()
})

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }

  // Skip external requests (Supabase, Resend, etc.)
  if (url.origin !== self.location.origin) {
    return
  }

  // Strategy: Cache first for static assets, Network first for API
  if (isStaticAsset(url.pathname)) {
    event.respondWith(cacheFirst(request))
  } else {
    event.respondWith(networkFirst(request))
  }
})

// Cache first strategy - use cache, fallback to network
async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME)
  const cached = await cache.match(request)

  if (cached) {
    console.log('[SW] Serving from cache:', request.url)
    return cached
  }

  try {
    const response = await fetch(request)
    if (response.ok) {
      cache.put(request, response.clone())
    }
    return response
  } catch (error) {
    console.warn('[SW] Fetch failed, no cache available:', request.url)
    return new Response('Offline - Resource not available', {
      status: 503,
      statusText: 'Service Unavailable',
    })
  }
}

// Network first strategy - try network, fallback to cache
async function networkFirst(request) {
  const cache = await caches.open(RUNTIME_CACHE)

  try {
    const response = await fetch(request)
    // Only cache successful responses (200-299) and not partial responses (206)
    if (response.ok && response.status !== 206) {
      try {
        cache.put(request, response.clone())
      } catch (cacheError) {
        // Silently fail if cache.put fails (e.g., for 206 responses)
        console.debug('[SW] Cache put failed:', cacheError.message)
      }
    }
    return response
  } catch (error) {
    console.log('[SW] Network failed, trying cache:', request.url)
    const cached = await cache.match(request)
    if (cached) {
      return cached
    }

    // Return offline page for HTML requests
    if (request.headers.get('accept')?.includes('text/html')) {
      return new Response(
        `<!DOCTYPE html>
        <html>
          <head>
            <title>Offline</title>
            <style>
              body { font-family: system-ui; padding: 2rem; text-align: center; }
              h1 { color: #333; }
              p { color: #666; }
            </style>
          </head>
          <body>
            <h1>You're Offline</h1>
            <p>This page is not available offline. Please check your connection.</p>
          </body>
        </html>`,
        {
          status: 503,
          statusText: 'Service Unavailable',
          headers: { 'Content-Type': 'text/html' },
        }
      )
    }

    return new Response('Offline - Resource not available', {
      status: 503,
      statusText: 'Service Unavailable',
    })
  }
}

// Helper to determine if URL is a static asset
function isStaticAsset(pathname) {
  return (
    pathname.endsWith('.js') ||
    pathname.endsWith('.css') ||
    pathname.endsWith('.woff2') ||
    pathname.endsWith('.woff') ||
    pathname.endsWith('.ttf') ||
    pathname.endsWith('.png') ||
    pathname.endsWith('.jpg') ||
    pathname.endsWith('.jpeg') ||
    pathname.endsWith('.gif') ||
    pathname.endsWith('.svg') ||
    pathname.endsWith('.webp') ||
    pathname === '/' ||
    pathname === '/index.html'
  )
}
