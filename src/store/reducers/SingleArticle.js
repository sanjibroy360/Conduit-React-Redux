import { SINGLE_ARTICLE_INFO } from "../types";

const initialState = {};

function SingleArticleReducer(state = initialState, action) {
  switch (action.type) {
    case SINGLE_ARTICLE_INFO:
      return action.payload ;

    default:
      return state;
  }
}

export default SingleArticleReducer;
