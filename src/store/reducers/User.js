import { CREATE_USER, SIGNIN_USER } from "../types";

const user = {};

function UserReducer(state = user, action) {
  switch (action.type) {
    case SIGNIN_USER:
      console.log(action.payload);
      return action.payload;

    default:
      return state;
  }
}

export default UserReducer;
