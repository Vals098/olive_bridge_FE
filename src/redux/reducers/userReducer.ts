import type { User } from "../../types/User";
import {
    LOGIN,
    type LoginAction
} from "../actions/userAction/login";

interface UserState {
    currentUser: User | null;
}

const initialState: UserState = {
    currentUser: null,
};

const userReducer = (
    state = initialState,
    action: LoginAction
): UserState => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                currentUser: action.payload,
            };

        default:
            return state;
    }
};

export default userReducer;