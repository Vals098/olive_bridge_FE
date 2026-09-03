import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { getProducts } from "../redux/actions/productAction/getProducts";

function Products() {
    const dispatch = useDispatch<AppDispatch>();

    const products = useSelector(
        (state: RootState) => state.product.products
    );

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    console.log(products);

    return <h1>Products</h1>;
}

export default Products;