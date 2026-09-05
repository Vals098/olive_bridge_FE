import type { UnknownAction } from "@reduxjs/toolkit"
import type { Address } from "../../types/Address"
import {
  GET_ADDRESSES,
  type GetAddressesAction,
} from "../actions/addressAction/getAddresses"

import {
  CREATE_ADDRESS,
  type CreateAddressAction,
} from "../actions/addressAction/createAddress"

interface AddressState {
  addresses: Address[]
}

const initialState: AddressState = {
  addresses: [],
}

const isGetAddressesAction = (
  action: UnknownAction,
): action is GetAddressesAction => {
  return action.type === GET_ADDRESSES && "payload" in action
}

const isCreateAddressAction = (
  action: UnknownAction,
): action is CreateAddressAction => {
  return action.type === CREATE_ADDRESS && "payload" in action
}

const addressReducer = (
  state = initialState,
  action: UnknownAction,
): AddressState => {
  if (isGetAddressesAction(action)) {
    return {
      ...state,
      addresses: action.payload,
    }
  }

  if (isCreateAddressAction(action)) {
    return {
      ...state,
      addresses: [...state.addresses, action.payload],
    }
  }

  return state
}

export default addressReducer
