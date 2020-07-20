import React, { Component } from "react";
import { navigate } from "gatsby-link";
import { Form, Input, Button, Typography, Row, Col } from "antd";
import "./styles.less";

const { TextArea } = Input;
const { Title } = Typography;

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isValidated: false,
      employees: 1
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSelectChange = e => {
    this.setState({ employees: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    // eslint-disable-next-line
    fetch("/?no-cache=1", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...this.state
      })
    })
      .then(() => navigate("/contact/success"))
      // eslint-disable-next-line
      .catch(error => alert(error));
  };

  render() {
    const { form_titles } = this.props;
    return (
      <div className="contact-form">
        <Title
          className="section-heading center"
          style={{ margin: "0.5em 0 1em", textAlign: "center" }}
          level={2}
        >
          Kontaktieren Sie uns
        </Title>
        <Row>
          <Col md={24} lg={{ span: 16, offset: 4 }}>
            <Form
              name="contact"
              encType="application/x-www-form-urlencoded"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={this.handleSubmit}
            >
              <Input type="hidden" name="form-name" value="contact" />
              <div hidden>
                <label>
                  Don’t fill this out:{" "}
                  <Input name="bot-field" onChange={this.handleChange} />
                </label>
              </div>
              <Form.Item label={form_titles.name_title}>
                <Input
                  className="input"
                  type="text"
                  placeholder={form_titles.name_placeholder}
                  name="name"
                  id="name"
                  onChange={this.handleChange}
                />
              </Form.Item>
              <Form.Item label={form_titles.company_title}>
                <Input
                  className="input"
                  type="text"
                  placeholder={form_titles.company_placeholder}
                  name="company"
                  id="company"
                  onChange={this.handleChange}
                />
              </Form.Item>
              <Form.Item label={form_titles.email_title}>
                <Input
                  className="input"
                  type="email"
                  placeholder={form_titles.email_placeholder}
                  name="email"
                  id="email"
                  onChange={this.handleChange}
                />
              </Form.Item>
              <Form.Item label={form_titles.phone_title}>
                <Input
                  className="input"
                  type="text"
                  placeholder={form_titles.phone_placeholder}
                  name="reference"
                  id="reference"
                  onChange={this.handleChange}
                />
              </Form.Item>
              <Form.Item label={form_titles.open_title}>
                <TextArea
                  className="textarea"
                  placeholder={form_titles.open_placeholder}
                  name="message"
                  id="message"
                  rows="6"
                  onChange={this.handleChange}
                />
              </Form.Item>

              <Form.Item style={{ marginTop: "30px" }}>
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  disabled={
                    !this.state.name ||
                    !this.state.email ||
                    !this.state.phone ||
                    !this.state.company ||
                    !this.state.open
                  }
                >
                  {form_titles.send}
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ContactForm;
