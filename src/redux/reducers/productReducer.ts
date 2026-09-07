import type { UnknownAction } from "@reduxjs/toolkit"

import type { Product } from "../../types/Product"

import { GET_PRODUCTS } from "../actions/productAction/getProducts"
import { CREATE_ADMIN_PRODUCT } from "../actions/productAction/createAdminProduct"
import { GET_ADMIN_PRODUCT } from "../actions/productAction/getAdminProduct"
import { UPDATE_ADMIN_PRODUCT } from "../actions/productAction/updateAdminProduct"

interface ProductState {
  products: Product[]
  selectedProduct: Product | null
}

const initialState: ProductState = {
  products: [],
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

  if (action.type === GET_ADMIN_PRODUCT && "payload" in action) {
    return {
      ...state,
      selectedProduct: action.payload as Product,
    }
  }

  if (action.type === CREATE_ADMIN_PRODUCT && "payload" in action) {
    return {
      ...state,
      products: [...state.products, action.payload as Product],
    }
  }

  if (action.type === UPDATE_ADMIN_PRODUCT && "payload" in action) {
    const updatedProduct = action.payload as Product

    return {
      ...state,
      selectedProduct: updatedProduct,
      products: state.products.map((product) =>
        product.productId === updatedProduct.productId
          ? updatedProduct
          : product,
      ),
    }
  }

  return state
}

export default productReducer
