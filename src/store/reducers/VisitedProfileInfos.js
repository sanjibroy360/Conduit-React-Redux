import { USER_PROFILE, PROFILE_ARTICLE_LIST, TOGGLE_PROFILE_ARTICLE_FAVORITE } from "../types";
import { combineReducers } from "redux";

const profile = {
  userInfo: {},
  articleList: [],
};

function userReducer(state = profile.userInfo, action) {
  switch (action.type) {
    case USER_PROFILE:
      return action.payload;

    default:
      return state;
  }
}

function articleListReducer(state = profile.articleList, action) {
  switch (action.type) {
    case PROFILE_ARTICLE_LIST:
      return action.payload;

    case TOGGLE_PROFILE_ARTICLE_FAVORITE:
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

var ProfileReducer = combineReducers({
  userInfo: userReducer,
  articleList: articleListReducer,
});

export default ProfileReducer;

