import type { UnknownAction } from "@reduxjs/toolkit";
import type { Product } from "../../types/Product";
import { GET_PRODUCTS } from "../actions/productAction/getProducts";

interface ProductState {
    products: Product[];
}

const initialState: ProductState = {
    products: [],
};

const productReducer = (
    state = initialState,
    action: UnknownAction
): ProductState => {

    if (action.type === GET_PRODUCTS && "payload" in action) {
        return {
            ...state,
            products: action.payload as Product[],
        };
    }

    return state;
};

export default productReducer;