import { SIGNIN_USER, USER_INFO, LOG_OUT } from "../types";

const user = {};

function UserReducer(state = user, action) {
  switch (action.type) {
    case SIGNIN_USER:
      localStorage.clear();
      localStorage.setItem("authToken", action.payload.token);
      return action.payload;

    case USER_INFO:
      return action.payload;
    case LOG_OUT:
      localStorage.clear(); 
      return {}
    default:
      return state;
  }
}

export default UserReducer;
