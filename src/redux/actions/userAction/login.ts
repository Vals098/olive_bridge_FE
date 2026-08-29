import type { UnknownAction } from "@reduxjs/toolkit";
import type { User } from "../../../types/User";

export const LOGIN = "LOGIN";

export type LoginAction = UnknownAction & {
    type: typeof LOGIN;
    payload: User;
};

export const loginAction = (user: User): LoginAction => {
    return {
        type: LOGIN,
        payload: user,
    };
};