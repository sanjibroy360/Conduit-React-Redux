import { CHANGE_TAB } from "../types";

const filterArticle = "global";

function FilterArticlesReducer(state = filterArticle, action) {
  switch (action.type) {
    case CHANGE_TAB:
      return action.payload;
    
    
    default:
      return state;
  }
}

export default FilterArticlesReducer;
