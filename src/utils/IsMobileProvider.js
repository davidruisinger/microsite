import React, { createContext, useContext, useState, useEffect } from "react";
import { TABLET_BREAKPOINT } from "./";

export const IsMobileCtx = createContext(null);

const IsMobileProvider = ({ children }) => {
  const windowDefined = typeof window !== "undefined";

  const windowIsMobile = windowDefined
    ? window.innerWidth < TABLET_BREAKPOINT
    : true;

  const [isMobile, setIsMobile] = useState(windowDefined && windowIsMobile);

  const listener = () => {
    const windowIsMobile = windowDefined
      ? window.innerWidth < TABLET_BREAKPOINT
      : true;
    setIsMobile(windowDefined && windowIsMobile);
  };

  useEffect(() => {
    windowDefined && window.addEventListener("resize", listener);
    return () => {
      windowDefined && window.removeEventListener("resize", listener);
    };
  }, []);

  return (
    <IsMobileCtx.Provider value={isMobile}>{children}</IsMobileCtx.Provider>
  );
};

export default IsMobileProvider;
export const useIsMobile = () => useContext(IsMobileCtx);
