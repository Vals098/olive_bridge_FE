import type { AppDispatch } from "../../store"
import type { Product } from "../../../types/Product"

export const GET_ADMIN_PRODUCTS = "GET_ADMIN_PRODUCTS"

export type GetAdminProductsAction = {
    type: typeof GET_ADMIN_PRODUCTS
    payload: Product[]
}

export const getAdminProducts = () => {
    return async (dispatch: AppDispatch) => {
        const token = localStorage.getItem("token")

        if (!token) return

        try {
            const response = await fetch(
                "http://localhost:8080/admin/products",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            )

            if (!response.ok) {
                throw new Error("Unable to retrieve admin products")
            }

            const products: Product[] = await response.json()

            dispatch({
                type: GET_ADMIN_PRODUCTS,
                payload: products,
            })
        } catch (error) {
            console.error(
                "Admin products retrieval error:",
                error,
            )
        }
    }
}