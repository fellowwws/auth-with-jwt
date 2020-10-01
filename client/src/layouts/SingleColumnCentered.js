import React from "react";
import { Container, Row, Col } from "reactstrap";

export default function ({ children }) {
  return (
    <Container>
      <Row>
        <Col sm='12' md={{ size: 8, offset: 2 }}>
          {children}
        </Col>
      </Row>
    </Container>
  );
}
