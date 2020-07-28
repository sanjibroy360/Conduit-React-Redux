import React, { Component } from "react";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { TOGGLE_PROFILE_ARTICLE_FAVORITE } from "../store/types";
import {
  fetchVisitedProfileArticles,
  FavoriteAndUnfavoriteArticle,
} from "../store/actions";

class ProfileArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "author",
    };
  }
  componentDidUpdate(prevProps) {
    if (
      !prevProps.profile.userInfo.username &&
      this.props.profile.userInfo.username
    ) {
      const username = this.props.profile.userInfo.username;
      this.props.dispatch(fetchVisitedProfileArticles("author", username));
    }
  }

  handleFavorited = (e, slug, isFavorited) => {
    const method = isFavorited ? "DELETE" : "POST";
    const url = `https://conduit.productionready.io/api/articles/${slug}/favorite`;
    const { username } = this.props.profile.userInfo;

    const targetPage = `/user/profile/${username}`;
    console.log(
      url,
      slug,
      this.props.history,
      method,
      targetPage,
      "Profile Articles"
    );

    if (!this.props.user.token) {
      console.log("condition satisfied!");
      return this.props.history.push("/signin");
    }

    this.props.dispatch(
      FavoriteAndUnfavoriteArticle(
        url,
        TOGGLE_PROFILE_ARTICLE_FAVORITE,
        slug,
        this.props.history,
        method,
        targetPage
      )
    );
  };

  handleArticleList = (event, tab = "author") => {
    this.setState({ activeTab: tab });
    const username = this.props.profile.userInfo.username;
    this.props.dispatch(fetchVisitedProfileArticles(tab, username));
  };

  render() {
    let { articleList } = this.props.profile;
    let { activeTab } = this.state;
    return (
      <div className="container">
        <ul className="list_nav">
          <li>
            <button
              onClick={(event) => this.handleArticleList(event, "author")}
              className={
                activeTab === "author"
                  ? "active_filterParam article_list_btn all_btn"
                  : "article_list_btn all_btn"
              }
            >
              My Articles
            </button>
          </li>
          <li>
            <button
              onClick={(event) => this.handleArticleList(event, "favorited")}
              className={
                activeTab === "favorited"
                  ? "active_filterParam article_list_btn all_btn"
                  : "article_list_btn all_btn"
              }
            >
              Favorited Articles
            </button>
          </li>
        </ul>
        <ul>
          {articleList.map((article) => {
            return (
              <li className="article_card">
                <div className="article_card_left">
                  <div className="article_info">
                    <div className="author_image">
                      <img src={article.author.image} alt="User" />
                    </div>
                    <div>
                      <p className="author_name">
                        <Link
                          to={`/user/profile/${article.author.username}`}
                          onClick={() =>
                            this.props.handleProfileVisit(
                              article.author.username
                            )
                          }
                          className="author_name"
                        >
                          {article.author.username}
                        </Link>
                      </p>
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

                  <div className="article_content">
                    <Link to={`/article/${article.slug}`}>
                      <h3 className="article_title">{article.title || ""}</h3>
                      <p className="article_desc">
                        {article.description || ""}
                      </p>
                    </Link>
                  </div>
                </div>

                <div className="article_card_right">
                  <button
                    className={
                      article.favorited
                        ? "favorited favorite_btn"
                        : "favorite_btn"
                    }
                    onClick={(event) =>
                      this.handleFavorited(
                        event,
                        article.slug,
                        article.favorited
                      )
                    }
                  >
                    {article.favorited ? (
                      <i class="fas fa-heart like_icon active_like_icon"></i>
                    ) : (
                      <i className="far fa-heart like_icon"></i>
                    )}

                    {article.favoritesCount}
                  </button>
                </div>

                <div className="card_footer">
                  <p>
                    <Link to={`/article/${article.slug}`} className="read_more">
                      Read More...
                    </Link>
                  </p>

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

function mapStateToProps({ profile, user }) {
  return { profile, user };
}

export default connect(mapStateToProps)(withRouter(ProfileArticleList));
