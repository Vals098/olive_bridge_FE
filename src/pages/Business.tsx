import { Card, Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"

function Business() {
  return (
    <main className="business-page">
      <Container>
        <div className="business-header">
          <p className="business-label">OLIVEBRIDGE</p>

          <h1>Business</h1>

          <p>
            Connect with Italian producers and discover opportunities
            for your business.
          </p>
        </div>

        <Row className="g-4 justify-content-center">
          <Col md={6} lg={5}>
            <Card className="business-card h-100">
              <Card.Body>
                <div className="business-card-icon">🫒</div>

                <Card.Title>Sample Requests</Card.Title>

                <Card.Text>
                  Request samples of our Italian extra virgin olive oils
                  and discover the products that best suit your business.
                </Card.Text>

                <Link
                  to="/sample-requests"
                  className="business-card-link"
                >
                  View my sample requests →
                </Link>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={5}>
            <Card className="business-card h-100">
              <Card.Body>
                <div className="business-card-icon">✉</div>

                <Card.Title>Business Inquiries</Card.Title>

                <Card.Text>
                  Contact OliveBridge for business opportunities,
                  partnerships and additional information.
                </Card.Text>

                <Link
                  to="/business-inquiries"
                  className="business-card-link"
                >
                  View my inquiries →
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  )
}

export default Business