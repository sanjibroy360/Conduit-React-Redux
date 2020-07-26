import React from "react";
import {connect} from "react-redux";
import { filterArticleAction } from "../store/actions";




function PopularTags(props) {
  const {tagList, dispatch} = props;
  console.log({tagList})
  return (
    <div className="taglist_wrapper">
      <div className="taglist_card">
        <h3 className="taglist_heading">Popular Tags</h3>
        <ul className="taglist">
          {tagList.map((tag) => {
            return (
              <li>
                <button className="taglist_btn" onClick={ () => dispatch(filterArticleAction(tag))}>{tag}</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function mapStateToProps({tagList}) {
  return {tagList}
}

export default connect(mapStateToProps)(PopularTags);