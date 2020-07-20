import React, { Component } from "react";
import { navigate } from "gatsby-link";
import Content from "../../Helpers/Content";
import HeroSmall from "../../HeroSmall";
import PropTypes from "prop-types";
import { Form, Input, Button, Row, Col } from "antd";
import { Container } from "../../Helpers/Container";
const { TextArea } = Input;

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

class ContactPageTemplate extends Component {
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
    const { title, content, contentComponent, form_titles } = this.props;
    const PageContent = contentComponent || Content;
    return (
      <div>
        <HeroSmall title={title} backgroundImage={""} />

        <Container>
          <Row style={{ marginTop: "30px" }}>
            <Col md={{ span: 20, offset: 2 }} lg={{ span: 16, offset: 4 }}>
              <PageContent content={content} />
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
                <Form.Item label={form_titles.job_title}>
                  <Input
                    className="input"
                    type="text"
                    placeholder={form_titles.job_placeholder}
                    name="job"
                    id="job"
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
                <Form.Item label={form_titles.employees_title}>
                  <select
                    className="ant-select-selection"
                    style={{ width: "100%", height: "40px", marginTop: "6px" }}
                    name="employees"
                    value={this.state.employees}
                    onChange={this.handleSelectChange}
                  >
                    <option value="1">1-10</option>
                    <option value="10">10-50</option>
                    <option value="50">50-200</option>
                    <option value="200">200-1000</option>
                    <option value="1000">&gt;1000</option>
                  </select>
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
                <Form.Item label={form_titles.application_title}>
                  <TextArea
                    className="textarea"
                    placeholder={form_titles.application_placeholder}
                    name="message"
                    id="message"
                    rows="6"
                    onChange={this.handleChange}
                  />
                </Form.Item>
                <Form.Item label={form_titles.reference_title}>
                  <Input
                    className="input"
                    type="text"
                    placeholder={form_titles.reference_placeholder}
                    name="reference"
                    id="reference"
                    onChange={this.handleChange}
                  />
                </Form.Item>

                <Form.Item style={{ marginTop: "30px" }}>
                  <Button
                    className="button is-text"
                    htmlType="reset"
                    size="large"
                    style={{ marginRight: "10px" }}
                  >
                    {form_titles.cancel}
                  </Button>
                  <Button
                    type="primary"
                    size="large"
                    htmlType="submit"
                    disabled={
                      !this.state.name ||
                      !this.state.email ||
                      !this.state.job ||
                      !this.state.company ||
                      !this.state.message ||
                      !this.state.reference
                    }
                  >
                    {form_titles.send}
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

ContactPageTemplate.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  meta_title: PropTypes.string,
  meta_description: PropTypes.string
};

export default ContactPageTemplate;
