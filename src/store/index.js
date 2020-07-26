import { createStore, combineReducers, applyMiddleware } from "redux";
import ArticleReducer from "./reducers/Articles";
import FilterArticlesReducer from "./reducers/ArticleListTab";
import TagReducer from "./reducers/TagList";
import UserReducer from "./reducers/User";
import SingleArticleReducer from "./reducers/SingleArticle";
import commentReducer from "./reducers/comments";
import ProfileReducer from "./reducers/VisitedProfileInfos";



var rootReducer = combineReducers({
  articles: ArticleReducer,
  tagList: TagReducer,
  user: UserReducer,
  filterArticle : FilterArticlesReducer,
  singleArticleInfo: SingleArticleReducer,
  commentList: commentReducer,
  profile: ProfileReducer
});

function getArticle(store) {
  return function (next) {
    return function (action) {
      if (typeof action == "function") return action(store.dispatch);
      return next(action);
    };
  };
}

export const store = createStore(rootReducer, applyMiddleware(getArticle));
