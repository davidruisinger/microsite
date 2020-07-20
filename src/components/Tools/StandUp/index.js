import React from "react"
import { Container } from "../../Helpers/Container/"
import { Row, Col, Button } from "antd"
import "./styles.less"

const StandUp = () => (
  <Container className="stand-up">
    <Row>
      <Col xs={24} md={{ span: 7 }}>
        <div className="image">
          <img src="/img/politics.png" alt="politics" />
        </div>
      </Col>
      <Col xs={24} md={{ span: 14 }}>
        <div className="text">
          <h3>Wir brauchen die Politik für effektiven Klimaschutz</h3>
          <p>
            Um bundesweit etwas zu verändern, ist es zwingend notwendig, dass
            wir eine sinnvolle Klimapolitik fordern. Noch ist Deutschland weit
            davon entfernt, die Reduktionsziele für 2030 und 2040 zu erreichen.
            Zu langsam erfolgt der Kohleausstieg und zu wenig Maßnahmen werden
            ergriffen, um die Emissionen einzusparen. Mit kleinen Aktionen
            können wir gemeinsam etwas bewegen. Hilf uns und werde aktiv!
          </p>
          <Row className="initiative-row">
            <Col xs={12} md={6} style={{ textAlign: "left" }}>
              <a target="_blank" href={"https://germanzero.de/"}>
                <Button size="large">
                  <div>
                    <img src="/img/german_zero.png" alt="german_zero" />
                  </div>
                </Button>
              </a>
            </Col>
            <Col xs={12} md={18}>
              <div className="initiative-desc">
                <h3>German Zero</h3>
                <p>
                  Ziel von German Zero ist Deutschland in 10 Jahren klimaneutral
                  zu machen. Dafür erarbeiten sie Gesetzte, die 2022 mit einer
                  bundesweiten Kampagne und vielen Freiwilligen durch den
                  Bundestag gebracht werden soll.
                </p>
              </div>
            </Col>
          </Row>

          <Row className="initiative-row">
            <Col xs={12} md={6} style={{ textAlign: "left" }}>
              <a
                target="_blank"
                href={"https://fridaysforfuture.de/streiktermine/"}
              >
                <Button size="large">
                  <div>
                    <img src="/img/fff.png" alt="fridays" />
                  </div>
                </Button>
              </a>
            </Col>
            <Col xs={12} md={18}>
              <div className="initiative-desc">
                <h3>Fridays for Future</h3>
                <p>
                  Das sind alle, die für das Klima auf die Straße gehen und so
                  die Politik auffordern ihren Aufgaben und Versprechungen
                  endlich gerecht zu werden.
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  </Container>
)

export default StandUp
