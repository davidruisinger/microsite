require('./styles.less')

import Icon, { InfoCircleOutlined } from '@ant-design/icons'
import { Button, Collapse, Popover, Row } from 'antd'
import React, { useState } from 'react'
import { Link as ScrollLink } from 'react-scroll'

import IconCheckSmall from '../../assets/icons/check-single.svg'
import IconDown from '../../assets/icons/ctrl-down.svg'
import { useTranslation } from '../../hooks/useTranslation'

const { Panel } = Collapse

const InfoBox = ({ actions, logo, name }) => {
  const [showMore, setShowMore] = useState(false)
  const useShowMore = actions.length > 5
  const collapseStyle = useShowMore
    ? showMore
      ? { maxHeight: 'none', paddingBottom: '40px' }
      : { maxHeight: '280px' }
    : {}

  const buttonShowLess = useTranslation('infobox.button.showless')
  const buttonShowMore = useTranslation('infobox.button.showmore')
  const label = useTranslation('infobox.label')
  const moreLink = useTranslation('infobox.more.link')
  const moreText = useTranslation('infobox.more.text')
  const popoverContent = useTranslation('infobox.popover.content')
  const popoverElement = useTranslation('infobox.popover.element')
  const popoverTitle = useTranslation('infobox.popover.title')

  return (
    <div className="info-box">
      <Row className="wrapper">
        <div className="label">{label}</div>
        <div className="left-box">
          <h4>{name}</h4>
          <div className="link">
            Info <InfoCircleOutlined />
          </div>
        </div>
        <div className="right-box">
          <div className="img-wrapper">
            <img src={logo} />
          </div>
        </div>
      </Row>
      <Collapse
        accordion
        bordered={false}
        expandIcon={({ isActive }) => (
          <Icon component={IconDown} rotate={isActive ? 180 : 0} />
        )}
        expandIconPosition="right"
        style={collapseStyle}
      >
        {actions &&
          actions.map((action, i) => {
            return (
              <Panel
                className="actions-container"
                header={
                  <span className="action">
                    <div className="icon">
                      <Icon component={IconCheckSmall} />
                    </div>
                    <div className="inline">{action.title}</div>
                  </span>
                }
                key={i}
              >
                {action.about && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: action.about.childMarkdownRemark.html,
                    }}
                  />
                )}
                <Popover
                  content={popoverContent}
                  overlayClassName="simple-popover"
                  placement="left"
                  title={popoverTitle}
                >
                  <h5>{popoverElement} </h5>
                </Popover>
                <ul className="green-list">
                  {action.requirements &&
                    action.requirements.map((requirement, i) => (
                      <li key={`list-${i}`}>{requirement.title}</li>
                    ))}
                </ul>
                {moreText}{' '}
                <ScrollLink smooth to={'initiative'}>
                  {moreLink}
                </ScrollLink>
                .
              </Panel>
            )
          })}
        {useShowMore && (
          <div className="show-more">
            <Button ghost onClick={() => setShowMore(!showMore)} size="small">
              {showMore ? buttonShowLess : buttonShowMore}
            </Button>
          </div>
        )}
      </Collapse>
    </div>
  )
}

export default InfoBox
