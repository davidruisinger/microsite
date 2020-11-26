import React, { createContext, useContext, useState, useEffect } from "react";
import { TABLET_BREAKPOINT, isBrowser } from "./";

export const IsMobileCtx = createContext(null);

const IsMobileProvider = ({ children }) => {
  const windowIsMobile = isBrowser()
    ? window.innerWidth < TABLET_BREAKPOINT
    : true;

  const [isMobile, setIsMobile] = useState(isBrowser() && windowIsMobile);

  useEffect(() => {
    const listener = () => {
      const windowIsMobile = isBrowser()
        ? window.innerWidth < TABLET_BREAKPOINT
        : true;
      setIsMobile(isBrowser() && windowIsMobile);
    };
    isBrowser() && window.addEventListener("resize", listener);
    return () => {
      isBrowser() && window.removeEventListener("resize", listener);
    };
  }, []);

  return (
    <IsMobileCtx.Provider value={isMobile}>{children}</IsMobileCtx.Provider>
  );
};

export default IsMobileProvider;
export const useIsMobile = () => useContext(IsMobileCtx);
