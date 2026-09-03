import type { UnknownAction } from "@reduxjs/toolkit";
import type { User } from "../../types/User";
import {
    LOGIN,
    type LoginAction,
} from "../actions/userAction/login";
import {
    GET_CURRENT_USER,
    type GetCurrentUserAction,
} from "../actions/userAction/getCurrentUser";

interface UserState {
    currentUser: User | null;
}

const initialState: UserState = {
    currentUser: null,
};

const isLoginAction = (
    action: UnknownAction
): action is LoginAction => {
    return action.type === LOGIN && "payload" in action;
};

const isGetCurrentUserAction = (
    action: UnknownAction
): action is GetCurrentUserAction => {
    return action.type === GET_CURRENT_USER && "payload" in action;
};

const userReducer = (
    state = initialState,
    action: UnknownAction
): UserState => {
    if (
        isLoginAction(action) ||
        isGetCurrentUserAction(action)
    ) {
        return {
            ...state,
            currentUser: action.payload,
        };
    }

    return state;
};

export default userReducer;