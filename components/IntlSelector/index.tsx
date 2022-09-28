import { Form, Select } from 'antd'

import { useLanguages } from '../../hooks'
import { getContentfulAssetUrl } from '../../utils'
import styles from './styles.module.less'

export const IntlSelector = () => {
  const { availableLanguages, selectedLanguage, switchLanguage } =
    useLanguages()

  return (
    <div className={styles['intl-selector']}>
      <Form layout="vertical">
        <Form.Item label="Language">
          <Select
            onChange={(isoCode) => switchLanguage(isoCode)}
            value={selectedLanguage?.isoCode}
          >
            {availableLanguages.map((language) => (
              <Select.Option key={language.isoCode}>
                <div
                  className="intl-icon"
                  style={{
                    backgroundImage: `url(${getContentfulAssetUrl(
                      language.icon
                    )})`,
                  }}
                />
                {language.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </div>
  )
}
