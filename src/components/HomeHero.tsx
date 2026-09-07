import { Button, Carousel } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

function HomeHero() {
    const navigate = useNavigate()

    return (
        <section className="home-hero">
            <Carousel fade interval={5000}>
                <Carousel.Item>
                    <img
                        className="home-hero-image"
                        src="/public/images/pexels-hero1.jpg"
                        alt="Olive groves in Puglia"
                    />

                    <Carousel.Caption>
                        <p>Italian Extra Virgin Olive Oil</p>

                        <h1>Discover the taste of Italy</h1>

                        <p>
                            Discover authentic Italian olive oil and the
                            stories behind every bottle.
                        </p>

                        <Button
                            variant="light"
                            onClick={() => navigate("/products")}
                        >
                            Shop
                        </Button>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="home-hero-image"
                        src="/public/images/pexels-roman-odintsov-hero25320080.jpg"
                        alt="Italian olives on a branch"
                    />

                    <Carousel.Caption>
                        <p>From Puglia to Japan</p>

                        <h1>Tradition in every bottle</h1>

                        <p>
                            Discover the flavours, people and traditions
                            behind authentic Italian olive oil.
                        </p>

                        <Button
                            variant="light"
                            onClick={() => navigate("/products")}
                        >
                            Discover
                        </Button>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </section>
    )
}

export default HomeHero