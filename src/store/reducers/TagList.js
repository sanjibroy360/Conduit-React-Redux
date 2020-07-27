import { GET_ALL_TAG } from "../types";

const initialTags = [];

function TagReducer(state = initialTags, action) {
  switch (action.type) {
    case GET_ALL_TAG:
      return [...action.payload];
    default:
      return state;
  }
}

export default TagReducer;
