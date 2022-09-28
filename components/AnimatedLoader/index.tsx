import { Spin } from 'antd'
import { SpinClassProps } from 'antd/lib/spin'
import classNames from 'classnames'
import { motion } from 'framer-motion'

import styles from './styles.module.less'

const variants = () => ({
  animate: {
    pathLength: 0,
    stroke: '#6a1246', // wine
    strokeWidth: 1,
  },
  initial: {
    pathLength: 1,
    stroke: '#042b4f', // blue
    strokeWidth: 1.5,
  },
})

const LayerSpinner = () => {
  const transition = { duration: 2, ease: 'easeInOut', yoyo: Infinity }
  const pathVariants = variants()

  return (
    <svg height="72" viewBox="0 0 44 36" width="88">
      <title>layers</title>
      <motion.polyline
        animate="animate"
        fill="none"
        initial="initial"
        points="38.021 23.008 43 25 21 35 1 27 10.362 22.745 21 27 43 17 33.638 13.255 21 19 1 11 23 1 43 9 38.396 11.093"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        transition={transition}
        variants={pathVariants}
      />
    </svg>
  )
}

interface AnimatedLoaderProps {
  additionalSpinnerProps?: SpinClassProps
  className?: string
  label?: string
  title?: string
}

export const AnimatedLoader = ({
  additionalSpinnerProps,
  className,
  label,
  title,
}: AnimatedLoaderProps) => {
  return (
    <div
      className={classNames(styles['animated-loader'], 'centered', className)}
    >
      <div className="wrapper">
        <Spin indicator={<LayerSpinner />} {...additionalSpinnerProps} />
        {title && <div className="title">{title}</div>}
        {label && <div className="label">{label}</div>}
      </div>
    </div>
  )
}
