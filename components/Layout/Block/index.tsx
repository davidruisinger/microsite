import classNames from 'classnames'

import styles from './styles.module.less'

interface BlockProps {
  actions?: React.ReactNode[]
  layout?: 'default' | 'center'
  containerWidth?: 'default' | 'mini'
  title?: string
  text?: string
}

export const Block = ({
  actions,
  containerWidth,
  layout,
  text,
  title,
}: BlockProps) => {
  return (
    <div
      className={classNames(
        'block',
        styles['block'],
        `layout-${layout}`,
        `container-${containerWidth}`
      )}
    >
      <div className="container">
        {title && <div className="title">{title}</div>}
        {text && <div className="description">{text}</div>}
        <div className="actions">{actions?.map((action) => action)}</div>
      </div>
    </div>
  )
}
