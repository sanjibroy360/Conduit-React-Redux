import React, { Component } from "react";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchVisitedProfileArticles } from "../store/actions";

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
              <Link to={`/article/${article.slug}`}>
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
                      <h3 className="article_title">{article.title || ""}</h3>
                      <p className="article_desc">
                        {article.description || ""}
                      </p>
                    </div>
                  </div>

                  <div className="article_card_right">
                    <button>{article.favoritesCount}</button>
                  </div>

                  <div className="card_footer">
                    <p>
                      <Link
                        to={`/article/${article.slug}`}
                        className="read_more"
                      >
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
              </Link>
            );
          })}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ profile }) {
  return { profile };
}

export default connect(mapStateToProps)(ProfileArticleList);
