import classNames from 'classnames'

import styles from './styles.module.less'

export const StaticNavContainer = ({
  children,
  type = 'absolute',
}: {
  children: React.ReactNode
  type?: 'fixed' | 'absolute'
}) => {
  return (
    <div
      className={classNames('container', styles['static-nav-container'], type)}
    >
      {children}
    </div>
  )
}
