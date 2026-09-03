import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Product } from "../types/Product";

function ProductDetail() {
    const { productId } = useParams();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8080/products/${productId}`
                );

                if (!response.ok) {
                    throw new Error("Unable to retrieve product");
                }

                const product: Product = await response.json();
                setProduct(product);
            } catch (error) {
                console.error("Product retrieval error:", error);
            }
        };

        getProduct();
    }, [productId]);

    if (!product) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>{product.name}</h1>
            <img src={product.image} alt={product.name} />
            <p>{product.description}</p>
        </div>
    );
}

export default ProductDetail;