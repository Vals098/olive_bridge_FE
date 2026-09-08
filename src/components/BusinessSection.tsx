import { Button, Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

import { homeContent } from "../data/homeContent"
import type { HomeLanguage } from "../context/LanguageContext"

interface BusinessSectionProps {
  language: HomeLanguage
}

function BusinessSection({ language }: BusinessSectionProps) {
  const navigate = useNavigate()
  const content = homeContent[language]

  return (
    <section className="business-section">
      <Container>
        <div className="business-section-content">
          <p className="business-section-label">{content.business.label}</p>

          <h2>{content.business.title}</h2>

          <p>{content.business.text}</p>

          <Button
            className="olivebridge-button"
            onClick={() => navigate("/business")}
          >
            {content.business.button}
          </Button>
        </div>
      </Container>
    </section>
  )
}

export default BusinessSection
