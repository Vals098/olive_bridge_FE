import type { AppDispatch } from "../../store";
import type { ProductVariant } from "../../../types/ProductVariant";

export const GET_PRODUCT_VARIANTS = "GET_PRODUCT_VARIANTS";

export type GetProductVariantsAction = {
    type: typeof GET_PRODUCT_VARIANTS;
    payload: ProductVariant[];
};

export const getProductVariants = (productId: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await fetch(
                `http://localhost:8080/products/${productId}/variants`
            );

            if (!response.ok) {
                throw new Error("Unable to retrieve product variants");
            }

            const variants: ProductVariant[] = await response.json();

            dispatch({
                type: GET_PRODUCT_VARIANTS,
                payload: variants,
            });
        } catch (error) {
            console.error("Product variants retrieval error:", error);
        }
    };
};