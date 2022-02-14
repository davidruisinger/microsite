require('./styles.less')

import Icon from '@ant-design/icons'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { Card, Carousel, Col, Modal, Row } from 'antd'
import React, { useState } from 'react'

import IconArrowLeft from '../../assets/icons/arrow-left.svg'
import IconArrowRight from '../../assets/icons/arrow-right.svg'
import { richTextOptions } from '../../utils/richTextOptions'

const MODAL_CONTENT_STRUCTURE = {
  explanation: { raw: null },
  header: '-',
}

const NextArrow = ({ className, onClick }) => {
  const isDisabled = className.indexOf('slick-disabled') > -1
  return (
    <div
      className={`${isDisabled ? 'disabled' : ''} arrow next`}
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex="0"
    >
      <Icon component={IconArrowRight} />
    </div>
  )
}

const PrevArrow = ({ className, onClick }) => {
  const isDisabled = className.indexOf('slick-disabled') > -1
  return (
    <div
      className={`${isDisabled ? 'disabled' : ''} arrow prev`}
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex="0"
    >
      <Icon component={IconArrowLeft} />
    </div>
  )
}

const SliderCard = ({ icon, opacity, supertext, title }) => {
  return (
    <div className="slider-card">
      <Card>
        <div className="inner">
          <div className="wrapper">
            <div className="super-text">{supertext}</div>
            <h3>{title}</h3>
          </div>
          <img alt="symbol" src={icon && icon.url} />
        </div>
      </Card>
    </div>
  )
}

const CardsCarousel = (props) => {
  const [modalContent, setModalContent] = useState(MODAL_CONTENT_STRUCTURE)
  const [modalVisible, setModalVisible] = useState(false)
  const hideModal = () => setModalVisible(false)
  const showModal = (key) => {
    const item = props.actionsContent.list[key]
    setModalContent({
      explanation: item.explanation,
      header: item.title,
      icon: item.icon,
    })
    setModalVisible(true)
  }

  return (
    <div className="cards-carousel">
      <Carousel
        arrows={true}
        dots={false}
        infinite={false}
        nextArrow={<NextArrow />}
        prevArrow={<PrevArrow />}
        responsive={[
          {
            breakpoint: 1024,
            settings: {
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToScroll: 1,
            },
          },
        ]}
        slidesToShow={3}
        swipeToSlide={true}
        variableWidth={true}
      >
        {props.actionsContent &&
          props.actionsContent.list.map((action, i) => {
            return (
              <a key={`slider-${i}`} onClick={() => showModal(i)}>
                <SliderCard
                  icon={action.icon}
                  opacity={1}
                  supertext={'Recommended'}
                  title={action.title}
                />
              </a>
            )
          })}
      </Carousel>
      <Modal
        footer={null}
        onCancel={hideModal}
        onOk={hideModal}
        visible={modalVisible}
        wrapClassName="modal-xl"
      >
        <Row>
          <Col md={9} xs={24}>
            <header>
              <h4>Recommended Action</h4>
              <h3>{modalContent.header}</h3>
            </header>
          </Col>
          <Col md={15} xs={24}>
            <article>
              {modalContent.explanation && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: documentToHtmlString(
                      modalContent.explanation.json,
                      richTextOptions
                    ),
                  }}
                />
              )}
            </article>
          </Col>{' '}
        </Row>
      </Modal>
    </div>
  )
}

export default CardsCarousel
