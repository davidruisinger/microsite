import React from "react"
import {
  Button,
  Form,
  InputNumber,
  Row,
  Col,
  Tabs,
  Radio,
  Icon,
  Card,
  Select,
  List,
  Avatar,
  Progress
} from "antd"
import "./styles.less"
import { Container } from "../../Helpers/Container/"
import CountUp from "react-countup"
import { isMobile } from "../../../utils"

const { TabPane } = Tabs
const { Option } = Select

const GERMAN_BASE = 720

const DIET_VALUES = {
  normal: 2420,
  vegetarian: 1430,
  flex: 1495,
  vegan: 1160
}

const FLIGHT_VALUES = {
  short: 700,
  long: 2000
}

const CAR_VALUE = 0.0076

// per sq
const HOUSE_VALUE = 48 // kg CO2 per QM

const ELECTRICITY_VALUES = {
  normal: 760, // 1 Person / 1450 kwH / 760 kg CO2
  eco: 5
}

const CONSUMPTION_FACTOR = 9.375

const AVG_FOOTPRINTS = {
  de: 9,
  world: 5
}

const MAP_INITIAL_VALUES = {
  traveler: {
    flightshort: 4,
    flightslong: 3,
    consumption: 600,
    food: "normal",
    car: 10000,
    flatmates: 1,
    flatsize: 130,
    heating: "oil",
    electricity: "normal"
  },
  normal: {
    flightshort: 2,
    flightslong: 1,
    consumption: 300,
    food: "normal",
    car: 5000,
    flatmates: 2,
    flatsize: 100,
    heating: "oil",
    electricity: "normal"
  },
  eco: {
    flightshort: 1,
    flightslong: 0,
    consumption: 200,
    food: "vegan",
    car: 0,
    flatmates: 2,
    flatsize: 85,
    heating: "oil",
    electricity: "eco"
  }
}

const REDUCTION_GUIDE = {
  flights: {
    algorithm: "smaller",
    values: [
      {
        value: 1900, // 700 und 2000 >
        title: "Fliegen: Super Flugverhalten!",
        icon: "global",
        text:
          "Du fliegst selten in den Urlaub und bist auf längeren Strecken emissionsarm unterwegs. Weiter so!"
      },
      {
        value: 3500,
        title: "Fliegen: Schon ganz Okay...",
        icon: "global",
        text:
          "Ab und zu fliegst du noch, vielleicht findest du einige Alternativen? Innerhalb Deutschlands kannst du noch auf Bahnverkehr umsteigen und vielleicht auch nach europäischen Reisezielen für den nächsten Urlaub schauen."
      },
      {
        // value: 1.9,
        title: "Fliegen: Reduziere unbedingt deine Flüge!",
        icon: "global",
        text:
          "Sind so viele Flüge wirklich nötig? Gibt es die Möglichkeit auf Züge umzusteigen oder auf den ein oder anderen Flug zu verzichten? Gerade berufliche Vielflieger haben es da  besonders schwer. Wenn es nicht anders geht, beschäftige dich doch mal mit dem Thema Kompensation. Es ist keine Dauerlösung für alle, aber besser als nichts zu tun."
      }
    ]
  },
  electricity: {
    algorithm: "equals",
    values: [
      {
        value: "eco",
        title: "Strom: Du machst mit Ökostrom bereits alles richtig...",
        icon: "bulb",
        text:
          "Dein Strom kommt aus 100% erneuerbaren Ressourcen? Super, dann machst du bereits hier alles richtig. "
      },
      {
        value: "normal",
        title: "Strom: Wechsle unbedingt zu Ökostrom",
        icon: "bulb",
        text:
          "Der deutsche Strommix besteht zu 60% aus fossilen Energiequellen und Atomkraft. Ein Wechsel zu einem grünen Stromanbieter, wie z.B. Greenpeace Energy, garantiert dir Energie aus 100% erneuerbaren Ressourcen."
      }
    ]
  },
  consumption: {
    algorithm: "smaller",
    values: [
      {
        value: 200,
        title: "Konsum: Sehr gut, hier hast du alles im Griff!",
        icon: "skin",
        text:
          "Dein Konsumverhalten ist bereits stark reduziert und du sparst bereits CO2 und Ressourcen. Hier bist du schon richtig gut."
      },
      {
        value: 400,
        title: "Konsum: Da geht noch was...",
        icon: "skin",
        text:
          "Du achtest auf deine Ausgaben! Sehr gut. Da ist aber noch Luft nach oben. Emissionen stecken in allen Produkten, egal ob Technik, Möbel oder Kleidung. Überlege dir ob du das Produkt wirklich brauchst, oder ob du es dir leihen kannst. Gemeinschaftliche Nutzung ist immer eine ressourcensparende Alternative. "
      },
      {
        // value: 400,
        title: "Konsum: Reduziere jetzt dein Kaufverhalten!",
        icon: "skin",
        text:
          "Besonders dein Konsum emittiert viele Treibhausgase. Viele Produkte findest du gebraucht in tadellosem Zustand. Achte also auf ressourcensparendes Kaufverhalten und auf Qualität. "
      }
    ]
  },
  car: {
    algorithm: "smaller",
    values: [
      {
        value: 500,
        title: "Auto: Du bist grün unterwegs!",
        icon: "car",
        text:
          "Du fährst wenig Auto und bewegst dich überwiegend umweltfreundlich fort. Weiter so! "
      },
      {
        value: 10000,
        title: "Auto: Deine Fortbewegung kannst du noch verbessern...",
        icon: "car",
        text:
          "Da kommen schon ein paar Kilometer zusammen. Steige besonders für kurze Strecken auf ÖVNP oder das Fahrrad um und senke hier noch deine Emissionen etwas."
      },
      {
        // value: 5000,
        title: "Auto: Nutze statt dem Auto unbedingt grüne Alternativen!",
        icon: "car",
        text:
          "Du fährst sehr viel mit dem Auto und belastest die Umwelt. Steige für einige Strecken auf ÖVNP, Fahrrad, zu Fuß, Carsharing oder Ridesharing (z.B. Clevershuttle) um. So sparst du CO2 und auch noch Tankkosten! "
      }
    ]
  },
  food: {
    algorithm: "equals",
    values: [
      {
        value: "vegan",
        icon: "coffee",
        title: "Ernährung: Super! Du ernährst dich bereits sehr CO2 arm.",
        text: "Vegane Ernährung spart viel CO2! Hier ist alles super."
      },
      {
        value: "vegetarian",
        icon: "coffee",
        title: "Ernährung: Schon gut!",
        text:
          "Du kannst noch CO2 sparen wenn du auf Milchprodukte verzichtest. Butter und Käse verursachen recht viel CO2."
      },
      {
        value: "flex",
        icon: "coffee",
        title: "Ernährung: Schon gut!",
        text:
          "Du kannst noch CO2 sparen wenn du komplett auf Fleisch sowie auf Milchprodukte verzichtest. "
      },
      {
        value: "normal",
        icon: "coffee",
        title: "Ernährung: Fleischkonsum verursacht viel CO2",
        text:
          "Versuch doch mal deinen Fleischkonsum zu reduzieren. Nicht jeder muss sich vegetarisch ernähren, aber achte darauf, dass du dein Fleisch regional und bio kaufst. Das ist zwar teurer aber es bleibt etwas besonderes und du schonst die Umwelt. "
      }
    ]
  }
}

const CustomBars = ({ ownFootprint, worldFootprint, deFootprint }) => {
  const highestValue = Math.max(ownFootprint, worldFootprint, deFootprint)
  const ownPercentage = (ownFootprint / highestValue) * 100
  const worldPercentage = (worldFootprint / highestValue) * 100
  const dePercentage = (deFootprint / highestValue) * 100

  return (
    <div className="custom-bars">
      <div className="bar-container">
        <div className="bar-wrapper">
          <div style={{ width: `${ownPercentage}%` }} className="bar-1" />
          <p>Du: {Math.round(ownFootprint * 100) / 100} t CO2 p.a.</p>
        </div>
        <div className="bar-wrapper">
          <div style={{ width: `${dePercentage}%` }} className="bar-2" />
          <p>DE: {Math.round(deFootprint * 100) / 100} t CO2 p.a.</p>
        </div>
        <div className="bar-wrapper">
          <div style={{ width: `${worldPercentage}%` }} className="bar-3" />
          <p>Welt: {Math.round(worldFootprint * 100) / 100} t CO2 p.a.</p>
        </div>
      </div>
    </div>
  )
}

class CarbonForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: null,
      step: "1",
      loading: false
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const initialValues =
      MAP_INITIAL_VALUES[this.props.type] || MAP_INITIAL_VALUES["normal"]
    return (
      <Form layout="inline">
        <Form.Item
          style={{ marginBottom: "10px" }}
          className="no-inline"

          // label="Dein Text (bitte personalisieren)"
        >
          <span>Ich fliege </span>
          {getFieldDecorator("flightshort", {
            rules: [
              {
                required: true,
                message: "Please enter a valid message!"
              }
            ],
            initialValue: initialValues.flightshort
          })(<InputNumber />)}
          <span> {`mal im Jahr Kurzstrecke (<3 h | hin- und zurück).`}</span>
        </Form.Item>
        <Form.Item
          style={{ marginBottom: "10px" }}
          className="no-inline"
          // label="Dein Text (bitte personalisieren)"
        >
          <span>Ich fliege </span>
          {getFieldDecorator("flightslong", {
            rules: [
              {
                required: true,
                message: "Please enter a valid message!"
              }
            ],
            initialValue: initialValues.flightslong
          })(<InputNumber />)}
          <span> {`mal im Jahr Langstrecke (>3 h | hin- und zurück).`}</span>
        </Form.Item>
        <Form.Item
          style={{ marginBottom: "10px" }}
          className="no-inline"
          // label="Dein Text (bitte personalisieren)"
        >
          <span>Ich fahre </span>
          {getFieldDecorator("car", {
            rules: [
              {
                required: true,
                message: "Please enter a valid message!"
              }
            ],
            initialValue: initialValues.car
          })(<InputNumber />)}
          <span> km mit dem Auto pro Jahr.</span>
        </Form.Item>
        <Form.Item
          className="no-inline"
          // label="Postkarten Cover"
          style={{ marginBottom: "10px" }}
        >
          <span>Ich ernähre mich </span>
          {getFieldDecorator("food", {
            rules: [
              {
                required: true,
                message: "Please enter a valid amount name!"
              }
            ],
            initialValue: initialValues.food
          })(
            <Radio.Group className="custom-radio">
              <Radio.Button value="vegan">vegan</Radio.Button>
              <Radio.Button value="vegetarian">vegetarisch</Radio.Button>
              <Radio.Button value="flex">wenig Fleisch</Radio.Button>
              <Radio.Button value="normal">normal</Radio.Button>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item
          style={{ marginBottom: "10px" }}
          className="no-inline"
          // label="Dein Text (bitte personalisieren)"
        >
          <span>Ich gebe pro Monat </span>
          {getFieldDecorator("consumption", {
            rules: [
              {
                required: true,
                message: "Please enter a valid message!"
              }
            ],
            initialValue: initialValues.consumption
          })(
            <InputNumber
              formatter={value =>
                `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={value => value.replace(/€\s?|(,*)/g, "")}
            />
          )}
          <span> für Klamotten, Möbel und Essen aus.</span>
        </Form.Item>
        <Form.Item
          style={{ marginBottom: "10px" }}
          className="no-inline"
          // label="Dein Text (bitte personalisieren)"
        >
          <span>Ich lebe auf </span>
          {getFieldDecorator("flatsize", {
            rules: [
              {
                required: true,
                message: "Please enter a valid message!"
              }
            ],
            initialValue: initialValues.flatsize
          })(<InputNumber />)}
          <span> qm mit </span>
          {getFieldDecorator("flatmates", {
            rules: [
              {
                required: true,
                message: "Please enter a valid message!"
              }
            ],
            initialValue: 2
          })(<InputNumber />)}
          <span> Mitbewohnern.</span>
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "10px" }}
          className="no-inline"
          // label="Dein Text (bitte personalisieren)"
        >
          <span> Mein Strom ist </span>
          {getFieldDecorator("electricity", {
            rules: [
              {
                required: true,
                message: "Please enter a valid message!"
              }
            ],
            initialValue: initialValues.electricity
          })(
            <Select
              // value={value.currency}
              // size={size}
              onChange={this.onChangeInput}
              style={{ width: "140px" }}
              // onChange={this.handleCurrencyChange}
            >
              <Option value="eco">Ökostrom</Option>
              <Option value="normal">normal</Option>
            </Select>
          )}
          <span>.</span>
        </Form.Item>
      </Form>
    )
  }
}

const PostCardForm = Form.create({
  name: "post_card_form",
  onValuesChange(props, changedValues, allValues) {
    props.onValuesChange(allValues)
  }
})(CarbonForm)

class PostCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      footprint: 0,
      type: null,
      step: "1",
      loading: false,
      prevFootprint: 0,
      food: null,
      car: null,
      consumption: null,
      electricity: null,
      flights: null
    }
  }

  onCountUpEnd = () => {
    this.setState({ loading: false })
  }

  onCountUpStart = () => {
    this.setState({ loading: true })
  }

  onSelect = e => {
    e.preventDefault()
    if (e.currentTarget.value) {
      this.setState({ type: e.currentTarget.value, step: "2" })
      if (typeof window !== "undefined" && isMobile()) {
        window.location.href = "#carbon-calculator"
      }
      // initial calculation
      const initialValues = MAP_INITIAL_VALUES[e.currentTarget.value]
      this.handleChange(initialValues)
    }
  }

  onContinue = () => {
    this.setState({ step: "2" })
    if (typeof window !== "undefined" && isMobile()) {
      window.location.href = "#carbon-calculator"
    }
  }

  nextStep = () => {
    this.setState({ step: "3" })
    if (typeof window !== "undefined" && isMobile()) {
      window.location.href = "#carbon-calculator"
    }
  }

  changeTab = key => {
    if (typeof window !== "undefined" && isMobile()) {
      window.location.href = "#carbon-calculator"
    }
    this.setState({ step: key })
  }

  handleChange = values => {
    if (values && values.flatmates > -1) {
      // BASE for DE
      const base = GERMAN_BASE
      // transportation
      const shortFlights = values.flightshort * FLIGHT_VALUES.short
      const longFlights = values.flightslong * FLIGHT_VALUES.long
      // flights coefficient
      const flightsTotal = shortFlights + longFlights
      // car
      const carCarbon = values.car * CAR_VALUE
      // consumption
      const consumption = values.consumption * CONSUMPTION_FACTOR
      const food = DIET_VALUES[values.food]
      // flat
      const flatPerCapita = values.flatsize / (values.flatmates + 1)
      const heating = flatPerCapita * HOUSE_VALUE
      const electricityCarbon = ELECTRICITY_VALUES[values.electricity]
      // summing it all up
      const carbonFootprint =
        (base +
          shortFlights +
          longFlights +
          carCarbon +
          consumption +
          food +
          heating +
          electricityCarbon) /
        1000
      const prevCalculationFootprint = this.state.footprint

      // reduction
      this.getReductionResults([
        { data: flightsTotal, id: "flights" },
        { data: values.consumption, id: "consumption" },
        { data: values.food, id: "food" },
        { data: values.electricity, id: "electricity" },
        { data: values.car, id: "car" }
      ])

      this.setState({
        footprint: carbonFootprint,
        prevFootprint: prevCalculationFootprint
      })
    }
  }

  findEquals = (array, value) => {
    return array.find(elem => elem.value === value)
  }

  findSmaller = (array, value) => {
    return array.find(elem => {
      // if there is no value, it is the worst scenario (open end)
      if (elem.value) {
        return value < elem.value
      } else {
        return elem
      }
    })
  }

  getReductionResults = dataArray =>
    dataArray.map(elem => {
      const { id, data } = elem
      const algorithm = REDUCTION_GUIDE[id]["algorithm"]
      const values = REDUCTION_GUIDE[id]["values"]
      let result
      switch (algorithm) {
        case "smaller":
          result = this.findSmaller(values, data)
          break
        case "equals":
          result = this.findEquals(values, data)
          break
        default:
          break
      }
      this.setState({ [id]: result })
    })

  render() {
    const { flights, food, car, consumption, electricity } = this.state
    const hasCalculated = flights && food && car && consumption && electricity
    const reductionResults = hasCalculated
      ? [flights, car, food, consumption, electricity]
      : []
    return (
      <div className="carbon-calculator">
        <Container>
          <Row>
            <Col xs={24} md={{ span: 18, offset: 3 }}>
              <p className="pre-text">
                Veränderung beginnt immer bei uns selbst. Finde heraus, wie groß
                dein CO₂ Fußabdruck ist und lerne was du tun kannst, um ihn zu
                reduzieren. Du wirst überrascht sein, wie viel CO₂ deine
                täglichen Aktivitäten verursachen!
              </p>
            </Col>
          </Row>
          <Row>
            <Col xs={24} md={{ span: 22, offset: 1 }}>
              <div id="carbon-calculator">
                <Tabs
                  animated={false}
                  onChange={this.changeTab}
                  activeKey={this.state.step}
                  tabPosition={isMobile() ? "top" : "left"}
                >
                  <TabPane
                    tab={
                      <span>
                        <Icon type="user" />
                      </span>
                    }
                    key="1"
                  >
                    <Row>
                      <Col>
                        <h2 style={{ marginBottom: "10px" }}>
                          Welcher Typ beschreibt dich am Besten?
                        </h2>
                        <p
                          style={{ fontSize: "14px", color: "rgba(0,0,0,0.5)" }}
                        >
                          (Du kannst deine Wahl anschließend anpassen)
                        </p>
                        <div>
                          <Button
                            value="traveler"
                            onClick={this.onSelect}
                            className="btn-symbol"
                          >
                            <img
                              src="/img/traveler.png"
                              width="65px"
                              alt="traveler"
                            />
                            <div className="wrapper">
                              <h3
                                style={{ fontSize: "16px", marginTop: "10px" }}
                              >
                                Vielflieger
                              </h3>
                              <p
                                style={{
                                  whiteSpace: "normal",
                                  fontSize: "14px",
                                  // textAlign: "left",
                                  color: "rgba(0,0,0,0.5)"
                                }}
                              >
                                Ich bin viel auf Achse und reise ständig
                              </p>
                            </div>
                          </Button>
                          <Button
                            value="normal"
                            onClick={this.onSelect}
                            className="btn-symbol"
                          >
                            <img
                              src="/img/normalo.png"
                              width="65px"
                              alt="normalo"
                            />
                            <div className="wrapper">
                              <h3
                                style={{ fontSize: "16px", marginTop: "10px" }}
                              >
                                Normalo
                              </h3>
                              <p
                                style={{
                                  whiteSpace: "normal",
                                  fontSize: "14px",
                                  // textAlign: "left",
                                  color: "rgba(0,0,0,0.5)"
                                }}
                              >
                                Hin und wieder Urlaub, "normales"
                                Konsumverhalten
                              </p>
                            </div>
                          </Button>
                          <Button
                            value="eco"
                            onClick={this.onSelect}
                            className="btn-symbol"
                          >
                            <img src="/img/eco.png" width="65px" alt="eco" />
                            <div className="wrapper">
                              <h3
                                style={{ fontSize: "16px", marginTop: "10px" }}
                              >
                                Umweltbewusst
                              </h3>
                              <p
                                style={{
                                  whiteSpace: "normal",
                                  fontSize: "14px",
                                  // textAlign: "left",
                                  color: "rgba(0,0,0,0.5)"
                                }}
                              >
                                Ich achte auf Ernährung, Reisen, grüne Mobilität
                              </p>
                            </div>
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane
                    tab={
                      <span>
                        <Icon type="idcard" />
                      </span>
                    }
                    key="2"
                  >
                    <Row>
                      <Col xs={24} md={17}>
                        <h2>Passe die folgenden Aussagen an:</h2>
                        <p>
                          Mach's nicht zu kompliziert, ungefähre Angaben reichen
                          völlig aus.
                        </p>

                        <PostCardForm
                          type={this.state.type}
                          onValuesChange={this.handleChange}
                        />
                        <Button
                          type="primary"
                          size="large"
                          style={{ margin: "20px 0" }}
                          onClick={this.nextStep}
                        >
                          Zur Auswertung
                        </Button>
                      </Col>
                      <Col xs={24} md={7}>
                        <Card
                          title={<span>Dein Fußabdruck </span>}
                          bordered={false}
                          style={{ width: "100%", textAlign: "center" }}
                        >
                          <h1>
                            <CountUp
                              duration={0.5}
                              useEasing={false}
                              onStart={this.onCountUpStart}
                              onPauseResume={this.onCountUpStart}
                              startOnMount={false}
                              onEnd={this.onCountUpEnd}
                              start={this.state.prevFootprint}
                              end={this.state.footprint}
                              decimals={2}
                            />
                            <span style={{ fontSize: "18px" }}>{" t CO₂"}</span>
                          </h1>
                        </Card>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane
                    tab={
                      <span>
                        <Icon type="info-circle" />
                      </span>
                    }
                    key="3"
                  >
                    <Row>
                      <Col className="results">
                        <h2>
                          Dein CO₂-Fußabdruck ist{" "}
                          {Math.round(this.state.footprint * 100) / 100} t CO₂
                          im Jahr!
                        </h2>
                        <p>
                          Hier sind ein paar Tipps wie du deinen persönlichen
                          Fußabdruck reduzieren kannst.
                        </p>
                        <Row>
                          <Col xs={24} md={16}>
                            <List
                              bordered
                              dataSource={reductionResults}
                              renderItem={item => (
                                <List.Item.Meta
                                  avatar={<Avatar icon={item.icon} />}
                                  title={item.title}
                                  description={item.text}
                                />
                              )}
                            />
                          </Col>
                          <Col xs={24} md={8}>
                            <div className="comparison">
                              <p>So stehst du im Vergleich zu anderen:</p>
                              <CustomBars
                                ownFootprint={this.state.footprint}
                                deFootprint={AVG_FOOTPRINTS["de"]}
                                worldFootprint={AVG_FOOTPRINTS["world"]}
                              />
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="compensation-section">
                        <h3>CO₂-Fußabdruck kompensieren</h3>
                        <p>
                          Du kannst deinen CO₂-Fußabdruck kompensieren, das
                          heißt du spendest Geld für ein Klimaprojekt (z.B.
                          Aufforstung) und sorgst so dafür, dass die Welt wieder
                          ein bisschen mehr durchatmen kann. Durch Kompensation
                          kannst du zwar nicht alles wett machen, aber es hilft
                          allemal.{" "}
                        </p>
                        <a
                          target="_blank"
                          href="https://www.atmosfair.de/en/offset/fix"
                        >
                          <Button className="compensation-btn" size="large">
                            <div>
                              <img src="/img/atmosfair.png" alt="atmosfair" />
                            </div>
                          </Button>
                        </a>
                        <a
                          target="_blank"
                          href="https://www.climatepartner.com/de/co2-rechner-leaders-for-climate-action"
                        >
                          <Button className="compensation-btn" size="large">
                            <div>
                              <img src="/img/climate_partner.png" alt="cp" />
                            </div>
                          </Button>
                        </a>
                      </Col>
                    </Row>
                  </TabPane>
                </Tabs>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default PostCard
