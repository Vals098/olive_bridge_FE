import type { UnknownAction } from "@reduxjs/toolkit"
import type { User } from "../../types/User"
import { LOGIN, type LoginAction } from "../actions/userAction/login"
import {
  GET_CURRENT_USER,
  type GetCurrentUserAction,
} from "../actions/userAction/getCurrentUser"
import { LOGOUT, type LogoutAction } from "../actions/userAction/logout"
import {
  UPDATE_CURRENT_USER,
  type UpdateCurrentUserAction,
} from "../actions/userAction/updateCurrentUser"

interface UserState {
  currentUser: User | null
}

const initialState: UserState = {
  currentUser: null,
}

const isLoginAction = (action: UnknownAction): action is LoginAction => {
  return action.type === LOGIN && "payload" in action
}

const isGetCurrentUserAction = (
  action: UnknownAction,
): action is GetCurrentUserAction => {
  return action.type === GET_CURRENT_USER && "payload" in action
}

const isUpdateCurrentUserAction = (
  action: UnknownAction,
): action is UpdateCurrentUserAction => {
  return action.type === UPDATE_CURRENT_USER && "payload" in action
}

const isLogoutAction = (action: UnknownAction): action is LogoutAction => {
  return action.type === LOGOUT
}

const userReducer = (
  state = initialState,
  action: UnknownAction,
): UserState => {
  if (
    isLoginAction(action) ||
    isGetCurrentUserAction(action) ||
    isUpdateCurrentUserAction(action)
  ) {
    return {
      ...state,
      currentUser: action.payload,
    }
  }

  if (isLogoutAction(action)) {
    return {
      ...state,
      currentUser: null,
    }
  }

  return state
}

export default userReducer