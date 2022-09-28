import { Avatar, Button, Card, List } from 'antd'
import Link from 'next/link'

import { CompanyListItemFragment } from '../../../services/lfca-backend/api/generated'
import styles from './styles.module.less'

interface CompanyItemProps {
  company: CompanyListItemFragment
}

export const CompanyItem = ({ company }: CompanyItemProps) => {
  return (
    <List.Item className={styles['company-item']}>
      <Card>
        <Avatar
          alt={company.name || 'logo'}
          shape="square"
          size={60}
          src={company?.logoUrl}
        />
        <div className="content">
          <div className="title">{company.name}</div>
          <Link href={`/e/${company.micrositeSlug}`}>
            <Button size="small">View</Button>
          </Link>
        </div>
      </Card>
    </List.Item>
  )
}
