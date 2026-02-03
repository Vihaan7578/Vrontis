import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    console.error('ErrorBoundary caught an error:', error)
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary details:', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack
    })

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }

    this.setState({ error, errorInfo })

    // Handle specific types of errors
    if (this.isDOMError(error)) {
      console.error('DOM manipulation error detected, attempting recovery...')
      this.attemptDOMRecovery()
    }

    if (this.isReactReconciliationError(error)) {
      console.error('React reconciliation error detected, resetting component...')
      this.resetComponent()
    }
  }

  private isDOMError(error: Error): boolean {
    const domErrorPatterns = [
      'insertBefore',
      'appendChild',
      'removeChild',
      'Node',
      'DOM',
      'not a child of this node'
    ]

    const errorMessage = error.message.toLowerCase()
    return domErrorPatterns.some(pattern =>
      errorMessage.includes(pattern.toLowerCase())
    )
  }

  private isReactReconciliationError(error: Error): boolean {
    const reconciliationPatterns = [
      'reconciliation',
      'fiber',
      'hook',
      'render',
      'commit'
    ]

    const errorMessage = error.message.toLowerCase()
    const stackTrace = (error.stack || '').toLowerCase()

    return reconciliationPatterns.some(pattern =>
      errorMessage.includes(pattern) || stackTrace.includes(pattern)
    )
  }

  private attemptDOMRecovery(): void {
    try {
      // Force a re-render after a delay to allow DOM to stabilize
      setTimeout(() => {
        if (this.state.hasError) {
          this.setState({ hasError: false, error: undefined, errorInfo: undefined })
        }
      }, 100)
    } catch (recoveryError) {
      console.error('Failed to recover from DOM error:', recoveryError)
    }
  }

  private resetComponent(): void {
    try {
      // Immediate reset for React reconciliation errors
      this.setState({ hasError: false, error: undefined, errorInfo: undefined })
    } catch (resetError) {
      console.error('Failed to reset component:', resetError)
    }
  }

  // Method to manually reset the error boundary
  public resetErrorBoundary = (): void => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render() {
    if (this.state.hasError) {
      // Return custom fallback UI or default error message
      if (this.props.fallback) {
        return this.props.fallback
      }

      // For production, return null to hide broken components
      if (import.meta.env.PROD) {
        return null
      }

      // For development, show error details
      return (
        <div className="p-4 m-4 bg-red-100 border border-red-400 rounded-lg">
          <h2 className="text-lg font-bold text-red-800 mb-2">Something went wrong</h2>
          <details className="text-sm text-red-700">
            <summary className="cursor-pointer mb-2">Error Details</summary>
            <pre className="whitespace-pre-wrap bg-red-50 p-2 rounded text-xs overflow-auto">
              {this.state.error?.message}
              {this.state.error?.stack && (
                <>
                  {'\n\nStack Trace:\n'}
                  {this.state.error.stack}
                </>
              )}
              {this.state.errorInfo?.componentStack && (
                <>
                  {'\n\nComponent Stack:\n'}
                  {this.state.errorInfo.componentStack}
                </>
              )}
            </pre>
          </details>
          <button
            onClick={this.resetErrorBoundary}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary 