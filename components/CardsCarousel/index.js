require('./styles.less')

import Icon from '@ant-design/icons'
import { Card, Carousel } from 'antd'
import React from 'react'

import IconArrowLeft from '../../assets/icons/arrow-left.svg'
import IconArrowRight from '../../assets/icons/arrow-right.svg'

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
          {icon && icon.url && <img alt="symbol" src={icon.url} />}
        </div>
      </Card>
    </div>
  )
}

const CardsCarousel = (props) => {
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
        {props.actions &&
          props.actions.map((action, i) => {
            return (
              <a key={`slider-${i}`}>
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
    </div>
  )
}

export default CardsCarousel
