import type { UnknownAction } from "@reduxjs/toolkit"
import type { Favourite } from "../../types/Favourite"

import {
  GET_FAVOURITES,
  type GetFavouritesAction,
} from "../actions/favouriteAction/getFavourites"

import {
  ADD_FAVOURITE,
  type AddFavouriteAction,
} from "../actions/favouriteAction/addFavourite"

import {
  REMOVE_FAVOURITE,
  type RemoveFavouriteAction,
} from "../actions/favouriteAction/removeFavourite"

interface FavouriteState {
  favourites: Favourite[]
}

const initialState: FavouriteState = {
  favourites: [],
}

const isGetFavouritesAction = (
  action: UnknownAction,
): action is GetFavouritesAction => {
  return action.type === GET_FAVOURITES && "payload" in action
}

const isAddFavouriteAction = (
  action: UnknownAction,
): action is AddFavouriteAction => {
  return action.type === ADD_FAVOURITE && "payload" in action
}

const isRemoveFavouriteAction = (
  action: UnknownAction,
): action is RemoveFavouriteAction => {
  return action.type === REMOVE_FAVOURITE && "payload" in action
}

const favouriteReducer = (
  state = initialState,
  action: UnknownAction,
): FavouriteState => {
  if (isGetFavouritesAction(action)) {
    return {
      ...state,
      favourites: action.payload,
    }
  }
  if (isAddFavouriteAction(action)) {
    return {
      ...state,
      favourites: [...state.favourites, action.payload],
    }
  }
  if (isRemoveFavouriteAction(action)) {
    return {
      ...state,
      favourites: state.favourites.filter(
        (favourite) => favourite.productId !== action.payload,
      ),
    }
  }

  return state
}

export default favouriteReducer
