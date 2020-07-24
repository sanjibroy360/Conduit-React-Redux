import { createStore, combineReducers, applyMiddleware } from "redux";
import ArticleReducer from "./reducers/Articles";
import TagReducer from "./reducers/TagList";
import UserReducer from "./reducers/User";

var rootReducer = combineReducers({
  articles: ArticleReducer,
  tagList: TagReducer,
  user: UserReducer
});

function getArticle(store) {
  return function (next) {
    return function (action) {
      console.log(action);
      if (typeof action == "function") return action(store.dispatch);
      return next(action);
    };
  };
}

export const store = createStore(rootReducer, applyMiddleware(getArticle));
