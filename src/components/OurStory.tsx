import { Button, Col, Container, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

import { homeContent } from "../data/homeContent"
import type { HomeLanguage } from "../context/LanguageContext"

interface OurStoryProps {
  language: HomeLanguage
}

function OurStory({ language }: OurStoryProps) {
  const navigate = useNavigate()
  const content = homeContent[language]

  return (
    <section className="our-story">
      <Container>
        <Row className="align-items-center g-5">
          <Col md={6}>
            <div className="our-story-image">
              <img
                src="/public/images/our-story.jpg"
                alt="Apulian olive grove"
              />
            </div>
          </Col>

          <Col md={6}>
            <div className="our-story-content">
              <p className="our-story-label">{content.story.label}</p>

              <h2>{content.story.title}</h2>

              <p>{content.story.text1}</p>

              <p>{content.story.text2}</p>

              <Button
                className="olivebridge-button"
                onClick={() => navigate("/about")}
              >
                {content.story.button}
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default OurStory
