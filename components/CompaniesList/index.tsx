import { List } from 'antd'

import { CompanyListItemFragment } from '../../services/lfca-backend/api/generated'
import { CompanyItem } from './CompanyItem'
import styles from './styles.module.less'

interface CompaniesListProps {
  companies: CompanyListItemFragment[]
}

export const CompaniesList = ({ companies }: CompaniesListProps) => {
  return (
    <List
      className={styles['companies-list']}
      dataSource={companies}
      grid={{
        gutter: 16,
        lg: 3,
        md: 2,
        sm: 1,
        xl: 4,
        xs: 1,
        xxl: 4,
      }}
      pagination={{ pageSize: 100 }}
      renderItem={(company) => <CompanyItem company={company} />}
    />
  )
}
