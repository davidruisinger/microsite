import React from "react"
import { Button, Form, Input, Row, Col, Radio } from "antd"
import "./styles.less"

const { TextArea } = Input

const FORMAL_MESSAGE = `Sehr geehrte,
das Thema Klima liegt mir schon lange am Herzen.

mit freundlichen Grüßen

XX`

const INFORMAL_MESSAGE = `Hallo!
das Thema Klima liegt mir schon lange am Herzen.

bis bald

XX`

class ContactBoss extends React.Component {
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
        window.location.href = `mailto:?subject=Leaders for Climate Action&body=${values.text}`
      }
    })
  }

  onChange = e => {
    const mapping = {
      formal: FORMAL_MESSAGE,
      informal: INFORMAL_MESSAGE
    }

    this.props.form.setFieldsValue({ text: mapping[e.target.value] })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="contact-boss">
        <Row>
          <Form onSubmit={this.handleSubmit}>
            <Col
              xs={20}
              offset={2}
              style={{ padding: "20px", textAlign: "left" }}
            >
              <h2 style={{ fontSize: "28px" }}>
                Erzähle deinem Chef von dieser Kampagne
              </h2>
              <p>
                Diese Kampagne ist initiiert von dem gemeinnützigen Verein
                "Leaders for Climate Action e.V.". Wir helfen Unternehmen dabei
                aktiven Klimaschutz zu betreiben. Wenn du möchtest, dass auch
                dein Arbeitgeber mehr unternimmt, dann erzähl ihm doch einfach
                von unserer Initiative. Wir bieten alle Services kostenlos an
                und arbeiten rein spendenbasiert.
              </p>
              <Form.Item style={{ marginBottom: "10px" }}>
                {getFieldDecorator("style", {
                  rules: [
                    {
                      required: true,
                      message: "Please enter a valid amount name!"
                    }
                  ],
                  initialValue: "formal"
                })(
                  <Radio.Group onChange={this.onChange}>
                    <Radio.Button value="formal">formal</Radio.Button>
                    <Radio.Button value="informal">informal</Radio.Button>
                  </Radio.Group>
                )}
              </Form.Item>
              <Form.Item
                style={{ marginBottom: "10px" }}
                // label="E-Mail for your boss"
              >
                {getFieldDecorator("text", {
                  rules: [
                    {
                      required: true,
                      message: "Please enter a valid message!"
                    }
                  ],
                  initialValue: FORMAL_MESSAGE
                })(<TextArea autosize />)}
              </Form.Item>
              <Form.Item>
                <Button block type="primary" size="large" htmlType="submit">
                  Send E-Mail
                </Button>
              </Form.Item>
            </Col>
          </Form>
        </Row>
      </div>
    )
  }
}

const ContactBossForm = Form.create({ name: "contact_boss_form" })(ContactBoss)

export default ContactBossForm
