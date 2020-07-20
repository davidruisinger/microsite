import React from "react";

const ContainerFluid = ({ style, className, children }) => {
  const containerClass = className
    ? `container-fluid ${className}`
    : "container-fluid";
  return (
    <div className={containerClass} style={style}>
      {children}
    </div>
  );
};

export default ContainerFluid;
