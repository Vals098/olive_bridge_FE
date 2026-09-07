import type { UnknownAction } from "@reduxjs/toolkit"
import type { Category } from "../../types/Category"
import { GET_CATEGORIES } from "../actions/categoryAction/getCategories"

interface CategoryState {
    categories: Category[]
}

const initialState: CategoryState = {
    categories: [],
}

const categoryReducer = (
    state = initialState,
    action: UnknownAction
): CategoryState => {

    if (action.type === GET_CATEGORIES && "payload" in action) {
        return {
            ...state,
            categories: action.payload as Category[],
        }
    }

    return state
}

export default categoryReducer