import type { AppDispatch } from "../../store";
import type { User } from "../../../types/User";
import type { LoginRequest } from "../../../types/LoginRequest";

export const LOGIN = "LOGIN";

export type LoginAction = {
    type: typeof LOGIN;
    payload: User;
};

export const loginAction = (credentials: LoginRequest) => {
    return async (dispatch: AppDispatch) => {
        try {
            // 1. Login
            const loginResponse = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });

            if (!loginResponse.ok) {
                throw new Error("Invalid credentials");
            }

            const token = await loginResponse.text();

            // 2. Get current user
            const userResponse = await fetch("http://localhost:8080/users/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!userResponse.ok) {
                throw new Error("Unable to retrieve user");
            }

            const user: User = await userResponse.json();

            // 3. Save user in Redux
            dispatch({
                type: LOGIN,
                payload: user,
            });
        } catch (error) {
            console.error("Login error:", error);
        }
    };
};