import { COMMENT_LIST } from "../types";

const initialState = [];

function commentReducer(state = initialState, action) {
  switch (action.type) {
    case COMMENT_LIST:
      return [...action.payload];
    default:
      return state;
  }
}

export default commentReducer;
