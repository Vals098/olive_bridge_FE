import type { UnknownAction } from "@reduxjs/toolkit"

import type { Product } from "../../types/Product"

import { GET_PRODUCTS } from "../actions/productAction/getProducts"
import { GET_ADMIN_PRODUCTS } from "../actions/productAction/getAdminProducts"
import { GET_ADMIN_PRODUCT } from "../actions/productAction/getAdminProduct"
import { CREATE_ADMIN_PRODUCT } from "../actions/productAction/createAdminProduct"
import { UPDATE_ADMIN_PRODUCT } from "../actions/productAction/updateAdminProduct"
import { DELETE_ADMIN_PRODUCT } from "../actions/productAction/deleteAdminProduct"
import { ACTIVATE_ADMIN_PRODUCT } from "../actions/productAction/activateAdminProduct"

interface ProductState {
    products: Product[]
    adminProducts: Product[]
    selectedProduct: Product | null
}

const initialState: ProductState = {
    products: [],
    adminProducts: [],
    selectedProduct: null,
}

const productReducer = (
    state = initialState,
    action: UnknownAction,
): ProductState => {

    if (action.type === GET_PRODUCTS && "payload" in action) {
        return {
            ...state,
            products: action.payload as Product[],
        }
    }

    if (action.type === GET_ADMIN_PRODUCTS && "payload" in action) {
        return {
            ...state,
            adminProducts: action.payload as Product[],
        }
    }

    if (action.type === GET_ADMIN_PRODUCT && "payload" in action) {
        return {
            ...state,
            selectedProduct: action.payload as Product,
        }
    }

    if (action.type === CREATE_ADMIN_PRODUCT && "payload" in action) {
        return {
            ...state,
            adminProducts: [
                ...state.adminProducts,
                action.payload as Product,
            ],
        }
    }

    if (action.type === UPDATE_ADMIN_PRODUCT && "payload" in action) {
        const updatedProduct = action.payload as Product

        return {
            ...state,
            adminProducts: state.adminProducts.map((product) =>
                product.productId === updatedProduct.productId
                    ? updatedProduct
                    : product,
            ),
            selectedProduct: updatedProduct,
        }
    }

    if (action.type === DELETE_ADMIN_PRODUCT && "payload" in action) {
        const updatedProduct = action.payload as Product

        return {
            ...state,
            adminProducts: state.adminProducts.map((product) =>
                product.productId === updatedProduct.productId
                    ? updatedProduct
                    : product,
            ),
            selectedProduct: updatedProduct,
        }
    }

    if (action.type === ACTIVATE_ADMIN_PRODUCT && "payload" in action) {
        const updatedProduct = action.payload as Product

        return {
            ...state,
            adminProducts: state.adminProducts.map((product) =>
                product.productId === updatedProduct.productId
                    ? updatedProduct
                    : product,
            ),
            selectedProduct: updatedProduct,
        }
    }

    return state
}

export default productReducer