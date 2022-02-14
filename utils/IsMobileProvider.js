import React, { createContext, useContext, useEffect, useState } from 'react'

import { isBrowser, TABLET_BREAKPOINT } from './'

export const IsMobileCtx = createContext(null)

const IsMobileProvider = ({ children }) => {
  const windowIsMobile = isBrowser()
    ? window.innerWidth < TABLET_BREAKPOINT
    : true

  const [isMobile, setIsMobile] = useState(isBrowser() && windowIsMobile)

  useEffect(() => {
    const listener = () => {
      const windowIsMobile = isBrowser()
        ? window.innerWidth < TABLET_BREAKPOINT
        : true
      setIsMobile(isBrowser() && windowIsMobile)
    }
    isBrowser() && window.addEventListener('resize', listener)
    return () => {
      isBrowser() && window.removeEventListener('resize', listener)
    }
  }, [])

  return (
    <IsMobileCtx.Provider value={isMobile}>{children}</IsMobileCtx.Provider>
  )
}

export default IsMobileProvider
export const useIsMobile = () => useContext(IsMobileCtx)
