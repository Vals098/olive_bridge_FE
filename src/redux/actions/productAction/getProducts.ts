import type { AppDispatch } from "../../store";
import type { Product } from "../../../types/Product";

export const GET_PRODUCTS = "GET_PRODUCTS";

export const getProducts = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await fetch("http://localhost:8080/products");

            if (!response.ok) {
                throw new Error("Unable to retrieve products");
            }

            const products: Product[] = await response.json();

            dispatch({
                type: GET_PRODUCTS,
                payload: products,
            });
        } catch (error) {
            console.error("Products retrieval error:", error);
        }
    };
};