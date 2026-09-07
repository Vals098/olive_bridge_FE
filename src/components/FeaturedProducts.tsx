import { useEffect } from "react"
import { Button, Container } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import useEmblaCarousel from "embla-carousel-react"

import type { AppDispatch, RootState } from "../redux/store"

import { getProducts } from "../redux/actions/productAction/getProducts"
import ProductCard from "./ProductCard"

function FeaturedProducts() {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const products = useSelector(
        (state: RootState) => state.product.products,
    )

    const [emblaRef] = useEmblaCarousel({
        loop: false,
        align: "start",
    })

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    const featuredProducts = products.slice(0, 8)

    return (
        <section className="featured-products">
            <Container>
                <div className="text-center mb-5">
                    <h2>Featured Products</h2>

                    <p>
                        Discover our selection of Italian extra virgin
                        olive oils.
                    </p>
                </div>

                <div className="embla">
                    <div
                        className="embla__viewport"
                        ref={emblaRef}
                    >
                        <div className="embla__container">
                            {featuredProducts.map((product) => (
                                <div
                                    className="embla__slide"
                                    key={product.productId}
                                >
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="text-center mt-5">
                    <Button
                        variant="dark"
                        onClick={() => navigate("/products")}
                    >
                        View all products
                    </Button>
                </div>
            </Container>
        </section>
    )
}

export default FeaturedProducts