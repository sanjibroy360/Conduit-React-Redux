import { SIGNIN_USER, USER_INFO } from "../types";

const user = {};

function UserReducer(state = user, action) {
  switch (action.type) {
    case SIGNIN_USER:
      localStorage.clear();
      localStorage.setItem("authToken", action.payload.token);
      return action.payload;

    case USER_INFO:
      return action.payload;
    default:
      return state;
  }
}

export default UserReducer;
