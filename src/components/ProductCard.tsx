import type { Product } from "../types/Product"
import { Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

interface ProductCardProps {
  product: Product
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="product-card">
      <Card.Img variant="top" src={product.image} alt={product.name} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>

        <Link
          to={`/products/${product.productId}`}
          className="product-card-button"
        >
          View details
        </Link>
      </Card.Body>
    </Card>
  )
}

export default ProductCard
