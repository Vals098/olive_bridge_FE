import type { UnknownAction } from "@reduxjs/toolkit";
import type { CartItem } from "../../types/CartItem";
import { ADD_TO_CART } from "../actions/cartAction/addToCart";

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartReducer = (
    state = initialState,
    action: UnknownAction
): CartState => {
    if (action.type === ADD_TO_CART && "payload" in action) {
        const product = action.payload as CartItem;

        const existingItem = state.items.find(
            (item) =>
                item.variant.productVariantId === product.variant.productVariantId
        );

        if (existingItem) {
            return {
                ...state,
                items: state.items.map((item) =>
                    item.variant.productVariantId === product.variant.productVariantId
                        ? {
                              ...item,
                              quantity: item.quantity + product.quantity,
                          }
                        : item
                ),
            };
        }

        return {
            ...state,
            items: [...state.items, product],
        };
    }

    return state;
};

export default cartReducer;