import React, { createContext, useContext, useState, useEffect } from 'react'
import { TABLET_BREAKPOINT } from './'

export const IsMobileCtx = createContext(null)

const IsMobileProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' && window.innerWidth < TABLET_BREAKPOINT
  )

  const listener = () => {
    setIsMobile(
      typeof window !== 'undefined' && window.innerWidth < TABLET_BREAKPOINT
    )
  }

  useEffect(() => {
    typeof window !== 'undefined' && window.addEventListener('resize', listener)
    return () => {
      typeof window !== 'undefined' &&
        window.removeEventListener('resize', listener)
    }
  }, [])

  return (
    <IsMobileCtx.Provider value={isMobile}>{children}</IsMobileCtx.Provider>
  )
}

export default IsMobileProvider
export const useIsMobile = () => useContext(IsMobileCtx)
