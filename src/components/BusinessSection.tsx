import { Button, Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

function BusinessSection() {
    const navigate = useNavigate()

    return (
        <section className="business-section">
            <Container>
                <div className="business-section-content">
                    <p className="business-section-label">
                        FOR BUSINESS
                    </p>

                    <h2>
                        Bring authentic Italian olive oil to your business
                    </h2>

                    <p>
                        Are you a restaurant, shop or business in Japan?
                        Discover our selection of Italian extra virgin
                        olive oils and request samples for your business.
                    </p>

                    <Button
                        variant="dark"
                        onClick={() => navigate("/business")}
                    >
                        Request a Sample
                    </Button>
                </div>
            </Container>
        </section>
    )
}

export default BusinessSection