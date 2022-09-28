import { FilterOutlined } from '@ant-design/icons'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { Button, Form, Popover, Select } from 'antd'

import { useBlockById } from '../../hooks'
import { scrollToId } from '../SectionWrapper'
import styles from './styles.module.less'

interface PopoverFilterProps {
  activeRootCategories: string[]
  rootCategories: {
    id: string
    name: string
  }[]
  setActiveRootCategories: (keys: string[]) => void
}

export const PopoverFilter = ({
  activeRootCategories,
  rootCategories,
  setActiveRootCategories,
}: PopoverFilterProps) => {
  const t = {
    filterLabel: useBlockById('profile.filter.bycategory'),
  }

  const handleIconClick = () => {
    scrollToId('framework')
  }

  return (
    <Popover
      content={
        <Form className={styles['category-filter']} layout="vertical">
          <Form.Item
            label={
              <span>
                {t.filterLabel}{' '}
                <QuestionCircleOutlined onClick={handleIconClick} />
              </span>
            }
          >
            <Select
              mode="multiple"
              onChange={setActiveRootCategories}
              placeholder="Select..."
              style={{ width: '220px' }}
              value={activeRootCategories}
            >
              {rootCategories.map((c) => (
                <Select.Option key={c.id}>{c.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      }
      placement="left"
    >
      <Button icon={<FilterOutlined />} size="small" />
    </Popover>
  )
}
