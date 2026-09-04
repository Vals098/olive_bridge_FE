import type { UnknownAction } from "@reduxjs/toolkit";
import type { ProductVariant } from "../../types/ProductVariant";
import { GET_PRODUCT_VARIANTS } from "../actions/productAction/getProductVariants";

interface ProductVariantState {
    variants: ProductVariant[];
}

const initialState: ProductVariantState = {
    variants: [],
};

const productVariantReducer = (
    state = initialState,
    action: UnknownAction
): ProductVariantState => {
    if (action.type === GET_PRODUCT_VARIANTS && "payload" in action) {
        return {
            ...state,
            variants: action.payload as ProductVariant[],
        };
    }

    return state;
};

export default productVariantReducer;