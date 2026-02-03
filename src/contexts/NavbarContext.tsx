import React, { createContext, useContext, useState, ReactNode } from 'react'

interface NavbarContextType {
  isNavbarVisible: boolean
  setNavbarVisible: (visible: boolean) => void
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined)

export const useNavbar = (): NavbarContextType => {
  const context = useContext(NavbarContext)
  if (context === undefined) {
    throw new Error('useNavbar must be used within a NavbarProvider')
  }
  return context
}

interface NavbarProviderProps {
  children: ReactNode
}

export const NavbarProvider: React.FC<NavbarProviderProps> = ({ children }) => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true)

  const setNavbarVisible = (visible: boolean) => {
    setIsNavbarVisible(visible)
  }

  const value: NavbarContextType = {
    isNavbarVisible,
    setNavbarVisible
  }

  return (
    <NavbarContext.Provider value={value}>
      {children}
    </NavbarContext.Provider>
  )
} 