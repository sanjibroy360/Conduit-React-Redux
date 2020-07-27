import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchArticle } from "../store/actions"; //, fetchTags
import {
  filterArticleAction,
  FavoriteAndUnfavoriteArticle,
} from "../store/actions";
import { Link, withRouter } from "react-router-dom";

class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeFilterTab: "global",
    };
  }
  handleFilterArticle = (activeTab) => {
    this.props.dispatch(filterArticleAction(activeTab));
  };

  getFilteredArticles = (articles, filterParam, isAuthRequired) => {
    let articleFetchUrl = "";
    switch (filterParam) {
      case "global":
        articleFetchUrl =
          "https://conduit.productionready.io/api/articles?limit=10&offset=0";
        break;

      case "yourFeed":
        articleFetchUrl =
          "https://conduit.productionready.io/api/articles/feed?limit=10&offset=0";
        break;
      default:
        articleFetchUrl = `https://conduit.productionready.io/api/articles?tag=${filterParam}&limit=10&offset=0`;
    }

    return this.props.dispatch(fetchArticle(articleFetchUrl, isAuthRequired));
  };

  handleFavorited = (e, slug, isFavorited) => {
    const method = isFavorited ? "DELETE" : "POST";
    const url = `https://conduit.productionready.io/api/articles/${slug}/favorite`;

    if(!this.props.user.token) {
      console.log("condition satisfied!")
      return this.props.history.push("/signin");
    }

    this.props.dispatch(
      FavoriteAndUnfavoriteArticle(url, slug, this.props.history, method)
    );
  };

  render() {
    let { articles, filterArticle, user } = this.props;
    if (this.state.activeFilterTab !== filterArticle) {
      this.getFilteredArticles(
        articles,
        filterArticle,
        filterArticle === "yourFeed"
      );
      this.setState({ activeFilterTab: filterArticle });
    }

    return (
      <div className="article_list_wrapper">
        <ul className="list_nav">
          {user && user.token ? (
            <li
              className={
                filterArticle === "yourFeed"
                  ? "active_filter article_list_btn all_btn"
                  : "article_list_btn all_btn"
              }
              onClick={() => this.handleFilterArticle("yourFeed")}
            >
              Your Feed
            </li>
          ) : (
            ""
          )}
          <li
            className={
              filterArticle === "global"
                ? "active_filter article_list_btn all_btn"
                : "article_list_btn all_btn"
            }
            onClick={() => this.handleFilterArticle("global")}
          >
            Global Feed
          </li>
          {!["global", "yourFeed"].includes(filterArticle) ? (
            <li
              className="active_filter article_list_btn all_btn"
              onClick={() => this.handleFilterArticle(`${filterArticle}`)}
            >
              {filterArticle}
            </li>
          ) : (
            ""
          )}
        </ul>

        <ul className="article_card_wrapper">
          {articles.map((article) => {
            return (
              <li className="article_card">
                <div className="article_card_left">
                  <Link to={`/user/profile/${article.author.username}`}>
                    <div className="article_info">
                      <div className="author_image">
                        <img src={article.author.image} alt="User" />
                      </div>
                      <div>
                        <p className="author_name">{article.author.username}</p>
                        <p className="create_date">
                          {article.createdAt
                            .toString()
                            .slice(0, 10)
                            .split("-")
                            .reverse()
                            .join(" / ")}
                        </p>
                      </div>
                    </div>
                  </Link>
                  <div className="article_content">
                    <Link to={`/article/${article.slug}`}>
                      <h3 className="article_title">{article.title || ""}</h3>
                    </Link>
                    <p className="article_desc">{article.description || ""}</p>
                  </div>
                </div>

                <div className="article_card_right">
                  {article.favorited ? (
                    <button
                      className="favorited"
                      onClick={(event) =>
                        this.handleFavorited(
                          event,
                          article.slug,
                          article.favorited
                        )
                      }
                    >
                      {article.favoritesCount}
                    </button>
                  ) : (
                    <button
                      onClick={(event) =>
                        this.handleFavorited(
                          event,
                          article.slug,
                          article.favorited
                        )
                      }
                    >
                      {article.favoritesCount}
                    </button>
                  )}
                </div>

                <div className="card_footer">
                  <p>Read More...</p>
                  <ul className="card_taglist">
                    {article.tagList.length
                      ? article.tagList.map((tag) => {
                          return <li className="article_card_tag">{tag}</li>;
                        })
                      : ""}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

function mapStateToProp({ articles, user, filterArticle }) {
  return { articles, user, filterArticle };
}

export default connect(mapStateToProp)(withRouter(ArticleList));
