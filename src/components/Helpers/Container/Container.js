import React from 'react'

const Container = (props) => {
  const containerClass = props.className ? `container ${props.className}` : 'container'
  return (
    <div
      className={`${containerClass}`}
      style={props.style}
    >
      {props.children}
    </div>
  )
}

export default Container
