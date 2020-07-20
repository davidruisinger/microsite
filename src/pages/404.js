import React from 'react'
import PageLayout from '../components/Helpers/PageLayout'
import { Container } from '../components/Helpers/Container'
import HeroSmall from '../components/HeroSmall'
import { Row, Col } from 'antd'

const NotFoundPage = () => (
  <PageLayout>
    <div>
      <HeroSmall
        title={'404: NOT FOUND'}
      />
      <Container>
        <Row>
          <Col style={{ margin: '50px 0' }} md={{ offset: 2, span: 20 }} lg={{ offset: 4, span: 16 }}>
      Diese Seite existiert leider nicht.
          </Col>
        </Row>
      </Container>
    </div>
  </PageLayout>
)

export default NotFoundPage
