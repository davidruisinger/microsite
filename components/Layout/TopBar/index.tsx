import { useBlockById } from '../../../hooks'
import styles from './styles.module.less'

export const TopBar = () => {
  const t = {
    title: useBlockById('topbar.title'),
  }
  return (
    <div className={styles['top-bar']}>
      <div className="marquee-wrapper">
        {Array.from(Array(10).keys()).map((_, i) => (
          <div className="marquee-element" key={i}>
            <a href={`https://lfca.earth`} rel="noreferrer" target="_blank">
              {t.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
