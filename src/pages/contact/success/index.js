import React from "react";
import PageLayout from "../../../components/Helpers/PageLayout";
import { Container } from "../../../components/Helpers/Container";
import HeroSmall from "../../../components/HeroSmall";
import { Row, Col } from "antd";

const SuccessPage = () => {
  return (
    <PageLayout>
      <HeroSmall title={"Danke!"} backgroundImage={""} />
      <Container>
        <Row>
          <Col md={{ span: 20, offset: 2 }} lg={{ span: 16, offset: 4 }}>
            <p style={{ margin: "20px 0 40px" }}>
              Danke für das Übermitteln deiner Bewerbung. Wir melden uns bald
              bei dir! Da wir momentan viele Bewerbungen bekommen und nur
              ehrenamtlich &quot;nebenbei&quot; arbeiten, kann eine Rückmeldung
              bis zu 10 Tagen dauern.
            </p>
            <p>Vielen Dank für dein Verständnis! Dein LFCA Team</p>
          </Col>
        </Row>
      </Container>
    </PageLayout>
  );
};

export default SuccessPage;
