import styles from './styles.module.less'

interface BlurAlertProps {
  title: string
  description?: string
  icon?: React.ReactNode
  action?: React.ReactNode
}

interface BlurComponentProps {
  blurAlertProps?: BlurAlertProps
  isBlurred: boolean
  children: React.ReactNode
}

const BlurAlert = ({ action, description, icon, title }: BlurAlertProps) => {
  return (
    <div className={styles['blur-alert']}>
      <div className="title">
        {icon && <div className="icon">{icon}</div>}
        {title}
      </div>
      <div className="description">{description}</div>
      <div className="action">{action}</div>
    </div>
  )
}

export const BlurComponent = ({
  blurAlertProps,
  children,
  isBlurred = false,
}: BlurComponentProps) => {
  if (!isBlurred) return <>{children}</>
  return (
    <div className={styles['blur-component']}>
      {blurAlertProps?.title && (
        <div className="blur-alert-wrapper">
          <BlurAlert {...blurAlertProps} />
        </div>
      )}

      <div className="mask" />
      {children}
    </div>
  )
}
