import type { UnknownAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "../../store";

export const LOGOUT = "LOGOUT";

export type LogoutAction = UnknownAction & {
    type: typeof LOGOUT;
};

export const logoutAction = () => {
    return (dispatch: AppDispatch) => {
        localStorage.removeItem("token");

        dispatch({
            type: LOGOUT,
        });
    };
};