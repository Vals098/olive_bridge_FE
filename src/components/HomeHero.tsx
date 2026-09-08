import { Button, Carousel } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { homeContent } from "../data/homeContent"
import type { HomeLanguage } from "../context/LanguageContext"

interface HomeHeroProps {
  language: HomeLanguage
}

function HomeHero({ language }: HomeHeroProps) {
  const navigate = useNavigate()
  const content = homeContent[language]

  return (
    <section className="home-hero">
      <Carousel fade interval={4000} wrap>
        <Carousel.Item>
          <img
            className="home-hero-image"
            src="/images/hero-intro.png"
            alt="OliveBridge - Italy and Japan"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="home-hero-image"
            src="/images/pexels-hero1.jpg"
            alt="Olive groves in Puglia"
          />

          <Carousel.Caption>
            <p>{content.hero.slide2.label}</p>

            <h1>{content.hero.slide2.title}</h1>

            <p>{content.hero.slide2.text}</p>

            <Button
              className="olivebridge-button"
              onClick={() => navigate("/products")}
            >
              {content.hero.slide2.button}
            </Button>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="home-hero-image"
            src="/images/pexels-roman-odintsov-hero25320080.jpg"
            alt="Italian olives on a branch"
          />

          <Carousel.Caption>
            <p>{content.hero.slide3.label}</p>

            <h1>{content.hero.slide3.title}</h1>

            <p>{content.hero.slide3.text}</p>

            <Button
              className="olivebridge-button"
              onClick={() => navigate("/products")}
            >
              {content.hero.slide3.button}
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </section>
  )
}

export default HomeHero