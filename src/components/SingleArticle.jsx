import React, { Component } from "react";
import Loader from "./Loader";
import Comment from "./Comment";

import CommentList from "./CommentList";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { fetchSingleArticle, deleteArticle } from "../store/actions";

class ArticlePage extends Component {
  handleDelete = () => {
    const slug = this.props.match.params.slug;
    const url = `https://conduit.productionready.io/api/articles/${slug}`;
    this.props.dispatch(deleteArticle(url, this.props.history));
  };

  componentDidMount() {
    var slug = this.props.match.params.slug;
    var url = `https://conduit.productionready.io/api/articles/${slug}`;

    this.props.dispatch(fetchSingleArticle(url));
  }
  render() {
    if (!this.props.singleArticleInfo) {
      return <Loader />;
    }

    let {
      createdAt,
      title,
      tagList,
      body,
      author,
      slug,
    } = this.props.singleArticleInfo;
    let { username, image } = { ...author };

    return (
      <>
        {createdAt ? (
          <>
            <div className="article_page_header">
              <div className="container">
                <h1 className="article_heading">{title}</h1>
                <div className="article_details_wrapper">
                  <div className="article_author_image">
                    <img src={image} alt="Author" />
                  </div>

                  <div className="article_details">
                    <Link
                      to={`/user/profile/${username}`}
                      className="author_name"
                    >
                      {username}
                    </Link>
                    <p className="created_at">
                      {createdAt
                        .toString()
                        .slice(0, 10)
                        .split("-")
                        .reverse()
                        .join(" / ")}
                    </p>
                  </div>

                  {this.props.user.username === username ? (
                    <div className="article_details_btns">
                      <Link to={`/edit/article/${slug}`}>
                        <button className="edit_btn">Edit Article</button>
                      </Link>
                      <button onClick={this.handleDelete} className="del_btn">
                        Delete Article
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="article_content_part">
              <div className="container">
                <p className="article_content">{body}</p>
                <ul className="taglist articlee_page_taglist">
                  {tagList.map((tag) => {
                    return <li className="taglist_btn">{tag}</li>;
                  })}
                </ul>
                <hr />
                <Comment />
                <CommentList />
              </div>
            </div>
          </>
        ) : (
          <Loader />
        )}
      </>
    );
  }
}

function mapStateToProps({ singleArticleInfo, user }) {
  return { singleArticleInfo, user };
}

export default connect(mapStateToProps)(withRouter(ArticlePage));
