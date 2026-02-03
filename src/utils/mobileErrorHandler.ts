// Mobile-specific error handling for Vercel deployment issues

interface MobileErrorInfo {
  userAgent: string
  viewport: string
  url: string
  timestamp: string
  errorCode?: string
}

class MobileErrorHandler {
  private static instance: MobileErrorHandler
  private errorQueue: Array<{ error: Error; info: MobileErrorInfo }> = []
  private maxQueueSize = 10

  static getInstance(): MobileErrorHandler {
    if (!MobileErrorHandler.instance) {
      MobileErrorHandler.instance = new MobileErrorHandler()
    }
    return MobileErrorHandler.instance
  }

  private constructor() {
    this.setupGlobalErrorHandlers()
  }

  private setupGlobalErrorHandlers(): void {
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.handleMobileError(new Error(`Unhandled Promise Rejection: ${event.reason}`), {
        type: 'promise-rejection',
        reason: event.reason
      })
    })

    // Handle general JavaScript errors
    window.addEventListener('error', (event) => {
      this.handleMobileError(event.error || new Error(event.message), {
        type: 'javascript-error',
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      })
    })

    // Handle resource loading errors
    window.addEventListener('error', (event) => {
      if (event.target && event.target !== window) {
        this.handleMobileError(new Error(`Resource failed to load: ${(event.target as any).src || (event.target as any).href}`), {
          type: 'resource-error',
          element: (event.target as Element).tagName
        })
      }
    }, true)
  }

  private getMobileErrorInfo(): MobileErrorInfo {
    return {
      userAgent: navigator.userAgent,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      url: window.location.href,
      timestamp: new Date().toISOString()
    }
  }

  public handleMobileError(error: Error, additionalInfo?: any): void {
    const errorInfo = this.getMobileErrorInfo()
    
    // Add additional info if provided
    if (additionalInfo) {
      (errorInfo as any).additionalInfo = additionalInfo
    }

    // Check if this is a Vercel-specific error
    if (this.isVercelError(error)) {
      this.handleVercelError(error, errorInfo)
    }

    // Queue the error for potential reporting
    this.queueError(error, errorInfo)

    // Log to console for debugging
    console.error('Mobile Error Detected:', {
      error: error.message,
      stack: error.stack,
      info: errorInfo
    })
  }

  private isVercelError(error: Error): boolean {
    const vercelErrorPatterns = [
      'bom1::',
      'vercel',
      'edge-network',
      'serverless',
      'function-timeout',
      'ENOTFOUND',
      'fetch-error'
    ]

    const errorMessage = error.message.toLowerCase()
    const errorStack = (error.stack || '').toLowerCase()

    return vercelErrorPatterns.some(pattern => 
      errorMessage.includes(pattern) || errorStack.includes(pattern)
    )
  }

  private handleVercelError(error: Error, errorInfo: MobileErrorInfo): void {
    console.warn('Vercel deployment error detected:', {
      error: error.message,
      url: errorInfo.url,
      userAgent: errorInfo.userAgent,
      viewport: errorInfo.viewport
    })
    
    // Attempt to reload the page if it's a Vercel routing error
    if (error.message.includes('bom1::') || error.message.includes('pzt9v')) {
      console.log('Attempting to recover from Vercel routing error...')
      
      // Wait a moment then try to reload
      setTimeout(() => {
        try {
          // Clear any cached data that might be causing issues
          if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then(registrations => {
              registrations.forEach(registration => registration.unregister())
            })
          }
          
          // Clear localStorage and sessionStorage
          localStorage.clear()
          sessionStorage.clear()
          
          // Reload the page
          window.location.reload()
        } catch (reloadError) {
          console.error('Failed to reload after Vercel error:', reloadError)
        }
      }, 1000)
    }
  }

  private queueError(error: Error, info: MobileErrorInfo): void {
    // Add to error queue
    this.errorQueue.push({ error, info })
    
    // Keep queue size manageable
    if (this.errorQueue.length > this.maxQueueSize) {
      this.errorQueue.shift()
    }
  }

  public getErrorQueue(): Array<{ error: Error; info: MobileErrorInfo }> {
    return [...this.errorQueue]
  }

  public clearErrorQueue(): void {
    this.errorQueue = []
  }

  // Method to manually trigger recovery for Vercel errors
  public recoverFromVercelError(): void {
    try {
      // Clear all caches
      if (typeof caches !== 'undefined') {
        caches.keys().then(names => {
          names.forEach(name => caches.delete(name))
        })
      }

      // Clear storage
      localStorage.clear()
      sessionStorage.clear()

      // Navigate to home page
      window.location.href = '/'
    } catch (error) {
      console.error('Manual recovery failed:', error)
    }
  }

  // Check if current environment is mobile
  public isMobile(): boolean {
    const userAgent = navigator.userAgent.toLowerCase()
    const mobilePatterns = [
      'android',
      'iphone',
      'ipad',
      'mobile',
      'blackberry',
      'opera mini',
      'iemobile'
    ]

    return mobilePatterns.some(pattern => userAgent.includes(pattern)) ||
           window.innerWidth <= 768
  }

  // Initialize error handling specifically for mobile Vercel deployments
  public initializeMobileVercelHandling(): void {
    if (this.isMobile()) {
      console.log('Mobile device detected, initializing Vercel error handling...')
      
      // Add specific handling for navigation errors
      window.addEventListener('popstate', () => {
        // Small delay to let React Router handle the navigation
        setTimeout(() => {
          if (document.title.includes('Error') || document.body.innerHTML.includes('bom1::')) {
            console.log('Navigation error detected, attempting recovery...')
            this.recoverFromVercelError()
          }
        }, 100)
      })

      // Monitor for Vercel error content in the DOM
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === Node.TEXT_NODE && node.textContent?.includes('bom1::')) {
                console.log('Vercel error detected in DOM, triggering recovery...')
                this.recoverFromVercelError()
              }
            })
          }
        })
      })

      observer.observe(document.body, { childList: true, subtree: true })
    }
  }
}

// Export singleton instance
export const mobileErrorHandler = MobileErrorHandler.getInstance()

// Auto-initialize when module is loaded
if (typeof window !== 'undefined') {
  mobileErrorHandler.initializeMobileVercelHandling()
} 