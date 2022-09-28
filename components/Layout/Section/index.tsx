import classNames from 'classnames'

import styles from './styles.module.less'

interface SectionProps {
  children: React.ReactNode
  color?: 'yellow' | 'wine' | 'white' | 'blue' | 'green'
  id?: string
}

export const Section = ({ children, color = 'white', id }: SectionProps) => {
  return (
    <section className={classNames(color, styles['section'])} id={id}>
      {children}
    </section>
  )
}
