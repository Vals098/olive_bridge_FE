import type { Product } from "../types/Product";
import { Card, Button } from "react-bootstrap";

interface ProductCardProps {
    product: Product;
}

function ProductCard({ product }: ProductCardProps) {
    return (
        <Card className="product-card">
            <Card.Img
                variant="top"
                src={product.image}
                alt={product.name}
            />

            <Card.Body>
                <Card.Title>{product.name}</Card.Title>

                <Card.Text>
                    {product.description}
                </Card.Text>

                <Button className="product-card-button">
                    View details
                </Button>
            </Card.Body>
        </Card>
    );
}

export default ProductCard;