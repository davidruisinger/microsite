import React from "react"
import PropTypes from "prop-types"
import { List, Row, Col } from "antd"
import { Container } from "../../Helpers/Container/"
import HeroSmall from "../../HeroSmall"
import { Link } from "gatsby"

class HomePageTemplate extends React.Component {
  render() {
    const { title, companies } = this.props
    return (
      <div className="home-page">
        <Container className="overview-page">
          <HeroSmall title={"Wer ist Teil der Kampagne?"} />
          <Row>
            <Col lg={{ span: 16, offset: 4 }}>
              <p>
                Hinter der Kampagne "act now!" steht die non-Profit Organisation{" "}
                <a
                  style={{ textDecoration: "underline" }}
                  href="https://leadersforclimateaction.com"
                >
                  Leaders for Climate Action
                </a>
                . Als Mitglied unserer Community kannst du bei der Kampagne
                mitmachen und dich für das Badge qualifizeren. Als Initiative
                der Digitalwirtschaft versuchen wir uns eine Stimme in der
                Politik zu verschaffen und den Wandel in unserer eigenen
                Industrie so schnell wie möglich umzusetzen. Solltest du also
                selbst ein Digitalunternehmen mit mehr als 30 Mitarbeitern
                führen,{" "}
                <a
                  style={{ textDecoration: "underline" }}
                  href="https://leadersforclimateaction.com/contact"
                >
                  kannst du dich hier bewerben.
                </a>
              </p>
              <p>
                Falls das nicht der Fall ist, kannst du uns gern mit einer
                Spende unterstützen. Wir sind eine gemeinnützige non-Profit
                Organisation und freuen uns über jeden Beitrag!
              </p>
              <List
                itemLayout="horizontal"
                dataSource={companies}
                bordered
                renderItem={company => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <div className="logo-wrapper">
                          <img alt="logo" src={company.logo} />
                        </div>
                      }
                      title={
                        <Link to={`/e/${company.url}`}>{company.name}</Link>
                      }
                      description={`${company.name} ist auf dem Pledge Level ${company.companyPledge} dabei und ist qualifizert für unser "act now" Badge.`}
                    />
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

HomePageTemplate.propTypes = {
  title: PropTypes.string.isRequired
}

export default HomePageTemplate
