import type { AppDispatch } from "../../store"
import type { Product } from "../../../types/Product"

export const DELETE_ADMIN_PRODUCT = "DELETE_ADMIN_PRODUCT"

export type DeleteAdminProductAction = {
    type: typeof DELETE_ADMIN_PRODUCT
    payload: Product
}

export const deleteAdminProduct = (productId: string) => {
    return async (dispatch: AppDispatch) => {
        const token = localStorage.getItem("token")

        if (!token) return

        try {
            const response = await fetch(
                `http://localhost:8080/admin/products/${productId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            )

            if (!response.ok) {
                throw new Error("Unable to deactivate product")
            }

            const product: Product = await response.json()

            dispatch({
                type: DELETE_ADMIN_PRODUCT,
                payload: product,
            })
        } catch (error) {
            console.error("Product deactivation error:", error)
        }
    }
}
