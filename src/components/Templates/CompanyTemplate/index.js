import React from "react"
import { Container, ContainerFluid } from "../../Helpers/Container"
import HeroCompany from "../../HeroCompany"
import StackedContent from "../../Helpers/ContentBlocks/StackedContent"
import FactsImage from "../../Helpers/ContentBlocks/FactsImage"
import ShareButtons from "../../Helpers/ShareButtons"
import GreenMoney from "../../Tools/GreenMoney"
import CarbonCalculator from "../../Tools/CarbonCalculator"
import StandUp from "../../Tools/StandUp"
import { Row, Col, Tabs, Button } from "antd"

const { TabPane } = Tabs

const CONTENT_BLOCKS = [
  {
    title: "Unsere Reicheweite nutzen",
    short_text:
      "Digitale Unternehmen erreichen oft mit kleinen Teams Millionen Menschen und haben damit eine Chance Bürgerinnen und Bürger für das Thema Klimaschutz zu sensibilisieren.",
  },
  {
    title: "Selbst Vorbild sein",
    short_text:
      "Der Wandel beginnt bei uns selbst: deswegen muss jedes Mitglied unserer Organisation zuerst den eigenen CO₂-Fußabdruck messen, reduzieren und kompensieren. Das schafft Bewusstsein für das Thema.",
  },
  {
    title: "Mit der Politik reden",
    short_text:
      "Wir sprechen mit Vertretern aus Politik und Wirtschaft und versuchen unser eigenes Netzwerk zu nutzen, um diejenigen zu überzeugen, die an den Hebeln der Macht sitzen.",
  },
]

class CompanyTemplate extends React.Component {
  render() {
    return (
      <div className="company-page">
        <HeroCompany
          title={
            <div>
              {`${this.props.company.name} arbeitet aktiv an der Reduktion seiner CO₂-Emissionen. Und `}
              <span className="underline">Du</span>?
            </div>
          }
          description={`${this.props.company.name} und viele weitere Unternehmen haben sich zu einer Initiative im Kampf gegen den Klimawandel zusammengeschlossen. Sie reduzieren ihre Emissionen und fordern dich auf mitzumachen!`}
          company={this.props.company}
        />
        {this.props.company.about && this.props.company.about.length > 1 && (
          <div id="company-more">
            <ContainerFluid>
              <div className="container more">
                <h1>{`Was ${this.props.company.name} unternimmt`}</h1>
                <div className="text-wrapper">{this.props.company.about}</div>
                {/* <a href="">
                <Button size="large" type="link" ghost>
                  Erfahre mehr
                </Button>
              </a> */}
                {/* <div className="background">
                  <img
                    alt="tree"
                    className="tree"
                    src="/img/bg_footprint.svg"
                  />
                </div> */}
              </div>
            </ContainerFluid>
          </div>
        )}

        <div id="actnow">
          <ContainerFluid className="brown">
            {/* <Container> */}
            <Row>
              <Col className="section-heading">
                <h2>Finde heraus, was Du beitragen kannst!</h2>
              </Col>
            </Row>

            <Tabs className="actions-tabs" defaultActiveKey="1">
              <TabPane tab={<span>CO₂ Fußabdruck berechnen</span>} key="1">
                <CarbonCalculator />
              </TabPane>
              <TabPane tab={<span>"Grüne" Finanzen</span>} key="2">
                <GreenMoney />
              </TabPane>
              <TabPane tab={<span>Steh auf!</span>} key="3">
                <StandUp />
              </TabPane>
            </Tabs>
          </ContainerFluid>
        </div>

        <div id="why" className="light-grey">
          <ContainerFluid id="why" className="white">
            <Container>
              <FactsImage
                image={"/img/graph_ice.png"}
                title="Klimawandel? Sind doch nur ein paar Grad oder?"
                text="Klima ist nicht gleich Wetter. 1 Grad Erderwärmung bedeuten gravierende Änderungen für das Leben auf diesem Planeten, insbesondere wenn diese Erwärmung so plötzlich stattfindet. Die wenigsten Menschen wissen: Die Erwärmung von der letzten Eiszeit bis zur heutigen Warmperiode betrug lediglich 3.5 Grad und die Atmosphäre benötigte >10.000 Jahre, um diese Veränderungen durchzumachen. Heute sind wir auf dem besten Weg zu 4 Grad Erwärmung in nur 2 Jahrhunderten!"
              />
            </Container>
          </ContainerFluid>
        </div>

        <div id="about">
          <ContainerFluid className="light-grey">
            <Container>
              <StackedContent
                contentBlocks={CONTENT_BLOCKS}
                title={
                  "Als Unternehmen sind wir weit davon entfernt alles richtig zu machen. Aber wir sind auf dem Weg"
                }
                button={{
                  location: "/",
                  text: "Zur Website",
                  linkType: "internal",
                }}
                text={""}
              />
            </Container>
          </ContainerFluid>
        </div>

        <div id="share">
          <ContainerFluid className="white">
            <Container>
              <ShareButtons />
            </Container>
          </ContainerFluid>
        </div>
        <Container></Container>
      </div>
    )
  }
}

export default CompanyTemplate
