import React, { useState } from 'react'
import { Button, Row, Col, Select } from 'antd'
import { navigate } from 'gatsby'
import { defaultLangKey } from '../../../data/languages'
import { getCountryDetails } from '../../../utils'
import './styles.less'
const { Option } = Select

const LanguageSelector = props => {
  const [selectedLang, selectLang] = useState('')
  const langDetails = getCountryDetails(props.langs)
  const activeLang = props.activeLang
  return (
    <div className={`language-selector`}>
      <div className="container">
        <Row>
          <Col xs={24}>
            <div className="text">
              Looks like you are in a different country, choose
            </div>
            <Select
              defaultValue={
                props.langs.indexOf(activeLang) > -1 ? activeLang : 'en-US'
              }
              onChange={val => selectLang(val)}
              dropdownClassName={'language-selector-option'}
            >
              {langDetails.map(lang => (
                <Option value={lang.code} key={lang.code}>
                  <img
                    style={{ marginRight: '10px' }}
                    alt={lang.name}
                    src={`/img/${lang.icon}.svg`}
                  />
                  {lang.name}
                </Option>
              ))}
            </Select>
            <Button
              onClick={() => {
                window.localStorage.setItem('hasBeenHere', true)
                let baseUrl = selectedLang
                if (defaultLangKey === selectedLang) {
                  baseUrl = '/'
                }
                navigate(`/${baseUrl}`)
              }}
            >
              Continue
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default LanguageSelector
