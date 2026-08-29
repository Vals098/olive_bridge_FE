import type { UnknownAction } from "@reduxjs/toolkit";
import type { User } from "../../types/User";
import {
    LOGIN,
    type LoginAction,
} from "../actions/userAction/login";

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

const userReducer = (
    state = initialState,
    action: UnknownAction
): UserState => {
    if (isLoginAction(action)) {
        return {
            ...state,
            currentUser: action.payload,
        };
    }

    return state;
};

export default userReducer;