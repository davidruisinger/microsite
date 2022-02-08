import React, { useState } from "react";
import { Carousel, Modal, Card, Row, Col } from "antd";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import "./styles.less";
import { richTextOptions } from "../../utils/richTextOptions";
import Icon from "@ant-design/icons";
import IconArrowRight from "../../assets/icons/arrow-right.svg";
import IconArrowLeft from "../../assets/icons/arrow-left.svg";

const MODAL_CONTENT_STRUCTURE = {
  header: "-",
  explanation: { raw: null },
};

const NextArrow = ({ className, onClick }) => {
  const isDisabled = className.indexOf("slick-disabled") > -1;
  return (
    <div
      className={`${isDisabled ? "disabled" : ""} arrow next`}
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex="0"
    >
      <Icon component={IconArrowRight} />
    </div>
  );
};

const PrevArrow = ({ className, onClick }) => {
  const isDisabled = className.indexOf("slick-disabled") > -1;
  return (
    <div
      className={`${isDisabled ? "disabled" : ""} arrow prev`}
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex="0"
    >
      <Icon component={IconArrowLeft} />
    </div>
  );
};

const SliderCard = ({ title, supertext, icon, opacity }) => {
  return (
    <div className="slider-card">
      <Card>
        <div className="inner">
          <div className="wrapper">
            <div className="super-text">{supertext}</div>
            <h3>{title}</h3>
          </div>
          <img alt="symbol" src={icon && icon.file.url} />
        </div>
      </Card>
    </div>
  );
};

const CardsCarousel = (props) => {
  const [modalContent, setModalContent] = useState(MODAL_CONTENT_STRUCTURE);
  const [modalVisible, setModalVisible] = useState(false);
  const hideModal = () => setModalVisible(false);
  const showModal = (key) => {
    const item = props.actionsContent.list[key];
    setModalContent({
      header: item.title,
      icon: item.icon,
      explanation: item.explanation,
    });
    setModalVisible(true);
  };

  return (
    <div className="cards-carousel">
      <Carousel
        arrows={true}
        dots={false}
        swipeToSlide={true}
        infinite={false}
        slidesToShow={3}
        variableWidth={true}
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
      >
        {props.actionsContent &&
          props.actionsContent.list.map((action, i) => {
            return (
              <a onClick={() => showModal(i)} key={`slider-${i}`}>
                <SliderCard
                  opacity={1}
                  title={action.title}
                  supertext={"Recommended"}
                  icon={action.icon}
                />
              </a>
            );
          })}
      </Carousel>
      <Modal
        wrapClassName="modal-xl"
        onOk={hideModal}
        onCancel={hideModal}
        visible={modalVisible}
        footer={null}
      >
        <Row>
          <Col xs={24} md={9}>
            <header>
              <h4>Recommended Action</h4>
              <h3>{modalContent.header}</h3>
            </header>
          </Col>
          <Col xs={24} md={15}>
            <article>
              {modalContent.explanation &&
                renderRichText(modalContent.explanation, richTextOptions)}
            </article>
          </Col>{" "}
        </Row>
      </Modal>
    </div>
  );
};

export default CardsCarousel;
