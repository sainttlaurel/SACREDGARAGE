// Global notification system
type NotificationCallback = (message: string, type: 'success' | 'error' | 'info') => void

let notificationCallback: NotificationCallback | null = null

export const setNotificationCallback = (callback: NotificationCallback) => {
  notificationCallback = callback
}

export const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
  if (notificationCallback) {
    notificationCallback(message, type)
  } else {
    // Fallback to console if callback not set
    console.log(`[${type.toUpperCase()}] ${message}`)
  }
}

export const showSuccess = (message: string) => showNotification(message, 'success')
export const showError = (message: string) => showNotification(message, 'error')
export const showInfo = (message: string) => showNotification(message, 'info')
