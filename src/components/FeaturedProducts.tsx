import { useEffect } from "react"
import { Button, Container } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import useEmblaCarousel from "embla-carousel-react"

import type { AppDispatch, RootState } from "../redux/store"
import { getProducts } from "../redux/actions/productAction/getProducts"
import ProductCard from "./ProductCard"

import { homeContent } from "../data/homeContent"
import type { HomeLanguage } from "../context/LanguageContext"

interface FeaturedProductsProps {
  language: HomeLanguage
}

function FeaturedProducts({ language }: FeaturedProductsProps) {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const products = useSelector((state: RootState) => state.product.products)

  const [emblaRef] = useEmblaCarousel({
    loop: true,
    align: "start",
  })

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  const content = homeContent[language]

  return (
    <section className="featured-products">
      <Container>
        <div className="text-center mb-5">
          <h2>{content.featured.title}</h2>

          <p>{content.featured.text}</p>
        </div>
      </Container>

      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {products.map((product) => (
              <div className="embla__slide" key={product.productId}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Container>
        <div className="text-center mt-5">
          <Button
            className="olivebridge-button"
            onClick={() => navigate("/products")}
          >
            {content.featured.button}
          </Button>
        </div>
      </Container>
    </section>
  )
}

export default FeaturedProducts
