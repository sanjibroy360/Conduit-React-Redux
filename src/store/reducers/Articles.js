import { GET_ALL_ARTICLE } from "../types";

const initialArticles = [];

function ArticleReducer(state = initialArticles, action) {
  switch (action.type) {
    case GET_ALL_ARTICLE:
      console.log({ inReducer: [...state, action.payload] });
      return [...state, ...action.payload];
    default:
      return state;
  }
}

export default ArticleReducer;
