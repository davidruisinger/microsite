import React from "react"
import "./styles.less"
import { Container } from "../Helpers/Container"
import CustomLink from "../Helpers/CustomLink"
import ClimateCard from "./ClimateCard"
import { Col, Row, Icon, Button, Modal } from "antd"

class HeroCompany extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      modalText: "",
      modalTitle: ""
    }
  }

  showModal = e => {
    switch (e.target.value) {
      case "company":
        this.setState({
          modalText: `Als Teil der Leaders for Climate Action berechnet ${this.props.company.name} ihren CO₂ Fußabdruck, setzt sich Reduktionsziele und kompensiert die verbliebenen Tonnen.`,
          modalTitle: "Über die Maßnahmen"
        })
        break
      case "footprint":
        this.setState({
          modalText: `Die CO₂-Emissionen eines Unternehmens oder einer Person werden auch als CO₂-Fußabdruck bezeichnet. Der Fußabdruck umfasst alle direkten und indirekten Emissionen, die ein Unternehmen verursacht. Dazu gehören auch die Anfahrtswege der Mitarbeiter oder die Geschäftsreisen des Personals. ${this.props.company.name} hat seinen CO₂-Fußabdruck Ende 2019 zuletzt berechnet. Alle ${this.props.company.footprint} t wurden kompensiert und der äquivalente Betrag in Klimaschutzprojekte investiert. Kompensation ist allerdings nur der erste von vielen wichtigen Schritten auf dem Weg in eine klimaneutrale Zukunft.`,
          modalTitle: `Was bedeutet "CO₂-Emissionen"?`
        })
        break
      case "compensation":
        this.setState({
          modalText: `<p>CO₂-Kompensation ist ein Instrument zum Klimaschutz, bei dem der verursachte Treibhausgas-Ausstoß, durch Speicherung in Kohlenstoffsenken und Einsparungsmaßnahmen an anderer Stelle ausgeglichen wird. An welchem Standort die Einsparung der Emissionen erfolgt ist dabei irrelevant. Beispiele für Kompensationsprojekte sind Aufforstungsarbeiten in Regenwäldern, Moorschutz und die Einführung effizienter Technologien in Entwicklungsländern. Der gesamte TreibhausgasAusstoß bei einer CO2 verursachenden, aber kompensierten Aktivität, liegt also theoretisch bei netto null.</p>
            <h3>Wie funktioniert CO₂-Kompensation?</h3>
            <p>Im ersten Schritt müssen jährliche (oder einmalige) CO₂-Emission berechnet werden. Anschließend investiert das Unternehmen den äquivalenten Betrag seiner Emissionen in ein
            Klimaschutzprojekt. </p>
            <h3>"Klimaneutral" ist nicht genug!</h3>
            <p>Das alles klingt schön und gut aber die Kompensation von Emissionen ist nicht genug! Wir brauchen Reduktion, politische Maßnahmen wie einen CO₂ Preis und neue Technologien, um den Klimwandel in Grenzen zu halten.</p>
            `,
          modalTitle: `Was heißt "klimaneutral"?`
        })
        break
      case "reduction":
        this.setState({
          modalText:
            "Hat ein Unternehmen erstmal seine aktuellen CO₂-Emissionen festgestellt, geht es ans Eingemachte. Wie können effektiv Emissionen reduziert werden? Oft sind die größten Hebel eine veränderte Reisepolicy, aus der Inlandsflüge gestrichen werden, Ökostrom im Großraumbüro oder ähnliches. Sind die Maßnahmen beschlossen, wird das Reduktionsziel ausgegeben.",
          modalTitle: "Über die Reduktionsziele"
        })
        break
      case "scope":
        this.setState({
          modalText: `<p>Uns ist es wichtig, dass die Unternehmen in unserem Netzwerk verstehen, dass Sie mehr tun sollten, als nur ihre Emissionen zu messen und zu kompensieren.</p>
          <h3>Leuchtturmprojekt</h3> 
          <p>Von daher unterstützen wir Unternehmen dabei einen Schritt weiter zu gehen. Das kann z.B. die Nachverfolgung von Emissionen entlang der gesamten Lieferkette sein o.ä.</p>
          <h3>Erfahre mehr</h3> 
          <p>${this.props.company.name} hat ${
            this.props.company.companyPledge === 2
              ? "noch kein Leuchtturmprojekt umgesetzt."
              : 'bereits ein Leuchtturmprojekt umgesetzt. Klick auf "Erfahre mehr", um Einzelheiten zu sehen!'
          }</p>`,
          modalTitle: `Was bedeutet "Leuchtturmprojekt?"`
        })
        break
      case "more":
        this.setState({
          modalText: `${this.props.company.about}`,
          modalTitle: `Was ${this.props.company.name} noch unternimmt`
        })
        break
      default:
        break
    }
    this.setState({
      visible: true
    })
  }

  handleOk = e => {
    this.setState({
      visible: false
    })
  }

  handleCancel = e => {
    this.setState({
      visible: false
    })
  }

  render() {
    const hasImage = this.props.company.bgImageUrl
    return (
      <div className="hero-company">
        <Container>
          <div className="background">
            <img alt="spiral" className="spiral" src="/img/bg_spiral.svg" />
            {/* <img alt="tree" className="tree" src="/img/bg_footprint.svg" /> */}
            {/* <img alt="rain" className="rain" src="/img/bg_raim.svg" /> */}
          </div>
          <Row type="flex" className="flex-wrapper">
            <Col xs={24} md={15} className="header container-left">
              <div>
                <div>
                  <h1>{this.props.title}</h1>
                </div>

                <p>{this.props.description}</p>
                <CustomLink
                  location={
                    typeof window !== "undefined" &&
                    `${window.location.pathname}/#actnow`
                  }
                  linkType={"internal"}
                >
                  <Button size="large" type="primary">
                    Jetzt aktiv werden
                  </Button>
                </CustomLink>
              </div>
            </Col>
            <Col
              style={{ alignSelf: "flex-end" }}
              className="data-section container-right"
              xs={24}
              md={9}
            >
              <div className="video-wrapper">
                <div className="overlay" />
                {hasImage ? (
                  <div
                    className="bg-image"
                    style={{
                      backgroundImage: `url(${this.props.company.bgImageUrl})`
                    }}
                  />
                ) : (
                  <div
                    className="bg-image"
                    style={{ backgroundImage: `url('/img/bg.jpg')` }}
                  />
                )}

                <div>
                  <div className="data-wrapper">
                    <Row>
                      <p
                        style={{
                          fontSize: "18px",
                          color: "white",
                          zIndex: "5",
                          position: "relative"
                        }}
                      >{`Was ${this.props.company.name} unternimmt:`}</p>
                      <Col xs={24}>
                        <ClimateCard
                          hover={false}
                          cover={
                            <div className="img-wrapper">
                              <img alt="compay" src={this.props.company.logo} />
                            </div>
                          }
                          avatar={<Icon type="arrow-left" />}
                        />
                      </Col>
                      <Col xs={24}>
                        <ClimateCard
                          hover={true}
                          cover={
                            <div className="wrapper">
                              <h5>CO₂-Emissionen p.a.</h5>
                            </div>
                          }
                          avatar={<Icon type="arrow-left" />}
                          title={
                            this.props.company.footprint > -1
                              ? `${this.props.company.footprint} t`
                              : "NaN"
                          }
                          explanation={
                            <div className="explanation">
                              <Button
                                ghost
                                value={"footprint"}
                                onClick={this.showModal}
                                type="primary"
                              >
                                Was heißt das?
                              </Button>
                            </div>
                          }
                        />
                      </Col>

                      <Col xs={24}>
                        <ClimateCard
                          hover={true}
                          cover={
                            <div className="wrapper">
                              <h5>Ist "klimaneutral"</h5>
                            </div>
                          }
                          avatar={<Icon type="arrow-left" />}
                          title={
                            <div className="wrapper">
                              <h5>ja</h5>
                            </div>
                          }
                          explanation={
                            <div className="explanation">
                              <Button
                                value={"compensation"}
                                onClick={this.showModal}
                                ghost
                                type="primary"
                              >
                                Was heißt das?
                              </Button>
                            </div>
                          }
                        />
                      </Col>

                      <Col xs={24}>
                        <ClimateCard
                          hover={true}
                          cover={
                            <div className="wrapper">
                              <h5>Leuchtturm Projekt</h5>
                            </div>
                          }
                          avatar={<Icon type="arrow-left" />}
                          color={
                            this.props.company.companyPledge === 2
                              ? "#EAD06F"
                              : "#1FAB8A"
                          }
                          explanation={
                            <div className="explanation">
                              <Button
                                value={"scope"}
                                onClick={this.showModal}
                                ghost
                                type="primary"
                              >
                                Was heißt das?
                              </Button>
                            </div>
                          }
                          title={
                            this.props.company.companyPledge === 2
                              ? "nein"
                              : "ja"
                          }
                        />
                      </Col>
                      <Button onClick={this.showModal} value="more" type="link">
                        Erfahre mehr
                      </Button>
                      <Modal
                        className="modal-hero"
                        title={`${this.state.modalTitle}`}
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        cancelButtonProps={{ style: { display: "none" } }}
                      >
                        <p
                          dangerouslySetInnerHTML={{
                            __html: this.state.modalText
                          }}
                        />
                      </Modal>
                    </Row>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default HeroCompany
