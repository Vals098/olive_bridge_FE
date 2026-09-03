import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { getProducts } from "../redux/actions/productAction/getProducts";

import ProductCard from "../components/ProductCard";

function Products() {
    const dispatch = useDispatch<AppDispatch>();

    const products = useSelector(
        (state: RootState) => state.product.products
    );

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

return (
    <div>
        <h1>Products</h1>

        {products.map((product) => (
            <ProductCard
                key={product.productId}
                product={product}
            />
        ))}
    </div>
);
}

export default Products;