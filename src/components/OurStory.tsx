import { Button, Col, Container, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

function OurStory() {
    const navigate = useNavigate()

    return (
        <section className="our-story">
            <Container>
                <Row className="align-items-center g-5">
                    <Col md={6}>
                        <div className="our-story-image">
                            <img
                                src="/images/our-story.jpg"
                                alt="Apulian olive grove"
                            />
                        </div>
                    </Col>

                    <Col md={6}>
                        <div className="our-story-content">
                            <p className="our-story-label">
                                OUR STORY
                            </p>

                            <h2>
                                From the heart of Puglia to Japan
                            </h2>

                            <p>
                                OliveBridge was born from a passion for
                                Italian extra virgin olive oil and a
                                connection between Italy and Japan.
                            </p>

                            <p>
                                We work with small Italian producers to
                                bring authentic Apulian olive oil to
                                people who appreciate quality, tradition
                                and the story behind every bottle.
                            </p>

                            <Button
                                variant="dark"
                                onClick={() => navigate("/about")}
                            >
                                Discover our story
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default OurStory