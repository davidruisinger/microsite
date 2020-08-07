import React, { useState } from "react";
import { Carousel, Modal, Card, Button } from "antd";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import "./styles.less";
import { richTextOptions } from "../../utils/richTextOptions";

const MODAL_CONTENT_STRUCTURE = { header: "-", body: "-" };

const NextArrow = ({ className, style, onClick }) => (
  <div className="arrow next" onClick={onClick}>
    Next
  </div>
);

const PrevArrow = ({ className, style, onClick }) => (
  <div className="arrow prev" onClick={onClick}>
    Back
  </div>
);

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
                supertext={"Required"}
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
        footer={<Button onClick={hideModal}>Ok</Button>}
      >
        <header>
          <h3>{modalContent.header}</h3>
        </header>
        <article>
          {/* <p>{modalContent.body}</p> */}
          {documentToReactComponents(modalContent.explanation, richTextOptions)}
        </article>
      </Modal>
    </div>
  );
};

export default CardsCarousel;
