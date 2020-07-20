import React from "react"
import { Button, Form, InputNumber, Row, Col, Card, Icon } from "antd"
import "./styles.less"
import CountUp from "react-countup"
import { Container } from "../../Helpers/Container/"

const TIMEOUT = 1000

const BANKS = [
  {
    name: "Tomorrow",
    logo: "/img/tmw.png",
    text: "Bietet ausschließlich privates Mobile Banking an",
    link: "https://www.tomorrow.one/de-de/"
  },
  {
    name: "GLS Bank",
    logo: "/img/gls.png",
    text: "Bietet Privat- und Firmenkonten an",
    link: "https://www.gls.de/privatkunden/"
  },
  {
    name: "Umweltbank",
    logo: "/img/umwelt.png",
    text: "Bietet Privat- und Firmenkonten an",
    link: "https://www.umweltbank.de/"
  }
]

class GreenMoney extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      savings: 0,
      loading: false
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ savings: values.amount * 0.00312, loading: true })
      }
    })
  }

  onCountUpEnd = () => {
    this.setState({ loading: false })
  }

  onCountUpStart = () => {
    this.setState({ loading: true })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const numberFlights = this.state.savings * 0.862
    const flightsRounded = Math.ceil(numberFlights / 1)
    return (
      <div className="green-money">
        <Container>
          <Row>
            <Col
              className="left-container"
              xs={24}
              md={{ span: 12, offset: 2 }}
            >
              <p>
                Wie wir unser Geld anlegen und wie wir es ausgeben, hat große
                Auswirkungen auf unsere CO₂ Bilanz. Zum Glück gibt es heute
                grüne Alternativen zu Großbanken, die dein Geld teilweise in
                Kohle und Öl stecken.
              </p>
              <h3>"Grün" Konsumieren</h3>
              <p>
                Pro Transaktion, die du mit deinen Kredit- oder Debitkarten
                ausführst, zahlt der Händler (beispielsweise dein Bio
                Supermarkt) 0,2% des Betrags an deine Bank. Grüne Banken, wie
                Tomorrow, nutzen davon 0,07% zur Kostendeckung der Transaktion
                und unterstützen mit den verbliebenen 0,13% Projekte zum Schutz
                des Regenwaldes. Jeder Euro, der in solche Projekte investiert
                wird, spart pro Jahr 200 kg CO₂. Bei Ausgaben von 1000€ im Monat
                sparst du also über 3 t CO₂ in Jahr. (genauer Wert: 3,12 t/a)
                Berechne, wie viel CO₂ dein Konsum einsparen würde:
              </p>
              <h3
                style={{
                  color: "#323232",
                  margin: "20px 0"
                }}
              >
                Wieviel Geld gibst du pro Monat für Konsum aus?
              </h3>
              <Form layout="inline" onSubmit={this.handleSubmit}>
                <Row>
                  <Col xs={12}>
                    <Form.Item
                      style={{ marginBottom: "10px", width: "100%" }}
                      // label="Amount in €"
                      className="full-width"
                    >
                      {getFieldDecorator("amount", {
                        rules: [
                          {
                            required: true,
                            message: "Please enter a valid amount name!"
                          }
                        ],
                        initialValue: 800
                      })(
                        <InputNumber
                          formatter={value =>
                            `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          }
                          parser={value => value.replace(/€\s?|(,*)/g, "")}
                          size="large"
                          style={{ width: "100%", paddingRight: "12px" }}
                        />
                      )}
                    </Form.Item>
                  </Col>
                  <Col xs={12}>
                    <Button block type="primary" size="large" htmlType="submit">
                      CO₂ Ersparnis errechnen
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
            <Col xs={24} md={8} className="right-container">
              <div>
                <Card
                  title={<span>CO₂ Ersparnis pro Jahr </span>}
                  bordered={false}
                  style={{ width: "100%" }}
                >
                  <h1>
                    <CountUp
                      duration={TIMEOUT / 1000}
                      useEasing={true}
                      onStart={this.onCountUpStart}
                      onPauseResume={this.onCountUpStart}
                      startOnMount={false}
                      onEnd={this.onCountUpEnd}
                      end={Math.ceil(this.state.savings / 1)}
                    />
                    <span style={{ fontSize: "22px" }}>{" t CO₂"}</span>
                  </h1>
                  {this.state.savings > 0 && !this.state.loading && (
                    <div className="stats">
                      <p>
                        {" "}
                        <Icon type="cloud" />{" "}
                        {`equals ~${flightsRounded} flights from Berlin - London`}
                      </p>
                    </div>
                  )}
                </Card>
              </div>
            </Col>
          </Row>
          {this.state.savings > 0 && !this.state.loading && (
            <Row>
              <Col xs={20} offset={2}>
                <h4 style={{ margin: "30px 0 10px" }}>
                  Woopwooop! Diese Banken bieten dir grüne Investments{" "}
                  <span role="img" aria-label="Party">
                    🎉
                  </span>{" "}
                  :
                </h4>
                {BANKS.map((bank, i) => (
                  <Card key={i}>
                    <img alt="bank" width="140px" src={bank.logo} />
                    {bank.text}
                    <a target="_blank" href={bank.link}>
                      <Button style={{ float: "right" }}>Mehr erfahren</Button>
                    </a>
                  </Card>
                ))}
              </Col>
            </Row>
          )}
        </Container>
      </div>
    )
  }
}

const GreenMoneyForm = Form.create({ name: "green_money_form" })(GreenMoney)

export default GreenMoneyForm
