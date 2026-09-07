import type { AppDispatch } from "../../store"
import type { Product } from "../../../types/Product"

export const CREATE_ADMIN_PRODUCT = "CREATE_ADMIN_PRODUCT"

export type ProductRequest = {
    name: string
    description: string
    image: string
    status: string
    categoryId: string
    technicalInformationId: string
}

export const createAdminProduct = (body: ProductRequest) => {
    return async (dispatch: AppDispatch) => {
        const token = localStorage.getItem("token")

        if (!token) return

        try {
            const response = await fetch(
                "http://localhost:8080/admin/products",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(body),
                },
            )

            if (!response.ok) {
                throw new Error("Unable to create product")
            }

            const product: Product = await response.json()

            dispatch({
                type: CREATE_ADMIN_PRODUCT,
                payload: product,
            })
        } catch (error) {
            console.error("Product creation error:", error)
        }
    }
}