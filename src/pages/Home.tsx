import HomeHero from "../components/HomeHero"
import FeaturedProducts from "../components/FeaturedProducts"
import OurStory from "../components/OurStory"
import BusinessSection from "../components/BusinessSection"
import { useLanguage } from "../context/LanguageContext"

function Home() {
  const { language } = useLanguage()

  return (
    <>
      <HomeHero language={language} />

      <FeaturedProducts language={language} />

      <OurStory language={language} />

      <BusinessSection language={language} />
    </>
  )
}

export default Home