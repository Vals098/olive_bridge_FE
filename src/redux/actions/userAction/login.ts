import type { User } from "../../../types/User"

export const LOGIN = "LOGIN";

export interface LoginAction {
    type: typeof LOGIN;
    payload: User;
}

export const loginAction = (user: User): LoginAction => {
    return {
        type: LOGIN,
        payload: user,
    };
};