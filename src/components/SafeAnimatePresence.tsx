import React, { ReactNode } from 'react'
import { AnimatePresence, AnimatePresenceProps } from 'framer-motion'
import ErrorBoundary from './ErrorBoundary'

interface SafeAnimatePresenceProps extends Omit<AnimatePresenceProps, 'children'> {
  children: ReactNode
  fallback?: ReactNode
}

const SafeAnimatePresence: React.FC<SafeAnimatePresenceProps> = ({
  children,
  fallback = null,
  ...animatePresenceProps
}) => {
  return (
    <ErrorBoundary 
      fallback={fallback}
      onError={(error, errorInfo) => {
        console.error('AnimatePresence error:', error)
        console.error('Component stack:', errorInfo.componentStack)
      }}
    >
      <div style={{ isolation: 'isolate' }}>
        <AnimatePresence {...animatePresenceProps}>
          {children}
        </AnimatePresence>
      </div>
    </ErrorBoundary>
  )
}

export default SafeAnimatePresence 