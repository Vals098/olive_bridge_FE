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

import {
  DELETE_ADDRESS,
  type DeleteAddressAction,
} from "../actions/addressAction/deleteAddress"

import {
  UPDATE_ADDRESS,
  type UpdateAddressAction,
} from "../actions/addressAction/updateAddress"

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

const isDeleteAddressAction = (
  action: UnknownAction,
): action is DeleteAddressAction => {
  return action.type === DELETE_ADDRESS && "payload" in action
}

const isUpdateAddressAction = (
  action: UnknownAction,
): action is UpdateAddressAction => {
  return action.type === UPDATE_ADDRESS && "payload" in action
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

  if (isDeleteAddressAction(action)) {
    return {
      ...state,
      addresses: state.addresses.filter(
        (address) => address.addressId !== action.payload,
      ),
    }
  }

  if (isUpdateAddressAction(action)) {
    return {
      ...state,
      addresses: state.addresses.map((address) =>
        address.addressId === action.payload.addressId
          ? action.payload
          : address,
      ),
    }
  }

  return state
}

export default addressReducer
