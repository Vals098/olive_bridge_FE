import { Container, Row, Col, Card } from "react-bootstrap"
import { Link } from "react-router-dom"

function Business() {
  return (
    <Container className="products-page">
      <h1>Business</h1>

      <p>
        Connect with Italian producers and discover opportunities for your
        business.
      </p>

      <Row>
        <Col md={6}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Sample Requests</Card.Title>
              <Card.Text>
                Request samples of our Italian extra virgin olive oils.
              </Card.Text>

              <Link to="/sample-requests">
                View my sample requests
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Business Inquiries</Card.Title>
              <Card.Text>
                Contact OliveBridge for business opportunities and
                information.
              </Card.Text>

              <Link to="/business-inquiries">
                View my inquiries
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Business