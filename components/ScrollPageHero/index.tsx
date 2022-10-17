import { ArrowRightOutlined } from '@ant-design/icons'
import { Avatar, Badge, Button, Popover, Space } from 'antd'

import { useBlockById } from '../../hooks'
import { CounterStatsResultFragment } from '../../services/lfca-backend/api/generated'
import { scrollToId } from '../SectionWrapper'
import styles from './styles.module.less'
interface ScrollPageHeroProps {
  companyName?: string | null
  stats: CounterStatsResultFragment
}

export const ScrollPageHero = ({ companyName, stats }: ScrollPageHeroProps) => {
  const t = {
    buttonPrimary: useBlockById('hero.button.primary'),
    subtitle: useBlockById('hero.subtitle', { company: companyName || '-' }),
    title: useBlockById('hero.title', { company: companyName || '-' }, true),
  }

  return (
    <div className={styles['page-hero']}>
      <div className="content container">
        <h1 dangerouslySetInnerHTML={{ __html: t.title }} />
        <h2>{t.subtitle}</h2>
        <Space size="large">
          <Button
            onClick={() => scrollToId('profile')}
            size="large"
            type="primary"
          >
            {t.buttonPrimary} <ArrowRightOutlined />
          </Button>
          <Popover content="Join a community of industry leaders">
            <a href={'https://lfca.earth'}>
              <Badge
                count={stats.companyCount}
                overflowCount={stats.companyCount - 1}
              >
                <Avatar.Group>
                  <Avatar
                    alt="canva-logo"
                    size={48}
                    src={
                      'https://images.ctfassets.net/btqy35w0l487/1Jl1g6HGomdMS0Mtf8mMIi/52daf0c82d0a68726f720d3680b2201d/canva__1_.png'
                    }
                  />
                  <Avatar
                    alt="spotify-logo"
                    size={48}
                    src={
                      'https://images.ctfassets.net/btqy35w0l487/3pATod6omMMEj2OgVWpEIm/debf024cc18fb06e728cfaf08296bef1/spotify__1_.png'
                    }
                  />
                  <Avatar
                    alt="personio-logo"
                    size={48}
                    src={
                      'https://images.ctfassets.net/btqy35w0l487/6Va85OozMjKZcEB7y5P2tD/aa230c0d3e27a84af982af2222204838/personio__1_.png'
                    }
                  />
                </Avatar.Group>
              </Badge>
            </a>
          </Popover>
        </Space>
      </div>
    </div>
  )
}
