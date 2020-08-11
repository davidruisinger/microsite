import React, { useState } from "react";
import { Carousel, Modal, Card, Button, Row, Col } from "antd";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import "./styles.less";
import { richTextOptions } from "../../utils/richTextOptions";
import Icon from "@ant-design/icons";
import IconArrowRight from "../../assets/icons/arrow-right.svg";
import IconArrowLeft from "../../assets/icons/arrow-left.svg";

const MODAL_CONTENT_STRUCTURE = { header: "-", body: "-" };

const NextArrow = ({ className, style, onClick }) => {
  const isDisabled = className.indexOf("slick-disabled") > -1;
  return (
    <div
      className={`${isDisabled ? "disabled" : ""} arrow next`}
      onClick={onClick}
    >
      <Icon component={IconArrowRight} />
    </div>
  );
};

const PrevArrow = ({ className, style, onClick }) => {
  const isDisabled = className.indexOf("slick-disabled") > -1;
  return (
    <div
      className={`${isDisabled ? "disabled" : ""} arrow prev`}
      onClick={onClick}
    >
      <Icon component={IconArrowLeft} />
    </div>
  );
};

const SliderCard = ({ title, supertext, icon, opacity }) => {
  return (
    <div className="slider-card">
      <Card style={{ background: `rgba(9,37,61,${opacity})` }}>
        <div className="inner">
          <div className="wrapper">
            <div className="super-text">{supertext}</div>
            <h3>{title}</h3>
          </div>
          <img src={icon && icon.file.url} />
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
      body: item.shortDescription,
      explanation: item.explanation && item.explanation.json,
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
          props.actionsContent.list.map((action, i) => (
            <a onClick={() => showModal(i)} key={`slider-${i}`}>
              <SliderCard
                opacity={1 - 1 / (10 / (i + 1))}
                title={action.title}
                supertext={"Recommended"}
                icon={action.icon}
              />
            </a>
          ))}
      </Carousel>
      <Modal
        wrapClassName="modal-xl"
        onOk={hideModal}
        onCancel={hideModal}
        visible={modalVisible}
        footer={
          <Button block type="primary" size="large" onClick={hideModal}>
            Close
          </Button>
        }
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
              {/* <p>{modalContent.body}</p> */}
              {documentToReactComponents(
                modalContent.explanation,
                richTextOptions
              )}
            </article>
          </Col>{" "}
        </Row>
      </Modal>
    </div>
  );
};

export default CardsCarousel;
