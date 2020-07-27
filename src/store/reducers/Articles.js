import { GET_ALL_ARTICLE, TOGGLE_FAVORITE } from "../types";

const initialArticles = [];

function ArticleReducer(state = initialArticles, action) {
  switch (action.type) {
    case GET_ALL_ARTICLE:
      var articles = action.payload;
      return articles;
    case TOGGLE_FAVORITE:
      return state.map((article) => {
        if (article.slug === action.payload.slug) {
          return action.payload;
        }
        return article;
      });
    default:
      return state;
  }
}

export default ArticleReducer;
