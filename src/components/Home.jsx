import { connect } from "react-redux";
import { fetchArticle, fetchTags } from "../store/actions"; //, fetchTags
import ArticleList from "./ArticleList";
import PopularTags from "./PopularTags";
import React, { Component } from "react";

class Home extends Component {
  componentDidMount() {
    const articleFetchUrl =
      "https://conduit.productionready.io/api/articles?limit=10&offset=0";
    const tagFetchUrl = "https://conduit.productionready.io/api/tags";

    this.props.dispatch(fetchArticle(articleFetchUrl));
    return this.props.dispatch(fetchTags(tagFetchUrl));
  }
  render() {
    const { articles, tagList } = this.props;
    return (
      <div className="container">
        <div className="home_content">
          <ArticleList articles={articles} />
          <PopularTags tags={tagList}/>
        </div>
      </div>
    );
  }
}

function mapStateToProp({ articles, tagList }) {
  console.log(articles);
  return { articles, tagList };
}

export default connect(mapStateToProp)(Home);
