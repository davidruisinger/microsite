import React from "react"
import {
  Button,
  Form,
  Input,
  Row,
  Col,
  Tabs,
  Radio,
  Icon,
  Card,
  Tag
} from "antd"
import "./styles.less"

const { TextArea } = Input
const { TabPane } = Tabs

const REPRESENTATIVES = [
  {
    name: "Fritz Felgentreu",
    party: "SPD",
    address: `Deutscher Bundestag
  Platz der Republik 1
  11011 Berlin`,
    picture: "/img/fritzabwa.jpg",
    area: "10000"
  },
  {
    name: "Hubertus Heil",
    party: "SPD",
    address: `Deutscher Bundestag
  Platz der Republik 1
  11011 Berlin`,
    picture: "/img/hubertus-heil.jpg",
    area: "20000"
  }
]

class PostCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      step: "1",
      loading: false,
      postcode: "12043",
      representative: null
    }
  }

  onSearch = e => {
    e.preventDefault()
    const areaCode = this.state.postcode.charAt(0)
    const myRep = REPRESENTATIVES.find(
      representative => areaCode === representative.area.charAt(0)
    )
    this.setState({ representative: myRep || REPRESENTATIVES[0] })
  }

  onChange = e => {
    this.setState({ postcode: e.target.value })
  }

  onContinue = () => {
    this.setState({ step: "2" })
  }

  nextStep = () => {
    this.setState({ step: "3" })
  }

  changeTab = key => this.setState({ step: key })

  render() {
    const { getFieldDecorator } = this.props.form
    const { representative } = this.state
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 19 }
      }
    }
    const message = `Sehr geehrter ${representative && representative.name},

ich bin zu tiefst besorgt. Ich habe mich in den letzten Wochen intensiver mit der Klimakrise befasst und bin erschüttert wie nah wir bereits an entscheidenden Kipppunkten angelangt sind. Wir müssen handeln, wir brauchen stärkeren Klimaschutz und ich sehe sie in der Verantwortung, diesen in die Wege zu leiten. In der letzten Legislaturperiode habe ich sie gewählt, da die SPD schon immer die Partei war, zu der ich mich am ehesten hingezogen fühlte. Ich würde gern bei dieser Wahl bleiben und sie in dieser schwierigen Zeit unterstützen, aber dafür erwarte ich, dass die SPD sich noch stärker für den Klimaschutz einsetzen wird.  

Schauen sie sich mal die Initiative GermanZero an, die haben einen Plan ausgearbeitet wie wir die Klimaziele noch erreichen können!
    
Ich wünsche einen guten Start ins neue Jahr!`
    return (
      <div className="post-card">
        <Row>
          <Col>
            <Tabs
              onChange={this.changeTab}
              activeKey={this.state.step}
              tabPosition="left"
            >
              <TabPane
                tab={
                  <span>
                    <Icon type="user" />
                  </span>
                }
                key="1"
                style={{ padding: "0 30px" }}
              >
                <Row>
                  <Col xs={17}>
                    <h2 style={{ fontSize: "28px" }}>
                      Schreib eine "Klimakarte"!
                    </h2>
                    <p>
                      {this.state.representative
                        ? `Wir haben deine/n Abgeordnete/n gefunden! Du kannst nun hier online eine physische Karte schreiben.`
                        : `Während Abgeordnete standardisierte Massenmails einfach ignorieren, verhält es sich mit persönlicher Post von Wählenden ganz anders: Da sie über die Wahlkreise direkt gewählt werden, interessieren sie sich für kaum etwas mehr, als die Meinungen der Wählenden in ihrem Wahlkreis. Probier's aus!`}
                    </p>
                    <Row>
                      {!this.state.representative ? (
                        <div>
                          <p
                            style={{
                              color: "#323232",
                              margin: "10px 0"
                            }}
                          >
                            Wie lautet deine Postleitzahl?
                          </p>
                          <Col xs={8} style={{ paddingRight: "10px" }}>
                            <Input
                              value={this.state.postcode}
                              onChange={this.onChange}
                              size="large"
                            />
                          </Col>
                          <Col xs={16}>
                            <Button
                              block
                              type="primary"
                              size="large"
                              onClick={this.onSearch}
                            >
                              Abgeordnete finden
                            </Button>
                          </Col>
                        </div>
                      ) : (
                        <div>
                          <div
                            style={{
                              color: "#323232",
                              margin: "10px 0"
                            }}
                          >
                            {`Gesuchte Postleitzahl: `}
                            <Tag
                              closable
                              onClose={() =>
                                this.setState({ representative: null })
                              }
                            >
                              {this.state.postcode}
                            </Tag>
                          </div>

                          <Button
                            type="primary"
                            size="large"
                            onClick={this.onContinue}
                            style={{ marginTop: "10px" }}
                          >
                            Jetzt Postkarte schreiben
                          </Button>
                        </div>
                      )}
                    </Row>
                  </Col>
                  <Col xs={7}>
                    {representative ? (
                      <Card className="rep">
                        <img alt="member" src={representative.picture} />
                        <p style={{ fontSize: "15px", marginBottom: "5px" }}>
                          {`${representative.name}, ${representative.party}`}
                        </p>
                        <p
                          style={{
                            color: "grey",
                            lineHeight: "1.4",
                            fontSize: "13px"
                          }}
                        >
                          {representative.address}
                        </p>
                      </Card>
                    ) : (
                      <div style={{ textAlign: "center", marginTop: "20px" }}>
                        <img
                          alt="postcard"
                          width="100%"
                          src="/img/postcard.png"
                        />
                      </div>
                    )}
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
                style={{ padding: "0 30px" }}
              >
                <h2 style={{ fontSize: "28px" }}>Schreibe Deine Postkarte</h2>
                <p>
                  Wir lassen deine Postkarte drucken und verschicken sie ganz
                  gewöhnlich mit der Post. Das kostet knapp 2€, du kannst am
                  Ende online bezahlen.* Du kannst natürlich auch gern selbst
                  eine Karte schreiben falls du gerade eine zur Hand hast!
                </p>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    className="no-inline"
                    label="Dein Text (bitte personalisieren)"
                  >
                    {getFieldDecorator("text", {
                      rules: [
                        {
                          required: true,
                          message: "Please enter a valid message!"
                        }
                      ],
                      initialValue: message
                    })(<TextArea autosize />)}
                  </Form.Item>
                  <Form.Item
                    className="no-inline"
                    label="Postkarten Cover"
                    style={{ marginBottom: "10px" }}
                  >
                    {getFieldDecorator("cover", {
                      rules: [
                        {
                          required: true,
                          message: "Please enter a valid amount name!"
                        }
                      ],
                      initialValue: "1"
                    })(
                      <Radio.Group
                        className="custom-radio"
                        // onChange={this.onChange}
                      >
                        <Radio.Button value="1">
                          <img alt="motiv-1" src="/img/postcard.jpg" />
                        </Radio.Button>
                        <Radio.Button value="2">
                          <img alt="motiv-2" src="/img/postcard_1.jpg" />
                        </Radio.Button>
                        <Radio.Button value="3">
                          <img alt="motiv-3" src="/img/postcard_2.jpg" />
                        </Radio.Button>
                      </Radio.Group>
                    )}
                  </Form.Item>
                  <p style={{ lineHeight: "1.3", fontSize: "13px" }}>
                    *Ja, leider verursacht das Drucken und Versenden der
                    Postkarte CO₂. Wir haben recherchiert und es sind wohl 20
                    Gramm CO₂ pro Karte inkl. Transport. Bei einer E-Mail
                    verursacht der Stromverbrauch etwa 10 Gramm. Wir halten das
                    für vertretbar. Trotzdem: Bitte nutzt diesen Service nicht
                    als Spam, sondern für ernsthafte Kommunikation.{" "}
                  </p>
                  <Form.Item>
                    <Button type="primary" size="large" onClick={this.nextStep}>
                      Weiter
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <Icon type="home" />
                  </span>
                }
                key="3"
                style={{ padding: "0 30px" }}
              >
                <Row>
                  <Col>
                    <h2 style={{ fontSize: "28px" }}>Super, fast geschafft!</h2>
                    <p>
                      Bitte gib noch deine Adresse an.{" "}
                      {this.state.representative &&
                        this.state.representative.name}{" "}
                      muss sehen, dass du in dem entsprechenden Wahlkreis
                      wohnst, damit deine Nachricht auch Gewicht hat.
                    </p>
                    <Form
                      {...formItemLayout}
                      // layout="inline"
                      onSubmit={this.handleSubmit}
                    >
                      <Form.Item label="Name">
                        {getFieldDecorator("name", {
                          rules: [
                            {
                              required: true,
                              message: "Please enter a valid message!"
                            }
                          ]
                        })(<Input />)}
                      </Form.Item>
                      <Form.Item label="Straße">
                        {getFieldDecorator("street", {
                          rules: [
                            {
                              required: true,
                              message: "Please enter a valid message!"
                            }
                          ]
                        })(<Input />)}
                      </Form.Item>
                      <Form.Item label="Postleitzahl">
                        {getFieldDecorator("postcode", {
                          rules: [
                            {
                              required: true,
                              message: "Please enter a valid message!"
                            }
                          ]
                        })(<Input />)}
                      </Form.Item>
                      <Form.Item label="Stadt">
                        {getFieldDecorator("city", {
                          rules: [
                            {
                              required: true,
                              message: "Please enter a valid message!"
                            }
                          ]
                        })(<Input />)}
                      </Form.Item>
                    </Form>
                    <p>
                      Das Drucken und Versenden der Karte kostet 1,99€. Wir
                      lassen das bei Postalo machen. Du kannst mit Kreditkarte
                      oder Paypal zahlen. Wir verdienen nichts mit diesem
                      Service. Der Zahldialog öffnet sich in einem neuen
                      Fenster.
                    </p>
                    <img
                      src="/img/payment.png"
                      width="140px"
                      alt="pay"
                      style={{ margin: "10px 0 20px" }}
                    />
                    <Button block size="large" type="primary">
                      <Icon
                        style={{ verticalAlign: "text-top" }}
                        type="safety"
                      />
                      1,99 € bezahlen
                    </Button>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    )
  }
}

const PostCardForm = Form.create({ name: "post_card_form" })(PostCard)

export default PostCardForm
