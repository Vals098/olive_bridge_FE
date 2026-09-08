import type { Product } from "../types/Product"
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../redux/store"
import { addFavourite } from "../redux/actions/favouriteAction/addFavourite"
import { removeFavourite } from "../redux/actions/favouriteAction/removeFavourite"

interface ProductCardProps {
  product: Product
}

function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch<AppDispatch>()

  const favourites = useSelector(
    (state: RootState) => state.favourite.favourites,
  )

  const isFavourite = favourites.some(
    (favourite) => favourite.productId === product.productId,
  )

  const handleFavourite = () => {
    if (isFavourite) {
      dispatch(removeFavourite(product.productId))
    } else {
      dispatch(addFavourite(product.productId))
    }
  }

  return (
    <Card className="product-card">
      <div className="product-card-image-wrapper">
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.name}
        />

        <button
          type="button"
          className="favourite-button"
          onClick={handleFavourite}
          aria-label={
            isFavourite ? "Remove from favourites" : "Add to favourites"
          }
        >
          {isFavourite ? "♥" : "♡"}
        </button>
      </div>

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